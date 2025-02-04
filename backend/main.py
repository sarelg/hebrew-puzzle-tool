from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Replace these with your actual credentials
API_KEY = 'AIzaSyA7ptzN7WQM6DQPXM_xXlsVgIejjhfPEUc'
CSE_ID = 'c2db3f340c7554fe8'

# Function to perform a Google Custom Search
def google_search(query, api_key=API_KEY, cse_id=CSE_ID, num=10):
    url = 'https://www.googleapis.com/customsearch/v1'
    params = {
        'key': api_key,
        'cx': cse_id,
        'q': query,
        'num': num
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Search failed", "status_code": response.status_code}

# API route to handle search requests
@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    known_pattern = data.get('knownPattern', '')
    num_words = data.get('numWords')

    query = known_pattern.replace('_', '*')
    if num_words:
        query += f" {num_words} מילים"

    results = google_search(query)
    return jsonify(results)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    return response

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Pong!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

