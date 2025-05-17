from flask import request, jsonify, make_response, g
from db import mongo
from bson.objectid import ObjectId
from utils.jwt_helper import generate_token
from models.seller_model import UserModel, Contact
import hashlib
import re
import datetime

def create_user():
    data = request.json
    # check password format is valid or not
    if not re.fullmatch(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$", data["password"]):
        return {"error": "Invalid password format. in password Minimum 8 characters and At least one uppercase letter (A-Z), lowercase letter (a-z), digit (0-9), special character from: @ $ ! % * # ? &"}, 400
    data['password'] = hashlib.sha256(data.get('password').encode()).hexdigest()
    result, status = UserModel.create_user(data)
    return jsonify(result), status
    # return jsonify({"message": "seller user created"})

def get_users():
    users = list(mongo.db.seller.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return jsonify(users)

def get_user(user_id):
    user = mongo.db.seller.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404
    user['_id'] = str(user['_id'])
    return jsonify(user)

def update_user(user_id):
    data = request.json

    if 'password' in data:
        # check password format is valid or not
        if not re.fullmatch(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$", data["password"]):
            return {"error": "Invalid password format. in password Minimum 8 characters and At least one uppercase letter (A-Z), lowercase letter (a-z), digit (0-9), special character from: @ $ ! % * # ? &"}, 400
        data['password'] = hashlib.sha256(data.get('password').encode()).hexdigest()

    result = mongo.db.seller.update_one({"_id": ObjectId(user_id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User updated"})

def delete_user(user_id):
    result = mongo.db.seller.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted"})

def login():
    data = request.json
    if not 'email' in data or not 'password' in data:
        return jsonify({"error": "Email and password required"}), 400

    user = mongo.db.seller.find_one({"email": data.get('email')})

    if not user or not user['password'] == hashlib.sha256(data.get('password').encode()).hexdigest():
        return jsonify({"error": "Invalid email or password"}), 401


    if user["status"] == None :
        return jsonify({"error": "Please login After 2 days Your Acount is not Active"}), 401

    response = make_response(jsonify({
        "id": str(user["_id"]),
        "full_name": user.get("full_name", ""),
        "email": user["email"],
        "isStaff": user["isStaff"],
        "isAdmin": user["isAdmin"]
    }))
    generate_token(response, str(user["_id"]))

    return response

def logout():
    response = make_response(jsonify({"message": "Logged out successfully"}))
    response.set_cookie(
        'jwt',
        '',
        httponly=True,
        expires=datetime.datetime.utcnow()  # Expire immediately
    )
    return response

def get_current_user_profile():
    user = UserModel.get_user_by_id(g.user["_id"])
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

def update_current_user_profile():
    user = UserModel.get_user_by_id(g.user["_id"])

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json

    if "password" in data :
        data["password"] = hashlib.sha256(data.get('password').encode()).hexdigest()

    # Update in DB
    result = mongo.db.seller.update_one(
        {"_id": user["_id"]},
        {"$set": data}
    )

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User updated"})

def create_contact():
    data = request.json
    result, status = Contact.create_contact(data)
    return jsonify(result), status

def update_contact(contact_id):
    data = request.json
    result = mongo.db.seller_contact.update_one({"_id": ObjectId(contact_id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Contact not found"}), 404
    return jsonify({"message": "Contact updated"})

def delete_contact(contact_id):
    result = mongo.db.seller_contact.delete_one({"_id": ObjectId(contact_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Contact not found"}), 404
    return jsonify({"message": "Contact deleted"})

def get_all_contact():
    contacts = list(mongo.db.seller_contact.find())
    for contact in contacts:
        contact['_id'] = str(contact['_id'])
    return jsonify(contacts)

def get_specific_contact(contact_id):
    contact = mongo.db.seller_contact.find_one({"_id": ObjectId(contact_id)})
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    contact['_id'] = str(contact['_id'])
    return jsonify(contact)

def get_specific_user_all_contact(user_id):
    contacts = list(mongo.db.seller_contact.find({"user_id": user_id}))
    if not contacts:
        return jsonify({"error": "Contact not found"}), 404
    for contact in contacts:
        contact['_id'] = str(contact['_id'])
    return jsonify(contacts)




