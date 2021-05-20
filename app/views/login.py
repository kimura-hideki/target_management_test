""" login view """
from flask import Blueprint, render_template, request
from ..models.users import login

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
login_bp = Blueprint(
    "login_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@login_bp.route("/", methods=["GET"])
def index():
    """ root """
    return render_template("index.html")

@login_bp.route("/api/login", methods=["POST"])
def do_login():
    # {'loginId': '', 'password': ''}
    params = request.get_json()
    return login(params)
