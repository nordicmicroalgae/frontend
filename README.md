# nµa frontend

<p style="text-align:center">
    <svg viewBox="0 0 11 16" width="88" height="128"><path d="M 0 0 L 0 16 L 3 16 L 3 12 L 5.5 13 L 5.5 10 L 3 9 L 3 0 L 0 0 Z" fill="rgb(80, 80, 80)" /><path d="M 8 0 L 11 0 L 11 12 L 5.5 13 L 5.5 10 L 8 9" fill="rgb(124, 124, 124)" /></svg>
</p>

Nordic Microalgae is a source of information about microalgae and related organisms in the Nordic area, i.e the Baltic Sea, the North East Atlantic and lakes, rivers and streams in the area. It is used for science, education, environmental monitoring etc. The content is mainly supplied by the users.

The application contains a taxonomical backbone, species sheets and images supplied by registered and approved contributors. Images can be searched for in a number of ways to make it easier to find alternatives when working with species indentification.

## History

In 1996 the web site [Checklist of phytoplankton in the Skagerrak-Kattegat](http://www.smhi.se/oceanografi/oce_info_data/plankton_checklist/ssshome.htm) was launched by Bengt Karlson and Mats Kuylenstierna at Göteborg University, Sweden.  Most of the image content was produced using analogue video technique and the web pages were to a large extent produced using manual html-coding. Since then digital photography and digital video have become ubiquitous and technological advances in information technology can be used to share and disseminate information about marine organisms more efficiently. In 2007 the inter-regional EU project Forum Skagerrak II provided initial funding for transferring the [Checklist of phytoplankton in the Skagerrak-Kattegat](http://www.smhi.se/oceanografi/oce_info_data/plankton_checklist/ssshome.htm) to modern web site technology. This site was never published officially due to lack of long term funding. The name was B-NEAT (Baltic and North East Atlantic Taxa).

## Codebase

Technically the system is divided into some clearly separated parts:

* A core data layer
* A web user interface

## How to run locally

Install project dependencies:

```
yarn install
```

Start webpack development server:

```
yarn run start
```
