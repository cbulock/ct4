---
contentFormat: markdown
sortOrder: 505
entryId: '533'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: __default__
categoryId: '15'
originalCategoryId: '15'
title: DataAdmin Class 1.08 Update
excerpt: >-
  I made a small little update to the <a
  href='http://www.cbulock.com/dataadmin/'>DataAdmin class</a> today.  This is
  the first update in close to a year.  All I did was add the ability to set a
  variable 'editable' to FALSE which then disables being able to click on data
  to edit it.  This was simply a feature I needed for part of a backend update
  to this site. 
keywords: database adminstration dataadmin php
createdOn: '2007-06-25 19:22:10'
modifiedOn: '2011-10-17 15:46:06'
basename: dataadmin_class_108_update
atomId: 'tag:www.cbulock.com,2007://2.533'
weekNumber: '200726'
routeYear: '2007'
routeMonth: '06'
routeKey: 2007/06/dataadmin_class_108_update
canonicalRouteEntryId: '533'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I made a small little update to the <a href='http://www.cbulock.com/dataadmin/'>DataAdmin class</a> today.  This is the first update in close to a year.  All I did was add the ability to set a variable 'editable' to FALSE which then disables being able to click on data to edit it.  This was simply a feature I needed for part of a backend update to this site.  I still have some major changes I plan to make to this class,  probably for a 1.1 version.  The big things I want are the ability to add callback before and after running various processes.  For instance, an image database might need to actually delete the image off the disk after deleting the entry from the database, so a callback could be triggered to handle that.  My image backend on this site basically doesn't allow deleting images for that reason right now.
The other feature I want to add is for the class to actually handle taking XML data, performing database controls, then returning XML.  That way apps could be designed however they want and still have full transparency from handling the raw database.  This goes somewhat against the original intentions of this class, which was the ability to quickly develop a frontend to a database with almost no HTML coding, but this will allow more flexibility and sites could use a hybrid of the current setup and one where the HTML code is fully their own.  I also will probably add the ability to have just PHP array variables to be sent back as results and also quite likely JSON to allow for some nice AJAX database controls.
I'd also even like to allow for a plugin type system where current functions in the class could be extended and added new feature by the outside code, but this would require more PHP knowledge on my end, and I don't really see too much of a new for that.  There are just times when it seems like certain things really don't need to be added to the main class, they could just be patched in for the particular implementation I am using.
