---
sortOrder: 592
entryId: '625'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: __default__
categoryId: '15'
originalCategoryId: '15'
title: PHP and the pcre.backtrack_limit
excerpt: >-
  Just came across this today. Looks like in PHP 5.2, they decided to add a
  100000 byte limit to regular expression matches.  This can stop a lot of
  searches on long strings, and the worst part is that PHP doesn't throw any
  error when that limit is reached. If you are using the perl-compatible regular
  expressions in PHP, you will likely want to change the pcre.backtrack_limit in
  the php.ini file to something larger than 100000.
keywords: PHP regular expressions prce
createdOn: '2009-12-03 15:52:28'
modifiedOn: '2011-10-17 15:46:06'
basename: php_and_the_pcrebacktrack_limit
atomId: 'tag:www.cbulock.com,2009://2.625'
weekNumber: '200949'
routeYear: '2009'
routeMonth: '12'
routeKey: 2009/12/php_and_the_pcrebacktrack_limit
canonicalRouteEntryId: '625'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
Just came across this today. Looks like in PHP 5.2, they decided to add a <a href='http://bugs.php.net/bug.php?id=40846'>100000 byte limit</a> to regular expression matches.  This can stop a lot of searches on long strings, and the worst part is that PHP doesn't throw any error when that limit is reached. If you are using the perl-compatible regular expressions in PHP, you will likely want to change the pcre.backtrack_limit in the php.ini file to something larger than 100000.
