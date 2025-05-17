from db import mongo
import datetime
from bson.objectid import ObjectId

class Product:

    required_fields = ["seller_id", "name", "description", "mrp_price", "price", "discount_price", "category", "stock", "sku", "brand", "tax"]

    @staticmethod
    def validate_product(data):
        missing = [field for field in Product.required_fields if field not in data]
        if missing:
            return False, f"Missing required fields: {', '.join(missing)}"
        return True, None

    @staticmethod
    def validate_review(review):
        try:
            rating = float(review.get("rating"))
            return all([
                review.get("name"),
                1 <= rating <= 5,
                review.get("comment"),
                review.get("user")
            ])
        except:
            return False

    @staticmethod
    def create_product(data):
        is_valid, error = Product.validate_product(data)
        if not is_valid:
            return {"error": error}, 400

        # Check if sku already exists
        if mongo.db.products.find_one({"sku": data["sku"]}):
            return {"error": "sku already exists"}, 400

        # Set default values for optional booleans
        product = {
            "seller_id": data["seller_id"],
            "name": data["name"],
            "description": data["description"],
            "mrp_price": data["mrp_price"],
            "price": data["price"],
            "discount_price": data["discount_price"],
            "category": data["category"],
            "stock": data["stock"],
            "sku": data["sku"],
            "tax": data["tax"],
            "reviews": [],
            "numReviews": 0,
            "brand": data["brand"],
            "images": data.get("images", []),
            "isActive": data.get("isActive", True),
            "created_date": datetime.datetime.utcnow()
        }

        inserted = mongo.db.products.insert_one(product)
        product["_id"] = str(inserted.inserted_id)
        return product, 201

    @staticmethod
    def get_product_by_id(product_id):
        return mongo.db.products.find_one({"_id": ObjectId(product_id)})

    # --------- Add Review to Product ----------
    @staticmethod
    def add_review(data):
        is_valid = Product.validate_review(data)
        if not is_valid:
            return {"error": "Missing review fields"}, 400

        product_id = ObjectId(data["product_id"])
        user_id = ObjectId(data["user"])

        # 🔍 Step 1: Check if user already reviewed this product
        existing = mongo.db.products.find_one(
            {
                "_id": product_id,
                "reviews.user": user_id
            },
            {"_id": 1}
        )

        if existing:
            return {"error": "You have already reviewed this product"}, 400

        review = {
            "_id": ObjectId(),  # unique ID for each review
            "product_id": ObjectId(data["product_id"]),  # optional, for easier reference later
            "name": data["name"],
            "rating": data["rating"],
            "comment": data["comment"],
            "user": ObjectId(data["user"]),
            "createdAt": datetime.datetime.utcnow(),
            "updatedAt": datetime.datetime.utcnow()
        }

        result = mongo.db.products.update_one(
            {"_id": ObjectId(data["product_id"])},
            {
                "$push": {"reviews": review},
                "$inc": {"numReviews": 1},
            }
        )

        if result.modified_count == 1:
            return {"message": "Review added successfully"}, 200
        else:
            return {"error": "Product not found"}, 404

class Order:
    required_fields = ["user_id", "product_id", "qty", "tax", "full_name", "contact", "delivery_address", "delivery_country", "delivery_state", "delivery_city", "pincode", "payment_method", "payment_status", "shipping_charges"]

    @staticmethod
    def validate_order(data):
        missing = [field for field in Order.required_fields if field not in data]
        if missing:
            return False, f"Missing required fields: {', '.join(missing)}"

        return True, None

    @staticmethod
    def create_order(data):
        is_valid, error = Order.validate_order(data)
        if not is_valid:
            return {"error": error}, 400

        product_list = []
        total_amount = 0

        product_ids = data.get("product_id", [])
        quantities = data.get("qty", [])
        taxes = data.get("tax", [])

        if len(product_ids) != len(quantities) or len(product_ids) != len(taxes):
            return {"error": "product_id, qty, and tax length mismatch"}, 400

        for i in range(len(product_ids)):
            try:
                qty = int(quantities[i])
                tax = float(taxes[i])
            except ValueError:
                return {"error": "qty and tax must be numeric"}, 400

            if qty < 1:
                return {"error": "Quantity must be more than 0"}, 400

            product = mongo.db.products.find_one({"_id": ObjectId(product_ids[i])})
            if not product:
                return {"error": f"Product with ID {product_ids[i]} does not exist"}, 400

            stock = int(product.get("stock", 0))
            if qty > stock:
                return {"error": f"Requested quantity for {product['name']} exceeds stock"}, 400

            # Update stock
            mongo.db.products.update_one(
                {"_id": ObjectId(product_ids[i])},
                {"$set": {"stock": str(stock - qty)}}
            )

            price = float(product.get("price", 0))
            tax = (tax * (price * qty))/100
            product_total = (price * qty) + tax
            total_amount += product_total

            product_list.append({
                "product_id": str(product["_id"]),
                "seller_id": str(product["seller_id"]),
                "name": product.get("name"),
                "qty": qty,
                "price": price,
                "tax": tax,
                "subtotal": product_total
            })

        order_data = {
            "user_id": data["user_id"],
            "products": product_list,
            "full_name": data["full_name"],
            "contact": data["contact"],
            "delivery_address": data["delivery_address"],
            "delivery_country": data["delivery_country"],
            "delivery_state": data["delivery_state"],
            "delivery_city": data["delivery_city"],
            "pincode": data["pincode"],
            "shipping_charges": float(data.get("shipping_charges", 0)),
            "total_amount": total_amount + float(data.get("shipping_charges", 0)),
            "payment_method": data["payment_method"],
            "payment_status": data["payment_status"],
            "estimated_delivery_date": data.get("estimated_delivery_date"),
            "status": "active",
            "created_date": datetime.datetime.utcnow()
        }

        inserted = mongo.db.order.insert_one(order_data)
        order_data["_id"] = str(inserted.inserted_id)

        return order_data, 201

    @staticmethod
    def delete_order(order_id):
        try:
            order = mongo.db.order.find_one({"_id": ObjectId(order_id)})
            if not order:
                return {"error": "Order not found"}, 404

            # Restore product stock
            for item in order.get("products", []):
                product_id = item.get("product_id")
                qty = int(item.get("qty", 0))

                product = mongo.db.products.find_one({"_id": ObjectId(product_id)})
                if product:
                    new_stock = int(product.get("stock", 0)) + qty
                    mongo.db.products.update_one(
                        {"_id": ObjectId(product_id)},
                        {"$set": {"stock": str(new_stock)}}
                    )

            # Mark the order as failed instead of deleting
            mongo.db.order.update_one(
                {"_id": ObjectId(order_id)},
                {"$set": {"status": "failed"}}
            )

            return {"message": "Order marked as failed and stock restored"}, 200

        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def update_order(order_id, data):
        try:
            # Find the existing order
            order = mongo.db.order.find_one({"_id": ObjectId(order_id)})
            if not order:
                return {"error": "Order not found"}, 404

            # Prepare fields to update
            update_fields = {
                "full_name": data.get("full_name", order["full_name"]),
                "contact": data.get("contact", order["contact"]),
                "delivery_address": data.get("delivery_address", order["delivery_address"]),
                "delivery_country": data.get("delivery_country", order["delivery_country"]),
                "delivery_state": data.get("delivery_state", order["delivery_state"]),
                "delivery_city": data.get("delivery_city", order["delivery_city"]),
                "pincode": data.get("pincode", order["pincode"]),
            }

            mongo.db.order.update_one(
                {"_id": ObjectId(order_id)},
                {"$set": update_fields}
            )

            return {"message": "Order updated successfully"}, 200

        except Exception as e:
            return {"error": str(e)}, 400


