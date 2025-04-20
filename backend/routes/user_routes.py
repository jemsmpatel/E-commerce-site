# routes/user_routes.py
from flask import Blueprint
from controllers import user_controller
from middlewares.auth_middleware import authenticate, authorize_admin, authorize_staff

user_bp = Blueprint('user_bp', __name__, url_prefix="/api/users")

# users
user_bp.route("/", methods=["POST"])(user_controller.create_user) # users.js
user_bp.route("/", methods=["GET"])(authenticate(authorize_staff(user_controller.get_users))) # admin.js
user_bp.route("/<user_id>", methods=["GET"])(authenticate(authorize_staff(user_controller.get_user))) # admin.js
user_bp.route("/<user_id>", methods=["PUT"])(authenticate(authorize_staff(user_controller.update_user))) # admin.js
user_bp.route("/<user_id>", methods=["DELETE"])(authenticate(authorize_staff(user_controller.delete_user))) # admin.js
user_bp.route("/request_otp", methods=["POST"])(user_controller.request_otp) # users.js
user_bp.route("/login", methods=["POST"])(user_controller.login) # users.js
user_bp.route("/logout", methods=["POST"])(user_controller.logout) # users.js
user_bp.route("/profile", methods=["GET"])(authenticate(user_controller.get_current_user_profile)) # users.js
user_bp.route("/profile", methods=["PUT"])(authenticate(user_controller.update_current_user_profile)) # users.js


# contacts
user_bp.route("/contact", methods=["POST"])(authenticate(user_controller.create_contact)) # users.js
user_bp.route("/contact/<contact_id>", methods=["PUT"])(authenticate(user_controller.update_contact)) # users.js
user_bp.route("/contact/<contact_id>", methods=["DELETE"])(authenticate(user_controller.delete_contact)) # users.js
user_bp.route("/contact/<contact_id>", methods=["GET"])(authenticate(user_controller.get_specific_contact)) # users.js
user_bp.route("/contact", methods=["GET"])(authenticate(authorize_staff(user_controller.get_all_contact))) # admin.js
user_bp.route("/contact/user/<user_id>", methods=["GET"])(authenticate(user_controller.get_specific_user_all_contact)) # users.js



# cart
user_bp.route("/cart/<user_id>", methods=["POST"])(authenticate(user_controller.add_to_cart))
user_bp.route("/cart/<user_id>", methods=["PUT"])(authenticate(user_controller.update_cart))
user_bp.route("/cart/<user_id>/<product_id>", methods=["Delete"])(authenticate(user_controller.remove_product_cart))
user_bp.route("/cart/<user_id>", methods=["Delete"])(authenticate(user_controller.empty_cart))
user_bp.route("/cart/<user_id>", methods=["GET"])(authenticate(user_controller.get_cart_user))

