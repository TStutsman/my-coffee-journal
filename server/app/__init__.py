from flask import Flask, redirect
from app.config import Config
from app.models import db

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

@app.route('/')
def index():
    return redirect('/api')

@app.route('/api')
def api_main():
    return "<h1>My Coffee Journal API</h1>"