---
sortOrder: 354
entryId: '347'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '5'
originalCategoryId: '5'
title: SimpleComments on Movable Type 3.2
excerpt: >-
  I have been using the
  [SimpleComments](http://kalsey.com/2003/02/simplecomments/ "SimpleComments")
  plugin from [Adam Kalsey](http://kalsey.com/blog/ "Adam Kalsey") for a while
  now.  When MT3 came out, there was an update required since moderated comments
  were still being displayed.  After Movable Type 3.2 came out, I noticed that
  trackbacks that were sent to the junk folder were being displayed.  They
  wouldn't display right away, but if something else triggered a page to
  rebuild, the trackback would display.  I notified Adam about this, but I know
  he is probably busy, and me being impatient, I decided to try and tackle this
  myself.
keywords: movable type simplecomments simple comments trackbacks
createdOn: '2005-09-08 19:06:34'
modifiedOn: '2011-10-17 15:46:06'
basename: simplecomments_on_movable_type_32
atomId: 'tag:www.cbulock.com,2005://2.347'
weekNumber: '200536'
routeYear: '2005'
routeMonth: 09
routeKey: 2005/09/simplecomments_on_movable_type_32
canonicalRouteEntryId: '347'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I have been using the [SimpleComments](http://kalsey.com/2003/02/simplecomments/ "SimpleComments") plugin from [Adam Kalsey](http://kalsey.com/blog/ "Adam Kalsey") for a while now.  When MT3 came out, there was an update required since moderated comments were still being displayed.  After Movable Type 3.2 came out, I noticed that trackbacks that were sent to the junk folder were being displayed.  They wouldn't display right away, but if something else triggered a page to rebuild, the trackback would display.  I notified Adam about this, but I know he is probably busy, and me being impatient, I decided to try and tackle this myself.  It actually only required a minor update to two lines of code.  I hope this is working right. So far it seems to work on my installation.  I have never done any Perl programming, so, use at your own risk.  Here is the updated plugin I created that should fix the MT3.2 trackback issue.

[SimpleComments 1.321](http://www.cbulock.com/downloads/SimpleComments.zip "SimpleComments 1.321")

This is also open source BTW, [MIT License](http://opensource.org/licenses/mit-license.php "MIT License")

:::footer-note
UPDATE: (9-9-2005) I updated the code for the plugin and it now contains the code based on the work done by Joe D'Andrea.  This one should work no matter what version of MT you have, though it isn't needed unless you have version 3.2.
:::
