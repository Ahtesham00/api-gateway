from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
    AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:5001")
    PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://localhost:5006")
    ORGANIZATION_SERVICE_URL = os.getenv("ORGANIZATION_SERVICE_URL", "http://localhost:5005")
    CHATBOT_DATA_SERVICE_URL = os.getenv("CHATBOT_DATA_SERVICE_URL", "http://localhost:5003")
    CHATBOT_SERVICE_URL = os.getenv("CHATBOT_SERVICE_URL", "http://localhost:5002")

class DevelopmentConfig(Config):
    DEBUG = True
    AUTH_SERVICE_URL = os.getenv('AUTH_SERVICE_URL', 'http://127.0.0.1:5001')
    PRODUCT_SERVICE_URL = os.getenv('PRODUCT_SERVICE_URL', 'http://127.0.0.1:5006')
    ORGANIZATION_SERVICE_URL = os.getenv('ORGANIZATION_SERVICE_URL', 'http://127.0.0.1:5005')
    CHATBOT_DATA_SERVICE_URL = os.getenv('CHATBOT_DATA_SERVICE_URL', 'http://127.0.0.1:5003')
    CHATBOT_SERVICE_URL = os.getenv('CHATBOT_SERVICE_URL', 'http://127.0.0.1:5002')

class TestingConfig(Config):
    TESTING = True
    AUTH_SERVICE_URL = 'http://127.0.0.1:5001'
    PRODUCT_SERVICE_URL = 'http://127.0.0.1:5006'
    ORGANIZATION_SERVICE_URL = 'http://127.0.0.1:5005'
    CHATBOT_DATA_SERVICE_URL = 'http://127.0.0.1:5003'
    CHATBOT_SERVICE_URL = 'http://127.0.0.1:5002'

class ProductionConfig(Config):
    # Production-specific configuration
    pass

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
