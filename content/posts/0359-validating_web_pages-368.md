---
sortOrder: 359
entryId: '368'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '15'
originalCategoryId: '15'
title: Validating Web Pages
excerpt: >
  Thought I would share this bit of code as some people might find it useful. 
  Ever since I started working to make sure my pages were compatible, I have
  come up with a number of things to help me to accomplish this.  Now, every
  page on this site should be fully xHTML compliant and I have setup a number of
  backend protections to stop most things from causing the sites to stop
  validating.  One thing I wrote was a simple PHP function that can be used in
  any script that gives some feedback as to if a website is valid or not.
keywords: php validate w3c function xhtml
createdOn: '2005-10-23 16:23:19'
modifiedOn: '2011-10-17 15:46:06'
basename: validating_web_pages
atomId: 'tag:www.cbulock.com,2005://2.368'
weekNumber: '200542'
routeYear: '2005'
routeMonth: '10'
routeKey: 2005/10/validating_web_pages
canonicalRouteEntryId: '368'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
<p>Thought I would share this bit of code as some people might find it useful.  Ever since I started working to make sure my pages were compatible, I have come up with a number of things to help me to accomplish this.  Now, every page on this site should be fully xHTML compliant and I have setup a number of backend protections to stop most things from causing the sites to stop validating.  One thing I wrote was a simple PHP function that can be used in any script that gives some feedback as to if a website is valid or not.</p>

<code>
function validate_page($url)<br />
{<br />
  $url = urlencode($url);<br />
  $site = &quot;http://validator.w3.org/check?uri=$url&quot;;<br />
  $data = implode(&quot;&quot;, file($site));<br />
  $result = preg_match_all (&quot;/\&lt;h2 class\=\&quot;valid\&quot;\&gt;/&quot;, $data, $matches);<br />
  return $result;<br />
}
</code>

Usage: 

<code>
$page = "http://www.cbulock.com/";<br />
$result = validate_page($page);
</code>

<p>Basically, give the function a URL, it will send back either a 1 or 0 depending on if it's a valid page or not.  If this is something useful, go ahead and use it, it's free to use as you please.</p>
