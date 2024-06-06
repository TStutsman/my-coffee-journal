from flask import Flask, redirect, request
from flask_wtf.csrf import generate_csrf
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config
from app.models import db
from .routes import api
import os

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

app.config.from_object(Config)
cors = CORS(app, resources={r"*": {"origins": "http://localhost:5173"}})

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(api, url_prefix='/api')

@app.before_request
def change_http_to_https():
    """
    This method upgrades http requests to https. It is called on every incoming request.
    """
    # if we are in production
    if not os.environ.get('FLASK_DEBUG'):
        # and if the request is HTTP type instead of HTTPS
        if request.headers.get('X-Forwarded-Proto') == 'http':
            # replace http with https (one time)
            url = request.url.replace('http://', 'https://', 1)

            # redirect the session to the https url
            return redirect(url, code=301)
        
@app.after_request
def inject_outgoing_csrf(response):
    """
    Middleware to add a generated csrf_token to each outgoing response.
    Additional security flags are set on the cookie for production environment.
    """
    in_production = os.getenv('FLASK_DEBUG') or False
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure = in_production,
        samesite = 'Strict' if in_production else None,
        httponly = True
    )
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_route(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')