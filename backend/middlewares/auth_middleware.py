from functools import wraps
from flask import request, jsonify, g, current_app
import jwt
from models import user_model
from models import seller_model

def authenticate(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('jwt')

        if not token:
            return jsonify({"error": "Not authorized, no token"}), 401

        try:
            decoded = jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=["HS256"])
            user = user_model.UserModel.get_user_by_id(decoded["user_id"])

            if not user:
                user = seller_model.UserModel.get_user_by_id(decoded["user_id"])
                if not user:
                    return jsonify({"error": "Not authorized, user not found"}), 401

            user["_id"] = str(user["_id"])  # For frontend or clean usage
            user.pop("password", None)      # Remove password before attaching
            g.user = user                   # Store user globally in `g`
            return f(*args, **kwargs)

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

    return decorated_function

def seller_authenticate(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('jwt')

        if not token:
            return jsonify({"error": "Not authorized, no token"}), 401

        try:
            decoded = jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=["HS256"])
            user = seller_model.UserModel.get_user_by_id(decoded["user_id"])

            if not user:
                user = user_model.UserModel.get_user_by_id(decoded["user_id"])
                if not user:
                    return jsonify({"error": "Not authorized, user not found"}), 401

            user["_id"] = str(user["_id"])  # For frontend or clean usage
            user.pop("password", None)      # Remove password before attaching
            g.user = user                   # Store user globally in `g`
            return f(*args, **kwargs)

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

    return decorated_function

def authorize_staff(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user and g.user.get("isStaff"):
            return f(*args, **kwargs)
        else:
            return jsonify({"error": "Not authorized as staff"}), 401
    return decorated_function

def authorize_admin(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user and g.user.get("isAdmin"):
            return f(*args, **kwargs)
        else:
            return jsonify({"error": "Not authorized as an admin"}), 401
    return decorated_function
