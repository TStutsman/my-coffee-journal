from flask import Flask, redirect
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config
from app.models import db
from .routes import api

app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app, resources={r"*": {"origins": "http://localhost:5173"}})

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(api, url_prefix='/api')

@app.route('/')
def index():
    return redirect('/api')