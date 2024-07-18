import sys
import numpy as np
import json
from PIL import Image
import os
import shutil

def load_masks_from_json(filename):
    with open(filename, 'r') as json_file:
        masks = json.load(json_file)
    return masks

def create_mask_images(masks, output_dir):
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
        os.makedirs(output_dir)
    else:
        os.makedirs(output_dir)
        
    for i, mask in enumerate(masks):
        segmentation = np.array(mask['segmentation'])
        height, width = segmentation.shape
        # Create an empty RGBA image
        img = np.zeros((height, width, 4), dtype=np.uint8)
        # Set black where segmentation is True
        img[segmentation] = [0, 0, 0, 255]
        # Set transparent where segmentation is False
        img[~segmentation] = [0, 0, 0, 0]
        # Convert to PIL image and save
        img = Image.fromarray(img, 'RGBA')
        img.save(f"{output_dir}/mask_{i}.png")

def main(input_json, output_dir):
    masks = load_masks_from_json(input_json)
    create_mask_images(masks, output_dir)

if __name__ == "__main__":
    input_json = sys.argv[1]
    output_dir = sys.argv[2]
    main(input_json, output_dir)
