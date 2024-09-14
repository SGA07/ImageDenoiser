from PIL import Image
import numpy as np
from skimage.util import random_noise
import random
import os

def add_noise():
    noise = [{'mode': 's&p', 'amount': random.uniform(0.02, 0.05)},
         {'mode': 'gaussian', 'var': random.uniform(0.005, 0.015)},
         {'mode': 'poisson'},
         {'mode': 'speckle', 'var': random.uniform(0.005, 0.015)},
         {'mode': 'localvar'}]
    path = './data/final_test/'
    images = os.listdir(path)
    for image in images:
        im = Image.open(f'{path}/{image}')
        im_arr = np.asarray(im)
        noise_im = random_noise(im_arr, **noise[1])
        noise_im = (255*noise_im).astype(np.uint8)
        img = Image.fromarray(noise_im)
        img.save(f'./data/final_test/noisy_{image}')

def resize():
    path = './data/DIV2K_train_HR'
    images = os.listdir(path)
    for i in images[600:700]:
        im = Image.open(f'{path}/{i}')
        width, height = im.size
        im = im.crop(((width//2)-128,(height//2)-128,(width//2)+128,(height//2)+128))
        im.save(f'./data/final_test/{i}')

def calculate_avg_psnr():
    with open("./Model/original25/psnr.txt", "r") as f:
        x = f.readlines()
        sum = 0
        for i in x:
            sum += float(i.split("(")[-1][0:6])
        print(sum)
calculate_avg_psnr()