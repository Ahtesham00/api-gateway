from flask_restx import Namespace, Resource
from app.utils.request_forwarder import forward_request
from dotenv import load_dotenv
import os
from flask import current_app

# Load environment variables from .env
load_dotenv()

auth_service_url = os.getenv("AUTH_SERVICE_URL", "http://127.0.0.1:5001")

v1_namespace = Namespace("v1", description="Version 1 Gateway APIs")

@v1_namespace.route('/auth/<path:endpoint>')
class AuthProxy(Resource):
    def post(self, endpoint):
        try:
            return forward_request(f"{auth_service_url}/v1/{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def get(self, endpoint):
        try:
            return forward_request(f"{auth_service_url}/v1/{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding GET request: {str(e)}")
            return {"error": "Internal gateway error"}, 500
