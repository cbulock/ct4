---
sortOrder: 533
entryId: '564'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '5'
originalCategoryId: '5'
title: Site Rewrite Underway
excerpt: >-
  I've made a decision to start a rewrite of this entire site from the ground
  up. Cameron's Thoughts 3.0 will be the next generation code base that this
  site will be based on.  I started a [wiki to track
  progress](http://www.cbulock.com/ct3/) and to record idea's and such.  When I
  created Cameron's Thoughts 2.0, I didn't have my idea's well organized and it
  became somewhat troublesome near the end.  I got things together and
  everything turned out fine, but this project will be way more immense and I
  have a much better idea of what I am in for now, so I am able to better plan
  ahead.  The following is my current info taken from the wiki.
keywords: cameron's thoughts 3.0 wiki
createdOn: '2008-01-13 23:35:37'
modifiedOn: '2011-10-17 15:46:06'
basename: site_rewrite_underway
atomId: 'tag:www.cbulock.com,2008://2.564'
weekNumber: '200802'
routeYear: '2008'
routeMonth: '01'
routeKey: 2008/01/site_rewrite_underway
canonicalRouteEntryId: '564'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I've made a decision to start a rewrite of this entire site from the ground up. Cameron's Thoughts 3.0 will be the next generation code base that this site will be based on.  I started a [wiki to track progress](http://www.cbulock.com/ct3/) and to record idea's and such.  When I created Cameron's Thoughts 2.0, I didn't have my idea's well organized and it became somewhat troublesome near the end.  I got things together and everything turned out fine, but this project will be way more immense and I have a much better idea of what I am in for now, so I am able to better plan ahead.  The following is my current info taken from the wiki.

#### History

There's a detailed history on Cameron's Thoughts 2.0 changes that happened after it was released at [Cameron's Thoughts - About This Site](http://www.cbulock.com/about_this_site.html "http://www.cbulock.com/about_this_site.html").

Basically, I first started Cameron's Thoughts as a default install of Movable Type on June 22, 2003.  There was a number of changes made to the stylesheet and templates, but that was about it.  I then decided to rewrite all the stylesheets and templates from scratch.

Thus, Cameron's Thoughts 2.0 was born.  It was about 9 months of work total.  The first few months were basically total research.  This was research into how to properly code to produce 100% valid XHTML, full accessibility and also for search engine optimization.  Really, if you do the first two properly, the third one pretty much falls into place.  I also had to really learn CSS as I only had limited understanding of it at that point. On June 21, 2005, a day before the two year anniversary of my site, Cameron's Thoughts 2.0 was launched.  This was an exciting day for me as it was the completion of a number of months of hard work.  Plus, I actually made a deadline I set for myself. Since the release of Cameron's Thoughts 2.0, I have become very strong at coding with PHP. The initial Cameron's Thoughts 2.0 code had some PHP, but it was limited.  I've released numerous enhancements since, including a fully database backed image system, a user/authentication system, and moved the comments off of Movable Type and onto my own code.  There are tons of other things also added since then, and the site is mostly written in PHP now.

#### Problems

Coding for Cameron's Thoughts 2.0 started in 2004 and fully completed my dream of what I wanted back then.  Four years have since past and the site does not seem perfect as it once did and doesn't live up to my current standards.

- Speed

Speed is a major issue with the current site.  On a entry page, it takes an average of 0.93 seconds for the page to load.  This may not seem like a lot, but most other sites will average under 0.2 seconds.  Basically, I feel it's noticeable enough and makes the site feel sluggish on a high speed connection.  I've spent a lot of time optimizing code where I've seen potential to improve things, but from what I can tell, the problem is with the core design of the site and my current efforts have been fruitless.

- Code Maintenance

At this point, the code feels hacked together.  There is limited organization.  Every time a new system is added to the site, it's mostly just been hacked into the current code.  The authentication system is a prime example.  It's one of those things that the site should be designed around, instead it was place on top of everything else.  I feel it's well integrated at this point, but the back of my mind tells me that there is got to be some problem somewhere in the implementation that I'm not seeing as nothing else was coded with it in mind.

- Modernization

The site doesn't utilize any modern site features such as Ajax.  And adding these features on would be an immense project.

#### Goals

Here are the basic goals that I have lined up for Cameron's Thoughts 3.0.  I will add more detail in the future.

- Continue to use 100% valid code and follow accessibility standards.
- Use Ajax to improve user experience.
- Make sure any use of Javascript degrades gracefully and is fully separated from the structure.
- Move away from Movable Type and use a completely homegrown CMS solution designed specifically for this site.
- Develop a caching system that will help combat any high load situations (I have already been working on a caching system for another project that will work well here)
- Migrate some of the current system such as the stats, authentication and comments and better integrate them into the new code.
- Develop a templating system for the CMS this site will run on.  I have also tinkered with this before.
- Possibly create a plugin system so future site enhancements will be easier to add on.
