from flask import request, jsonify
from db import mongo
import datetime
from bson.objectid import ObjectId
from models.product_model import Product, Order

def create_product():
    data = request.json
    result, status = Product.create_product(data)
    return jsonify(result), status

def get_products():
    products = list(mongo.db.products.find())
    for product in products:
        product['_id'] = str(product['_id'])
    return jsonify(products)

def get_product(product_id):
    product = mongo.db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        return jsonify({"error": "Product not found"}), 404
    product['_id'] = str(product['_id'])
    return jsonify(product)

def update_product(product_id):
    data = request.json
    result = mongo.db.products.update_one({"_id": ObjectId(product_id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"message": "Product updated"})

def delete_product(product_id):
    result = mongo.db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"message": "Product deleted"})

def get_specific_seller_all_products(seller_id):
    products = list(mongo.db.products.find({"seller_id": seller_id}))
    if not products:
        return jsonify([]), 200
    for product in products:
        product['_id'] = str(product['_id'])
    return jsonify(products)

def get_products_by_ids():
    data = request.json
    product_ids = data.get("product_ids")
    if not product_ids or not isinstance(product_ids, list):
        return jsonify([]), 200
    try:
        object_ids = [ObjectId(pid) for pid in product_ids]
    except Exception as e:
        return jsonify({"error": "Invalid product_id format"}), 400
    products = list(mongo.db.products.find({"_id": {"$in": object_ids}}))
    # Convert ObjectId to string
    for product in products:
        product["_id"] = str(product["_id"])
    return jsonify(products), 200

def search_products(search_string):
    products = list(mongo.db.products.find({
        "category": {
            "$regex": f"^{search_string}",  # starts with `search_string`
            "$options": "i"  # case-insensitive
        }
    }))
    if not products:
        return jsonify([]), 200
    for product in products:
        product['_id'] = str(product['_id'])
    return jsonify(products)

def create_review():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON body"}), 400

        result, status = Product.add_review(data)
        return jsonify(result), status

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_product_reviews(product_id):
    product = mongo.db.products.find_one({"_id": ObjectId(product_id)}, {"reviews": 1})

    if product and "reviews" in product:
        return jsonify(product["reviews"]), 200
    return jsonify({"error": "Product not found"}), 404

def update_review(product_id, review_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Convert fields for embedded array update
    update_data = {f"reviews.$.{k}": v for k, v in data.items()}
    update_data["reviews.$.updatedAt"] = datetime.datetime.utcnow()

    result = mongo.db.products.update_one(
        {
            "_id": ObjectId(product_id),
            "reviews._id": ObjectId(review_id)
        },
        {"$set": update_data}
    )

    if result.modified_count == 1:
        return jsonify({"message": "Review updated successfully"}), 200
    return jsonify({"error": "Review not found"}, 404)

def delete_review(product_id, review_id):
    result = mongo.db.products.update_one(
        {
            "_id": ObjectId(product_id),
            "reviews._id": ObjectId(review_id)
        },
        {
            "$pull": {"reviews": {"_id": ObjectId(review_id)}},
            "$inc": {"numReviews": -1},
            "$set": {"updatedAt": datetime.datetime.utcnow()}
        }
    )

    if result.modified_count == 1:
        return jsonify({"message": "Review deleted successfully"}), 200
    return jsonify({"error": "Review not found"}), 404

def get_reviews_by_user(user_id):
    user_obj_id = ObjectId(user_id)

    # MongoDB aggregation to extract matching reviews
    pipeline = [
        {"$unwind": "$reviews"},
        {"$match": {"reviews.user": user_obj_id}},
        {
            "$project": {
                "_id": 0,
                "product_id": "$_id",  # include product ID
                "review": "$reviews"
            }
        }
    ]

    results = list(mongo.db.products.aggregate(pipeline))

    # if not results:
    #     return jsonify({"message": "No reviews found for this user"}), 404

    return jsonify({"reviews": results}), 200

def create_order():
    data = request.json
    result, status = Order.create_order(data)
    return jsonify(result), status

def update_order(order_id):
    data = request.json
    result, status = Order.update_order(order_id, data)
    return jsonify(result), status

def delete_order(order_id):
    result, status = Order.delete_order(order_id)
    return jsonify(result), status

def get_order():
    orders = list(mongo.db.order.find())
    for product in orders:
        product['_id'] = str(product['_id'])
    return jsonify(orders)

def get_user_all_orders(user_id):
    orders = list(mongo.db.order.find({"user_id": user_id}))
    for product in orders:
        product['_id'] = str(product['_id'])
    return jsonify(orders)

def get_specific_order(order_id):
    order = mongo.db.order.find_one({"_id": ObjectId(order_id)})
    if not order:
        return jsonify({"error": "Order not found"}), 404
    order['_id'] = str(order['_id'])
    return jsonify(order)

def get_specific_seller_order(seller_id):
    seller_products_info = []

    orders = mongo.db.order.find({
        "products.seller_id": seller_id  # Only orders where this seller has products
    })

    for order in orders:
        # ✅ Check if order status is 'active'
        if order.get("status") != "active":
            continue

        # Filter products for this seller only
        matching_products = [
            {
                "product_id": p["product_id"],
                "name": p["name"],
                "price": p["price"],
                "qty": p["qty"],
                "tax": p["tax"],
                "subtotal": p["subtotal"]
            }
            for p in order.get("products", [])
            if p.get("seller_id") == seller_id
        ]

        if matching_products:
            seller_products_info.append({
                "products": matching_products,
                "delivery_address": order.get("delivery_address"),
                "delivery_country": order.get("delivery_country"),
                "delivery_state": order.get("delivery_state"),
                "delivery_city": order.get("delivery_city"),
                "pincode": order.get("pincode"),
                "contact": order.get("contact"),
                "full_name": order.get("full_name"),
                "shipping_charges": order.get("shipping_charges"),
                "total_amount": order.get("total_amount"),
                "payment_method": order.get("payment_method"),
                "payment_status": order.get("payment_status"),
                "estimated_delivery_date": order.get("estimated_delivery_date"),
                "order_status": order.get("status"),
                "created_date": order.get("created_date")
            })

    return seller_products_info

def get_specific_seller_sold_order(seller_id):
    seller_products_info = []

    orders = mongo.db.order.find({
        "products.seller_id": seller_id  # Only orders where this seller has products
    })

    for order in orders:
        # ✅ Check if order status is 'active'
        if order.get("status") != "delivered":
            continue

        # Filter products for this seller only
        matching_products = [
            {
                "product_id": p["product_id"],
                "name": p["name"],
                "price": p["price"],
                "qty": p["qty"],
                "tax": p["tax"],
                "subtotal": p["subtotal"]
            }
            for p in order.get("products", [])
            if p.get("seller_id") == seller_id
        ]

        if matching_products:
            seller_products_info.append({
                "products": matching_products,
                "delivery_address": order.get("delivery_address"),
                "delivery_country": order.get("delivery_country"),
                "delivery_state": order.get("delivery_state"),
                "delivery_city": order.get("delivery_city"),
                "pincode": order.get("pincode"),
                "contact": order.get("contact"),
                "full_name": order.get("full_name"),
                "shipping_charges": order.get("shipping_charges"),
                "total_amount": order.get("total_amount"),
                "payment_method": order.get("payment_method"),
                "payment_status": order.get("payment_status"),
                "estimated_delivery_date": order.get("estimated_delivery_date"),
                "order_status": order.get("status"),
                "created_date": order.get("created_date")
            })

    return seller_products_info


