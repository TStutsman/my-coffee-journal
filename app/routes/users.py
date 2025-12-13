from flask import Blueprint, request
from ..models import User, db
from hashlib import sha256

users = Blueprint('users', __name__)

@users.post('/register')
def create_new_user():
    if request.json is None:
        return {"errors": {"client_error": "POST /register requires a request body with a username and password"}}, 400
    if len(request.json["username"]) < 1:
        return {"errors": {"username": "Username required"}}, 400
    if len(request.json["password"]) < 1:
        return {"errors": {"password": "Password required"}}, 400
    
    existing_user: User | None = db.session.scalars(db.select(User).filter_by(username=request.json["username"])).first()
    if existing_user is not None:
        return {"errors": {"username": "Sorry, this username is already taken. Please try again"}}, 400

    new_user = User()
    new_user.username = request.json["username"]

    # hash the input password and store as hexidecimal
    hash_object = sha256(request.json["password"].encode('utf-8'))
    new_user.password = hash_object.hexdigest()

    db.session.add(new_user)
    db.session.commit()

    db.session.refresh(new_user)

    return new_user.to_dict(), 200

@users.post('/login')
def login_user():
    if request.json is None:
        return {"errors": {"client_error": "POST /login requires a request body with a username and password"}}, 400
    if len(request.json["username"]) < 1:
        return {"errors": {"username": "Username required"}}, 400
    if len(request.json["password"]) < 1:
        return {"errors": {"password": "Password required"}}, 400

    user:User | None = db.session.scalars(db.select(User).filter_by(username=request.json["username"])).first()
    if user is None:
        return {"errors": {"auth": "Username and password do not match any users. Please try again"}}, 400
    
    hash_object = sha256(request.json["password"].encode('utf-8'))
    passwords_match = user.check_password(hash_object.hexdigest())
    
    if passwords_match:
        return user.to_dict()

    return {"errors": {"auth": "Username and password do not match any users. Please try again"}}, 400