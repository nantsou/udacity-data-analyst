# Porject 5: Identify Fraud from Enron Email
---
**Udacity Data Analyst Nonedegree**

By Nan-Tsou Liu @ 2016-07-17

## Introduction
<p>
<a href=https://en.wikipedia.org/wiki/Enron>Enron Corporation</a> was an American energy, commodities, and services company based in Houston, Texas. Before its bankruptcy in 2001, there were about 20,000 employees and was one of the world's major electricity, natural gas, communications and pulp and paper companies.
</p>
<p>
<a href=https://en.wikipedia.org/wiki/Enron_Corpus>The Enron Corpus</a> is a large database of over 600,000 emails generated by 158 employees of the Enron Corporation and acquired by the Federal Energy Regulatory Commission during its investigation after the company's collapse. 
</p>

## Short Question

>Summarize for us the goal of this project and how machine learning is useful in trying to accomplish it. As part of your answer, give some background on the dataset and how it can be used to answer the project question. Were there any outliers in the data when you got it, and how did you handle those? <br/>
[relevant rubric items: “data exploration”, “outlier investigation”]

### Goal of the Project:
<p>
In this project, the prediction model is built by using the python module called scikit-learn to identify the person of interest (POI). 
The following skills are applied to carried out the project:
<ul>
<li>feature selection and scaling</li>
<li>algorithm selection and tuning</li>
<li>validation and classic mistakes</li>
<li>evaluation metrics and interpretation of algorithm's performance</li>
</ul>
</p>

### Basic Info of the DataSet
<p>
First of all, I would like to take a look at the original dataset to realize what data structure and characters this dataset is. The original dataset contains <strong>146</strong> records with <strong>1 labele (POI)</strong>, <strong>14 financial features</strong> and <strong>6 email features</strong>. In the data of labels, there are <strong>18</strong> records have been marked as <strong>POI</strong>.
Furthermore, we also concern that whether there are <strong>missing data</strong> or not. According to pdf file, <strong>enron61702insiderpay.pdf</strong>, we could simply find out lots of data are lost. Thus, I counted data loss of each feature to check how many data of each feature we loss. And in order to have a insight into the difference between the records of POI and Non-Poi. I counted the loss with respect <strong>POI and Non-POI respectively</strong>. Also, I presented the overall loss count together.
</p>

### Data Loss Count of Each Feature

<table>
<thead>
<tr>
<td><strong>Feature</strong></td>
<td><strong>POI</strong></td>
<td><strong>NON POI</strong></td>
<td><strong>TOTAL</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>salary</td>
<td>1</td>
<td>49</td>
<td>50</td>
</tr>
<tr>
<td>to_messages</td>
<td>4</td>
<td>54</td>
<td>58</td>
</tr>
<tr>
<td>deferral_payments</td>
<td>13</td>
<td>93</td>
<td>106</td>
</tr>
<tr>
<td>total_payments</td>
<td>0</td>
<td>21</td>
<td>21</td>
</tr>
<tr>
<td>exercised_stock_options</td>
<td>6</td>
<td>37</td>
<td>43</td>
</tr>
<tr>
<td>bonus</td>
<td>2</td>
<td>61</td>
<td>63</td>
</tr>
<tr>
<td>restricted_stock</td>
<td>1</td>
<td>34</td>
<td>35</td>
</tr>
<tr>
<td>shared_receipt_with_poi</td>
<td>4</td>
<td>54</td>
<td>58</td>
</tr>
<tr>
<td>restricted_stock_deferred</td>
<td>18</td>
<td>109</td>
<td>127</td>
</tr>
<tr>
<td>total_stock_value</td>
<td>0</td>
<td>19</td>
<td>19</td>
</tr>
<td>expenses</td>
<td>0</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td>loan_advances</td>
<td>17</td>
<td>124</td>
<td>141</td>
</tr>
<tr>
<td>from_messages</td>
<td>4</td>
<td>54</td>
<td>58</td>
</tr>
<tr>
<td>other</td>
<td>0</td>
<td>53</td>
<td>53</td>
</tr>
<tr>
<td>from_this_person_to_poi</td>
<td>4</td>
<td>54</td>
<td>58</td>
</tr>
<td>director_fees</td>
<td>18</td>
<td>110</td>
<td>128</td>
</tr>
<tr>
<td>deferred_income</td>
<td>7</td>
<td>89</td>
<td>96</td>
</tr>
<tr>
<td>long_term_incentive</td>
<td>6</td>
<td>73</td>
<td>79</td>
</tr>
<tr>
<td>email_address</td>
<td>0</td>
<td>33</td>
<td>33</td>
</tr>
<tr>
<td>from_poi_to_this_person</td>
<td>4</td>
<td>54</td>
<td>58</td>
</tr>
</tbody>
</table>

<strong style="color: red;">Outlier and label POI are not counted</strong>
<br/>
<strong style="color: red;">POI: 18 records Non-POI: 126 records TOTAL: 144 records</strong>

### Visualization of Data Loss

<p>
In order to realize the difference in data between POI and Non-POI, I visualized the loss count with <strong>BAR chart</strong> as below.
</p>

<img src="scripts/actual_data_loss_count.png" width=800 />

<p>
With actual data loss count figure, it is a little bit hard to compare the differnce in records between POI and Non-POI, because the number of records are quite different (POI: 18 records, Non-POI: 126 records). However, we can simply understand that some features like <strong>total_payments</strong>, <strong>total_stock_value</strong>, <strong>expense</strong> and <strong>other</strong> should be the important features to identify POI because there is no data loss in POI records. Surely, this one can also be observed with the talbe above.
</p>

<img src="scripts/normalized_data_loss_count.png" width=800></img>

<p>
On the other hand, with normalized data loss count figure, we can simply indicate that which feature has weak effect on the prediction. In this case, the features like <strong>deferal_payments</strong>, <strong>exercised_stock_options</strong>, <strong>restricted_stock_deferred</strong>, <strong>loan_advances</strong> and <strong>director_fees</strong> could be weak features because there are almost no data in both POI and Non-POI. This fact could be observed with the table and figreu above, but normalized figure could provide quick insigt into it.
Besides, normalized figure also tells what the percentage the data lost in both POI and Non-POI record. It can help us to choose those which have data over 50% to do the prediction.
</p>

<p>
As the simple conclusion in this section, we have over all <strong>146 records</strong> which has two outlier, <strong>20</strong> features and <strong>1</strong> label called <strong>POI</strong>. And there are four features, <strong>deferal_payments</strong>, <strong>restricted_stock_deferred</strong>, <strong>loan_advances</strong> and <strong>director_fees</strong>, which loss data over 50%. 
</p>

###Outliers
<p>
By observing the data and pdf file, <strong>enron61702insiderpay.pdf</strong>, the obvious outliers are <strong>TOTAL</strong> and <strong>THE TRAVEL AGENCY IN THE PARK</strong> which are simply removed by <code>pop()</code> method of dictionary in Python. Besides, the record of <strong>LOCKHART EUGENE E</strong> is empty, thus it was also removed.
</p>
<p>
I found out that the records of <strong>BELFER ROBERT</strong> and <strong>BHATNAGAR SANJAY</strong> are not consistent with the data in pdf file by accident. Therefore, I fixed them before removing outliers and replacing NaN with 0. I did not check every records so that I am not sure whether there are others not consistent or not.
</p>

---

>What features did you end up using in your POI identifier, and what selection process did you use to pick them? Did you have to do any scaling? Why or why not? As part of the assignment, you should attempt to engineer your own feature that does not come ready-made in the dataset -- explain what feature you tried to make, and the rationale behind it. (You do not necessarily have to use it in the final analysis, only engineer and test it.) In your feature selection step, if you used an algorithm like a decision tree, please also give the feature importances of the features that you use, and if you used an automated feature selection function like SelectKBest, please report the feature scores and reasons for your choice of parameter values.

<p>
At the beginning, I used all the original features except <strong>mail_address</strong> in the dataset. However, after I had a look at the data and considered data loss with the aspect of POI and Non-POi. I decided to exclude four features which loss data over 50%. Thsu, there are 16 featrues used in this project shown as below.
</p>

#### Financial Features
<code>'salary'</code>, <code>'bonus'</code>, <code>'expenses'</code>, <code>'other'</code>, <code>'deferred\_income'</code>, <code>'long\_term\_incentive'</code>, <code>'exercised\_stock\_options'</code>, <code>'restricted\_stock'</code>

#### Email Features
<code>'from\_messages'</code>, <code>'from\_poi\_to\_this\_person'</code>, <code>'from\_this\_person\_to\_poi'</code>, <code>'shared\_receipt\_with\_poi'</code>, <code>'to\_messages'</code>

<p>Besides, I added <strong>financial relatived features</strong> like the ratios of each payment feature or stock feature to the total amount of financial and <strong>message related feature</strong>.
</p> 
<p>
The reasons I added these features are that first, I assumed that POI has somehow great relationship with the financial status. First, I calculated the ratio of each financial features to <strong>total_financial</strong> (summation of <strong>total_payments</strong> and <strong>total_stock_value</strong>) because I thought that the person of POI might had large percentage of restricted_stock or salary of the total financial status. It also means that <strong>the composition of the financial status</strong> might be the good features for model training. 
</p>
<p>
However, after I considered more, the total amount of payments and stock values are much greater than each single payment and stock value, so that the ratios calculated by the equations above might elminate the effect of the new features to the prediction. Thus, I decided to redesign the new features. First, I <strong>separated</strong> the payments and stock values and calculated respectively. Second, I added <strong>ratio of total payments to overall financial amount</strong> and <strong>raton of total stock value</strong> to overall financial amount, where overall financail amount is the summation of total payments and total stock values.
</p>
<p>
On the other hand, the messages of each person should be a strong feature to identify POI. Therefore, I culaculated the ratio of <strong>poi_relative_message</strong> (summation of <strong>from_poi_to_this_person</strong>, <strong>from_this_person_to_poi</strong> and shared <strong>receipt_with_poi</strong>) to <strong>total_messages</strong> (summation of <strong>from_message</strong> and <strong>to_message</strong>).
</p>

###Added Features

<table>
<thead>
<tr>
<td><strong>Feature</strong></td>
<td><strong>Description</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><strong>total_financial</strong></td>
<td>total_payments + total_stock_value</td>
</tr>
<tr>
<td><strong>{each payment feature}_payment_ratio</strong></td>
<td>{each payment feature} / total_payments</td>
</tr>
<tr>
<td><strong>{each stock feature}_stock_ratio</strong></td>
<td>{each stock feature} / total_stock_values</td>
</tr>
<tr>
<td><strong>poi_ratio_messages</strong></td>
<td>poi_related_messages / total_messages</td>
</tr>
<tr>
<td><strong>poi_related_messages</strong></td>
<td>from_poi_to_this_person + from_this_person_to_poi + shared_receipt_with_poi (FOR CALCULATION ONLY)</td>
</tr>
<tr>
<td><strong>total_messages</strong></td>
<td>from_messages + to_messages (FOR CALCULATION ONLY)</td>
</tr>
</tbody>
</table>

### Engineering Data

<p>
The end-up using features were selected during GridSearchCV pipeline search with following steps:
<ol>
<li>scale all features to be between 0 and 1 with MinMaxScaler</li>
<li>dimension reduction with SelectKBest and Principal Components Analysis</li>
<li>tune parameters of each models</li>
</ol>
Features scaling was carried out since PCA and various models such as Logistic Regression perform optimally with scaled features. Feature scaling is also necessary since they were on very different scales, ranging from hundreds of e-mails to millions of dollars.
</p>
<p>
<strong>SelectKBest</strong> and <strong>Principal Components Analysis (PCA)</strong> dimension reduction were run during each of the cross-validation loops during the grid search. The K-best features were selected using <strong>Anova F-value classification</strong> scoring function. The K-best features were then used in reducing dimension with PCA. Finally,the N principal components were fed into a classification algorithm.
</p>
<p>The results of the feature selection would be discussed in the section <strong>Final Results of each Algorithm</strong> below. And the K-Best result would be shown in section <strong>Parameter Tuning</strong>
</p>

---

>What algorithm did you end up using? What other one(s) did you try? How did model performance differ between algorithms?

<p>
The ended up using algorithm was determined by the results of <strong>GridSearchCV</strong> respected <strong>recall score</strong> and <strong>precision score</strong> with k-best feature selection, PCA reduction and parameters tuning. <strong>Support Vector Classifier (SVC)</strong> showed the best results, which are <strong>recall score 0.70900 and precision score 0.34434</strong>, and therefore it was the ended up using algorithm in this project. Besides SVC, I also tried <strong>Logistic Regression (LogReg)</strong>, <strong>Linear Support Vector Machine (LSVC)</strong>, <strong>Decision Tree (DTree)</strong> and <strong>K-Means Classifier (KMeans)</strong>.
</p>
<p>
Actually, LogReg and LSVC also showed the competive results compared with that of SVC. And the results of both algorithms were similar. The recall scores are about <strong>0.70</strong> and <strong>0.68</strong> of LogReg and LSVC respectively. And the precision scores are about <strong>0.3</strong> of both algorithms, which were calculated by the validation program I wrote. According to the obversation by manual parameter tuning, recall score and precision score were changed against with each other. And the parameter <strong>C</strong> affected the results mostly. And I found out an interesting phenomenon that the value ended with 5 like <code>[0.05, 0.5, 0.15]</code> could keep recall score at good value and promote precision score well. And, precision score kelp <strong>around 0.3</strong>. However, the results tested by the program provided by Udacity were around <strong>0.27 to 0.28</strong>, which did not meet the requirements of the assignments.
</p>
<p>
The results of DTree were fair although the results matched the requirements of the assignment. However, the tuning parmeters are quite different from the algorithms above. I have tried to tune parameter <strong>max_depth</strong>, 
<strong>min_samples_leaf</strong>, and <strong>min_samples_split</strong>. And the final result in this case was <strong>Precision: 0.33299</strong> and <strong>Recall: 0.64200</strong>.
</p>
<p>
On the other hand, the precision score of KMeans (which was told by Udacity reviewer that it is intended for unsupervised learning) kept at the value <strong>about 0.15</strong>, which is far from the requirement of the assignment. No matter how I tuned the parameters, although precision score was about <strong>0.5</strong>. In my opinion, KMeans might not suitable for this prediction after I added the new features. Thus, I decided to exclude it from the discussion of this report.
</p>

---

>What does it mean to tune the parameters of an algorithm, and what can happen if you don’t do this well?  How did you tune the parameters of your particular algorithm? (Some algorithms do not have parameters that you need to tune -- if this is the case for the one you picked, identify and briefly explain how you would have done it for the model that was not your final choice or a different model that does utilize parameter tuning, e.g. a decision tree classifier). 

<p>
Tuning the parameters of an algorithm is a process to promote the performance of the model. Depended on the structure and nature of the dataset, tuning the parameters would cost lots of time when doing model training. In this project, <strong>Grid Search</strong> was used to tune the parameters of the algorithms with 1000 randomized stratified cross-validation stratified splits. The parameters of each algorithms with highest average score were choosen for the models.
</p>

### Final Results of each Algorithm
<table>
<thead>
<tr>
<td><strong>Parameter</strong></td>
<td><strong>Logistic Regression</strong></td>
<td><strong>Linear Support Vector Classifier</strong></td>
<td><strong>Support Vector Classifier</strong></td>
<td><strong>Decision Tree</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><strong>C</strong></td>
<td>1.3</td>
<td>0.146</td>
<td>1.335</td>
<td>-</td>
</tr>
<tr>
<td><strong>class_wight</strong></td>
<td>auto</td>
<td>auto</td>
<td>auto</td>
<td>balanced</td>
</tr>
<tr>
<td><strong>tol</strong></td>
<td>1e-64</td>
<td>1e-32</td>
<td>1e-8</td>
<td>-</td>
</tr>
<tr>
<td><strong>n_components of PCA</strong></td>
<td>0.5</td>
<td>0.5</td>
<td>0.5</td>
<td>0.5</td>
</tr>
<tr>
<td><strong>whiten of PCA</strong></td>
<td>True</td>
<td>False</td>
<td>False</td>
<td>False</td>
</tr>
<tr>
<td><strong>selection of SelectKBest</strong></td>
<td>16</td>
<td>15</td>
<td>15</td>
<td>11</td>
</tr>
<tr>
<td><strong>gamma</strong></td>
<td>-</td>
<td>-</td>
<td>11.55</td>
<td>-</td>
</tr>
<tr>
<td><strong>kernel</strong></td>
<td>-</td>
<td>linier</td>
<td>rbf</td>
<td>-</td>
</tr>
<tr>
<td><strong>criterion</strong></td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>entropy</td>
</tr>
<tr>
<td><strong>splitter</strong></td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>best</td>
</tr>
<tr>
<td><strong>max_depth</strong></td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>2</td>
</tr>
<tr>
<td><strong>min_sample_leaf</strong></td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>18</td>
</tr>
<tr>
<td><strong>min_sample_split</strong></td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>2</td>
</tr>
</tbody>
</table>

---

>What is validation, and what’s a classic mistake you can make if you do it wrong? How did you validate your analysis?

<p>
Validation is the process to ensure that the results produced built model with other unknown data is reliable. In my case, A classic mistake is over-fitting, which makes the model too particular so that the results produced with the other data are poor and unreliable. One of major purpose of validation is to avoid over-fitting.
</p>

### Over-Fitting on SVC with Parameter C

<p>
I found out an interesting results when I manually tuned parameters of SVC. As the table shown below, I obtained recall score which is <strong>1.0000</strong> when I set 0.05 to parameter <strong>C</strong>. At the beginning, I did not noticed that it was the result caused by over-fitting. But I noticed that it was caused by parameter C. So, I did the simple investigate on the internet. The simple description of C is that the value of the regularization constraint, which tells the SVM optimization <strong>how much you want to avoid misclassifying</strong> each training dataset. And a very small value of C will cause the optimizer to look for a larger-margin to separate hyperplane, which means that there might be many points which are hyperplane misclassifies.</p>

<table>
<thead>
<tr>
<td><strong>CASE</strong></td>
<td><strong>C</strong></td>
<td><strong>recall score</strong></td>
<td><strong>precision score</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>0.01</td>
<td>0.7335</td>
<td>0.3317</td>
</tr>
<td>2</td>
<td>0.05</td>
<td>1.0000</td>
<td>0.1333</td>
</tr>
</tbody>
</table>

### Cross-Validation
<p>
Cross-Validation was applied on the validation of model. It is a process that randomly split the data into training and testing dataset. And then it trains the model with the training data and validates with the testing data.
In this project, the whole dateset was splitted with 1000 randomized <strong>stratified cross-validation splits</strong>. And then the parameters with the best performance over 1000 splits were selected. 
</p>
<p>
According to the structure and nature of this dataset. The records we have are quite few. There are only 18 POI and 144 records. And lots of data of some features are lost. Thus, <strong>StratifiedShuffleSplit</strong>, which combines <strong>StratifiedKFold</strong> and <strong>ShuffleSplit</strong> and returns stratified <strong>randomized folds</strong>, is much more suitable for this dataset. And this is also the main reasion that I fianlly used this method to do cross-validation.
</p>

### Parameter Tuning
<p>
As I mentioned above, <strong>GridSearchCV</strong> with over 1000 stratified shuffled cross-validation 90%-training/ 10%-testing splits was used to tune the parameters in this project. Besides, K-best selection and PCA reduction processes were embraced into the parameter tuning loop. Compared with outside selection, the selection in the loop might promote the consistence of parameter tuning and give a less biased estimate of performance on any new unseen data that this model might be used for.
</p>
<p>
As the results of selected the final model, 15 features were selected. PCA reduction gave 2 principal components. These parameters were used in the final <strong>Support Vector Machine</strong> classification model.
</p>
<p>
One should be notified is that these features might change slightly each time since the k-best selection was carried out inside of the pipeline. Below are the final 15 features chosen when the entire dataset was fit to the final chosen model pipeline:
</p>

###K-Best Feature (Top 15)

<strong style="color: red;">Added Feature</strong>

<table>
<thead>
<tr>
<td><strong>feature</strong></td>
<td><strong>score↑</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><strong>total_stock_value</strong></td>
<td>22.5105490902</td>
</tr>
<tr>
<td><strong>exercised_stock_options</strong></td>
<td>22.3489754073</td>
</tr>
<tr>
<td><strong>bonus</strong></td>
<td>20.7922520472</td>
</tr>
<tr>
<td><strong style="color: red;">bonus_payment_ratio</strong></td>
<td>20.7155962476</td>
</tr>
<tr>
<td><strong>salary</strong></td>
<td>18.2896840434</td>
</tr>
<tr>
<td><strong style="color: red;">total_financial</strong></td>
<td> 17.3887977785 </td>
</tr>
<tr>
<td><strong style="color: red;">long_term_incentive_payment_ratio</strong></td>
<td> 13.8508684172 </td>
</tr>
<tr>
<td><strong>deferred_income</strong></td>
<td>11.4248914854</td>
</tr>
<tr>
<td><strong>poi_ratio_messages</strong></td>
<td>10.0194150056</td>
</tr>
<tr>
<td><strong>long_term_incentive</strong></td>
<td>9.92218601319</td>
</tr>
<tr>
<td><strong>total_payments</strong></td>
<td>9.28387361843</td>
</tr>
<tr>
<td><strong>restricted_stock</strong></td>
<td>8.83185274222</td>
</tr>
<tr>
<td><strong>shared_receipt_with_poi</strong></td>
<td>8.58942073168</td>
</tr>
<tr>
<td><strong>loan_advances</strong></td>
<td>7.18405565829</td>
</tr>
<tr>
<td><strong>expenses</strong></td>
<td>5.41890018941</td>
</tr>
</tbody>
</table>

---

>Give at least 2 evaluation metrics and your average performance for each of them.  Explain an interpretation of your metrics that says something human-understandable about your algorithm’s performance.

### Final Evaluation Matric Results of each Algorithm

<p>
<strong>Recall</strong> and <strong>Precision</strong> were used as the primary evaluattion metrics. The definition are shown below:
</p>
<p>
<code>recall = True_Positive / (True_Positive + False_Negative)</code>
</p>
<p>
According to the difinition of recall, it is reliable that the target is not what we are interested if it is marked negative with high recall score. Because high recall score also means low false negative.
</p>
<p>
<code>precision = True_Positive / (True_Positive + False_Positive)</code>
</p>
<p>
On the other hand, the target marked positive with high precision score can be thought it is what we are interested with high confidence. Because high precision could be thought as that false positive is low.
</p>

<p>
General speaking, to explain the meaning of recall and precision with the term of this project. If the predicting model with <strong>recall score 0.710 and precsion score 0.344</strong> marks the target as <strong>Non-POI (negative)</strong>, then we are confident to assert this target is not POI because 71% is quite high accryacy. However, if the model marks the target as <strong>POI (positive)</strong>, we have to doubt the result and do more confirmation because 34.4% accruacy is not relaiable to identify the target is POI. Otherwise we mignt label the innocent person with quilty. So, the model with <strong>high reall score and low precision scores</strong> could be used to identify the target is <strong>Non-POI</strong>. As the result, we can decrease the number of suspects and then focus on those who have high possibilty to be the <strong>REAL POI</strong>.
</p>

<p>
In this porject, lots of records in the dataset are unknown and we have much more negative labels than positive ones. Thus, in my opinion, it is a little bit not practical to build a model which can identify the target is POI, which means the model with high precision score. On the other hand, it should be more practical to build the model which can identify the target is not POI, which means the model with high recall score. As the result, it is not surprised that recall socres are <strong>much greater</strong> than precision scores of all the results of all the algorithms in this project.
</p>

<table>
<thead>
<tr>
<td><strong>Model</strong></td>
<td><strong>Recall Score by GridSearch</strong></td>
<td><strong>Recall</strong></td>
<td><strong>Precision</strong></td>
<td><strong>KBest Features</strong></td>
<td><strong>PCA Components</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Logistic Regression</strong></td>
<td>0.7290</td>
<td>0.71750</td>
<td>0.28044</td>
<td>16</td>
<td>2</td>
</tr>
<tr>
<td><strong>Linear SVC</strong></td>
<td>0.70050</td>
<td>0.69800</td>
<td>0.27665</td>
<td>15</td>
<td>2</td>
</tr>
<tr>
<td><strong>SVC</strong></td>
<td>0.70650</td>
<td>0.70900</td>
<td>0.34434</td>
<td>15</td>
<td>2</td>
</tr>
<tr>
<td><strong>Decision Tree</strong></td>
<td>0.64650</td>
<td>0.67000</td>
<td>0.33230</td>
<td>11</td>
<td>2</td>
</tbody>
</table>

---

## Conclusion
<p>
During this project, I understand what machine learning more. In order to finished this project. I did many study on the skills and knowledge on the internet, especially for the usage of scitkit-learn module. Besides, I also noticed that the structure and nature of the feature dataset do affect the result deeply. To work on create useful feature dataset with original dataset should be a big knowledge and needed much experience. Of course, with this course and the project, I did learn lots of skills and knowledge about not only machine learning but also python. I was glad that I have learn how to do basic machine learning with python and then where and how to find the resource to train myself.
</P>
<p>
Besides, the previous reviewer did help me very much, especially for the advices he gave. I reviewed my project again. And then digged the data a little more. It is interesting to explore data more so that the model I built became more realiable. About the future work, I would like to train my model with different feature set to make the model more realible. This time, I just had a look at how the results change with changing the features. As what I expected, the feature selection and engineering data did have impact on the model training. This project made me learned lots about machine learning, which strengthen my will to take <strong>Machine Learning of Udacity</strong> as the next step of my plan.
</p>
## Script

<table>
<thead>
<tr>
<td><strong>File</strong></td>
<td><strong>Description</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td>poi_id.py</td>
<td>main script to train POI classification model</td>
</tr>
<tr>
<td>poi_data.py</td>
<td>fix non-consistent data, reform data structure and count the data loss</td>
</tr>
<tr>
<td>poi_add_feature.py</td>
<td>add new feature to dataset with original dataset</td>
</tr>
<tr>
<td>poi_pipeline.py</td>
<td>build pipeline for GridSearch of each algorithm</td>
</tr>
<tr>
<td>poi_validate.py</td>
<td>validate the model whoes parameters are tuned by GridSearch</td>
</tr>
<tr>
<td>poi_plot.py</td>
<td>create the figures about data loss count</td>
</tr>
<tr>
<td>tester.py</td>
<td>a tools provided by Udacity to test trained model</td>
</tr>
<tr>
<td>tools/feature_format.py</td>
<td>a tools provided by Udacity to reform dataset for machine learning</td>
</tr>
</tbody>
</table>

## Reference

<table>
<tbody>
<tr>
<td>Udacity</td>
<td>https://www.udacity.com/</td>
</tr>
<tr>
<td>Enron Corporation</td>
<td>https://en.wikipedia.org/wiki/Enron</td>
</tr>
<tr>
<td>The Enron Corpus</td>
<td>https://en.wikipedia.org/wiki/Enron_Corpus</td>
</tr>
<tr>
<td>Support Vector Classifier</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html</td>
</tr>
<tr>
<td>Linear Support Vector Classifier</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html</td>
</tr>
<tr>
<td>Logistic Regression</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html</td>
</tr>
<tr>
<td>Decision Tree</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html</td>
</tr>
</tr>
<tr>
<td>KMeans</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html</td>
</tr>
<tr>
<td>GridSearchCV</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.grid_search.GridSearchCV.html</td>
</tr>
<tr>
<td>Pipeline</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html</td>
</tr>
<tr>
<td>StratifiedShuffleSplit</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.cross_validation.StratifiedShuffleSplit.html</td>
</tr>
<tr>
<td>StratifiedShuffleSplit</td>
<td>http://scikit-learn.org/stable/modules/generated/sklearn.cross_validation.StratifiedShuffleSplit.html</td>
</tr>
<tr>
<td>LogReg vs LSVC 1</td>
<td>https://www.quora.com/What-is-the-difference-between-Linear-SVMs-and-Logistic-Regression</td>
</tr>
<tr>
<td>LogReg vs LSVC 2</td>
<td>http://stats.stackexchange.com/questions/95340/comparing-svm-and-logistic-regression</td>
</tr>
<tr>
<td>What is the influence of C in SVMs with linear kernel?</td>
<td>http://stats.stackexchange.com/questions/31066/what-is-the-influence-of-c-in-svms-with-linear-kernel</td>
</tr>
<tr>
<td>Introduction to Machine Learning with Python and Scikit-Learn</td>
<td>http://kukuruku.co/hub/python/introduction-to-machine-learning-with-python-andscikit-learn</td>
</tr>
<tr>
<td>Using Pipeline and GridSearchCV for More Compact and Comprehensive Code</td>
<td>https://civisanalytics.com/blog/data-science/2016/01/06/workflows-python-using-pipeline-gridsearchcv-for-compact-code/</td>
</tr>
</tbody>
</table>