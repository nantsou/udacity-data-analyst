# P7: Design an A/B Test

#### Nan Tsou Liu 2016/09/05
created at 2016/09/03

## Summary

Udacity currently have two option on the home page: "start free tail", 
and "access course materials".

Students will be asked for the payment info and be enrolled in paid 
version of the course when they press "start fee tail". After 14 days,
the students will be charged automatically unless they cancel the course.

On the other hand, students who press "access course materials" will be 
able to watch the videos and take the quizzes for free.

Udacity demonstrated the experiment that implement a popup screener that
asking students for the time per week they can devote to the course.  

If students indicate 5 or more hours per week, they will be indicated to 
checkout process as usual. However, if students indicate the time less
than 5 hours, a message will suggest they to access the course materials 
for free.

The hypothesis was that this mechanism might help to reduce the number 
of frustrated students who left the free trial because they 
didn't have enough time.

If this hypothesis held true, Udacity could improve the overall student 
experience and improve coaches' capacity to support students who are 
likely to complete the course.

The unit of diversion is a cookie, although if the student enrolls 
in the free trial, they are tracked by user-id from that point forward. 
The same user-id cannot enroll in the free trial twice. 
For users that do not enroll, their user-id is not tracked 
in the experiment, even if they were signed in when they visited 
the course overview page.

## Experiment Design

### Metric Choice

>List which metrics you will use as invariant metrics and evaluation metrics here.

***Invariant Metric***

- Number of cookies
- Number of clicks
- Click-through-probability

***Evaluation Metric***

- Gross conversion
- Retention
- Net conversion

>For each metric, explain both why you did or did not use it as an invariant metric and why you did or did not use it as an evaluation metric. Also, state what results you will look for in your evaluation metrics in order to launch the experiment.

***Number of cookies*** was chosen as invariant metric because unit of diversion is cookies and 
it's evenly distributed in control and experiment group. Also, the visits happen before 
the users see the experiment and thus independent from it.

***Number of clicks*** was chosen as invariant metric because the screen is popup 
after the students clicked "start free trial". Thus, the click happens before
the students are indicated to control or experiment group. Besides, the overview
pages kept unchanged for both control and experiment group.

***Click-through-probability*** was chosen as invariant metric is because the clicks are occurred before the users see the experiment, therefore it is does not depend on our test which is an excellent invariant metric.

***Gross conversion*** was chosen as evaluation metric because it is about
 the number of enrollment after clicking "start free trial", which directly
affected by control and experiment group. The screener asks the students for the time they would like to devote to taking the course. Therefore, we can expect that the students who responded to the screener have considered their ability and availability to make the decision to get enrolled or to take the course for fee. On the other hand, the students who did not encounter the screen are expected to take 14-day trial because they can utilize more the service during the first 14 days. And then to make the final decision on the last day of trial. Namely, we can expect that ```Gross conversion``` shall be higher of control group than that of experiment group.

***Retention*** was primarily chosen as evaluation metric because the number of 
students who keep enrolled after finished 14-day trial should be affected by 
whether screener is shown or not. As we expect that screener can help the students make the decision before they click "start free trial". Therefore, the students who clicked "start free trial" shall be aware of their availability to take the course. But the students who did not encounter the screener are not. Thus, we can expect to see the results that ```Retention``` of experiment group is higher than that of control group.

***Net conversion*** was chosen as evaluation metric because it is the final
results of previous two metrics. For the experiment group, students are aware of 
the time commitment requirement through the screener and can make a decision
to remain enrolled after 14-days trial. On the other hand, the students in 
the control group, they may to continue the payment without being aware of 
the minimum time requirement. This metric is the final results after the previous two metric, ```Gross converion``` and ```Retention```. So, we would like to see whether the screener is effective to ```Net conversion``` or not. And we expect to see a positive statistically and practically significant chage in ```Net conversion```. 

***Number of User-ID*** was ***NOT*** chosen as any metric because it is
not a idea metric. First of all, cookies is the unit of diversion. So, this
metric is not expected to be invariant during the experiment. Besides, user-ID
is recorded after the students got enrolled. Thus, it is expected to be changed
between control and experiment group. Therefore, this metric was not considered
as invariant metric. On the other hand, unlike other candidates of evaluation
metrics, user-ID is a count rather than the fraction  and it was not normalized.
Thus, this metric was also not considered as evaluation metric. 

#### Requirements for launching this experiment
As the requiremetns for launching this experiment with the consideration of our hypothesis, ```Gross conversion``` would decrease significantly, which indicates whether the cost will be lower by introducing the screener; while ```Net conversion``` would not decrease significantly, which indicates that the introduction of the screener would affect revenues. Besides, according to the definition, ```Retention``` equal to ```Net conversion``` divided by ```Gross conversion```. ```Retention``` would eventually increase if ```Gross conversion``` and ```Net conversion``` meet the requirements to launch the experiment. Thus, ```Retention``` is not considered to be a necessary requirement in this case.

---

### Measuring Standard Deviation

>List the standard deviation of each of your evaluation metrics

According to the quiz of the course, the sample size was set to 5000. Therefore, the following values 
used to calculate the standard deviation were scaled with the value given in baseline.

```
Unique cookies to click "Start free trial" per day: 400
Enrollments per day: 82.5
```

The results of analytical estimation are shown below.

```
Gross conversion: 0.0202
Retention: 0.0549
Net conversion: 0.0156
```

As the data of post experiment, the sample size is around 10000 rather than 5000. So, I also carried 
out the empirical estimation. 

Here is the results of empirical estimation

```
Gross conversion: 0.0143
Retention: 0.0389
Net conversion: 0.0110
```


>For each of your evaluation metrics, indicate whether you think the analytic estimate would be comparable to the the empirical variability, or whether you expect them to be different (in which case it might be worth doing an empirical estimate if there is time). Briefly give your reasoning in each case.

The results of both ```Gross conversion``` and ```Net conversion``` were calculated by 
using ```number of cookes``` as the denominator, which indicated that the unit of diversion is 
equal to the unit of analysis. Thus, analytical estimate is comparable to the empirical variability.
And the results above also support this conclusion.

On the other hand, the result of ```Retention``` was calculated by using 
```number of users enrolled the courses```, which is different form the unit of diversion.
And the results shows that analytical estimation is different from empirical estimation.

---

### Sizing

#### Number of Samples vs. Power

>Indicate whether you will use the Bonferroni correction during your analysis phase, and give the number of pageviews you will need to power you experiment appropriately.

***Bonferroni correction is NOT used in this analysis***

The sample size was calculated by [evanmiller](http://www.evanmiller.org/ab-testing/sample-size.html)

The parameter for alpha and beta is :
```
alpha: 0.05
beta: 0.2
```

The minimum detectable effect of each evaluation metric were set as follows:
 
```
dm_gc: 0.01
dm_r: 0.0075
dm_nc: 0.01
```

Thus, the primary results of sample size are 

| Metric | Sample Size |
| ------------- | ------------- |
| Gross conversion | 25,835 |
| Retention | 39,115 |
| Net conversion | 27,413 |

And then, considering ```ratio of pageviews to click``` is 0.08 and 
```ratio of pageviews to enrollment``` is 0.0165. Besides, we have two groups in the experiment.

Therefore, the final sample size of each evaluation metric were calculated as follows:

```
Gross conversion:
    (25835/0.08)*2 = 645875.0

Retention:
    (39115/0.0165)*2 = 4741212.121212121 ~ 4741213

Net conversion:
    (27413/0.08)*2 = 685325.0
```

***Summary***

| Evaluation Metric | Sample Size |
| ------------- | ------------- |
| Gross conversion | 645,873 |
| Retention | 4,741,213 |
| Net conversion | 685,325 |

So, as the results above, the required page views (simple size) is  4,741,213.

#### Duration vs. Exposure

>Indicate what fraction of traffic you would divert to this experiment and, given this, how many days you would need to run the experiment.

According to the assumptions in baseline, If we divert 100% of traffic,given 40,000 page views per day,
the experiment would take about 119 days. But it takes too long to carry out the experiment. Thus,
I would like to remove ```Retention``` from the experiment. Therefore, the required page views became
685,325.

In this case, I would like to divert 100% of traffic. Therefore, The total days required for this
experiment would be about 18 days, which is a reasonable duration in my opinion.

>Give your reasoning for the fraction you chose to divert. How risky do you think this experiment would be for Udacity?

The fraction of Udacity's site traffic is highly affected by the risk tolerance of both Udacity's business
and students. Basically, I think the risk is quite low of this experiment. 

First, there is no student will be limited to any operation caused by the experiment. 
The students who responded to the screener with the time less than 5 hours still can take the course
for free or even have 14-day trial. Thus, there won't be any student whose right get hurt during the experiment. 
Besides, according to the metric we used during experiment, there is no personal information or 
any sensitive information will be collected.

Second, this experiment would not affect any existing content of Udacity except adding a screen.
The probability of trouble occurring caused by bug should be extremely low. And adding a screen would
not significantly increase burden of Udacity website or change database. 

Based on these reasons, I would like to divert 100% of traffic. Therefore, The total days required for this
experiment would be about 18 days.
 

## Experiment Analysis

### Sanity Checks

>For each of your invariant metrics, give the 95% confidence interval for the value you expect to observe, the actual observed value, and whether the metric passes your sanity check.

The expected value of both number of cookies and number of clicks is set to
0.5 because I expected the number of cookies and clicks is divided evenly
between control and experiment group.

As the results below, Number of cookies and number of clicks passed the 
sanity checks. Besides, comparing with the observed values,
we can check whether these two metric are reliable.

For click-through-probability, the observed value of control group was 
used to construct the confident interval. And then comparing it with the 
observed value of experiment group. As the result below, 
click-through-probability also passed the sanity check.

***Calculation***

```
## Number of cookies
Total page views of control group: 345543
Total page views of experiment group: 344660
Total page views : 690203
Expected value: 0.5
Observed value: 0.5006
Confident interval: [0.4988, 0.5012]

## Number of clicks
Total clicks of control group: 28378
Total clicks of experiment group: 28325
Total clicks : 56703
Expected value: 0.5
Observed value: 0.5005
Confident interval: [0.4959, 0.5041]

## Click-through-probability
Click-through-probability of control group: 0.0821258135746
Click-through-probability of experiment group: 0.0821258135746
Confident interval: [0.0812, 0.0830]

```

***Summary***

| Metric | Observed Value | CI Lower Bound | CI Higher Bound | Result |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| # of Cookies | 0.5006 | 0.4988 | 0.5012 | PASS |
| # of clicks on "start free trial" | 0.5005 | 0.4959 | 0.5041 | PASS |
| Click-through-probability | 0.0822 | 0.0812 | 0.0830 | PASS |

---

### Result Analysis

>For each of your evaluation metrics, give a 95% confidence interval around the difference between the experiment and control groups. Indicate whether each metric is statistically and practically significant.

***Bonferroni correction is NOT used in this analysis***

For each metrics, the statistical and practical significance were tested.
The minimum detectable effect of ```Gross conversion``` and ```Net conversion```
was set to ```(-)0.01``` and ```(-)0.0075``` respectively.

As the results below, ```Gross conversion``` is both statistically 
and practically significant. However, ```Net conversion``` is neither
statistically nor practically significant but the negative minimum detectable
effect is within the range of the confident interval.

***Calculation***

```
## Gross conversion
Minimum Detectable Difference: 0.01
Observed Difference: -0.0206
Confident interval: [-0.0291, -0.0120]

## Net conversion
Minimum Detectable Difference: 0.01
Observed Difference: -0.0049
Confident interval: [-0.0116, 0.0019]
Joeys-MacBook-Pro:scripts Joey$ 
```

***Summary***

| Metric | min. detectable effect | Observed Diff. | CI Lower Bound | CI Higher Bound | Result |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| Cross conversion | 0.01 | -0.0205 | -0.0291 | -0.0120 | statistical and practical significance |
| Net conversion | 0.0075 | -0.0048 | -0.0116 | 0.0019 | neither statistical nor practical significance |

---

### Sign Tests

>For each of your evaluation metrics, do a sign test using the day-by-day data, and report the p-value of the sign test and whether the result is statistically significant.

First, I counted the number of the trial and the number of success of each
metric. If the absolute value of p hat of experiment group is greater than 
that of control group, then it is counted as success.
After the counting, the two-tail p-value is calculated 
on [GrpahPad - Quick Cal](http://graphpad.com/quickcalcs/binomial1.cfm)
with the parameters, probability is 0.5 and 95% confidence.

As the results below, the two-tail p-value of ```Gross conversion``` is
0.0026, which is much less than 0.025. On the other hand, the two-tail 
p-value of ```Net conversion``` is 0.6776, which indicates that it is 
not statistically significant.

***Counting***

```
## Gross conversion
Number of trial: 23
Number of success: 4

## Net conversion
Number of trial: 23
Number of success: 10
```

***Summary***

| Metric | # of trial | # of success | p-value | Statistical Significance |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| Cross conversion | 23 | 4 | 0.0026 | yes |
| Net conversion | 23 | 10 | 0.6776 | no |

---

### Summary

>State whether you used the Bonferroni correction, and explain why or why not. If there are any discrepancies between the effect size hypothesis tests and the sign tests, describe the discrepancy and why you think it arose.

According to our hypothesis, two effects were required to be 
considered, so that we can not base our decision in any one of two metrics.
However, the Bonferroni correction is designed to control type I error
when any one of multi-metrics are used to base the launch decision, which 
the risk of type I errors increases as the number of metrics increases.
Back to our case, both two metrics are required to be considered, which implies that 
the risk of type II errors increases as the number of metrics increases.
Therefore, the Bonferroni correction is not used because 
controlling type I error is not what we look for.

As the results that ```Gross conversion``` is both statistically 
and practically significant. But ```Net conversion``` is not.
```Gross conversion``` dropped in experiment group by 2%, which means that
the screener is effective at reducing the number of students that enrolled 
from initial click. And it supports the hypothesis if the screener is to be 
effective. On the other hand, ```Net conversion``` decreased about 0.5%, which
indicates that the screener had a negative effect on the number of the students
who would complete 14-day trial. This is not our intended effect and does not 
support the hypothesis.

The results of sign test are corresponding to effect size test, that 
```Gross conversion``` is both statistically and practically significant but
```Net conversion``` is not. 

---

### Recommendation
 
The results of ```Gross conversion``` is significant that the screener would
reduce the number of the student that enrolled from initial click, so that the 
students who are not confident to finish the course would not get enrolled.
it indirectly decrease the number of the students left the free trial. However,
```Net conversion``` unfortunately failed to reject null hypothesis that the 
screener is not effective to reduce the number of the student who would continue
on past the 14-day trial. Moreover, the confident interval does include the negative of 
the practical significance boundary. there is the risk that launching the experiment 
results in the decrease in number of students who paid for the course. And that is 
against to the second part of our hypothesis.
As the conclusion, my recommendation is that we should ***NOT*** launch the experiment.

---

## Follow-Up Experiment

>Give a high-level description of the follow up experiment you would run, what your hypothesis would be, what metrics you would want to measure, what your unit of diversion would be, and your reasoning for these choices.

The purpose of the follow-up experiment is how to reduce the number of the frustrated students who cancel early in the course. A way to achieve this goal is to help the frustrated students to rebuild the confidence to the study and make them have a sense of accomplishment.

The course have several quizzes (quiz page) among the videos and some courses are followed by a problem set (ProblemSet page). About the quiz page, there is "View Answer" button on it. The students can easily access to the answer rather than figure out the answer when they got frustrated.
Actually, it is not a good studying habit. They may get frustrated more when they are taking a problem set or working on the final project of the course. Because there is no any access to the answers.

Therefore, I would like to propose that adding ***"Hint"*** button to quiz pages and ProblemSet pages.

First, we can replace ***"View Answer"*** button with ***"Hint"*** button. The students can get more information to solve the quizzes by pressing ***"Hint"*** button rather than the answer directly. The information can be designed well to guide the students how to figure out the answer. Or to help the students build a more concrete image of the quizzes so that they may be able to get the key points of the quizzes and the courses. It may help the students to rebuild the confidence to the study.
 
Second, we can add ***"Hint"*** button to ProblemSet pages. Students may get frustrated more when they are taking the problem set because there is no access to the answers. ***Hint*** button can provide the students with the information about that which video in the course can help them to clear the problem, or to give them more concrete image of the problems. By this way, the students may get the sense of accomplishment when they completed the problem set.

Therefore, I would like to test ***whether adding _"Hint"_ button to quiz and ProblemSet pages help to reduce the number of the frustrated students who cancel early in the course***.

And the follows are the design of the experiment.

***Null hypothesis*** is that adding ***"Hint"*** button on the quiz and ProblemSet pages do ***NOT*** decrease the number of the students who cancel early in the course.

***Unit of diversion*** is ```user-ID```. the students who click "start free trail" and get enrolled in the course will be tracked by ```user-ID```. Because the purpose is to see the whether students will promote their motivation and further continue the course by the effect of ***"Hint"*** button.

***Invariant metric*** is ```user-ID```. First, the unit of diversion is ```user-ID```.
Second, only the students who got enrolled in the course are the target in the experiment.
Third, it should be invariant between experiment and control group.

***Evaluation metric*** is ```Retentsion```. It is a perfect metric to evaluate this experiment as its definition is that number of user-ids to remain enrolled past the 14-day boundary (and thus make at least one payment) 
divided by number of user-ids to complete checkout. And we expect to see the positive statistically and practically significant change, which indicates that the number of the frustrated students who cancel early in the course is decreased by adding ***"Hint"*** button on quiz and ProblemSet pages.

This experiment will be launched if we can observe a positive statistically and practically significant change.

## Reference

- [Introduction to A/B Testing (Udacity)]()
- [evanmiller](http://www.evanmiller.org/ab-testing/sample-size.html)
- [GrpahPad - Quick Cal](http://graphpad.com/quickcalcs/binomial1.cfm)
- [How and when to use the Bonferroni adjustmetn](http://stats.stackexchange.com/questions/65942/how-and-when-to-use-the-bonferroni-adjustment)
- [Statistics for Bioinformatics (berkeley)](http://www.stat.berkeley.edu/~mgoldman/Section0402.pdf)

## Files

- README.md: The main content of the reports
- data/baseline.csv: the data of base line of the experiment
- data/control.csv: the data of control group
- data/experiment.csv: the data of experiment group
- scripts/cal.py: the script used to calculate the terms of this report.