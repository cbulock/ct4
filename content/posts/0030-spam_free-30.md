---
sortOrder: 30
entryId: '30'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: __default__
categoryId: '4'
originalCategoryId: '4'
title: Spam Free!
excerpt: >-
  I now have my spam under control.  I have pretty much just been every day
  deleting all my spam one by one, and had a few filters set to look for a
  couple of keywords that I get all the time (basically Viagra, and
  Enlargement).  But, now the e-mails have those spelt funny (such as
  V.i.a.g.r.a. or Vaigra).  So they miss the filters.  Plus, I get tons of other
  mail anyway.  Now I have a real tool, and it works with my e-mail app.
keywords: bayesian spam filter POPFile Opera
createdOn: '2003-09-09 01:02:56'
modifiedOn: '2011-10-17 15:46:06'
basename: spam_free
atomId: 'tag:www.cbulock.com,2003://2.30'
weekNumber: '200337'
routeYear: '2003'
routeMonth: 09
routeKey: 2003/09/spam_free
canonicalRouteEntryId: '30'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I now have my spam under control.  I have pretty much just been every day deleting all my spam one by one, and had a few filters set to look for a couple of keywords that I get all the time (basically Viagra, and Enlargement).  But, now the e-mails have those spelt funny (such as V.i.a.g.r.a. or Vaigra).  So they miss the filters.  Plus, I get tons of other mail anyway.  Now I have a real tool, and it works with my e-mail app.  I see many tools for Outlook and Outlook Express, but I am using the Opera M2 e-mail app that's included in the <a href="http://www.opera.com">Opera</a> browser.  I'm using <a href="http://popfile.sourceforge.net/">POPFile</a> which is an open source app. It's called a bayesian filter which means it uses bayesian logic.   It pretty much means it's a learning filter.  At first, it doesn't do a very good job, but after only a day of use, it's already working with over 90% accuracy.
Every time you get mail, it takes a record of the mail and categorizes it as either good or bad.  You can set it so if it is spam, it will change the e-mail header to say [spam] at the beginning.  That way, you can set a filter in your e-mail program to move spam to a separate folder.
If the program categorizes the mail wrong, you go into the app and recatagorize it.  The program is then better able to determine what type of mail should go where.  The more you have to recatagorize the mail, the better it gets in the future.
Some more details on the working of this app. It acts as a proxy server, so you have to change your e-mail settings in your mail client to point to your own machine (i.e. use IP address 127.0.0.1, or use the name localhost)
To actually access the app, it uses a web style interface that you access through your browser.  You can access this by going to http://localhost:8080.  Once you go there, you can change all your settings and reclassify your mail.  
I have a feeling by the end of the week, this app will have my mail up to 99% accurate.  This will be very nice as my mailbox was getting very messy there for a while.
