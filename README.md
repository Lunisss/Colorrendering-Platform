# Colorrendering-Platform
This is a web application, that allows users to upload photos of rooms/houses and see how would they look like with different types of paints from the PPG company.

## Technology
The Web application is build using MEAN stack and a python based AI used for automatic segmentation of the picture into different planes e.g. floor, walld and ceiling for a room.

## Starting up the website
open terminal in the root directory
```
node i
pip install -r /python_code/requirements.txt
node server.js
```
you will also need to download the AI model from this link: 
> https://huggingface.co/spaces/abhishek/StableSAM/blob/main/sam_vit_h_4b8939.pth
and put it in the python_code directory
