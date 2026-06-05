---
contentFormat: markdown
sortOrder: 336
entryId: '331'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '5'
originalCategoryId: '5'
title: Updated Livesearch for Movable Type
excerpt: >-
  Last month when I finished my site redesign, one thing I also ended up doing
  was recreating the Livesearch feature I have on here.  This was not something
  I had planned on doing, but I messed something up with the old one and I was
  unable to fix it.

  Just for some background, my [original
  Livesearch](http://www.cbulock.com/2004/10/improved_site_search.html "Improved
  Site Search") was based on [some
  Javascript](http://blog.bitflux.ch/wiki/LiveSearch "LiveSearch") and a[PHP
  search script for Movable
  Type.](http://depository.unfoldedorigami.com/php/bettersearch.phpx "Slightly
  Better Search for Movabletype")

  What had happened, is I messed something up rendering the PHP search to no
  longer work.  I spent hours going over all the code and going through my
  database to try and find a reason, couldn't figure it out.  So, instead, I
  decided to set the Livesearch to work with the built-in Movable Type search
  instead.
keywords: movable type livesearch
createdOn: '2005-07-20 10:18:48'
modifiedOn: '2011-10-17 15:46:06'
basename: updated_livesearch_for_movable_type
atomId: 'tag:www.cbulock.com,2005://2.331'
weekNumber: '200529'
routeYear: '2005'
routeMonth: '07'
routeKey: 2005/07/updated_livesearch_for_movable_type
canonicalRouteEntryId: '331'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
Last month when I finished my site redesign, one thing I also ended up doing was recreating the Livesearch feature I have on here.  This was not something I had planned on doing, but I messed something up with the old one and I was unable to fix it.

Just for some background, my [original Livesearch](http://www.cbulock.com/2004/10/improved_site_search.html "Improved Site Search") was based on [some Javascript](http://blog.bitflux.ch/wiki/LiveSearch "LiveSearch") and a[PHP search script for Movable Type.](http://depository.unfoldedorigami.com/php/bettersearch.phpx "Slightly Better Search for Movabletype")
What had happened, is I messed something up rendering the PHP search to no longer work.  I spent hours going over all the code and going through my database to try and find a reason, couldn't figure it out.  So, instead, I decided to set the Livesearch to work with the built-in Movable Type search instead.

To do this, you will still want to follow the [installation instructions](http://blog.bitflux.ch/wiki/LiveSearch#Installation "LiveSearch") to get the HTML setup on your page and the Javascript setup.  There's going to be one change to the livesearch.js file I will mention later.

To setup a search template, you will need to upload a new file to the search_templates folder of your MT install.  The file should be named livesearch.tmpl.  Here is what the file should contain:

```
<MTSearchResults>

<MTBlogResultHeader>

<strong>SEARCH</strong> : Results for "<$MTSearchString$>"

<ul class="LSRes">

</MTBlogResultHeader>

<li class="LSRow">

<a href="<$MTEntryLink$>"><$MTEntryTitle$></a>

</li><!--LSRow-->

</MTSearchResults>

<MTNoSearchResults>

<ul class="LSRes">

<li class="LSRow">

No results for "<$MTSearchString$>"

</li><!--LSRow-->

</MTNoSearchResults>

</ul><!--LSRes-->
```

The next thing you will want to do is open your mt.cfg file and add the line "AltTemplate ls livesearch.tmpl" without the quotes.  This will tell Movable Type to use this search template and gives it an ID of "ls".
Now all you will need to do is edit the livescript.js file.  You will need to look for `liveSearchReq.open("GET", liveSearchRoot + "/livesearch.php?q=" + document.forms.searchform.q.value + liveSearchParams);` and replace it with `liveSearchReq.open("GET", liveSearchRoot + "/mt/mt-search.cgi?SearchElement=both&SearchCutoff=99999&MaxResults=10&Template=ls&search=" + escape(document.forms.searchform.q.value));`

You may need to adjust that line so it points to your mt-search.cgi script.  Also, the SearchElement=both can be changed to SearchElement=entries if you don't want comments included in your search and the MaxResults can be what you would like.

Once you've done this, you should be all set to go using Livesearch on your Movable Type-based site.
