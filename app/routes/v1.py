from flask_restx import Namespace, Resource
from app.utils.request_forwarder import forward_request
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

auth_service_url = os.getenv("AUTH_SERVICE_URL", "http://127.0.0.1:5001")

v1_namespace = Namespace("v1", description="Version 1 Gateway APIs")

@v1_namespace.route('/auth/<path:endpoint>')
class AuthProxy(Resource):
    def post(self, endpoint):
        return forward_request(f"{auth_service_url}/v1/{endpoint}")

    def get(self, endpoint):
        return forward_request(f"{auth_service_url}/v1/{endpoint}")
