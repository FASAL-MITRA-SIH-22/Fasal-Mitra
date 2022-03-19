import tensorflow as tf
import numpy as np
import os


class TfModels:
    crops = []## crop names
    classes = {}#Classes of diseases
    models_files = []
    models = {}
    def __init__(self):
        print("hello")
        self.models_files = os.listdir('./models')
        self.crops = [i.replace('.h5','') for i in self.models_files]
        for crop in self.crops:
            self.models[crop] = [tf.keras.models.load_model('./models/{}/{}.h5'.format(crop,crop))]
            self.classes[crop] = open('./models/{}/{}.txt'.format(crop,crop),"r").read().split(',')
    
    def getPrediction(self,image,crop_name):
        img_array = tf.keras.preprocessing.image.img_to_array(image.numpy())
        predictions = self.models[crop_name].predict(img_array)
        predicted_class = self.classes[np.argmax(predictions[0])]
        confidence = round(100 * (np.max(predictions[0])), 2)
        print(predicted_class, confidence)


TfModels()