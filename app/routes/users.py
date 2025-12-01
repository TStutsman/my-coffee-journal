from flask import Blueprint, request
from ..models import User, db
from ..utils import format_request
from hashlib import sha256

users = Blueprint('users', __name__)

@users.post('/register')
def create_new_user():
    data = format_request(request.json)

    new_user = User()
    new_user.username = data["username"]

    # hash the input password and store as hexidecimal
    hash_object = sha256(data["password"].encode('utf-8'))
    new_user.password = hash_object.hexdigest()

    db.session.add(new_user)
    db.session.commit()

    db.session.refresh(new_user)

    return new_user.to_dict()

@users.post('/login')
def login_user():
    user = db.session.scalars(db.select(User).filter_by(username=request.json["username"])).first()

    return user.to_dict() if user else {}