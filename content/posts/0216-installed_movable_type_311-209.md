---
sortOrder: 216
entryId: '209'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: __default__
categoryId: '5'
originalCategoryId: '5'
title: Installed Movable Type 3.11
excerpt: >-
  This site is now running Movable Type 3.11.  I did a fresh install working
  side-by-side with my old install of 2.661.  That way I could test the new
  install before releasing it into the wild.  Good thing as there were a number
  of minor things that needed to be resolved.  The only thing that I haven't
  fixed is the code that does the 'related posts' on my indivual post pages.  So
  that is disabled right now.  That uses Brad Choate's MySQL plugin, and it
  isn't mentioned on the [MT Plugins](http://www.mt-plugins.org "Movable Type
  Plugin Directory") page whether it's supported my MT3 or not. 
  But I wasn't getting an error though either when using that code, just nothing
  was outputting, so I might have to research the error a bit more.  It's more
  than likely some minor mistype on my part somewhere.
keywords: mt3 movable type sql brad choate errors upgrade cron crontab
createdOn: '2004-10-01 20:01:29'
modifiedOn: '2011-10-17 15:46:06'
basename: installed_movable_type_311
atomId: 'tag:www.cbulock.com,2004://2.209'
weekNumber: '200440'
routeYear: '2004'
routeMonth: '10'
routeKey: 2004/10/installed_movable_type_311
canonicalRouteEntryId: '209'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
This site is now running Movable Type 3.11.  I did a fresh install working side-by-side with my old install of 2.661.  That way I could test the new install before releasing it into the wild.  Good thing as there were a number of minor things that needed to be resolved.  The only thing that I haven't fixed is the code that does the 'related posts' on my indivual post pages.  So that is disabled right now.  That uses Brad Choate's MySQL plugin, and it isn't mentioned on the [MT Plugins](http://www.mt-plugins.org "Movable Type Plugin Directory") page whether it's supported my MT3 or not.  But I wasn't getting an error though either when using that code, just nothing was outputting, so I might have to research the error a bit more.  It's more than likely some minor mistype on my part somewhere.
One thing I realized.  Movable Type needs some way to do a complete import and export.  It was easy to export and import the actual entries themselves.  The templates on the other hand were a PITA.  Unfortuantly I decided to make everything on this page in little pieces, so I have a good 25 or more templates.  Fortuantly they are all linked to a file so I just needed to create the templates and copy over the links to the template files.  Still was not simple though as I also have to reset up the preferences and the archive file templates.  At least I could copy this info from my current version 2.661 install. If I had to set this all back up from scrath, I would be screwed.  I have backups of all the entries and templates, but that isn't quite enough.
But, after installing all that, I had to move on to the plug-ins.  I went through and found out which ones I was using, then had to investigate any possible conflicts MT3.  The only one that seemed to have an issue was the Rebuild plugin that could rebuild pages set using a crontab.  It seems there are likley easier ways to do this now in MT3 since the backgrounds task feature is built in and there are ways that plugins can do tasks using crontabs.  Also, there might be a SQL plugin issue, but can't verify that yet.
So, if anybody finds any issues with anything, please [contact me](http://www.cbulock.com/contact_me.html).  I have spent a lot of time today trying to make sure this was a smooth transition, but I have no doubt I missed something somewhere.
