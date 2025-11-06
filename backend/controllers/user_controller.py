# controllers/user_controller.py
from flask import request, jsonify, make_response, g
from db import mongo
from bson.objectid import ObjectId
from utils.jwt_helper import generate_token
from models.user_model import UserModel, Contact, Cart
import hashlib
import datetime
from mail_config import mail
from flask_mail import Message
import random
import time


# In-memory OTP store
otp_store = {}


def request_otp():
    data = request.json
    email = data.get('email')  # Get email from request data

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Simulate fetching user from DB
    # You can replace this with actual MongoDB or other DB query
    user = {"email": email}  # Replace this line with actual DB query if needed

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Generate a 6-digit OTP
    otp = str(random.randint(100000, 999999))

    # Save OTP with email and timestamp (In-memory, could be Redis or DB in real app)
    otp_store[email] = {"otp": otp, "timestamp": time.time()}

    # Create the email message
    msg = Message("Your OTP Code", sender="jemsmpatel1310@gmail.com", recipients=[email])
    msg.body = f"Your OTP is: {otp}"

    try:
        # Send the OTP email
        mail.send(msg)
        return jsonify({"message": "OTP sent to your email"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to send OTP: {str(e)}"}), 500

def create_user():
    data = request.json
    result, status = UserModel.create_user(data)
    return jsonify(result), status

def get_users():
    users = list(mongo.db.users.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return jsonify(users)

def get_user(user_id):
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404
    user['_id'] = str(user['_id'])
    return jsonify(user)

def update_user(user_id):
    data = request.json

    result = mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User updated"})

def delete_user(user_id):
    result = mongo.db.users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    result = mongo.db.cart.delete_one({"user_id": user_id})
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted"})

def login():
    data = request.json
    if 'email' not in data or 'otp' not in data:
        return jsonify({"error": "Email and OTP required"}), 400

    email = data['email']
    otp = data['otp']

    user = mongo.db.users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    otp_data = otp_store.get(email)
    if not otp_data:
        return jsonify({"error": "OTP not requested"}), 400

    if time.time() - otp_data["timestamp"] > 300:
        return jsonify({"error": "OTP expired"}), 400

    if otp != otp_data["otp"]:
        return jsonify({"error": "Invalid OTP"}), 400

    # OTP valid, login success
    response = make_response(jsonify({
        "id": str(user["_id"]),
        "full_name": user.get("full_name"),
        "contact": user.get("contact"),
        "email": user["email"],
        "isStaff": user["isStaff"],
        "isAdmin": user["isAdmin"]
    }))
    generate_token(response, str(user["_id"]))

    # Clear OTP
    otp_store.pop(email, None)

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
        response = make_response(jsonify({
        "id": str(user["_id"]),
        "full_name": user.get("full_name"),
        "contact": user.get("contact"),
        "email": user["email"]
    }))
        return response
    else:
        return jsonify({"error": "User not found"}), 404

def update_current_user_profile():
    user = UserModel.get_user_by_id(g.user["_id"])

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json

    # Update in DB
    result = mongo.db.users.update_one(
        {"_id": user["_id"]},
        {"$set": data}
    )

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    user = mongo.db.users.find_one({"_id": user["_id"]})

    return jsonify({
        "id": str(user["_id"]),
        "full_name": user.get("full_name"),
        "contact": user.get("contact"),
        "email": user["email"],
        "isStaff": user["isStaff"],
        "isAdmin": user["isAdmin"]
    })

def create_contact():
    data = request.json
    result, status = Contact.create_contact(data)
    return jsonify(result), status

def update_contact(contact_id):
    data = request.json
    result = mongo.db.contact.update_one({"_id": ObjectId(contact_id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Contact not found"}), 404
    return jsonify({"message": "Contact updated"})

def delete_contact(contact_id):
    print("heare i am ther")
    result = mongo.db.contact.delete_one({"_id": ObjectId(contact_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Contact not found"}), 404
    return jsonify({"message": "Contact deleted"})

def get_all_contact():
    contacts = list(mongo.db.contact.find())
    for contact in contacts:
        contact['_id'] = str(contact['_id'])
    return jsonify(contacts)

def get_specific_contact(contact_id):
    contact = mongo.db.contact.find_one({"_id": ObjectId(contact_id)})
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    contact['_id'] = str(contact['_id'])
    return jsonify(contact)

def get_specific_user_all_contact(user_id):
    contacts = list(mongo.db.contact.find({"user_id": user_id}))
    if not contacts:
        return jsonify({"error": "Contact not found"}), 404
    for contact in contacts:
        contact['_id'] = str(contact['_id'])
    return jsonify(contacts)

def add_to_cart(user_id):
    data = request.json
    result, status = Cart.add_to_cart(user_id, data)
    return jsonify(result), status

def remove_product_cart(user_id, product_id):
    result, status = Cart.remove_from_cart(user_id, product_id)
    return jsonify(result), status

def empty_cart(user_id):
    result, status = Cart.empty_cart(user_id)
    return jsonify(result), status

def get_cart_user(user_id):
    cart = mongo.db.cart.find_one({"user_id": user_id})
    if not cart:
        return jsonify({"error": "cart not found"}), 404
    cart['_id'] = str(cart['_id'])
    return jsonify(cart)

def update_cart(user_id):
    data = request.json
    result, status = Cart.update_cart(user_id, data)
    return jsonify(result), status


