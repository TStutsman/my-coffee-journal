from flask import session
from functools import wraps

def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if session is None or 'user_id' not in session:
            return {"errors": {"client_error": "Invalid session token"}}, 400
        
        return func(*args, **kwargs)
    return wrapper