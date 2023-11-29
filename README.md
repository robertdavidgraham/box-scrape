# Scraping Jan6 videos
=========

The Republican-control US House of Representatives have 
[posted](https://cha.house.gov/cha-subcommittee-reading-room-fe781e74-d577-4f64-93cc-fc3a8dd8df18)
 90 hours (out of the claimed 40,000) of surveillance videos from within the
Capitol during the Jan6 invasion. They've been posted in such a way
to prevent people from downloading them.

In this project, I'm attempting to figure out a way to download them, using
scraping tools.

I'm not terribly skilled or experienced at this. I'm just using my general knowledge
of hacking the web rather than specific knowledge of how best  scrape things.

## The Box.com Filesharing service

`Box.com` seems like a competitor to Dropbox, whereby you can easily share files
on the web, and share with other users of the service.

What the House did was simply share the Box.com page within their own
webpage, using an IFRAME. The actual URL is 
[this one](https://app.box.com/s/448e1d6zw0hvwmekg3nb4bkpsuk0wfhj), which
you can click on, bypassing the `house.gov` website. (I get this by clicking
on the Chrome DevTools `inspect` feature in order to grab the raw URL).

I've signed up for a free account and tried to sync the videos to my local
hard-dive, like I would with Dropbox. But I can't figure out how it'll work.
It appears to have been configured so that you can only **preview** these
files, but not **download** them.

The **preview** feature uses one the zillions of JavaScript video players.

## `yt-dlp`

If I can't download the files from `Box.com`, the next obvious solution
would be scrape them using the **YouTube Downloader** project. This is a
famous project first created to scrape videos from YouTube. It was
expanded to scrape vidoes from a wide variety of webistes -- including `Box.com`.

Such scrapers attempt to "play" the video as normal. Sometimes they can accelerate
this, effectively just "downloading" the videos quickly. Sometimes the scraper
has to sit there and play the video at normal speed, in other words, taking an
hour to download an hour-long video.

The latest version is the project [`yt-dlp`](https://github.com/yt-dlp/yt-dlp).
I downloaded and tried it, but it won't work. I've played with it a bunch
trying variations of URLs for each of the files, and can't get it to work.

I suspect I can play more with Chrome Devtools (to watch how the webpage grabs files)
and debug the `yt-dlp` code, which is something I'll probably do next.

## Puppeteer

I suspect the problem with `yt-dlp` is that the `Box.com` website detects the
scraper and generates errors.

A way to fix this is to use **headless Chrome**. This is a project that runs
Chrome in a "headless" mode, where the webpage is rendered off screen. It
otherwise acts like a full version of Chrome, so that the website won't
know it's being scraped.

You can script Puppeteer, sending comands to it simulating a user clicking
on links.

I've got two scripts.

The [first script](get-urls.js) download a list of all the video URLs. This works,
and I've put all the file links in [`urls.json`](urls.json).

The [second script](get-video.js) takes one of those URLs and attempts to download the 
video. This script sometimes works getting the first 13 segments of 
video, but I can't seem to get it to work past that point. Most of
the time it doesn't even get that, for mysterious reasons.

I suspect it's detecting scraping, such as clicking on the video
link too fast.

## Shaka player

Using Chrome DevTools in the browser, looking at network requests,
you can see that it's using 
[Shaka Player](https://github.com/shaka-project/shaka-player).

I think the next thing I'll try is interact with that, changing
some of its functions in order to request all the segments. I
need to get the Puppeteer script working better first.







