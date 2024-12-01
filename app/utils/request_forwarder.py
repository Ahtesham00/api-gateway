import requests
from flask import request

def forward_request(url):
    headers = {key: value for key, value in request.headers if key != 'Host'}
    if "Authorization" in request.headers:
        headers["Authorization"] = request.headers["Authorization"]

    response = requests.request(
        method=request.method,
        url=url,
        headers=headers,
        json=request.get_json(),
        params=request.args
    )

    return response.json(), response.status_code
