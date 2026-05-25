---
sortOrder: 532
entryId: '563'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '15'
originalCategoryId: '15'
title: CommentAPI for Movable Type
excerpt: >-
  I was going through some things on my site today, fixing up some bugs and
  such.  One thing I noticed was that I never rewrote my <a
  href='http://wellformedweb.org/story/9'>CommentAPI</a> support after I changed
  the way comments were handled on this site.  I don't believe anyone ever
  posted a comment using CommentAPI, but I thought it was kind of nice to learn
  how it worked and to provide some support for it.  It's somewhat of an older
  standard, and never really caught on, but I think it is really handy.  Anyhow,
  I thought I'd release the code I had come up with.  It still needs a little
  work to be perfect, but this did allow comments to come in on my Movable Type
  3.2 system.
keywords: commentapi movable type comments comment php
createdOn: '2008-01-13 17:53:20'
modifiedOn: '2011-10-17 15:46:06'
basename: commentapi_for_movable_type
atomId: 'tag:www.cbulock.com,2008://2.563'
weekNumber: '200802'
routeYear: '2008'
routeMonth: '01'
routeKey: 2008/01/commentapi_for_movable_type
canonicalRouteEntryId: '563'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
<p>I was going through some things on my site today, fixing up some bugs and such.  One thing I noticed was that I never rewrote my <a href='http://wellformedweb.org/story/9'>CommentAPI</a> support after I changed the way comments were handled on this site.  I don't believe anyone ever posted a comment using CommentAPI, but I thought it was kind of nice to learn how it worked and to provide some support for it.  It's somewhat of an older standard, and never really caught on, but I think it is really handy.  Anyhow, I thought I'd release the code I had come up with.  It still needs a little work to be perfect, but this did allow comments to come in on my Movable Type 3.2 system.</p>

<p>Here's PHP that took the comments in and submitted them to Movable Type:</p>

<pre>
&lt;?php
//Created by Cameron Bulock 07/12/2005 - 09/06/2006
//Here is my implementation of CommentAPI for use with Movable Type

//URL to MT&#039;s comment CGI
$comment_url = &#039;domain/comments.cgi&#039;

//Grab the PostID
$postid = $_GET[&#039;id&#039;];
//Read in POST data containing the XML
$input = $GLOBALS[&#039;HTTP_RAW_POST_DATA&#039;];

//Use SimpleXML to parse the input
$xml = simplexml_load_string($input);

//Format the data to post to MT
$url = urlencode($xml-&gt;link);
$entry = urlencode($xml-&gt;description);
$author = $xml-&gt;author;
$name = urlencode($xml-&gt;creator);

//This should work, but I haven&#039;t been able to fully test, currently just using $author for the author field, but $creator should be MT&#039;s equivalent to author
$dc = $xml-&gt;children(&#039;http://purl.org/dc/elements/1.1/&#039;);
$creator = urlencode($dc-&gt;$creator);

//pull email address out of authors field
preg_match(&quot;/[\._a-zA-Z0-9-]+@[\._a-zA-Z0-9-]+/i&quot;, $author, $match);
$email = $match[0];

$data = &quot;entry_id=&quot;.$postid.&quot;&amp;email=&quot;.$email.&quot;&amp;url=&quot;.$url.&quot;&amp;author=&quot;.urlencode($author).&quot;&amp;text=&quot;.$entry.&quot;&amp;post= Post &quot;;

//Setting up cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $comment_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 4);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

//Run cURL
$process = curl_exec($ch);
curl_close($ch);

//Return a &#039;Created&#039; HTTP response.  This is currently just assumed even if not successful
header(&#039;HTTP/1.1 201 Created&#039;);

//The server response needs to be reworked and more informative, see: http://www.imc.org/atom-protocol/mail-archive/msg01384.html
?&gt;
</pre>

<p>After you have the code on your site, you also need to update your RSS feed to support CommentAPI.  There are two things that need to be changed.  First, the &lt;RSS&gt; tag needs to have the following added to it:</p>

<pre>
xmlns:wfw=&quot;http://wellformedweb.org/CommentAPI/&quot;
</pre>

<p>Here's an example of what the full tag will probably look like:</p>

<pre>
&lt;rss version=&quot;2.0&quot; 
xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; 
xmlns:sy=&quot;http://purl.org/rss/1.0/modules/syndication/&quot; xmlns:trackback=&quot;http://madskills.com/public/xml/rss/module/trackback/&quot; xmlns:content=&quot;http://purl.org/rss/1.0/modules/content/&quot; 
xmlns:wfw=&quot;http://wellformedweb.org/CommentAPI/&quot;
&gt; 
</pre>

<p>That may or may not be how yours will look, depending on if you use any other namespace extensions to RSS.  Mine actually is quite a bit larger.<br />
Then, you need to add the following lines inside of the &lt;MTEntries&gt; tag:</p>

<pre>
&lt;wfw:comment&gt;
&lt;$MTBlogURL$&gt;comments/post.php?id=&lt;$MTEntryID$&gt;
&lt;/wfw:comment&gt;
</pre>

<p>Of course, change the path to whatever you have named your PHP file.</p>

<p>Please be aware, this code is freely available for whatever use you'd like.  Though I have tested and successfully used it myself in a couple different programs that supported CommentAPI, I don't know for a fact that the support is complete.  For one thing, there is no error checking.  Also, the HTTP responses don't fully support all the responses that should be sent. Also, since it uses SimpleXML, PHP5 is required to run this.  There is no guarantees, and I can't be responsible for the code.  I'm just offering this as I planned to release it once it was more complete, but as I am no longer using Movable Type's comment system, I won't be using this anymore and it's may be of some use to someone.</p>
