---
sortOrder: 218
entryId: '623'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '6'
originalCategoryId: '6'
title: WebOS 1.3.1 Released Today
excerpt: >-
  The latest version of WebOS came out today, and the third big update since the
  Palm Pre came out.  I'm about to download it here shortly. Precentral has <a
  href='http://www.precentral.net/webos-131-update-available-download'>details
  of what's included</a> in the update.  I have been using <a
  href='http://www.webos-internals.org/wiki/Application:Preware'>Preware</a> to
  install patches to my phone, so this update also means it's time to remove
  those patches, and then reinstall after the update. 
keywords: palm pre webos preware patches
createdOn: '2009-11-14 10:28:01'
modifiedOn: '2011-10-17 15:46:06'
basename: webos_131_released_today
atomId: 'tag:www.cbulock.com,2009://2.623'
weekNumber: '200946'
routeYear: '2009'
routeMonth: '11'
routeKey: 2009/11/webos_131_released_today
canonicalRouteEntryId: '623'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
<p>The latest version of WebOS came out today, and the third big update since the Palm Pre came out.  I'm about to download it here shortly. Precentral has <a href='http://www.precentral.net/webos-131-update-available-download'>details of what's included</a> in the update.  I have been using <a href='http://www.webos-internals.org/wiki/Application:Preware'>Preware</a> to install patches to my phone, so this update also means it's time to remove those patches, and then reinstall after the update.  For my own personal note-taking and to share what I have installed, here are the current patches:</p>

<ul>
<li>4x4 icons v3</li>
<li>Call Block/Rejector</li>
<li>Call Duration in Call Log</li>
<li>Character Counter</li>
<li>Default to Month View</li>
<li>Enable Add/Delete Pages</li>
<li>Enable Forwarding</li>
<li>Enable Landscape Email</li>
<li>Enable Vibration</li>
<li>Hide Nascar App</li>
<li>Hide NFL App</li>
<li>Just Charge By Default</li>
<li>Lower Swap Threshold</li>
<li>Match State to Area Code</li>
<li>Reduce Minimum Brightness</li>
<li>Show Wifi SSID</li>
<li>Sound Toggle - Grey</li>
<li>Unhide Dev Mode Icon</li>
<li>Unthrottle Download Manager</li>
<li>Virtual Keyboard</li>
</ul>
<p>A lot of this stuff is indeed included in other phones by default, and I will admit that webOS is lacking in some features.  Thankfully, the hacking community is really great and they have made the phone very nice.</p>

<p>Also, anyone running Preware should probably make the following modification to the phone. This will stop updates from occurring automatically.  It's possible that you could really mess up the phone if you install an OS update over all the patches, so it's best to have control over the updates instead of letting Palm do them automatically.  What this does is simply remove the execute ability from the update application.  You need to have root access to do this.  Once you are logged on as root, run the following:</p>

<pre>
mount -o remount,rw /
chmod -x /usr/bin/UpdateDaemon
mount -o remount,ro /
killall UpdateDaemon
</pre>

<p>Then, on days like today when once you've removed all the patches, you can reverse this and re-enable the updater by doing the following:</p>

<pre>
mount -o remount,rw /
chmod +x /usr/bin/UpdateDaemon
mount -o remount,ro /
</pre>

<p>Then restart the phone.</p>
