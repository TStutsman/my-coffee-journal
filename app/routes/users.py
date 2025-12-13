from flask import Blueprint, request, session, jsonify
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

    session["userId"] = new_user.id
    session.permanent = True

    response = jsonify({"username": new_user.username})
    response.status_code = 200
    response.set_cookie("validSession", "true", 2678000, samesite='Lax')

    return response

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
    
    if not passwords_match:
        return {"errors": {"auth": "Username and password do not match any users. Please try again"}}, 400

    session["userId"] = user.id
    session.permanent = True

    response = jsonify({"username": user.username})
    response.status_code = 200
    response.set_cookie("validSession", "true", 2678000, samesite='Lax')

    return response