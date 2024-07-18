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
import json

def load_image(photo_name):
    image = cv2.imread(photo_name)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image

from segment_anything import sam_model_registry, SamAutomaticMaskGenerator, SamPredictor

def prepare_environment():
    sys.path.append("..")
    sam_checkpoint = r"C:\Users\Lunis\Documents\PPG\Colorrendering-Platform\python_code\sam_vit_h_4b8939.pth"
    model_type = "vit_h"
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    sam = sam_model_registry[model_type](checkpoint=sam_checkpoint)
    sam.to(device=device)
    return sam

def generate_masks(image, sam):  
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
        color_mask = np.concatenate([[0], [0], [0], [0.35]])
        img[m] = color_mask
    ax.imshow(img)

def show_masks_overlayed(masks, image):
    plt.figure(figsize=(20,20))
    plt.imshow(image)
    show_anns(masks)
    plt.axis('off')
    plt.show()

def ai_segmentation(image): #final function - give the filename
    photo = load_image(image)
    sam = prepare_environment()
    segments = generate_masks(photo, sam)
    #show_masks_overlayed(segments, photo) #optional to view end result    
    return segments

def masks_to_json_compatible(masks):
    json_compatible_masks = []
    for mask in masks:
        json_compatible_mask = {
            'segmentation': mask['segmentation'].tolist(),
            'area': mask['area'],
            'bbox': mask['bbox'],
            'predicted_iou': mask['predicted_iou'],
            'stability_score': mask['stability_score'],
            'crop_box': mask['crop_box']
        }
        json_compatible_masks.append(json_compatible_mask)
    return json_compatible_masks

def save_masks_to_json(masks, filename):
    json_compatible_masks = masks_to_json_compatible(masks)
    with open(filename, 'w') as json_file:
        json.dump(json_compatible_masks, json_file)

# Running the AI segmentation and saving the masks
def main(image_path, output_json):
    masks = ai_segmentation(image_path)
    save_masks_to_json(masks, output_json)

if __name__ == "__main__":
    image_path = sys.argv[1]
    output_json = sys.argv[2]
    main(image_path, output_json)



