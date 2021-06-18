""" item view """
from flask import Blueprint, request
from ..models.items import get_items_data

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
item_bp = Blueprint(
    "item_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@item_bp.route("/api/items/all", methods=["GET"])
def get_items():
    params = {"user_id":""}
    params["user_id"] = request.args.get('userId')
    return get_items_data(params)

@item_bp.route("/api/items/search", methods=["GET"])
def search():
    params = {"item_name":"", "price":""}
    params["item_name"] = request.args.get('item_name')
    params["price"] = request.args.get('price')
    return get_items_data(params)
