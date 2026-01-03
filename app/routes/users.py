from flask import Blueprint, request, session, jsonify, Response
from ..models import User, db
from hashlib import sha256

users = Blueprint('users', __name__)

@users.post('/register')
def create_new_user() -> Response:
    if request.json is None:
        res = jsonify({"errors": {"client_error": "POST api/users/register requires a request body with a username and password"}})
        res.status_code = 400
        return res
    if len(request.json["username"]) < 1:
        res = jsonify({"errors": {"username": "Username required"}})
        res.status_code = 400
        return res
    if len(request.json["password"]) < 1:
        res = jsonify({"errors": {"password": "Password required"}})
        res.status_code = 400
        return res
    
    existing_user: User | None = db.session.scalars(db.select(User).filter_by(username=request.json["username"])).first()
    if existing_user is not None:
        res = jsonify({"errors": {"username": "Sorry, this username is already taken. Please try again"}})
        res.status_code = 400
        return res

    new_user = User()
    new_user.username = request.json["username"]

    # hash the input password and store as hexidecimal
    hash_object = sha256(request.json["password"].encode('utf-8'))
    new_user.password = hash_object.hexdigest()

    db.session.add(new_user)
    db.session.commit()

    db.session.refresh(new_user)

    session["user_id"] = new_user.id
    session.permanent = True

    response = jsonify({"username": new_user.username})
    response.status_code = 200
    response.set_cookie("validSession", "true", 2678000, samesite='Lax')

    return response

@users.post('/login')
def login_user() -> Response:
    if request.json is None:
        res = jsonify({"errors": {"client_error": "POST api/users/login requires a request body with a username and password"}})
        res.status_code = 400
        return res
    if len(request.json["username"]) < 1:
        res = jsonify({"errors": {"username": "Username required"}})
        res.status_code = 400
        return res
    if len(request.json["password"]) < 1:
        res = jsonify({"errors": {"password": "Password required"}})
        res.status_code = 400
        return res

    user:User | None = db.session.scalars(db.select(User).filter_by(username=request.json["username"])).first()
    if user is None:
        res = jsonify({"errors": {"auth": "Username and password do not match any users. Please try again"}})
        res.status_code = 400
        return res
    
    hash_object = sha256(request.json["password"].encode('utf-8'))
    passwords_match = user.check_password(hash_object.hexdigest())
    
    if not passwords_match:
        res = jsonify({"errors": {"auth": "Username and password do not match any users. Please try again"}})
        res.status_code = 400
        return res

    session["user_id"] = user.id
    session.permanent = True

    response = jsonify({"username": user.username})
    response.status_code = 200
    response.set_cookie("validSession", "true", 2678000, samesite='Lax')

    return response

@users.get('/logout')
def logout_user() -> Response:
    session.clear()

    response = Response()
    response.status_code = 200
    response.set_cookie("validSession", "false")

    return response