from flask import jsonify
from flask.globals import session
from sqlalchemy import Column, String
from settings import Base, session

import base64
from cerberus import Validator
from cerberus.errors import BasicErrorHandler
from ..database import ma

# ログイン用validation
login_schema = {
    'userId': {
        'required': True,
        'type': 'string',
        'maxlength': 20,
        'empty': False,
        'nullable': False
    },
    'password': {
        'required': True,
        'type': 'string',
        'maxlength': 20,
        'empty': False,
        'nullable': False
    }
}

class CustomErrorHandler(BasicErrorHandler):
    """ BasicErrorHandler.message を上書きして日本語化 """
    def __init__(self, tree=None):
        super(CustomErrorHandler, self).__init__(tree)
        # エラー文言を適宜日本語化
        self.messages = {
        0x00: "{0}",
        0x01: "document is missing",
        0x02: "required field",
        0x03: "unknown field",
        0x04: "field '{0}' is required",
        0x05: "depends on these values: {constraint}",
        0x06: "{0} must not be present with '{field}'",
        0x21: "'{0}' is not a document, must be a dict",
        0x22: "必須項目です",
        0x23: "null value not allowed",
        0x24: "must be one of these types: {constraint}",
        0x26: "length of list should be {0}, it is {1}",
        0x27: "min length is {constraint}",
        0x28: "最大{constraint}文字までです",
        0x41: "value does not match regex '{constraint}'",
        0x42: "min value is {constraint}",
        0x43: "max value is {constraint}",
        0x44: "unallowed value {value}",
        0x45: "unallowed values {0}",
        0x46: "unallowed value {value}",
        0x47: "unallowed values {0}",
        0x48: "missing members {0}",
        0x61: "field '{field}' cannot be coerced: {0}",
        0x62: "field '{field}' cannot be renamed: {0}",
        0x63: "field is read-only",
        0x64: "default value for '{field}' cannot be set: {0}",
        0x81: "mapping doesn't validate subschema: {0}",
        0x82: "one or more sequence-items don't validate: {0}",
        0x83: "one or more keys of a mapping  don't validate: {0}",
        0x84: "one or more values in a mapping don't validate: {0}",
        0x85: "one or more sequence-items don't validate: {0}",
        0x91: "one or more definitions validate",
        0x92: "none or more than one rule validate",
        0x93: "no definitions validate",
        0x94: "one or more definitions don't validate",
        }

class UserSchema(ma.Schema):
   class Meta:
       fields = ('username', 'email')

class User(Base):
    __tablename__ = 'users'
    user_id = Column("user_id", String(20), primary_key=True)
    user_name = Column("user_name", String(255), nullable=False)
    password = Column("password", String(20), nullable=False)

#json変換用----------------------------------
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

def login(params):
    login_v = Validator(login_schema, error_handler=CustomErrorHandler())
    if login_v.validate(params):
        # パスワード暗号化
        b64_encode_password = base64.b64encode(params['password'].encode("ascii"))
        result = session.query(User).filter(User.user_id == params['userId']).filter(User.password == b64_encode_password).all()
        userSchema_schema = UserSchema(many=True)

        try:
            if not result:
                return jsonify({'userId':"存在しません", 'password':"存在しません"}), 404
        except Exception as e:
            error_resutl = internal_error(e)
            return error_resutl

        return jsonify({'result': userSchema_schema.dump(result)}), 200

    else:
        return login_v.errors, 500

def internal_error(e):
    
    response = jsonify({ 
                "error": {
                    "type": e, 
                    "message": e
                }
    })

    return response, 500
