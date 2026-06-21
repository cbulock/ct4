---
sortOrder: 181
entryId: '174'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '5'
originalCategoryId: '5'
title: Reorganizing Your Website - Renaming Permalinks
excerpt: >-
  This is an issue that I have been pondering for a little while. How could
  permalinks in Movable Type be changed? By definition, permalinks should be
  permanent. But, what if all those old links still worked while at the same
  time completely redoing the URL scheme? BTW, assume I am talking about the
  Apache webserver unless I mention otherwise since that is what I am using.
keywords: >-
  website movable type URL permalinks apache htaccess redirects archive meta
  refresh
createdOn: '2004-06-30 14:57:55'
modifiedOn: '2011-10-17 15:46:06'
basename: reorganizing_your_website_renaming_permalinks
atomId: 'tag:www.cbulock.com,2004://2.174'
weekNumber: '200427'
routeYear: '2004'
routeMonth: '06'
routeKey: 2004/06/reorganizing_your_website_renaming_permalinks
canonicalRouteEntryId: '174'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
This is an issue that I have been pondering for a little while. How could permalinks in Movable Type be changed? By definition, permalinks should be permanent. But, what if all those old links still worked while at the same time completely redoing the URL scheme?

BTW, assume I am talking about the Apache webserver unless I mention otherwise since that is what I am using.

There are a couple ways this could be done. For instance, if the filename is generally going to stay the same, say, changing from `http://www.yourwebsite.com/archives/000255.html` to `http://www.yourwebsite.com/blog/entries/page0255.php` then you could write a single rewrite rule in your `.htaccess` file that would handle that. I know very little how to do this, but with the knowledge it should be fairly simple.

But, I want to move my files from the default `/archives/000001.html` scheme that is setup to a more natural and organized `/year/month/page_title.html`. The problem is every page title is unique and only Movable Type would know what those are and what the year and month is for the posts. Had I known more about Movable Type before I started my website, then I probably would have gotten this right to begin with, but it was much more fun to jump into it and learn as I go.

So, what I have come up with was this. Create a new index template that will generate Apache redirect commands that can be placed into a `.htaccess` file. The template code will be in this format:

```html
<MTArchiveList>
<MTEntries>
Redirect permanent [Current Archive Path][Current Archive File Template]</MTEntries> <$MTBlogURL$>[New Archive File Path, if any][New Archive File Template]
</MTArchiveList>
```

Basically, the same tags used to create the master archive page, but modified to output the `Redirect permanent` statement that the `.htaccess` file in Apache uses to redirect the pages, then the path to the old names using the default archive scheme, then followed by the new scheme. This of course could be modified to whatever current archive format you are currently using followed by the new format you will be changing to.

Here is how my code looked:

```html
<MTArchiveList>
<MTEntries>
Redirect permanent /archives/<$MTEntryID pad="1"$>.html</MTEntries> <$MTBlogURL$><$MTArchiveDate format="%Y/%m/"$><$MTArchiveTitle dirify="1"$>.html
</MTArchiveList>
```

One thing to notice though, for this to come out right, you will want to use the `MTArchive` tags, but when you edit the Archive File Templates in your Movable Type system, you will need to use `MTEntry` tags.

So, my Archive File Template will look like:

```html
<$MTEntryDate format="%Y/%m/"$><$MTEntryTitle dirify="1"$>.html
```

If you have never changed the Archive File Templates, you can do this my going to the Movable Type Control Panel, then going into the `Weblog Config` and clicking on the `Archiving` link. I am changing the Individual archive template here, so in the box that says `Archive File Template` is where the changes would need to go.

You might also want to change the archive URL on the `Core Setup` section of the weblog config. My original archive URL was `http://www.cbulock.com/archives`, so all the archives were behind that. My new setup just has `http://www.cbulock.com` as the archive URL since I just wanted the archives to be organized by year and month, but still having an archive URL is okay, it just has to be considered when changing this all around. Also, make sure to be careful of any other archive file templates you might have if you change the archive URL, since they will also need to be changed. I forgot about this at first and it messed up my mobile version of the site.

All that needs to be done now is for the template containing the code above to be built. The outputted file will contain all the redirects that can be pasted into an existing `.htaccess` file. If you don't already have a `.htaccess` file, you could probably even have Movable Type directly output it.

The other method I had would have a similar effect, and this could be done using any webserver since the redirection is done on the visitors end and not on the server. You can use a Meta Refresh. If your not familiar with this, a [Google search](http://www.google.com/search?q=meta+redirects "Google Search: meta redirects") will give a lot of info. The main thing is the `META` tag shown below. This tells the browser what page to redirect to and how long to wait. By having `content=0`, this will happen immediately. But, since some browsers won't automatically change the page, you can also put a direct link in the actual page content. If I was to use this method, I would want to set up a new individual archive template with the following code:

```html
<html>
<head>
<title><$MTBlogName$>: <$MTEntryTitle$></title>
<META http-equiv="refresh" content="0;URL=<$MTBlogURL$><$MTArchiveDate format="%Y/%m/"$><$MTArchiveTitle dirify="1"$>.html">
</head>
This page has been moved.
<a href="<$MTBlogURL$><$MTArchiveDate format="%Y/%m/"$><$MTArchiveTitle dirify="1"$>.html">If not automatically redirected, please click here.</a>
</body>
</html>
```

Then, as long as this new individual archive was set up to build with the same settings as the old files, Movable Type will rebuild this template over your old files.

I had to decide what I wanted to do, use `.htaccess` redirects, or meta redirects. The problem with `.htaccess` redirects is that every page that loads on the server now has to go through that file. So I am not certain how bad that impacts the server by adding hundreds of redirects to it. But, with meta redirects, you have to first load the redirect page, then load the new page. Plus, this can be somewhat sloppy since this is done client-side, so if the page doesn't redirect, the visitor has to manually do so, and it makes the site look amateurish. The final factor that made my decision was [this page about META refreshes](http://www.netmechanic.com/news/vol4/promo_no15.htm "META Refresh And Search Engines"). After reading that, I decided the Apache `.htaccess` redirects were the way to go.
