from flask import Flask, request, jsonify
from flask_cors import CORS
from llm import generate_data  # make sure this import matches the new function name

app = Flask(__name__)
CORS(app)

@app.route("/messages", methods=["POST"])
def messages():
    data = request.json
    print("📥 Received messageLog from frontend:")
    print(data)

    message_data = [item for item in data if item.get('type') in ('user_message', 'assistant_message')]
    content_data = [msg["message"]["content"] for msg in message_data]
    combined_string = "\n".join(content_data)

    llm_output = generate_data(data, combined_string)

    return jsonify({"status": "ok", "output": llm_output})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
