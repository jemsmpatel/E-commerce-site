from flask import jsonify
from db import mongo
import datetime
import re
from bson.objectid import ObjectId

class UserModel:

    required_fields = ["full_name", "email", "aadhar", "contact", "password", "father_name", "gender", "dob", "religion", "home_address", "home_country", "home_state", "home_city", "pan_no", "shop_name", "shop_address", "shop_country", "shop_state", "shop_city", "gst_no", "bank_account_holder_name", "bank_name", "bank_account_no", "bank_IFSC_code", "pan_card_copy", "aadhar_card_copy"]

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
        if mongo.db.seller.find_one({"email": data["email"]}):
            return {"error": "Email already exists"}, 400

        # check aadhar number is 12 digit or not
        if not re.fullmatch(r"\d{12}", data["aadhar"]):
            return {"error": "Invalid Aadhar number"}, 400

        # check contact number is 10 digit or not
        if not re.fullmatch(r"[6-9]\d{9}", str(data["contact"])):
            return {"error": "Invalid contact number"}, 400

        # check PAN number is valid or not
        if not re.fullmatch(r"[A-Z]{5}[0-9]{4}[A-Z]", data["pan_no"]):
            return {"error": "Invalid PAN number"}, 400

        # check GST number is valid or not
        if not re.fullmatch(r"\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}", data["gst_no"]):
            return {"error": "Invalid GST number"}, 400

        # check IFSC code is valid or not
        if not re.fullmatch(r"^[A-Z]{4}0[A-Z0-9]{6}$", data["bank_IFSC_code"]):
            return {"error": "Invalid IFSC code"}, 400


        # Set default values for optional booleans
        user_data = {
            "full_name": data["full_name"],
            "email": data["email"],
            "aadhar": data["aadhar"],
            "contact": data["contact"],
            "password": data["password"],  # Already hashed in controller
            "father_name": data["father_name"],
            "gender": data["gender"],
            "dob": data["dob"],
            "religion": data["religion"],
            "home_address": data["home_address"],
            "home_country": data["home_country"],
            "home_state": data["home_state"],
            "home_city": data["home_city"],
            "pan_no": data["pan_no"],
            "shop_name": data["shop_name"],
            "shop_address": data["shop_address"],
            "shop_country": data["shop_country"],
            "shop_state": data["shop_state"],
            "shop_city": data["shop_city"],
            "gst_no": data["gst_no"],
            "bank_account_holder_name": data["bank_account_holder_name"],
            "bank_name": data["bank_name"],
            "bank_account_no": data["bank_account_no"],
            "bank_IFSC_code": data["bank_IFSC_code"],
            "pan_card_copy": data["pan_card_copy"],
            "aadhar_card_copy": data["aadhar_card_copy"],
            "status": data.get("status", None),
            "isAdmin": data.get("isAdmin", False),
            "isStaff": data.get("isStaff", False),
            "isActive": data.get("isActive", True),
            "date_joind": datetime.datetime.utcnow()
        }

        inserted = mongo.db.seller.insert_one(user_data)
        user_data["_id"] = str(inserted.inserted_id)
        return user_data, 201

    @staticmethod
    def get_user_by_email(email):
        return mongo.db.seller.find_one({"email": email})

    @staticmethod
    def get_user_by_id(user_id):
        return mongo.db.seller.find_one({"_id": ObjectId(user_id)})

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

        inserted = mongo.db.seller_contact.insert_one(contact_data)
        contact_data["_id"] = str(inserted.inserted_id)
        return contact_data, 201


