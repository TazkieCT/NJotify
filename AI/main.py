from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
import numpy as np
import pickle
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'model', 'final_model.h5')
tokenizer_path = os.path.join(script_dir, 'model', 'tokenizer.pickle')
label_encoder_path = os.path.join(script_dir, 'model', 'label_encoder.pickle')

find_model = tf.keras.models.load_model(model_path)

with open(tokenizer_path, 'rb') as handle:
    tokenizer = pickle.load(handle)

with open(label_encoder_path, 'rb') as handle:
    label_encoder = pickle.load(handle)

def predict_artist(lyrics):
    sequence = tokenizer.texts_to_sequences([lyrics])
    padded_sequence = pad_sequences(sequence, maxlen=500)
    prediction = find_model.predict(padded_sequence)
    artist_index = np.argmax(prediction)
    artist = label_encoder.inverse_transform([artist_index])
    return artist[0]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if 'lyrics' not in data:
        return jsonify({'error': 'No lyrics provided'}), 400

    lyrics = data['lyrics']
    predicted_artist = predict_artist(lyrics)
    return jsonify({'predicted_artist': predicted_artist})

if __name__ == '__main__':
    app.run(debug=True)
