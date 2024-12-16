import requests
from flask import request, abort, Response
from requests.exceptions import RequestException, Timeout, JSONDecodeError

def forward_request(url):
    try:
        # Copy headers excluding Host
        headers = {key: value for key, value in request.headers if key != 'Host'}
        if "Authorization" in request.headers:
            headers["Authorization"] = request.headers["Authorization"]

        # Remove Content-Length and Content-Type from headers for file uploads
        if request.files:
            headers.pop('Content-Length', None)
            headers.pop('Content-Type', None)

        # Handle different request types
        if request.method in ['POST', 'PUT']:
            if request.files:
                # Handle multipart/form-data with files
                files = {}
                for key, file_list in request.files.lists():
                    if len(file_list) == 1:
                        files[key] = (file_list[0].filename, file_list[0].stream, 
                                    file_list[0].content_type)
                    else:
                        files[key] = [(f.filename, f.stream, f.content_type) 
                                    for f in file_list]

                # Forward both files and form data
                response = requests.request(
                    method=request.method,
                    url=url,
                    headers=headers,
                    files=files,
                    data=request.form,  # Include form data
                    params=request.args
                )
            elif request.is_json:
                # Handle JSON data
                response = requests.request(
                    method=request.method,
                    url=url,
                    headers=headers,
                    json=request.get_json(),
                    params=request.args
                )
            else:
                # Handle form data without files
                response = requests.request(
                    method=request.method,
                    url=url,
                    headers=headers,
                    data=request.form,
                    params=request.args
                )
        else:
            # Handle GET, DELETE, etc.
            response = requests.request(
                method=request.method,
                url=url,
                headers=headers,
                params=request.args
            )

        # Handle response
        if 'Content-Disposition' in response.headers and 'attachment' in response.headers['Content-Disposition']:
            # If the response is a file, send it back to the frontend
            return Response(
                response.iter_content(chunk_size=8192),
                headers={key: value for key, value in response.headers.items()},
                status=response.status_code
            )

        try:
            return response.json(), response.status_code
        except JSONDecodeError:
            # If response is not JSON, return raw content
            if response.content:
                return response.content, response.status_code
            return {"message": "No content"}, response.status_code

    except Timeout:
        return {"error": "Request timed out"}, 504
    except RequestException as e:
        return {"error": f"Service unavailable: {str(e)}"}, 503
    except Exception as e:
        return {"error": f"Internal server error: {str(e)}"}, 500