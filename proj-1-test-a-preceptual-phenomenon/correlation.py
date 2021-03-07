import numpy as np
import pandas as pd
from scipy import stats
from scipy import interpolate
from matplotlib import pyplot as plt
from matplotlib import mlab as mlab
from matplotlib import gridspec as gc

#import the data
path = r'./stroopdata.csv'
dataFrame = pd.read_csv(path)

#separate the data sets into two arrays
C = dataFrame["Congruent"].values
I = dataFrame["Incongruent"].values

#delete the outlier based on Incongruent
Ct = np.delete(C, [14, 19])
It = np.delete(I, [14, 19])

#calculate the difference between Congruent and Incongruent
D = I - C
Dt = It - Ct

#compute the coefficient of correlation and data set of the correlation
slope, intercept, r_value, p_value, std_err = stats.linregress(C, D)
slopet, interceptt, r_valuet, p_valuet, std_errt = stats.linregress(Ct, Dt)

#compute the profile of correlation
line = slope * C + intercept
linet = slopet * Ct + interceptt

#define the figure size
fig = plt.figure(num=None, figsize=(13,5), dpi=80)

#Correlation plot
gs = gc.GridSpec(1,2)
gs.update(wspace = 0.15, hspace = 0, bottom = 0.15)
ax1 = fig.add_subplot(gs[0])
ax2 = fig.add_subplot(gs[1])
ax1.plot(C, line, 'r-', C, D, 'o')
ax1.axis([8, 24, 0, 25])
ax1.text(22, 23, "$R$ = " + str(round(r_value, 3)), color = "black", va = "center", ha = "center")
ax1.text(22, 21, "$R^2$ = " + str(round(r_value**2, 3)), color = "black", va = "center", ha = "center")
ax1.set_title('Original')
ax2.plot(Ct, linet, 'r-', Ct, Dt, 'o')
ax2.axis([8, 24, 0, 25])
ax2.text(22, 23, "$R$ = " + str(round(r_valuet, 3)), color = "black", va = "center", ha = "center")
ax2.text(22, 21, "$R^2$ = " + str(round(r_valuet**2, 3)), color = "black", va = "center", ha = "center")
ax2.set_title('Without Outlier')
fig.text(0.5, 0.03, "Performance of Congruent Task [second]", ha = "center")
fig.text(0.075, 0.5, "Performance of Difference [second]", rotation = "vertical", va = "center")

plt.draw()
plt.savefig("corr.png", bbox_inches = "tight")
plt.show()
