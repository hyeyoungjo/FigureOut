# FigureOut
Personalized Summarization and Visualization Tool of Academic Papers for Literature Study

* [Prototype Webpage](https://hyeyoungjo.github.io/FigureOut/)
* [Presentation Slides](https://www.figma.com/proto/WMHtTZlzMnwpZYeUYZaXo6/%EB%94%94%ED%94%84?node-id=182%3A2485)
* [Report](https://drive.google.com/file/d/1jQnKCj7O1-yU6LaByNU9jDwdxGZYREYd/view?usp=sharing)

## Problem Statement
Finding ‘the perfect paper’ is challenging for all levels of researchers, whether novices or experts, with various
reasons. First, current article search engines show the search result with limited text-based information such as
title, author, and abstract which isn’t enough to infer the article’s content at glance. Second, the current system
gives the same information on an article of all researchers without considering their different purpose and
interest. To reduce the burden of researchers figuring out if an article is valuable or not, we need to develop a
personalized summarization and visualization tool of academic papers for literature study.

## Proposed Solution: Various Visualization Feature with Personalized View
Our search tool, FigureOUT visually summarizes the articles in four ways to enable researcher’s intuitive and
efficient understanding of articles.

![The FigureOUT interface showing search result of “VR” (Left: main page, Right: detail page).](/img/explain.png)

A. Figure Cards show search result as a list of cards with thumbnails extracted from articles.
B. Proportion Bar visualize how much each section of the paper takes up to help researchers guess the
construction of the article without opening the PDF file.
C. Content Icons labels a paper according to the number of graphs, images, and formulas to enable quick
grasp an idea of what to expect from the paper.
D. Figure Wall collects images from multiple papers in one big frame to explore vague ideas and compare
multiple papers in more visually intuitive ways.
In addition, the thumbnail extraction of Figure Cards and Figure Wall is different for all researchers based on
their real-time search history and pre-defined area of interest. Researchers also have autonomy to choose
between AI data-driven and user-chosen visual summary with the filter function of Figure Wall (E).

## Value
Researchers can save tremendous time searching and discerning useful articles fitting their intent with
FigureOUT. This time saved in finding papers will be spared for research itself and contribute to produce
high-quality researches from a broad perspective. For more information, please read our paper.
Final Thoughts & Next Steps
There are several limitations. For one, different format other than PDF is needed for more optimized data
collection automation. Moreover, in order to more reliably evaluate and develop our system further, we need to
increase the data sample size more than 100 papers and beyond VR and AR related domain.

## Contributors
All UX design in the prototype was ideated and conceived together by all team members.
* Hye-Young Jo - User Interface, front-end development
* Minha Lee - User Interface, front-end development
* Wooseok Kim - back-end data management and fake AI models
* Yeonsoo Kim - front-end development(lead)

## Environment
* Chrome
