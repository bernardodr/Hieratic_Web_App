import os
import sys
from PIL import Image
from collections import defaultdict
import numpy as np

sourcedir = '../server/database/Thesis_Dataset_Whole'

grid_size = 16
fft_size = 16
fft_length = 2 * fft_size * fft_size

# maps id to ratio of width of token and (estimated) height of A1 in the source document
id_to_width = {}

# maps id to ratio of height of token and (estimated) height of A1 in the source document
id_to_height = {}

# maps id to ratio of width and height
id_to_aspect_ratio = {}

# maps id to bilevel grid
id_to_grid = {}

# maps id to FFT values
id_to_fft = {}

# maps Gardiner name to ids
name_to_ids = defaultdict(list)

def ids():
	return list(id_to_width.keys())

# maps id to Gardiner name
def id_to_name(id):
	position = id.index('_0')
	name = id[:position]
	return name

# store image with id, assuming em is the (estimated height of A1)
def store_image(id, image, em):
	name = id_to_name(id)
	name_to_ids[name].append(id)
	width, height = image.size
	id_to_width[id] = width / em
	id_to_height[id] = height / em
	id_to_aspect_ratio[id] = width / height
	id_to_grid[id] = image_to_grid(image, grid_size)
	id_to_fft[id] = image_to_fft(image, fft_size)

def remove_image(id):
	id_to_width.pop(id)
	id_to_height.pop(id)
	id_to_aspect_ratio.pop(id)
	id_to_grid.pop(id)
	id_to_fft.pop(id)

def image_to_grid(image, size):
	resized = image.resize((size, size))
	bilevel = resized.convert('1')
	grid = np.asarray(bilevel)
	return grid
	
def image_to_fft(image, size):
	grid = image_to_grid(image, size)
	fft_complex_values = np.fft.fft2(grid)
	fft_real = fft_complex_values.real.flatten()
	fft_imag = fft_complex_values.imag.flatten()
	fft_array = np.concatenate((fft_real, fft_imag))
	return fft_array

def read_images(em):
	filenames = os.listdir(sourcedir)
	try:
		filenames.remove('.DS_Store')
	except ValueError:
		None
	for filename in filenames:
		image = Image.open(os.path.join(sourcedir, filename))
		(id, _) = os.path.splitext(filename) 
		store_image(id, image, em)

def store_images():
	em = 1
	read_images(em)

store_images()

sys.stdout.flush()
