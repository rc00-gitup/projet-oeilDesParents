from flask import Flask
from flask_cors import CORS
from data_route import data_bp
from status_route import status_bp

app = Flask(__name__)
CORS(app)

# route test
@app.route("/")
def home():
    return "Backend is running"

# connecter les routes
app.register_blueprint(data_bp)
 
app.register_blueprint(status_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)