import os
import torch
import dill as dill
from torchvision import models
import torchvision.transforms as transforms   # for transforming images into tensors 
from torchvision.datasets import ImageFolder  # for working with classes and images
import torch.nn.functional as F # for functions for calculating loss
import torch.nn as nn           # for creating  neural networks
import numpy as np 
from PIL import Image

# for calculating the accuracy
def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


class ImageClassificationBase(nn.Module):
    
    def training_step(self, batch):
        images, labels = batch
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels) # Calculate loss
        return loss
    
    def validation_step(self, batch):
        images, labels = batch
        out = self(images)                   # Generate prediction
        loss = F.cross_entropy(out, labels)  # Calculate loss
        acc = accuracy(out, labels)          # Calculate accuracy
        return {"val_loss": loss.detach(), "val_accuracy": acc}
    
    def validation_epoch_end(self, outputs):
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()       # Combine loss  
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        return {"val_loss": epoch_loss, "val_accuracy": epoch_accuracy} # Combine accuracies
    
    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_accuracy']))

def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
             nn.BatchNorm2d(out_channels),
             nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)

class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()
        
        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True) # out_dim : 128 x 64 x 64 
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))
        
        self.conv3 = ConvBlock(128, 256, pool=True) # out_dim : 256 x 16 x 16
        self.conv4 = ConvBlock(256, 512, pool=True) # out_dim : 512 x 4 x 44
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))
        
        self.classifier = nn.Sequential(nn.MaxPool2d(4),
                                       nn.Flatten(),
                                       nn.Linear(512, num_diseases))
        
    def forward(self, xb): # xb is the loaded batch
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out        

class ResNet:
    model = ResNet9(3,38)
    classes = []
    def __init__(self):
        PATH = f'{os. getcwd()}/app/ResNet/plant-disease-model.pth'
        self.model.load_state_dict(torch.load(PATH,map_location=torch.device('cpu')))
        self.model.eval()
        self.model.double()
        self.classes = open(f"{os. getcwd()}/app/classes.txt","r").read().split(',')

    def to_device(self,data, device):
        """Move tensor(s) to chosen device"""
        if isinstance(data, (list,tuple)):
            return [to_device(x, device) for x in data]
        return data.to(device, non_blocking=True)
    
    def predict_image_from_path(self):
        test_dir = f"{os. getcwd()}/test"
        test = ImageFolder(test_dir, transform=transforms.ToTensor())
        # Retrieve the class label
        for i in range(25):
            img, label = test[i]
            """Converts image to array and return the predicted class
                with highest probability"""
            # Convert to a batch of 1
            xb = self.to_device(img.unsqueeze(0),"cpu")
            # Get predictions from model
            yb = self.model(xb)
            # Pick index with highest probability
            _, preds  = torch.max(yb, dim=1)
        return self.classes[preds[0].item()]

    def predict_image(self,image):
        print(image)
        image = np.double(
            Image.open(image).convert("RGB").resize((256, 256)) # image resizing,
        )
        image = image/255.0

        img = transforms.ToTensor()(image).double()
        xb = self.to_device(img.unsqueeze(0),"cpu")
        # Get predictions from model
        yb = self.model(xb)
        # Pick index with highest probability
        _, preds  = torch.max(yb, dim=1)

        return self.classes[preds[0].item()]