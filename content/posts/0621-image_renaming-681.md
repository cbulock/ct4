---
sortOrder: 621
entryId: '681'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '0'
convertBreaks: __default__
categoryId: '15'
originalCategoryId: '15'
title: Image Renaming
excerpt: >-
  I had a large directory of images that were all randomly named. None of them
  had file extensions or anything.  So, I wrote up some lines of bash that uses
  ImageMagick to figure out what type of images these were, and then give them a
  random filename based on the MD5 hash of the current name.  This way
  everything was at least normalized. 
keywords: bash ImageMagick images
createdOn: '2012-04-22 21:26:53'
modifiedOn: '2012-04-22 21:26:53'
basename: image_renaming
atomId: 'tag:www.cbulock.com,2012://2.681'
weekNumber: '201216'
routeYear: '2012'
routeMonth: '04'
routeKey: 2012/04/image_renaming
canonicalRouteEntryId: '681'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I had a large directory of images that were all randomly named. None of them had file extensions or anything.  So, I wrote up some lines of bash that use ImageMagick to figure out what type of images these were, and then give them a random filename based on the MD5 hash of the current name.  This way everything was at least normalized. 
Thought I would share this. All the filenames were listed in a file called \"list\".

```bash
#!/bin/bash

for file in `cat list`;
do
FORMAT=`identify -format "%m\n" $file | sed '1!d' | awk '{print tolower($0)}'`
NAME=`echo $file | md5sum | awk '{print $1}'`
mv $file $NAME.$FORMAT
echo $NAME.$FORMAT
done
```
