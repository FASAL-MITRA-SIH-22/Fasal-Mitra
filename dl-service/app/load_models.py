import tensorflow as tf
import numpy as np
import os
from PIL import Image

class TfModels:
    crops = []## crop names
    classes = {}#Classes of diseases
    models = {}
    def __init__(self):
        current_dir = f"{os. getcwd()}/app"
        self.crops = os.listdir(f"{current_dir}/models")
        for crop in self.crops:
            self.models[crop] = tf.keras.models.load_model(f'{current_dir}/models/{crop}/{crop}.h5')
            self.classes[crop] = open(f"{current_dir}/models/{crop}/{crop}.txt","r").read().split(',')
        print(self.models)
    
    def getPrediction(self,image,crop_name):
        image = np.array(
            Image.open(image).convert("RGB").resize((256, 256)) # image resizing
        )
        image = image/255 
        img_array = tf.expand_dims(image, 0)
        predictions = self.models[crop_name].predict(img_array)
        predicted_class = self.classes[crop_name][np.argmax(predictions[0])]
        confidence = round(100 * (np.max(predictions[0])), 2)
        return predicted_class, confidence