# models/user_model.py

from flask import jsonify
from db import mongo
import datetime
from bson.objectid import ObjectId

class UserModel:

    required_fields = ["full_name", "email", "contact"]

    @staticmethod
    def validate_user(data):
        missing = [field for field in UserModel.required_fields if field not in data]
        if missing:
            return False, f"Missing required fields: {', '.join(missing)}"

        return True, None

    @staticmethod
    def create_user(data):
        is_valid, error = UserModel.validate_user(data)
        if not is_valid:
            return {"error": error}, 400

        # Check if email already exists
        if mongo.db.users.find_one({"email": data["email"]}):
            return {"error": "Email already exists"}, 400

        # Set default values for optional booleans
        user_data = {
            "full_name": data["full_name"],
            "email": data["email"],
            "contact": data["contact"],
            "isAdmin": data.get("isAdmin", False),
            "isStaff": data.get("isStaff", False),
            "isActive": data.get("isActive", True),
            "date_joind": datetime.datetime.utcnow()
        }

        inserted = mongo.db.users.insert_one(user_data)
        user_data["_id"] = str(inserted.inserted_id)
        Cart.create_cart({"user_id": user_data["_id"]})
        return user_data, 201

    @staticmethod
    def get_user_by_email(email):
        return mongo.db.users.find_one({"email": email})

    @staticmethod
    def get_user_by_id(user_id):
        return mongo.db.users.find_one({"_id": ObjectId(user_id)})

class Contact:
    required_fields = ["user_id","full_name", "email", "contact", "subject", "message"]

    @staticmethod
    def validate_contact(data):
        missing = [field for field in Contact.required_fields if field not in data]
        if missing:
            return False, f"Missing required fields: {', '.join(missing)}"

        return True, None

    @staticmethod
    def create_contact(data):
        is_valid, error = Contact.validate_contact(data)
        if not is_valid:
            return {"error": error}, 400

        # Set default values for optional booleans
        contact_data = {
            "user_id": data["user_id"],
            "full_name": data["full_name"],
            "email": data["email"],
            "contact": data["contact"],
            "subject": data["subject"],
            "message": data.get("message"),
            "created_date": datetime.datetime.utcnow()
        }

        inserted = mongo.db.contact.insert_one(contact_data)
        contact_data["_id"] = str(inserted.inserted_id)
        return contact_data, 201

class Cart:
    required_fields = ["user_id"]

    @staticmethod
    def validate_cart(data):
        missing = [field for field in Cart.required_fields if field not in data]
        if missing:
            return False, f"Missing required fields: {', '.join(missing)}"

        return True, None

    @staticmethod
    def create_cart(data):
        is_valid, error = Cart.validate_cart(data)
        if not is_valid:
            return {"error": error}, 400

        cart_data = {
            "user_id": data["user_id"],
            "cart_items": data.get("cart_items", []),
            "created_date": datetime.datetime.utcnow()
        }

        inserted = mongo.db.cart.insert_one(cart_data)
        cart_data["_id"] = str(inserted.inserted_id)
        return cart_data, 201

    @staticmethod
    def add_to_cart(user_id, data):
        # Validate single item
        for field in ["product_id", "qty", "tax"]:
            if field not in data:
                return {"error": f"{field} is required"}, 400

        existing_cart = mongo.db.cart.find_one({"user_id": user_id})
        if existing_cart:
            # Check if product already in cart
            for item in existing_cart["cart_items"]:
                if item["product_id"] == data["product_id"]:
                    return {"message": "Product alrady exist in cart"}, 400

            existing_cart["cart_items"].append(data)

            mongo.db.cart.update_one(
                {"user_id": user_id},
                {
                    "$set": {
                        "cart_items": existing_cart["cart_items"]
                    }
                }
            )
            return {"message": "Product added in cart"}, 200
        else:
            return {"message": "Cart is not found"}, 400

    @staticmethod
    def update_cart(user_id, data):
        # Validate single item
        for field in ["product_id", "qty", "tax"]:
            if field not in data:
                return {"error": f"{field} is required"}, 400

        existing_cart = mongo.db.cart.find_one({"user_id": user_id})
        if existing_cart:
            for item in existing_cart["cart_items"]:
                if item["product_id"] == data["product_id"]:
                    item["qty"] = data["qty"]
                    item["tax"] = data["tax"]
                    break

            mongo.db.cart.update_one(
                {"user_id": user_id},
                {
                    "$set": {
                        "cart_items": existing_cart["cart_items"]
                    }
                }
            )
            return {"message": "Product updated in cart"}, 200


    @staticmethod
    def remove_from_cart(user_id, product_id):
        cart = mongo.db.cart.find_one({"user_id": user_id})
        if not cart:
            return {"error": "Cart not found"}, 404

        updated_cart_items = [item for item in cart["cart_items"] if item["product_id"] != product_id]

        if len(updated_cart_items) == len(cart["cart_items"]):
            return {"error": "Product not found in cart"}, 404

        mongo.db.cart.update_one(
            {"user_id": user_id},
            {"$set": {"cart_items": updated_cart_items}}
        )

        return {"message": "Product removed from cart"}, 200

    @staticmethod
    def empty_cart(user_id):
        try:
            mongo.db.cart.update_one(
                {"user_id": user_id},
                {"$set": {"cart_items": []}}
            )
            return {"message": "Cart Empty"}, 200
        except Exception as e:
            return {"message": e}, 400

