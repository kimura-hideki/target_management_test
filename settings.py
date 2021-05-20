from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base

FLASK_ENV = "development"
ENV = "development"
PORT = "3000"
DEBUG = True
SECRET_KEY = 'secret key!!!!'

# mysqlのDBの設定
DATABASE = 'mysql+pymysql://%s:%s@%s/%s?charset=utf8' % (
    "root",
    "",
    "localhost",
    "target_management",
)

ENGINE = create_engine(
    DATABASE,
    encoding = "utf-8",
    echo=False # Trueだと実行のたびにSQLが出力される
)

# Sessionの作成
session = scoped_session(
  # ORM実行時の設定。自動コミットするか、自動反映するなど。
  sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = ENGINE
  )
)

# modelで使用する
Base = declarative_base()
Base.query = session.query_property()