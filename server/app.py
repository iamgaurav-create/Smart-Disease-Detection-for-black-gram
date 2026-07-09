import os
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes, allowing your React app to connect

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Mapping of diseases for the response (Fallback for simulation)
DISEASES_SIM = [
    {"disease": "Anthracnose", "status": "diseased"},
    {"disease": "Healthy", "status": "healthy"},
    {"disease": "Leaf Crinckle", "status": "diseased"},
    {"disease": "Powdery Mildew", "status": "diseased"},
    {"disease": "Yellow Mosaic", "status": "diseased"}
]

# Real Model Loading
MODEL_PATH = 'black_gram_model.h5'
LABELS_PATH = 'labels.txt'
model = None
labels = []

if os.path.exists(MODEL_PATH):
    try:
        import tensorflow as tf
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"Successfully loaded real model from {MODEL_PATH}")
        
        if os.path.exists(LABELS_PATH):
            with open(LABELS_PATH, 'r') as f:
                labels = [line.strip() for line in f.readlines()]
            print(f"Loaded labels: {labels}")
    except Exception as e:
        print(f"Failed to load real model: {str(e)}")

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_image(image_bytes):
    """
    Placeholder for actual image preprocessing (resize, normalize, etc.)
    Example for CNN: 
    img = Image.open(io.BytesIO(image_bytes)).resize((224, 224))
    img_array = np.array(img) / 255.0
    return img_array
    """
    img = Image.open(io.BytesIO(image_bytes))
    return img

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Read and process image
            image_bytes = file.read()
            
            if model and labels:
                # REAL PREDICTION
                img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
                img = img.resize((224, 224))
                img_array = np.array(img) / 255.0
                img_array = np.expand_dims(img_array, axis=0)
                
                predictions = model.predict(img_array)
                predicted_class_idx = np.argmax(predictions[0])
                confidence = float(np.max(predictions[0]) * 100)
                
                # Confidence Threshold for Out-of-Distribution Detection
                CONFIDENCE_THRESHOLD = 80.0
                
                if confidence < CONFIDENCE_THRESHOLD:
                    result = {
                        "disease": "Unrecognized Image",
                        "confidence": round(confidence, 1),
                        "status": "unrecognized",
                        "type": "real",
                        "message": "This does not appear to be a high-quality image of a Black Gram leaf."
                    }
                else:
                    raw_disease_name = labels[predicted_class_idx]
                    # Clean up the name (remove numbers like 'Anthracnose 230' -> 'Anthracnose')
                    import re
                    clean_name = re.sub(r'\d+', '', raw_disease_name).strip()
                    
                    status = "healthy" if "healthy" in clean_name.lower() else "diseased"
                    
                    result = {
                        "disease": clean_name,
                        "confidence": round(confidence, 1),
                        "status": status,
                        "type": "real"
                    }
            else:
                # SIMULATED PREDICTION (Fall back if model not trained yet)
                prediction_idx = len(image_bytes) % len(DISEASES_SIM)
                result = DISEASES_SIM[prediction_idx].copy()
                confidence = round(90 + (len(image_bytes) % 100) / 10, 1)
                if confidence > 99.9: confidence = 99.9
                result["confidence"] = confidence
                result["type"] = "simulated"
            
            print(f"--- New Prediction Request ---")
            print(f"File: {file.filename}")
            print(f"Result: {result['disease']} ({confidence}%)")
            
            return jsonify(result), 200
            
        except Exception as e:
            print(f"!!! Error during prediction: {str(e)}")
            return jsonify({"error": f"Server Error: {str(e)}"}), 500
    
    return jsonify({"error": "File type not allowed"}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "Backend is running"}), 200

if __name__ == '__main__':
    print("Starting Black Gram Disease Prediction Backend...")
    print("Listening on http://localhost:5001")
  
    app.run(host='0.0.0.0', port=5001, debug=False)
