from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config.from_object("settings")

db = SQLAlchemy(app)
ma = Marshmallow(app)

# アプリでDB操作を行えるように初期設定する
def init_db(app):
  db.init_app(app)