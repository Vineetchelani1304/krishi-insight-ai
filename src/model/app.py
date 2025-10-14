# # app.py

# from flask import Flask, request, jsonify
# import pickle
# import os
# from flask_cors import CORS  # <- import CORS

# # -------------------------
# # Enable multiple cores
# # -------------------------
# os.environ["OMP_NUM_THREADS"] = str(os.cpu_count())

# # -------------------------
# # Load the model
# # -------------------------
# with open('crop_model.pkl', 'rb') as f:
#     model = pickle.load(f)

# app = Flask(_name_)
# CORS(app)  # <- enable CORS for all routes

# @app.route('/predict', methods=['POST'])
# def predict():
#     """
#     Expects JSON input like:
#     {
#         "N": 90,
#         "P": 42,
#         "K": 43,
#         "temperature": 20.87,
#         "humidity": 82,
#         "ph": 6.5,
#         "rainfall": 202.93
#     }
#     """
#     data = request.json
#     try:
#         features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
#         input_data = [data[feature] for feature in features]
#         prediction = model.predict([input_data])
#         return jsonify({'predicted_crop': prediction[0]})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400

# if _name_ == '_main_':
#     print("Starting Flask API on port 5000...")
#     app.run(host='0.0.0.0', port=5000, debug=True)
# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import torch
from torchvision import transforms
from PIL import Image

# -------------------------
# Enable multiple cores
# -------------------------
os.environ["OMP_NUM_THREADS"] = str(os.cpu_count())

# -------------------------
# Load Crop Prediction model
# -------------------------
with open('crop_model.pkl', 'rb') as f:
    crop_model = pickle.load(f)

# -------------------------
# Load Plant Disease model
# -------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
checkpoint = torch.load("plant_disease_cnn.pth", map_location=device)
plant_classes = checkpoint['classes']

# Define the exact same architecture for loading
from plant import PlantCNN
plant_model = PlantCNN(num_classes=len(plant_classes)).to(device)
plant_model.load_state_dict(checkpoint['model_state_dict'])
plant_model.eval()

plant_transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

# -------------------------
# Flask app
# -------------------------
app = Flask(_name_)
CORS(app)

# Crop prediction API
@app.route('/predict/crop', methods=['POST'])
def predict_crop():
    data = request.json
    try:
        features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        input_data = [data[feature] for feature in features]
        prediction = crop_model.predict([input_data])
        return jsonify({'predicted_crop': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Plant disease prediction API
@app.route('/predict/plant', methods=['POST'])
def predict_plant():
    data = request.json
    try:
        img_path = data["image_path"]
        img = Image.open(img_path).convert("RGB")
        img_t = plant_transform(img).unsqueeze(0).to(device)
        with torch.no_grad():
            output = plant_model(img_t)
            _, pred = torch.max(output, 1)
        return jsonify({'predicted_class': plant_classes[pred.item()]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if _name_ == "_main_":
    print("Starting Flask API on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)