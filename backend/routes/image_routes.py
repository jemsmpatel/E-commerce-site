from flask import Blueprint, request, jsonify
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os

load_dotenv()

CLOUD_NAME = os.environ.get("CLOUD_NAME")
API_KEY = os.environ.get("API_KEY")
API_SECRET = os.environ.get("API_SECRET")


# Cloudinary config
cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET
)

image_bp = Blueprint('image_routes', __name__)

# Allowed extensions
ALLOWED_EXTENSIONS = {'jpeg', 'jpg', 'png', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@image_bp.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            result = cloudinary.uploader.upload(file, folder="flask_back_ecommerce_api/")
            return jsonify({
                'url': result['secure_url'],
                'public_id': result['public_id']
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid file type'}), 400
