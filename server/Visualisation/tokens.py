import os
import random
import pickle
import cv2
import math
from PIL import Image
from collections import defaultdict
import numpy as np
import matplotlib.pyplot as plt

from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from pylab import imshow, show

sourcedir = '../server/database/Thesis_Dataset_Whole/'

grid_size = 16
fft_size = 16
fft_length = 2 * fft_size * fft_size
pca_size = 40

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

# maps id to PCA values
id_to_pca = {}

# maps Gardiner name to ids
name_to_ids = defaultdict(list)

# maps Gardiner name to representatives
name_to_reprs = None

#with open('representatives.pickle', 'rb') as handle:
#	name_to_reprs = pickle.load(handle)

# the trained pca model
pca = None

def ids():
	return list(id_to_width.keys())

def ids_repr():
	return [id for ids in name_to_reprs.values() for id in ids]

# maps id to Gardiner name
def id_to_name(id):
	position = id.index('_0')
	name = id[:position]
	return name

makers = {1: 'Moeller', 2: 'Poe', 3: 'Tabin'}
# maps id to maker
def id_to_maker(id):
	position = id.index('_0')
	val = int(id[position+6:position+7])
	return makers[val]

provenances = {1: 'Thebes', 2: 'Lahun', 3: 'Hatnub', 4: 'Unknown'}
# maps id to provenance
def id_to_provenance(id):
	position = id.index('_0')
	val = int(id[position+8:position+9])
	return provenances[val]

texts = {1: 'Shipwrecked', 2: 'Peasant_B1', 3: 'Peasant_R', 
	4: 'Sinuhe_B', 5: 'Sinuhe_R', 6: 'Prisse', 7: 'Hymn',
	8: 'Temple_Files', 9: 'Will_of_Wah', 10: 'Texte_aus_Hatnub',
	11: 'Ebers', 12: 'Rhind', 13: 'Westcar'}
# maps id to text
def id_to_text(id):
	position = id.index('_0')
	val = int(id[position+10:])
	return texts[val]

# store image with id, assuming em is the (estimated height of A1)
def store_image(id, image, em):
	name = id_to_name(id)
	name_to_ids[name].append(id)
	width, height = image.size
	id_to_width[id] = width / em
	id_to_height[id] = height / em
	id_to_aspect_ratio[id] = width / height
	id_to_grid[id] = image_to_grid(image, grid_size)
	# id_to_grid[id] = image_to_normalized_grid(image, grid_size)
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

dilation_kernel = np.ones((5,5),np.uint8)

def print_array(ar):
	w, h = ar.shape
	print(w,h)
	for x in range(w):
		for y in range(h):
			print(ar[x][y])

def image_to_normalized_grid(image, size):
	image = image.resize((size, size))
	grid = image.convert('1')
	grid = np.asarray(grid)
	grid = np.array([[(255 if val else 0) for val in row] for row in grid], np.uint8)
	im = Image.fromarray(grid)
	im.save("test1.png")
	grid = 255 - grid
	# im = Image.fromarray(grid)
	# im.save("test2.png")
	# grid = cv2.ximgproc.thinning(grid, thinningType=cv2.ximgproc.THINNING_GUOHALL)
	grid = cv2.ximgproc.thinning(grid)
	grid = cv2.dilate(grid, dilation_kernel, iterations = 1)
	# im = Image.fromarray(grid)
	# im.save("test3.png")
	grid = 255 - grid
	# im = Image.fromarray(grid)
	# im.save("test4.png")
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

def grid_to_vector(grid):
	return grid.flatten()

def vector_to_grid(vec):
	return vec.reshape(grid_size,grid_size)

def train_pca():
	global pca
	all_ids = ids()
	# types = [id_to_name(id) for id in all_ids]
	# selected = [random.choice(name_to_ids[name]) for name in types]
	
	flat = [grid_to_vector(id_to_grid[id]) for id in all_ids]
	# flat_selected = [grid_to_vector(id_to_grid[id]) for id in selected]
	scaler = StandardScaler()
	scaler.fit(flat)
	scaled = scaler.transform(flat)
	# scaled_selected = scaler.transform(flat_selected)
	pca = PCA(n_components=pca_size)
	# exit(0)
	# pca.fit(scaled_selected)
	pca.fit(scaled)
	# print(pca.explained_variance_)
	# print(len(pca.explained_variance_))
	pca_vals = pca.transform(scaled)
	for id,val in zip(all_ids, pca_vals):
		id_to_pca[id] = val

def store_images():
	em = 1
	read_images(em)
	train_pca()

store_images()

def print_image(i):
	comp = pca.components_[i]
	low = min(comp)
	high = max(comp)
	dist = high-low
	# ar = np.array(comp)
	# ar = np.reshape(ar, (grid_size,grid_size))
	ar = vector_to_grid(comp)
	for x in range(grid_size):
		for y in range(grid_size):
			ar[x][y] = math.floor((ar[x][y] - low) / dist * 255)
			ar[x][y] = max(0, ar[x][y])
			ar[x][y] = min(255, ar[x][y])
	img = Image.fromarray(np.uint8(ar))
	# img.show()
	img.save("comp" + str(i) + ".png")
	# imshow(img)
	# imshow(img,cmap="gray")
	# imshow((img  * 255).astype('uint8'))
	show()
	
for i in range(5):
	print_image(i)

