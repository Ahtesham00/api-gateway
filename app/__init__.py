from flask import Flask
from flask_restx import Api
from app.routes.v1 import v1_namespace
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    api = Api(app, title="API Gateway", version="1.0", description="Gateway for Microservices")
    api.add_namespace(v1_namespace, path="/v1")

    return app
