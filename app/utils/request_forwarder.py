import requests
from flask import request, abort
from requests.exceptions import RequestException, Timeout, JSONDecodeError

def forward_request(url):
    try:
        headers = {key: value for key, value in request.headers if key != 'Host'}
        if "Authorization" in request.headers:
            headers["Authorization"] = request.headers["Authorization"]

        response = requests.request(
            method=request.method,
            url=url,
            headers=headers,
            json=request.get_json(),
            params=request.args,
            # timeout=30  # Add a reasonable timeout
        )

        try:
            return response.json(), response.status_code
        except JSONDecodeError:
            # Handle non-JSON responses
            return {"error": "Invalid JSON response from server"}, 502

    except Timeout:
        return {"error": "Request timed out"}, 504
    except RequestException as e:
        # Handle network errors, connection errors, etc.
        return {"error": f"Service unavailable: {str(e)}"}, 503
