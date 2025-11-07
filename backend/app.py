# app.py
from flask import Flask, send_from_directory
from db import mongo
from routes.user_routes import user_bp
from routes.seller_routes import seller_bp
from routes.product_routes import product_bp
from routes.image_routes import image_bp
from flask_cors import CORS
from mail_config import mail
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.environ.get("MONGO_URI")
SECRET_KEY = os.environ.get("SECRET_KEY")


app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_URI

app.config["JWT_SECRET"] = SECRET_KEY

mongo.init_app(app)


frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react_app(path):
    if path != "" and os.path.exists(os.path.join(dist_folder, path)):
        return send_from_directory(dist_folder, path)
    else:
        # Always return index.html for React to handle routes
        return send_from_directory(dist_folder, "index.html")


app.register_blueprint(user_bp)
app.register_blueprint(seller_bp)
app.register_blueprint(product_bp)
app.register_blueprint(image_bp)

CORS(app, supports_credentials=True, origins=['*'])

if __name__ == "__main__":
    app.run()
