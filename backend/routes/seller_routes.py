from flask import Blueprint
from controllers import seller_controller
from middlewares.auth_middleware import authorize_admin, authorize_staff, seller_authenticate

seller_bp = Blueprint('seller_bp', __name__, url_prefix="/api/sellers")


seller_bp.route("/", methods=["POST"])(seller_controller.create_user)
seller_bp.route("/", methods=["GET"])(seller_authenticate(authorize_staff(seller_controller.get_users)))
seller_bp.route("/<user_id>", methods=["GET"])(seller_authenticate(seller_controller.get_user))
seller_bp.route("/<user_id>", methods=["PUT"])(seller_authenticate(seller_controller.update_user))
seller_bp.route("/<user_id>", methods=["DELETE"])(seller_authenticate(authorize_staff(seller_controller.delete_user)))
seller_bp.route("/login", methods=["POST"])(seller_controller.login)
seller_bp.route("/logout", methods=["POST"])(seller_controller.logout)
seller_bp.route("/profile", methods=["GET"])(seller_authenticate(seller_controller.get_current_user_profile))
seller_bp.route("/profile", methods=["PUT"])(seller_authenticate(seller_controller.update_current_user_profile))




# contacts
seller_bp.route("/contact", methods=["POST"])(seller_authenticate(seller_controller.create_contact))
seller_bp.route("/contact/<contact_id>", methods=["PUT"])(seller_authenticate(seller_controller.update_contact))
seller_bp.route("/contact/<contact_id>", methods=["DELETE"])(seller_authenticate(seller_controller.delete_contact))
seller_bp.route("/contact/<contact_id>", methods=["GET"])(seller_authenticate(seller_controller.get_specific_contact))
seller_bp.route("/contact", methods=["GET"])(seller_authenticate(seller_controller.get_all_contact))
seller_bp.route("/contact/user/<user_id>", methods=["GET"])(seller_authenticate(seller_controller.get_specific_user_all_contact))
