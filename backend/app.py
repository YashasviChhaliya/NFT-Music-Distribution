from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy database (You can replace it with a real database)
users = []

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        # Validate input
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({"message": "All fields are required"}), 400

        # Check if user already exists
        for user in users:
            if user["email"] == email:
                return jsonify({"message": "User already exists"}), 409

        # Save user
        users.append({"name": name, "email": email, "password": password})
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
