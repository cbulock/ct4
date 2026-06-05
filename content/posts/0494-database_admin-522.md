---
contentFormat: markdown
sortOrder: 494
entryId: '522'
blogId: '3'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: null
originalCategoryId: null
title: Database Admin
excerpt: ''
keywords: ''
createdOn: '2007-05-10 20:48:39'
modifiedOn: '2007-11-11 16:23:09'
basename: database_admin
atomId: 'tag:www.cbulock.com,2007://3.522'
weekNumber: '200719'
routeYear: '2007'
routeMonth: '05'
routeKey: 2007/05/database_admin
canonicalRouteEntryId: '522'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
This PHP class makes it very easy to manage simple data stored in a MySQL database.  At this time I'm currently just releasing the source code, examples and better documentation should follow.  I've been using this code for over a year now on a number of projects, some fairly important.  I can ensure that I haven't had any problems and all the data has been managed properly.  At the same time, I can't be responsible if this trashes your database.

This code is released under the [LGPL](http://www.gnu.org/licenses/lgpl.txt).

[Basic documentation](http://www.cbulock.com/dataadmin/info.txt)

Releases:

- [11/11/2007 1.11](http://www.cbulock.com/dataadmin/1.11/dataadmin.class)
  New auto_output function.  Creating interfaces is never easier now.  Literally no HTML is required now. Added delete button to edit pages. Corrected bug in 1.10 that broke the 'No' button when confirming deletions.
- [07/31/2007 1.10](http://www.cbulock.com/dataadmin/1.10/dataadmin.class)
  Added support to connect to database through class allowing easily switching between multiple databases and no need for your own connection code. Also added the subdispcol info.  Added support for a password field that will store passwords using a hash.
- [07/02/2007 1.09](http://www.cbulock.com/dataadmin/1.09/dataadmin.class)
  Added populate function to replace the populate select function.  populate takes an additional value to populate both radio or select inputs. populateRadio function was also added as an alias to the populate function, added $id variable so any column can be used for IDs.  Added 'where' SQL ability to the populate functions.
- [06/25/2007 1.08](http://www.cbulock.com/dataadmin/1.08/dataadmin.class)
  Added ability to control whether items could be editted
- [07/09/2006 1.07](http://www.cbulock.com/dataadmin/1.07/dataadmin.class)
  Added radio inputs and added label tags in proper places
- [07/01/2006 1.06](http://www.cbulock.com/dataadmin/1.06/dataadmin.class)
  Added populateSelect function to pull data in from other tables
- [06/11/2006 1.05](http://www.cbulock.com/dataadmin/1.05/dataadmin.class)
  Fixed a bug with the categories involving text encoding and a bug with saving checkbox inputs
- [06/10/2006 1.04](http://www.cbulock.com/dataadmin/1.04/dataadmin.class)
  Added pagination system to item display
- [05/29/2006 1.03](http://www.cbulock.com/dataadmin/1.03/dataadmin.class)
  Fixed some issues with HTML encoding of the inputs and an issue with the form ids

- 05/27/2006 1.02
  Added support for sorting columns either ascending or descending
- 05/22/2006 1.01
  Added support for sorting data by certain columns
- 05/19/2006 1.0
  Inital release
