import sys
import sklearn
from sklearn.linear_model import LogisticRegression
import random
import pickle
import numpy as np
from numpy import cov
import matplotlib.pyplot as plt
from matplotlib.pyplot import figure

from tokens import ids, id_to_name, name_to_ids, id_to_fft
from classification import *



all_ids = ids()
for i in range(20):
	all_ids.extend(ids())

training_n = len(all_ids)
# training_n = 10
ids1 = random.sample(all_ids, training_n)
ids_mixed = []
for i in range(len(ids1)):
	if i % 2 == 0:
		ids_mixed.append(random.choice(ids1))
	else:
		name = id_to_name(ids1[i])
		id = random.choice(name_to_ids[name])
		ids_mixed.append(id)
pairs = zip(ids1, ids_mixed)
training_features = []
training_responses = []
for (id1, id2) in pairs:
	name1 = id_to_name(id1)
	name2 = id_to_name(id2)
	response = 1 if name1 == name2 else 0
	training_responses.append(response)
	features1 = id_to_fft[id1]
	features2 = id_to_fft[id2]
	features = np.absolute(np.subtract(features1, features2))
	training_features.append(features)

logreg = LogisticRegression(max_iter=10000)
trained = logreg.fit(training_features, training_responses)
if False:
	for co in trained.coef_[0]:
		print(co)
x = range(len(trained.coef_[0]))
y = trained.coef_[0]
# plt.xticks(np.arange(0, len(trained.coef_[0]), 16.0))
values = [0, 15, 16, 17, 30, 46, 81, 97, 159, 175, 191, 226, 242, 257,
		271, 336, 353, 432, 497, 507, 511]
fft_weights = np.zeros(len(trained.coef_[0]))
for v in values:
	print(v, y[v])
	fft_weights[v] = -y[v]
if False:
	figure(figsize=(100, 6), dpi=80)
	plt.grid(True)
	plt.plot(x, y)
	plt.xticks(np.array(values))
	plt.show()
with open('../server/fft_weights.pickle', 'wb') as handle:
	pickle.dump(fft_weights, handle)

if False:
	for i in range(40):
		feature = [feats[i] for feats in training_features]
		print(cov(feature, training_responses))
		# plt.scatter(feature, training_responses)
		# plt.show()

sys.stdout.flush()


