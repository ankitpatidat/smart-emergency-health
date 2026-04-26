from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Routes import kar rahe hain
from routes.auth_routes import auth_bp
from routes.medical_routes import medical_bp

load_dotenv()

app = Flask(__name__)
CORS(app) # Frontend allow karne ke liye

# Routes ko register karna
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(medical_bp, url_prefix='/api')

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    print(f"🚀 Professional Flask Server running on http://localhost:{port}")
    app.run(debug=True, port=port)