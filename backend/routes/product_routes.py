from flask import Blueprint
from controllers import product_controller
from middlewares.auth_middleware import seller_authenticate, authenticate

product_bp = Blueprint('product_bp', __name__, url_prefix="/api/products")

# products
product_bp.route("/", methods=["POST"])(seller_authenticate(product_controller.create_product))
product_bp.route("/", methods=["GET"])(product_controller.get_products)
product_bp.route("/<product_id>", methods=["GET"])(product_controller.get_product)
product_bp.route("/<product_id>", methods=["PUT"])(seller_authenticate(product_controller.update_product))
product_bp.route("/<product_id>", methods=["DELETE"])(seller_authenticate(product_controller.delete_product))
product_bp.route("/seller/<seller_id>", methods=["GET"])(seller_authenticate(product_controller.get_specific_seller_all_products))
product_bp.route("/list", methods=["POST"])(product_controller.get_products_by_ids)
product_bp.route("/search/<search_string>", methods=["GET"])(product_controller.search_products)


# rewiws
product_bp.route("/review", methods=["POST"])(authenticate(product_controller.create_review))
product_bp.route("/review/<product_id>", methods=["GET"])(authenticate(product_controller.get_product_reviews))
product_bp.route("/review/<product_id>/<review_id>", methods=["PUT"])(authenticate(product_controller.update_review))
product_bp.route("/review/<product_id>/<review_id>", methods=["DELETE"])(authenticate(product_controller.delete_review))
product_bp.route("/review/user/<user_id>", methods=["GET"])(authenticate(product_controller.get_reviews_by_user))



# order
product_bp.route("/order", methods=["POST"])(authenticate(product_controller.create_order))
product_bp.route("/order/<order_id>", methods=["PUT"])(authenticate(product_controller.update_order))
product_bp.route("/order/<order_id>", methods=["DELETE"])(authenticate(product_controller.delete_order))
product_bp.route("/order", methods=["GET"])(authenticate(product_controller.get_order))
product_bp.route("/order/<order_id>", methods=["GET"])(authenticate(product_controller.get_specific_order))
product_bp.route("/order/user/<user_id>", methods=["GET"])(authenticate(product_controller.get_user_all_orders))
product_bp.route("/order/seller/<seller_id>", methods=["GET"])(authenticate(product_controller.get_specific_seller_order))
product_bp.route("/order/seller/sold/<seller_id>", methods=["GET"])(authenticate(product_controller.get_specific_seller_sold_order))




