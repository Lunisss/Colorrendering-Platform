from PIL import Image, ImageFilter


def auto_sharpen(image):
    width, height = image.size
    radius = min(width, height) // 100
    percent = 150
    threshold = 3
    return image.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=threshold))
if __name__ == "__main__":
    image_path = "path_to_your_image.jpg"
    image = Image.open(image_path)
    sharpened_image = auto_sharpen(image)
    sharpened_image.save("sharpened_image.jpg")
    sharpened_image.show()
