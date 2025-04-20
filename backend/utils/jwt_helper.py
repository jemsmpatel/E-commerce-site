# utils/jwt_helper.py
import jwt
import datetime
from flask import current_app

def generate_token(response, user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }

    token = jwt.encode(payload, current_app.config["JWT_SECRET"], algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode('utf-8')

    # Set token as HTTPOnly cookie
    response.set_cookie(
        'jwt',
        token,
        httponly=True,
        secure=False,
        samesite='Strict',
        max_age=30 * 24 * 60 * 60  # 30 days in seconds
    )

    return token
