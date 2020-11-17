import dataUtils

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
    return "Hello"

@app.route("/candidatos", methods=['GET', 'POST'])
@cross_origin()
def getDataCSVByState():
    return dataUtils.getCSVByState(request)

if __name__ == "__main__":
    app.run()