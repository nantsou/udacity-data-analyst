# P6: Make Effective Data Visualization

#### Nan Tsou Liu 2016/08/16

## Summary

By this data visualization, I presented the population structure of Japan in 2014. The goal is to realize contemporary population structure of Japan. As we know that decreasing birth rate and aging population in Japan, this visualization shows the age structure and the population growth of each prefecture. We can find out that aging populations happen at the prefectures in contryside like Akita, Toyama, Shimane and Yamaguchi, where the aged populations occupy over 30% of the local population. On the other hand, the population growth almost affected by migratory increase at the prefecture cityside, like Tokyo, Saitama, Kanagawa, which are the most crowded prefectures in Japan. It matches the phenamena that young people move to cityside to look for the job. But elders would not leave thier hometown. Besides, nowadays the thinking that not to have children is very common in young generation's mind in Japan.

## Design

### Charts

First, I used ***choropleth map*** to present the distribution of local population in each prefecture. With the popup inforamtion, the actual number of local populations, local population densities and the percentage of male and felame in each prefecture are presented. The purpose of ***choropleth map*** is that I would like to show the population distribution of Japan. The map can give the readers the image how big that prefectrue is and the hue can tell the readers that which prefecture has most population or whihc prefecture has less population. 

Second, the ***doughnut chart*** was used to show the age structure of each local population and total population in percentage. ***doughnut chart*** is a good chart to show the percentage of each age range. The values tell the readers the actual percentage of a cartain age range. And the area of the segment give the readers the readers primary image that how many the number of people in a certain age range is.

Third, the ***bar chart*** was used to show the number of population growth of each prefecture and Japan. It includes the information about _births_, _deaths_, _immigrants_ and _emmigrants_. Besides, information about natural increase, migratory increase and population is calculated by following definition. It challenged me how to present the population growth with a chart. Finally, I decided to use bar chart because the length of a bar can give the readers the qunatity of each item is more or less. And it is convenient to compare each item with others. the items with the same y position imply that there are in the same category like _births_ and _deaths_ belong to the category called natural increase. Besides, I used the bar with different height to show taht it is the summation of the items with the same y position. Furthermore, the direction in the bar chart also can indicate this item is positve or negetive.

    births = the number of borned people.
    deaths = the number of dead people.
    immigrants = the number of poeple who move in the area.
    emmigrants = the number of people who move out from the area
    natural increase = births - deaths
    migratory increase = immigrants - emmigrants
    population growth =natural increase + migratory increase


### Visual coding

First of all, I used hue to address the difference in population of each prefecture. Whithin the popup information, I used different figures to refer the different information.

Second, I used color to show different age ranges in donughnut chart with the actual percentage values inside each segment.

Third, in bar chart, color is also used to identify the different term. Basically, red is for increasing, blue is for decreasing, gray is for natural increase and migratory increase and dark gray is for population growth. By the way, the follows show the definition of each term.

Fourth, I used the dots with different colors to connect geographic information with the points in the description.

### Layout

Layout is developed from the choropleth map of Japan, which is to give the readers the primay image of population structure. I got many feedback about that it was hard to realize the hue legend of map and popup legend of map's popup information as I put them together. Thus, I change the orientation of hue legend into vertial align and moved it to the right side of the map. Besides, I utilized the popup information on the map when hovering in a prefecture. The popup information shows simplest and most important informatin of the population of each prefecture which I expected the readers can get at first. 

The shape of Japan did limit the space I could used. I put the doughnut chart and bar chart on the right top side, where should be the good poistion to catch the readers' attention. Because we are used to reading from right top side to left down. So, the readers would not miss out that doughnut chart and bar chart are changed when hovering in a prefecture in the map. 

After I considered the position of description block, I decided put it at the right down side. It is because of that first it is not changed by hovering in any prefecture so that the readers would not be distract from the map and chrats at the right top side. Second, I hope that the readers to read the description after they have the primary image of the population of Japan. I also added the colored dots on the map, which means I would like to tell some simple story about the prefectures with a dot on them.

## Feedback & Iteration

### Sketch

- [First Sketch](first_sketch)
- [Second Sketch](second_sketch)
- [Third Sketch](third_sketch)

### Revised

Second Sketch:
- made the information in legends more detail and esaer to understand
- changed the color from diverging hue to qualitative color on doughnut chart
- made the definitions of population growth more clear
- Added the description of the data visualization
- Added the dots with different colors to connect geographic information with the points in description
- Rearranged the positions of each item except the map.
- removed the number of households in popup information.
- added population density to popup information.
- added more detailed descriptions to design section. _after first review_
- added the description to layout section. _after first review_
- added comments and semi-colon to javascript file _after first review_


Third Sketch:
- reformed bar chart. _after second review_

### TODO

- To fit mobile's screen
- To arrange the position of OKINAWA (the most south part of Japan)

### First Sketch

***Feedback @Oleg Leyzerov***
>Hi Joey,
that looks great! I like that I can get some information from the visualization and everything is moving nicely.
I would mention 2 things:
1. I'm looking at your project from 11" display and should scroll down to see the part of the map of Japan. When I scroll down, I miss some information from the header. Maybe it makes sense to reshape the visualization a little bit to eliminate unnecessary movements.
2. It would be great to hear your story about the data. Please have a look at the post of Cole Nussbaumer here: http://www.storytellingwithdata.com/blog/2012/10/my-penchant-for-horizontal-bar-graphs.
It might inspire you to rephrase the header and add some highlights where you want us to pay special attention.
Once again, very impressive visualization.
Thanks﻿

***Reply***
>About the first comment, I am thinking two way to solve this issue. The one is to separate "Okinawa" from the whole map and then move it to place next to the whole map. But it needs more work to tell the readers the correct relative positions between the whole map and "Okinawa". The other way is to fixed the other blocks of the information so that the readers still can read the information even if the screen is being scrolled down.
About the second issue, I will try to composite an appropriate story corresponded to the visualized data.
Thank you very much for your great feedbacks.

---

***Feedback @John Enyeart***
> I think it's pretty good. There's a lot of interesting information. I agree with Oleg about "telling a story" with the data. Also, most of the data seems pretty self-explanatory, except I'm not totally sure of what total net growth vs. sub net growth is. My guess would be that TNG is the total change in population for a prefecture, while SNG is separated into "Natural" and "Domestic Migratory". Whether my guess is right or wrong, my point is that the meaning is not obvious right away like most of the other data is, so some very concise explanation would be helpful.

***Reply***
>Besides the comment that make a story, thank you for pointing out that the descriptions in population growth graph are not clear. Yes, what you are guessing is right. SUB NET GROWTH means the net growths of natural and domestic migratory growth. It is a kind of mistake that I usually make because I know the actual data. I will make the descriptions of that more clear. What I am thinking is that, is it appropriate to add the extra descriptions at other place to make the graph clean? Anyway, I will figure out the best way to solve this issue.
Thank you very much for your great feedbacks.

---

***Feedback @Martin Breuss***
>Wow, that's a great and ambitious visualization!
I like that you are using multiple angles to take a look at the data at the same time.
My takeaway: population is decreasing in every prefecture of Japan! There is no single one with an overall net growth. This is very interesting and could maybe be highlighted some more.
Two suggestions:
1) Maybe "Net GROWTH" is not the right way to express this, since there really is no growth anywhere (if I correctly understand your graphs). If the story you want to tell is the population decrease, then you could try to highlight this more also with the wording.
2) The legend atop the right hand corner is confusing for me. Since both the color gradient legend and the legend with the symbols is laid out above each other and facing in the same direction, I first was looking for how the two are connected. I thought that the colors encode somehow for "Population", "Male Percentage" etc. So I'd suggest to orientate the legend of symbols in a different way or in a different spot.
Also the formatting of the legend under the doughnut chart could be improved by aligning the items underneath each other and naming them clearly an consistently.
Your visualization is very full and dense, maybe there is a way to lighten it up a bit by using spacing somehow.
All in all I think it's a great project and a very interesting information you are providing. Try to carve out the story a bit more and skim the page so that it is easy and straightforward to look at.
Good luck for re-working it, and great choice for a visualization : D﻿

***Reply***
>About your first comment, I am also confused about how to express the term right. I have searched for it on the internet. I was thinking that the net growth with negative value means negative growth. Thus, I will check for it again. Besides, I have not decided the story I want to present to the readers. But all of you is giving me a big help. Thank you very much for pointing out this issue. 
About your second comment, thank you very much for pointing out that the legends on the right upper side will confuse the readers. I will make them more clear by separating them and changing the orients of color gradient legend.
About the suggest of the doughnut chart legend, I am sorry for that I do not catch the meaning of "underneath each other". Do you mean that put every description underneath the value in the doughnut chart?
Thank you very much for your great feedbacks.

---

***Feedback @Jamey McCabe***
>Use of D3 and the mouseover actvity for each prefecture is very impressive technically and very satisfying as a user. Leads me to keep mousing over back and forth to explore. I have to admit I like to explore data and trends though so that leads to first and same point as from Oleg, 
1. that we would like to be lead through the data by you at first and given some explanation as to why this is interesting and perhaps even if it proves or disproves some common belief about Population.
2. the coloring is a duplicative between population by age and population scale and though I figured it out left me wondering for a while if the colors were supposed to be the same.
2. I first loaded it on a mobile device and the various widgets overlapped and wrapped strangely. 
Great visualization﻿

***Reply***
>I am using "datamaps" ( https://datamaps.github.io/ ) to visualize the data on the map. It is a great library.
About your first comment, thank you for pointing out there is no story about my data visualization. Just what they commented above, I will make a story to make my visualization more meaningful. 
About your second comment, I was thinking to make the color consistent at the beginning. However, I finally changed the color used in bar chart. Thank you very much to point out this issue. I will change the color on doughnut chart.
About your third comment, Yes, I am also frustrated with this issue. Because I used lots of "position: absolute" to arrange the position. And actually I am also thinking that the map will be too small to read on mobile screen. Thus, I currently suspend this issue and suppose that the readers would observe my visualization with PC.
Thank you very much for your feedback

---

***Feedback @Uday Goel***
>Hi Joey,
I think the presentation is pretty impressive. The colour palette is very good and is comfortable on the eyes. I have listed some of my thoughts here:
1. I found that it took me some time to understand what was being presented. The visuals are very good but they seem compressed on to one screen and this causes some confusion. For example, the colour and symbol legend on top is related to the map and the bar chart and pie chart are linked to the prefecture selected on the map. This linkage is not clear at the start. At first glance, I found it difficult to understand why there is a legend with the symbols for gender, home and population when no such symbols were being used on the screen. May be you could make it easier for viewer to understand where to start and how to use the visuals.
2. I have assumed that the colour legend on top is for the population of a prefecture but there is no description for it.
3. I think the bar chart needs a bit more description on the legends. For example, there is a bar for "Increase" and another for "Decrease". When I see them against "Natural", I was expecting to see if the population has increased or decreased but not both. On more thinking, I realise that this is probably the sums of individual items with increase or decrease in population. It is not clear what these items are (maybe, households?) and so what is the takeaway from having the "increase" and "decrease". Hence, I ended up focussing mainly on the "Net". 
4. Another situation I could see with few prefectures was that the "increase" and "decrease" amounts are fairly big which results in a re-scaling of the x-axis. The subnet amounts are much smaller (as would be expected) and these numbers are no longer readable on the re-scaled x-axis. Since the x-axis is rescaled for each prefecture, I can't do a visual comparison of the subnet and net values either. I am not sure what the fix can be as it really depends on the message you want to give the viewer.
Hope you find these useful. The visualisation looks neat and comfortable with good colour palette, font size and easy to remember symbols. 
Thanks
Uday

***Reply***
>About your first and second comment, I have received several comments about this issue. I will rearrange the positions of each item. And thank you very much for pointing out what can be improved.
About your third comment, I am working on adding more descriptions to each item including the story of this data visualization. Besides, I am also working on making each legend more easier to understand. 
About your fourth comment, after reading your comment, I am also aware of that it is quite difficult to compare the information of each prefectures with others. I will figure out how to add such item that the readers can easily observe the whole information at the same time.
Thank you very much for your great feedbacks.

---

### Second Sketch

***Feedback @John Enyeart***
>It looks good overall, but maybe a little bit cluttered. Maybe move either the pie chart or the Population Growth bar chart to the lower right and give everything a little bit more room to breathe.
The definitions of NET GROWTH vs TOTAL NET GROWTH are a little confusing because the only difference is that NET GROWTH has "Death and Immigrants" while TOTAL NET GROWTH has "Death + Immigrants", which sounds like the same thing to me. Also, while a mathematical equation is a very precise definition, I think that for the average viewer (and even mathy-types who are into data science like me), a brief sentence explaining the definitions is a little bit more palatable. I would really only want the exact math formula if I was trying to reproduce your results.﻿

***Reply***
>Just like what you commented, I also feel that the page looks so crowded after I added the information to it. I will try to rearrange the positions so that the reader can feel a little bit more comfortable. 
About your second comment, thank you very much for pointing out the definitions of these terms. It is great idea that using the formula only to describe the bar chart. I will check how to describe them correctly. Martin Breuss has mentioned that maybe "NET GROWTH" is not the right way to describe this. It should be natural increase and migratory increase. I will fix them.
Thank you very much for your feedbacks.

***Feedback @Udacity Reviewer After First Review***

>1. The code has some comments although most of the code doesn't. In general, each major function should have a comment letting the reader know what the function does and what part of the visualization it renders. I can see the argument that it isn't necessary because of the descriptive function names, but for the purposes of this project, please at least put some commenting for each major chunk of code.There were also spots that had relatively complex code that wasn't commented. I'm not expecting that every line of code is commented. I tried to give an idea in the code review of a couple of spots that could use more commenting.Try putting yourself in the shoes of somebody who has absolutely no context about what your code does or how it works. What information would this person minimally need to have a broad understanding of the logic in the code.

>2. The only required change I had was that the main explanatory chart is missing an x-axis label. I didn't realize right away exactly what those numbers represented until I had explored for of the charts and noticed up top that it said "-0.269 M people", which I assume meant 269,000 people. So make sure that the visualization is clearly labeled. It could be something like "number of people in millions".

>3. The README file discusses what the initial encodings were and what they showed. But it doesn't really discuss the reasoning behind the decisions. To meet specifications, the README file should discuss why these design decisions were made.For example, why was a choropleth map chosen? Why was this the best way to show the data to the reader? A sorted bar chart could have been used, for example. So what did the choropleth add that couldn't be communicated through a bar chart? Why were the popups added?Same type of questions for the donut and bar charts. What were the characteristics of the data that led to the decisions to use these charts? How was the layout of the charts decided?


***Reply***
>I added the contents depended on the feedback.

***Feedback @Udacity Reviewer After Second Review***
>There is 1 aspect of the design that made it difficult for me to see the difference in positive and negative growth on the bar chart.The color used to fill the bar is gray whether or not the change is positive. The axis for the origin ('0.0' mark) is also hard to see. These 2 things combined with the fact that those prefectures with positive population growth show a relatively small amount make it difficult to see when a prefecture has positive growth.

***Reply***
>The presentation of population growth with bar chart was challenging me, because I wanted to include too much information with limited space. Eventually, I decided to reform the bar chart to make it more clear and easier to understand.


## Reference & Resource

- [Statistic Bureau JP](http://www.e-stat.go.jp/SG1/estat/eStatTopPortal.do)
- [Statistic Bureau EN](http://www.stat.go.jp/english/data/index.htm)
- [Datamaps](http://datamaps.github.io/)
- [Datamaps Japan map](https://github.com/markmarkoh/datamaps/tree/master/dist)
- [D3](https://github.com/d3/d3/wiki)
- [Bl.ocks](https://bl.ocks.org/)
- [Bl.ocks - Bar Chart I](https://bl.ocks.org/mbostock/7322386)
- [Bl.ocks - Dough Chart](https://bl.ocks.org/mbostock/3887193)
- [Font Awesome](http://fontawesome.io/)
- Lots of stackoverflow and googling when troubleshooting!
