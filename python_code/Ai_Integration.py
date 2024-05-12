# -*- coding: utf-8 -*-
'''
Main func: ai_segmentation(image) - you give the filename and it returns the mask. 

Mask generation returns a list over masks, where each mask is a dictionary containing various data about the mask. These keys are:
* `segmentation` : the mask
* `area` : the area of the mask in pixels
* `bbox` : the boundary box of the mask in XYWH format
* `predicted_iou` : the model's own prediction for the quality of the mask
* `point_coords` : the sampled input point that generated this mask
* `stability_score` : an additional measure of mask quality
* `crop_box` : the crop of the image used to generate this mask in XYWH format
'''
"""
Original file is located at
    https://colab.research.google.com/drive/1Jt0oIzkeKn0nODaV1QXfZTPizSbTQE0E
"""
# Copyright (c) Meta Platforms, Inc. and affiliates.
"""
# Automatically generating object masks with SAM
This script demonstrates the usage of the **Segment Anything Model** and has been created by Meta Platforms. Please refer to the [official repository](https://github.com/facebookresearch/segment-anything) for more information.
## Environment Set-up
In Colab, be sure to select **GPU** under *Edit* -> *Notebook Settings* -> *Hardware accelerator*.
"""
import sys
#import subprocess #for installing packets
#import urllib.request #for gerring pictures if needed

# Installing packets
'''Notebook code
!{sys.executable} -m pip install opencv-python matplotlib
!{sys.executable} -m pip install 'git+https://github.com/facebookresearch/segment-anything.git'
'''
#subprocess.call([sys.executable, '-m', 'pip', 'install', 'torch==2.2.1', 'torchvision==0.17.1'])
#subprocess.call([sys.executable, '-m', 'pip', 'install', 'opencv-python', 'matplotlib'])
#subprocess.call([sys.executable, '-m', 'pip', 'install', 'segment-anything'])
# Downloading files (optional)
''' Notebook code
!wget https://raw.githubusercontent.com/Colorrendering/images/master/technopolis.png
!wget https://raw.githubusercontent.com/Colorrendering/images/master/ppg.png
Basic code - technopolis picture
urllib.request.urlretrieve('https://raw.githubusercontent.com/Colorrendering/images/master/technopolis.png', 'photo.png')
'''

"""## Set-up"""
import torch 
import torchvision
import numpy as np
import matplotlib.pyplot as plt
import cv2

"""Load image"""
def load_image (photo_name):
    image = cv2.imread(photo_name)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image

'''#showing raw image
plt.figure(figsize=(20,20))
plt.imshow(image)
plt.axis('off')
plt.show()
'''

from segment_anything import sam_model_registry, SamAutomaticMaskGenerator, SamPredictor
def prepare_environment ():
    sys.path.append("..")
    sam_checkpoint = "sam_vit_h_4b8939.pth"
    model_type = "vit_h"
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    sam = sam_model_registry[model_type](checkpoint=sam_checkpoint)
    sam.to(device=device)
    return sam

"""#Automatic mask generation
To run automatic mask generation, provide a SAM model to the `SamAutomaticMaskGenerator` class. Set the path below to the SAM checkpoint. Running on CUDA and with the default model is recommended.
"""
def generate_masks (image,sam):  
    #mask_generator = SamAutomaticMaskGenerator(sam) #- default, but less percise generation
    mask_generator = SamAutomaticMaskGenerator(
        model=sam,
        points_per_side=32,
        pred_iou_thresh=0.86,
        stability_score_thresh=0.92,
        crop_n_layers=1,
        crop_n_points_downscale_factor=2,
        min_mask_region_area=100,  # Requires open-cv to run post-processing
    )
    masks = mask_generator.generate(image)
    return masks

#print(len(masks)) #number of masks
#print(masks[0].keys())

"""Set up annotations and their colors:"""
def show_anns(anns):
    if len(anns) == 0:
        return
    sorted_anns = sorted(anns, key=(lambda x: x['area']), reverse=True)
    ax = plt.gca()
    ax.set_autoscale_on(False)

    img = np.ones((sorted_anns[0]['segmentation'].shape[0], sorted_anns[0]['segmentation'].shape[1], 4))
    img[:,:,3] = 0
    for ann in sorted_anns:
        m = ann['segmentation']
        color_mask = np.concatenate([np.random.random(3), [0.35]])
        img[m] = color_mask
    ax.imshow(img)

"""Show all the masks overlayed on the image."""
def show_masks_overlayed (masks,image):
    plt.figure(figsize=(20,20))
    plt.imshow(image)
    show_anns(masks)
    plt.axis('off')
    plt.show()

def ai_segmentation(image): #final function - give the filename
    photo = load_image(image)
    sam = prepare_environment()
    segments = generate_masks(photo,sam)
    #show_masks_overlayed(segments,photo) #optional to view end result    
    return segments

#ai_segmentation('photo.png')
