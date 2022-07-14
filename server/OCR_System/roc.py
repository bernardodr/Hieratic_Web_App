import random
import numpy as np
import matplotlib.pyplot as plt
from tokens import ids, id_to_name, name_to_ids, id_to_grid, id_to_fft, id_to_aspect_ratio

all_ids = ids()
non_hapax_ids = [id for id in all_ids if len(name_to_ids[id_to_name(id)]) > 1]
all_ids_set = set(all_ids)

def tpr_fpr(id, predicate):
	other_ids = all_ids_set.difference([id])
	positive_ids = set(name_to_ids[id_to_name(id)]).difference([id])
	negative_size = len(other_ids) - len(positive_ids)
	tp_ids = [other_id for other_id in positive_ids if predicate(id, other_id)]
	tp_fp_ids = [other_id for other_id in other_ids if predicate(id, other_id)]
	tp = len(tp_ids)
	p = len(positive_ids)
	# tpr = tp / p
	fp = len(tp_fp_ids) - len(tp_ids)
	n = len(other_ids) - len(positive_ids)
	# fpr = fp / n
	return tp, p, fp, n

def ratio_predicate(bound):
	def p(id1, id2):
		aspect1 = id_to_aspect_ratio[id1]
		aspect2 = id_to_aspect_ratio[id2]
		if aspect1 < 0.8 and aspect2 < 0.8 or aspect1 > 1.25 and aspect2 > 1.25:
			return True
		if abs(aspect1 - aspect2) / max(aspect1,aspect2) < bound:
			return True
		return False
	return p
	
testing_n = 50
test_ids = random.sample(non_hapax_ids, testing_n)

tpr_accum = []
fpr_accum = []
auc = 0
prev_fpr = 0
for bound in np.arange(0, 3,  0.1):
	pt_accum = 0
	p_accum = 0
	fp_accum = 0
	n_accum = 0
	for id in test_ids:
		pt, p, fp, n = tpr_fpr(id, ratio_predicate(bound))
		pt_accum += pt
		p_accum += p
		fp_accum += fp
		n_accum += n
	tpr = pt_accum / p_accum
	fpr = fp_accum / n_accum
	tpr_accum.append(tpr)
	fpr_accum.append(fpr)
	auc += (fpr - prev_fpr) * tpr
	prev_fpr = fpr
	print(bound, tpr, fpr)
plt.plot(fpr_accum, tpr_accum)
plt.xlim([0,1])
plt.ylim([0,1])
plt.ylabel('tpr')
plt.xlabel('fpr')
print(auc)
plt.show()
