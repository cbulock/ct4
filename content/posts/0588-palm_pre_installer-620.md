---
contentFormat: markdown
sortOrder: 588
entryId: '620'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '6'
originalCategoryId: '6'
title: Palm Pre Installer
excerpt: >-
  I created a little install script for my Pre. It makes it easy to install
  homebrew apps. This requires root access.  There are some apps that allow you
  to install directly from the Pre and also apps that work if the Pre is
  connected over USB.  I don't really prefer these methods as I never connect my
  Pre to USB, and copying and pasting URL's on the Pre isn't too user friendly.


  ```

  # /bin/sh

  mount -o remount,rw /

  ipkg -o /var install $1

  luna-send -n 1 palm://com.palm.applicationManager/rescan {}

  mount -o remount,ro /

  ```


  You can then just name it something like install and chmod +x install and
  easily install any ipk file either locally or over the internet like so:


  ```

  ./install
  http://forums.precentral.net/spe_attachment/download-24521-com.palm.app

  .switcharoo_0.9.0_all.ipk

  ```


  That installs the Switcharoo wallpaper switch app.
keywords: palm pre homebrew script
createdOn: '2009-07-31 13:51:32'
modifiedOn: '2011-10-17 15:46:06'
basename: palm_pre_installer
atomId: 'tag:www.cbulock.com,2009://2.620'
weekNumber: '200931'
routeYear: '2009'
routeMonth: '07'
routeKey: 2009/07/palm_pre_installer
canonicalRouteEntryId: '620'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I created a little install script for my Pre. It makes it easy to install homebrew apps. This requires root access.  There are some apps that allow you to install directly from the Pre and also apps that work if the Pre is connected over USB.  I don't really prefer these methods as I never connect my Pre to USB, and copying and pasting URL's on the Pre isn't too user friendly.

```
# /bin/sh
mount -o remount,rw /
ipkg -o /var install $1
luna-send -n 1 palm://com.palm.applicationManager/rescan {}
mount -o remount,ro /
```

You can then just name it something like install and chmod +x install and easily install any ipk file either locally or over the internet like so:

```
./install http://forums.precentral.net/spe_attachment/download-24521-com.palm.app
.switcharoo_0.9.0_all.ipk
```

That installs the Switcharoo wallpaper switch app.
