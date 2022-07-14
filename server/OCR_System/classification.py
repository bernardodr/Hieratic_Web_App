import pickle
import tokens
import numpy as np

# Utilities.

# weighted absolute distance between two arrays of the same size
def weighted_abs_distance(ar1, ar2, weights, nonzeros):
	d = 0
	for i in nonzeros:
		d += abs(ar1[i] - ar2[i]) * weights[i]
	return d

# weighted squared distance between two arrays of the same size
def weighted_squared_distance(ar1, ar2, weights, nonzeros):
	d = 0
	for i in nonzeros:
		d += (ar1[i] - ar2[i]) * (ar1[i] - ar2[i]) * weights[i]
	return d

# FFT

# trained weights
with open('../server/OCR_System/fft_weights.pickle', 'rb') as handle:
	fft_weights = pickle.load(handle)

fft_nonzero_indices = [i for i in range(fft_weights.size) if fft_weights[i] > 0]

# norm 1 distance of two arrays with FFT values.
def fft_abs_distance(fft1, fft2):
	return weighted_abs_distance(fft1, fft2, fft_weights, fft_nonzero_indices)

# squared norm 2 distance of two arrays with FFT values.
def fft_squared_distance(fft1, fft2):
	return weighted_squared_distance(fft1, fft2, fft_weights, fft_nonzero_indices)

# IDM (image distortion model)

# Best results with:
# warp = 4
# context = 2

def get_safe(im, x, y):
	(w,h) = im.shape
	if x < 0 or x >= w or y < 0 or y >= h:
		return True
	else:
		return im[x][y]

def compare_window(im1, im2, x1, y1, x2, y2, context=0):
	cost = 0
	for xd in range(-context, context+1):
		for yd in range(-context, context+1):
			if get_safe(im1, x1+xd, y1+yd) != get_safe(im2, x2+xd, y2+yd):
				cost += 1
	return cost

def compare_warped(im1, im2, x1, y1, warp=0, context=0):
	best_cost = (1 + 2 * context) * (1 + 2 * context)
	for x2 in range(x1-warp, x1+warp+1):
		for y2 in range(y1-warp, y1+warp+1):
			cost = compare_window(im1, im2, x1, y1, x2, y2, context=context)
			if cost < best_cost:
				best_cost = cost
	return best_cost

# image distortion distance between two bilevel images of same shape
def distortion_distance(im1, im2, warp=0, context=0):
	(w,h) = im1.shape
	diff = 0
	for x in range(w):
		for y in range(h):
			diff += compare_warped(im1, im2, x, y, warp=warp, context=context)
	return diff
