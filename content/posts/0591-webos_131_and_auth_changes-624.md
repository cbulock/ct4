---
contentFormat: markdown
sortOrder: 591
entryId: '624'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: __default__
categoryId: '6'
originalCategoryId: '6'
title: WebOS 1.3.1 and Auth Changes
excerpt: >-
  I purchased my Palm Pre the morning it came out.  Within a couple of days,
  people had already figured out how to gain root access to the underlying Linux
  operating system.  I've setup access since that time (early June).  Since that
  time, everything has worked great.  Update after update, Palm has never
  tinkered with anything related to the SSH access.  After I installed WebOS
  1.3.1, all of a sudden I could no longer access my phone over SSH.  Unlike all
  those iPhones that just got hacked because they had enabled root access with
  no password, I have direct root access over SSH disabled.  I have a separate
  SSH user created, which is just security common sense.  Unfortunately, it
  seems that Palm had updated the /etc/passwd file in the latest update which
  removed my SSH user.  
keywords: palm pre webos 1.3.1 root
createdOn: '2009-11-16 09:35:13'
modifiedOn: '2011-10-17 15:46:06'
basename: webos_131_and_auth_changes
atomId: 'tag:www.cbulock.com,2009://2.624'
weekNumber: '200947'
routeYear: '2009'
routeMonth: '11'
routeKey: 2009/11/webos_131_and_auth_changes
canonicalRouteEntryId: '624'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I purchased my Palm Pre the morning it came out.  Within a couple of days, people had already figured out how to gain root access to the underlying Linux operating system.  I've setup access since that time (early June).  Since that time, everything has worked great.  Update after update, Palm has never tinkered with anything related to the SSH access.  After I installed WebOS 1.3.1, all of a sudden I could no longer access my phone over SSH.  Unlike all those iPhones that just got hacked because they had enabled root access with no password, I have direct root access over SSH disabled.  I have a separate SSH user created, which is just security common sense.  Unfortunately, it seems that Palm had updated the /etc/passwd file in the latest update which removed my SSH user.  Had I left the system insecure, I could have still logged in with the root user, but I didn't.  I don't recall how I initially enabled the root access, but I seem to recall that it required connecting the phone to my computer and it didn't work on Windows 7.  So, that was going to require that I load up a virtual machine on my desktop and figure it out again.  Instead, I was able to install the Terminal application from Preware and was able to get a root console that way.  I don't know why Palm made this change, but I now see they also updated the hostname on the device for some reason. Before, the hostname was simply 'castle', which was the Pre's codename.  Now the hostname shows as 'palm-webos-device'.  Hopefully this is the last time Palm makes this change as I like having control over the phone.
