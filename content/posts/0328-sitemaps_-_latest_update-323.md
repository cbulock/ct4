---
contentFormat: markdown
sortOrder: 328
entryId: '323'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '5'
originalCategoryId: '5'
title: Sitemaps - Latest Update
excerpt: >-
  I have updated my sitemap and the new one is now based on [Niall Kennedy's
  template](http://www.niallkennedy.com/blog/archives/2005/06/google_sitemaps.html
  "Google Sitemaps using Movable Type") that he created.  This template outputs
  the exact same sitemap I had setup before, but that one was using the [sitemap
  generator](https://www.google.com/webmasters/sitemaps/docs/en/sitemap-generator.html
  "Installing and executing Sitemap Generator") and a config.xml file along with
  a urllist.txt file that was outputted using Movable Type.  This new template
  just outputs the XML file straight from Movable Type.  The template I created
  outputs the main index page, all individual archives and also monthly and
  category archive links in the sitemap.
keywords: google sitemap movable type template
createdOn: '2005-06-06 11:39:51'
modifiedOn: '2011-10-17 15:46:06'
basename: sitemaps_-_latest_update
atomId: 'tag:www.cbulock.com,2005://2.323'
weekNumber: '200523'
routeYear: '2005'
routeMonth: '06'
routeKey: 2005/06/sitemaps_-_latest_update
canonicalRouteEntryId: '323'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I have updated my sitemap and the new one is now based on [Niall Kennedy's template](http://www.niallkennedy.com/blog/archives/2005/06/google_sitemaps.html "Google Sitemaps using Movable Type") that he created.  This template outputs the exact same sitemap I had setup before, but that one was using the [sitemap generator](https://www.google.com/webmasters/sitemaps/docs/en/sitemap-generator.html "Installing and executing Sitemap Generator") and a config.xml file along with a urllist.txt file that was outputted using Movable Type.  This new template just outputs the XML file straight from Movable Type.  The template I created outputs the main index page, all individual archives and also monthly and category archive links in the sitemap.

Here is my latest template:

```
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.google.com/schemas/sitemap/0.84"

xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84

http://www.google.com/schemas/sitemap/0.84/sitemap.xsd">

<url>

<loc><$MTBlogURL encode_xml="1"$></loc>

<changefreq>daily</changefreq>

<MTEntries lastn="1">

<lastmod><$MTEntryModifiedDate format="%Y-%m-%dT%H:%M:%S"$><$MTBlogTimezone$></lastmod>

</MTEntries>

<priority>1.0</priority>

</url>

<MTArchiveList archive_type="Individual">

<url>

<loc><$MTArchiveLink encode_xml="1"$></loc>

<lastmod><$MTArchiveDate format="%Y-%m-%dT%H:%M:%S"$><$MTBlogTimezone$></lastmod>

<priority>0.8</priority>

</url>

</MTArchiveList>

<MTArchiveList archive_type="Category">

<url>

<loc><$MTArchiveLink encode_xml="1"$></loc>

<changefreq>weekly</changefreq>

<priority>0.7</priority>

</url>

</MTArchiveList>

<MTArchiveList archive_type="Monthly">

<url>

<loc><$MTArchiveLink encode_xml="1"$></loc>

<changefreq>monthly</changefreq>

<priority>0.5</priority>

</url>

</MTArchiveList>

</urlset>
```

To set this up on your own installation, simply copy the code into a new index template and set it to output as sitemap.xml or whateveryouwant.xml.

:::footer-note
Update:I made a minor modification to this template so that the main index template also gives a lastmod time.  This is based on what [Anders Jacobsen](http://www.jacobsen.no/anders/blog/archives/2005/06/06/google_sitemaps_for_movable_type_now_with_correct_last_modified_dates.html "Google SiteMaps for Movable Type - now with correct Last Modified dates") had created for a Sitemap template.  I might setup his comment idea too, but not right now.  To see my latest template, [this is the actual template](http://www.cbulock.com/templates/Sitemap "Sitemap") I have in live use.
:::
