from tokens import ids, ids_repr, id_to_name, id_to_grid, name_to_ids, \
		id_to_maker, id_to_provenance, id_to_text
from umap import UMAP
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import numpy as np
from sklearn.manifold import TSNE, Isomap, SpectralEmbedding, LocallyLinearEmbedding, MDS
from sklearn.decomposition import PCA
import mpld3
from mpld3 import plugins


def flatten(xss):
	return [x for xs in xss for x in xs]

name = 'D21'

toks = [id for id in ids() if id_to_name(id) == name]
grids = [flatten(id_to_grid[id]) for id in toks]
# makers = [id_to_maker(id) for id in toks]
provenances = [id_to_provenance(id) for id in toks]
texts = [id_to_text(id) for id in toks]

# d = 2
d = 3
method = 'UMAP'
# method = 't-SNE'
# method = 'PCA'
# method = 'MDS'
# method = 'Isomap'
# method = 'SpectralEmbedding'
# method = 'LocallyLinearEmbedding'

if method == 'UMAP':
	dimreduct = UMAP(n_components=d) # n_components=2) # , init='random', random_state=0)
elif method == 't-SNE':
	dimreduct = TSNE(n_components=d, perplexity=40, n_iter=300)
elif method == 'PCA':
	dimreduct = PCA(n_components=d)
elif method == 'MDS':
	dimreduct = MDS(n_components=d)
elif method == 'Isomap':
	dimreduct = Isomap(n_components=d)
elif method == 'SpectralEmbedding':
	dimreduct = SpectralEmbedding(n_components=d)
elif method == 'LocallyLinearEmbedding':
	dimreduct = LocallyLinearEmbedding(n_components=d)
proj = dimreduct.fit_transform(grids)
if d == 2:
	fig = px.scatter(
		proj, x=0, y=1, 
		# color=makers, labels={'color': 'makers'}
		# color=provenances, labels={'color': 'makers'}
		color=texts, 
		labels={'0': '', '1': ''},
		# labels={'color': 'makers'}
	)
if d == 3:
	fig = px.scatter_3d(
		proj, x=0, y=1, z=2,
		# color=makers, labels={'color': 'makers'}
		# color=provenances, labels={'color': 'makers'}
		color=texts, 
		labels={'0': '', '1': '', '2': ''},
		# labels={'color': 'makers'}
	)
fig.write_html("/Users/danielbernardo/Desktop/Dissteration Code/Hieratic_Web_App/server/Visualisation/visualisation.html")
#fig.show()


if False:
	embedding = umap.UMAP()
	embedding.fit_transform(signs)

	makersnum = [0,1,2]

	plt.scatter(
		embedding[:, 0],
		embedding[:, 1],
		c=[sns.color_palette(palette='colorblind')[x] for x in makersnum])

	plt.show()
