---
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
  I have updated my sitemap and the new one is now based on <a
  href="http://www.niallkennedy.com/blog/archives/2005/06/google_sitemaps.html"
  title="Google Sitemaps using Movable Type">Niall Kennedy's template</a> that
  he created.  This template outputs the exact same sitemap I had setup before,
  but that one was using the <a
  href="https://www.google.com/webmasters/sitemaps/docs/en/sitemap-generator.html"
  title="Installing and executing Sitemap Generator">sitemap generator</a> and a
  config.xml file along with a urllist.txt file that was outputted using Movable
  Type.  This new template just outputs the XML file straight from Movable
  Type.  The template I created outputs the main index page, all individual
  archives and also monthly and category archive links in the sitemap.
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
<p>I have updated my sitemap and the new one is now based on <a href="http://www.niallkennedy.com/blog/archives/2005/06/google_sitemaps.html" title="Google Sitemaps using Movable Type">Niall Kennedy's template</a> that he created.  This template outputs the exact same sitemap I had setup before, but that one was using the <a href="https://www.google.com/webmasters/sitemaps/docs/en/sitemap-generator.html" title="Installing and executing Sitemap Generator">sitemap generator</a> and a config.xml file along with a urllist.txt file that was outputted using Movable Type.  This new template just outputs the XML file straight from Movable Type.  The template I created outputs the main index page, all individual archives and also monthly and category archive links in the sitemap.</p>

<p>Here is my latest template:</p>

<code>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;<br />
&lt;urlset xmlns="http://www.google.com/schemas/sitemap/0.84"<br />
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"<br />
xsi:schemaLocation="http://www.google.com/schemas/sitemap/0.84<br />
http://www.google.com/schemas/sitemap/0.84/sitemap.xsd"&gt;<br />
<br />
&lt;url&gt;<br />
&lt;loc&gt;&lt;$MTBlogURL encode_xml="1"$&gt;&lt;/loc&gt;<br />
&lt;changefreq&gt;daily&lt;/changefreq&gt;<br />
&lt;MTEntries lastn="1"&gt;<br />
&lt;lastmod&gt;&lt;$MTEntryModifiedDate format="%Y-%m-%dT%H:%M:%S"$&gt;&lt;$MTBlogTimezone$&gt;&lt;/lastmod&gt;<br />
&lt;/MTEntries&gt;<br />
&lt;priority&gt;1.0&lt;/priority&gt;<br />
&lt;/url&gt;<br />
<br />
&lt;MTArchiveList archive_type="Individual"&gt;<br />
&lt;url&gt;<br />
&lt;loc&gt;&lt;$MTArchiveLink encode_xml="1"$&gt;&lt;/loc&gt;<br />
&lt;lastmod&gt;&lt;$MTArchiveDate format="%Y-%m-%dT%H:%M:%S"$&gt;&lt;$MTBlogTimezone$&gt;&lt;/lastmod&gt;<br />
&lt;priority&gt;0.8&lt;/priority&gt;<br />
&lt;/url&gt;<br />
&lt;/MTArchiveList&gt;<br />
<br />
&lt;MTArchiveList archive_type="Category"&gt;<br />
&lt;url&gt;<br />
&lt;loc&gt;&lt;$MTArchiveLink encode_xml="1"$&gt;&lt;/loc&gt;<br />
&lt;changefreq&gt;weekly&lt;/changefreq&gt;<br />
&lt;priority&gt;0.7&lt;/priority&gt;<br />
&lt;/url&gt;<br />
&lt;/MTArchiveList&gt;<br />
<br />
&lt;MTArchiveList archive_type="Monthly"&gt;<br />
&lt;url&gt;<br />
&lt;loc&gt;&lt;$MTArchiveLink encode_xml="1"$&gt;&lt;/loc&gt;<br />
&lt;changefreq&gt;monthly&lt;/changefreq&gt;<br />
&lt;priority&gt;0.5&lt;/priority&gt;<br />
&lt;/url&gt;<br />
&lt;/MTArchiveList&gt;<br />
<br />
&lt;/urlset&gt;
</code>

<p>To set this up on your own installation, simply copy the code into a new index template and set it to output as sitemap.xml or whateveryouwant.xml.</p>

<p class="footer_note">Update:I made a minor modification to this template so that the main index template also gives a lastmod time.  This is based on what <a href="http://www.jacobsen.no/anders/blog/archives/2005/06/06/google_sitemaps_for_movable_type_now_with_correct_last_modified_dates.html" title="Google SiteMaps for Movable Type - now with correct Last Modified dates">Anders Jacobsen</a> had created for a Sitemap template.  I might setup his comment idea too, but not right now.  To see my latest template, <a href="http://www.cbulock.com/templates/Sitemap" title="Sitemap">this is the actual template</a> I have in live use.</p>
