from flask_restx import Namespace, Resource
from app.utils.request_forwarder import forward_request
from dotenv import load_dotenv
import os
from flask import current_app

# Load environment variables from .env
load_dotenv()

AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://127.0.0.1:5001")
PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://127.0.0.1:5006")
ORGANIZATION_SERVICE_URL = os.getenv("ORGANIZATION_SERVICE_URL", "http://127.0.0.1:5005")
CHATBOT_DATA_SERVICE_URL = os.getenv("CHATBOT_DATA_SERVICE_URL", "http://127.0.0.1:5003")

v1_namespace = Namespace("v1", description="Version 1 Gateway APIs")

@v1_namespace.route('/auth/<path:endpoint>')
class AuthProxy(Resource):
    def post(self, endpoint):
        try:
            return forward_request(f"{AUTH_SERVICE_URL}/v1/{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def get(self, endpoint):
        try:
            return forward_request(f"{AUTH_SERVICE_URL}/v1/{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding GET request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/products', '/products/<path:product_id>')
class ProductProxy(Resource):
    def get(self, product_id=None):
        try:
            endpoint = f"/v1/products/{product_id}" if product_id else "/v1/products"
            return forward_request(f"{PRODUCT_SERVICE_URL}{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding GET request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def post(self):
        try:
            return forward_request(f"{PRODUCT_SERVICE_URL}/v1/products")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def put(self, product_id):
        try:
            return forward_request(f"{PRODUCT_SERVICE_URL}/v1/products/{product_id}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding PUT request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def delete(self, product_id):
        try:
            return forward_request(f"{PRODUCT_SERVICE_URL}/v1/products/{product_id}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding DELETE request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/organizations', '/organizations/<path:org_path>')
class OrganizationProxy(Resource):
    def get(self, org_path=None):
        try:
            endpoint = f"/v1/organizations/{org_path}" if org_path else "/v1/organizations"
            return forward_request(f"{ORGANIZATION_SERVICE_URL}{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding GET request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def post(self, org_path=None):
        try:
            endpoint = f"/v1/organizations/{org_path}" if org_path else "/v1/organizations"
            return forward_request(f"{ORGANIZATION_SERVICE_URL}{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def put(self, org_path):
        try:
            return forward_request(f"{ORGANIZATION_SERVICE_URL}/v1/organizations/{org_path}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding PUT request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def delete(self, org_path):
        try:
            return forward_request(f"{ORGANIZATION_SERVICE_URL}/v1/organizations/{org_path}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding DELETE request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/knowledge_base', '/knowledge_base/<path:kb_path>')
class KnowledgeBaseProxy(Resource):
    def get(self, kb_path=None):
        try:
            endpoint = f"/v1/knowledge_base/{kb_path}" if kb_path else "/v1/knowledge_base"
            return forward_request(f"{CHATBOT_DATA_SERVICE_URL}{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding GET request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

    def post(self, kb_path=None):
        try:
            endpoint = f"/v1/knowledge_base/{kb_path}" if kb_path else "/v1/knowledge_base"
            return forward_request(f"{CHATBOT_DATA_SERVICE_URL}{endpoint}")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/delete_knowledge_base')
class DeleteKnowledgeBase(Resource):
    def post(self):
        try:
            return forward_request(f"{CHATBOT_DATA_SERVICE_URL}/v1/delete_knowledge_base")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/delete_folder')
class DeleteFolder(Resource):
    def post(self):
        try:
            return forward_request(f"{CHATBOT_DATA_SERVICE_URL}/v1/delete_folder")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/delete_file')
class DeleteFile(Resource):
    def post(self):
        try:
            return forward_request(f"{CHATBOT_DATA_SERVICE_URL}/v1/delete_file")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/download_file')
class DownloadFile(Resource):
    def post(self):
        try:
            return forward_request(f"{CHATBOT_DATA_SERVICE_URL}/v1/download_file")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500

@v1_namespace.route('/upload_area_file')
class UploadFile(Resource):
    def post(self):
        try:
            return forward_request(f"{CHATBOT_DATA_SERVICE_URL}/v1/upload_area_file")
        except Exception as e:
            current_app.logger.error(f"Error forwarding POST request: {str(e)}")
            return {"error": "Internal gateway error"}, 500