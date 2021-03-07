import numpy as np
import pandas as pd
import scipy as sp
from scipy import stats
from scipy import interpolate
from matplotlib import pyplot as plt
from matplotlib import mlab as mlab
from matplotlib import gridspec as gc

#import the data set
path = r'./stroopdata.csv'
dataFrame = pd.read_csv(path)

#separate the data sets into two arrays
C = dataFrame["Congruent"].values
I = dataFrame["Incongruent"].values

#basic statistic info
muC = np.mean(C)
sigmaC = np.std(C, ddof = 1)
q1C = np.percentile(C, 25)
q3C = np.percentile(C, 75)
iqrC = q3C - q1C
#Ct = C[( C >= q1C - 1.5*iqrC) & (C <= q3C + 1.5*iqrC)]
Ct = np.delete(C, [14, 19])
muCt = np.mean(Ct)
sigmaCt = np.std(Ct, ddof = 1)

muI = np.mean(I)
sigmaI = np.std(I, ddof = 1)
q1I = np.percentile(I, 25)
q3I = np.percentile(I, 75)
iqrI = q3I - q1I
It = I[(I >= q1I - 1.5*iqrI) & (I <= q3I + 1.5*iqrI)]
muIt = np.mean(It)
sigmaIt = np.std(It, ddof = 1)

#Define the figure size
fig = plt.figure(num=None, figsize=(13,5), dpi=80)

#Assign the positions of two graphes
gs = gc.GridSpec(1,2)
gs.update(wspace = 0.15, hspace = 0, bottom = 0.15)
ax1 = fig.add_subplot(gs[0])
ax2 = fig.add_subplot(gs[1])

#histogram and fitted normal distribution of Congruent data
binsC = range(8, max(C.astype(np.int64)) + 2)
probC = mlab.normpdf(binsC, muC, sigmaC) * 24
probCt = mlab.normpdf(binsC, muCt, sigmaCt) * 22
lC = sp.linspace(8, max(C.astype(np.int64)) + 1, 100)
sC = interpolate.spline(binsC, probC, lC)
sCt = interpolate.spline(binsC, probCt, lC)

xxC = sp.searchsorted(lC, muC + sigmaC)
vC = ((sC[xxC + 1] - sC[xxC])/(lC[xxC + 1] - lC[xxC])) * (muC + sigmaC - lC[xxC])
vC += sC[xxC]

#histogram and fitted normal distribution of Incongruent data
binsI = range(15, max(I.astype(np.int64)) + 2)
binsIt = range(15, max(It.astype(np.int64)) + 2)
probI = mlab.normpdf(binsI, muI, sigmaI) * 24
probIt = mlab.normpdf(binsI, muIt, sigmaIt) * 22
lI = sp.linspace(15, max(I.astype(np.int64)) + 1, 100)
sI = interpolate.spline(binsI, probI, lI)
sIt = interpolate.spline(binsI, probIt, lI)

ax1.hist(C, bins = binsC, align = "left", histtype = "step", color = "black")
ax1.plot(binsC, probC, "o", color = "black")
ax1.plot(binsC, probCt, "o", color = "red")
nC, = ax1.plot(lC, sC, color = "black")
nCt, = ax1.plot(lC, sCt, color = "red")
ax1.legend([nC, nCt], ["Original Data", "Without Outlier"])
ax1.set_title("Congruent Task")
ax1.axis([7, 23, 0, 6])

ax2.hist(I, bins = binsI, align = "left", histtype = "step", color = "black")
ax2.plot(binsI, probI, "o", color = "black")
ax2.plot(binsI, probIt, "o", color = "red")
nI, = ax2.plot(lI, sI, color = "black")
nIt, = ax2.plot(lI, sIt, color = "red")
ax2.legend([nI, nIt], ["Original Data", "Without Outlier"])
ax2.set_title("Incongruent Task")
ax2.axis([14, 36, 0, 6])

fig.text(0.5, 0.03, "Performance [second]", ha = "center")
fig.text(0.075, 0.5, "Absolute Frequency [-]", rotation = "vertical", va = "center")

plt.draw()
plt.savefig("histNnorm.png", bbox_inches = "tight")
plt.show()
