
def main():
	#################################################
	#################### Imports ####################
	#################################################

	import random
	import sys
	import heapq
	from tokens import ids, id_to_name, name_to_ids, id_to_grid, id_to_fft, id_to_aspect_ratio
	from classification import distortion_distance, fft_abs_distance, fft_squared_distance


	###################################################
	#################### Functions ####################
	###################################################
	
	# Distance measures and predicates
	def ratio_predicate(id1, id2):
		aspect1 = id_to_aspect_ratio[id1]
		aspect2 = id_to_aspect_ratio[id2]
		if aspect1 < 0.8 and aspect2 < 0.8:
			return True
		if aspect1 > 1.25 and aspect2 > 1.25:
			return True
		if abs(aspect1 - aspect2) / max(aspect1,aspect2) < 0.7:
			return True
		return False

	warp = 4
	context = 2

	def distortion_measure(id1, id2):
		grid1 = id_to_grid[id1]
		grid2 = id_to_grid[id2]
		return distortion_distance(grid1, grid2, warp=warp, context=context) 

	def fft_squared_measure(id1, id2):
		fft1 = id_to_fft[id1]
		fft2 = id_to_fft[id2]
		return fft_squared_distance(fft1, fft2)

	def fft_abs_measure(id1, id2):
		fft1 = id_to_fft[id1]
		fft2 = id_to_fft[id2]
		return fft_abs_distance(fft1, fft2)

	##################################################################
	#################### Classification Functions ####################
	##################################################################

	# from other_ids return a subset of size best_n that has lowest distance to id
	def filter_distance(id, other_ids, distance_measure, best_n):
		distances = {other_id : distance_measure(id, other_id) for other_id in other_ids}
		if best_n == 1:
			return [min(other_ids, key=distances.get)]
		else:
			return heapq.nsmallest(best_n, other_ids, key=distances.get)

	# from other_ids return a subset on which predicate applies
	def filter_predicate(id, other_ids, predicate):
		return [other_id for other_id in other_ids if predicate(id, other_id)]

	# training_n = len(all_ids)
	#testing_n = 20
	testing_n = 1
	all_ids = ids()
	non_hapax_ids = [id for id in all_ids if len(name_to_ids[id_to_name(id)]) > 1]
	test_ids = random.sample(non_hapax_ids, testing_n) #inputs 
	all_ids_set = set(all_ids) #input 


	# ###################################
	# ##### Classsification Testing ##### 
	# ###################################

	hits = 0
	# for id in test_ids:
	# 	print(test_ids)
	# 	print("///////////////////////////////////////////////")
	# 	print(id)
	# 	print("///////////////////////////////////////////////")
	# 	other_ids = all_ids_set.difference([id]) #removes the same ids
	# 	print(other_ids)
	# 	print("///////////////////////////////////////////////")
	# 	other_ids = filter_predicate(id, other_ids, ratio_predicate) #
	# 	print(other_ids)
	# 	print("///////////////////////////////////////////////")
	# 	other_ids = filter_distance(id, other_ids, fft_squared_measure, 20)
	# 	print(other_ids)
	# 	print("///////////////////////////////////////////////")
	# 	##other_ids = filter_ids(id, other_ids, fft_abs_measure, 100)
	# 	other_ids = filter_distance(id, other_ids, distortion_measure, 1)
	# 	print(other_ids)
	# 	print("///////////////////////////////////////////////")
		
	# 	other_id = other_ids[0]
	# 	print(other_ids)
	# 	if id_to_name(id) == id_to_name(other_id):
	# 		hits += 1
	# print(hits/testing_n)



	################################
	##### Classify input image ##### 
	################################

	input_Image = ['TIMG_0000'] # Input image to be compaired



	for id in input_Image:
		#print(input_Image)
		#print("/////////////////////////////////////////////// 1")
		#print(id)
		#print("/////////////////////////////////////////////// 2")
		other_ids = all_ids_set.difference([id]) #removes the same ids
		#print(other_ids)
		#print("/////////////////////////////////////////////// 3")
		other_ids = filter_predicate(id, other_ids, ratio_predicate) #
		#print(other_ids)
		#print("/////////////////////////////////////////////// 4")
		other_ids = filter_distance(id, other_ids, fft_squared_measure, 20)
		top5_array = [other_ids[0],other_ids[1],other_ids[2],other_ids[3], other_ids[4]]
		#print(other_ids)
		#print("/////////////////////////////////////////////// 5")
		##other_ids = filter_ids(id, other_ids, fft_abs_measure, 100)
		other_ids = filter_distance(id, other_ids, distortion_measure, 1)
		#print(other_ids)
		#print("/////////////////////////////////////////////// 6")
	print(top5_array)
	sys.stdout.flush()
if __name__ == '__main__':
    main()
