# nµa frontend

<p style="text-align:center">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAACACAYAAACP+K52AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAACFElEQVR42u3dTYoaQRyG8beKEVfeYK7gypxDausFzAWCKwVXHqIv4LbwHLqIYC9ygeBqFrMZmKH+WcSFJIFItLqrwvNcoOkfL439AboQgiljMUanglsul1nP34sEMMAEMMAAE8AAA0wAA0wAAwwwAQwwwAQwwAATwAATwAADTAADDDABDDABDDDABDDAABPAAANMAANMAAMMMAEMMMAEMMAEMMAAE8AAA0wAAwwwAQwwAQwwwAQwwAATwAATwAADTH/vKfcBQgh7SU1Kabvb7V5LOOnFYjEaDoczM5vnPpbL/UclV71K2kpqYoyHPmBXq9UkpTR3zs0kjbo4ZpfA1x26WvUva510faJ9AWdfdR9rLRH4oavue62lA//zqktZay3AN626xLXWCPzbqsfjsUpday+/gx/USNJc0tzM5JxTLXEnBzDABDDAABPAAANMAANMAAMMMAFcSF08D/6kn89yq3hAfkcfzrlvkk5m1prZwcz22YEv79U+T6fTL9772QV7Ujnmi6TWOXeQdEoptYPBYL9er9/6WLAk6fJOrZHUhBAmlaz6j6vcbDbfS7pE1LLqm1dZ2jW4tFXfvcpqgDtYdZZVVgl856o7XWXVwDes+tnMjt77rymlo/f+eD6f26Zp3ks8h+wfnsQY6/mIgTs5gAlggAEmgAEGmAAGmAAGGGACGGCACWCAASaAASaAAf6f+gEJDBKnEtzLXwAAAABJRU5ErkJggg==" />
</p>

Nordic Microalgae is a source of information about microalgae and related organisms in the Nordic area, i.e the Baltic Sea, the North East Atlantic and lakes, rivers and streams in the area. It is used for science, education, environmental monitoring etc. The content is mainly supplied by the users.

The application contains a taxonomical backbone, species sheets and images supplied by registered and approved contributors. Images can be searched for in a number of ways to make it easier to find alternatives when working with species indentification.

## History

In 1996 the web site [Checklist of phytoplankton in the Skagerrak-Kattegat](http://www.smhi.se/oceanografi/oce_info_data/plankton_checklist/ssshome.htm) was launched by Bengt Karlson and Mats Kuylenstierna at Göteborg University, Sweden.

Most of the image content was produced using analogue video technique and the web pages were to a large extent produced using manual html-coding. Since then digital photography and digital video have become ubiquitous and technological advances in information technology can be used to share and disseminate information about marine organisms more efficiently.

In 2007 the inter-regional EU project Forum Skagerrak II provided initial funding for transferring the [Checklist of phytoplankton in the Skagerrak-Kattegat](http://www.smhi.se/oceanografi/oce_info_data/plankton_checklist/ssshome.htm) to modern web site technology. This site was never published officially due to lack of long term funding. The name was B-NEAT (Baltic and North East Atlantic Taxa).

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
