import numpy as np
from scipy import stats
from scipy import interpolate
from matplotlib import pyplot as plt

plt.figure(num=None, figsize=(8,6), dpi=80)

mu = -7.965
df = 23
t = -8.021
t_critical = round(stats.t.ppf(1-0.025, df),3)
x = np.linspace(-10, 10, 1000)

dist = stats.t(df, mu)

plt.plot(x, dist.pdf(x), c="black")
plt.fill_between(x, 0, dist.pdf(x), where=x>t_critical)
plt.fill_between(x, 0, dist.pdf(x), where=x<-t_critical)
plt.title("t-Distribution with " + r"$\alpha$" + " = 0.05, df = 23")

ax = plt.gca()
ax.text(3, 0.02, "t* = " + str(t_critical), color = "blue", va = "center", ha = "left", size = 12)
ax.text(-3, 0.02, "t* = " + str(-t_critical), color = "blue", va = "center", ha = "right", size = 12)
ax.annotate("", xy=(t, 0.0), xycoords="data", xytext=(t, 0.04), textcoords="data",
            arrowprops=dict(arrowstyle="->", connectionstyle="arc3"))
ax.text(t, 0.05, "t = " + str(t), va = "center", ha = "center", size = 12)
#plt.draw()
#plt.savefig("t-Distribution.png")
plt.show()
