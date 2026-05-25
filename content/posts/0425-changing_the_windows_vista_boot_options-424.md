---
sortOrder: 425
entryId: '424'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '7'
originalCategoryId: '7'
title: Changing the Windows Vista Boot Options
excerpt: >-
  <p>If you tried to install Windows Vista and weren't successful, you may have
  had a issue where you have a new boot loader that tries to install Vista over
  and over.</p>

  <p>Here's the issue, Windows traditionally has used a boot.ini file to control
  the boot options for Windows.  If you have more than one version, you could
  configure this file to load different versions. In XP, you could also change
  some of the settings for this file in the System properties under the
  'Advanced' tab and by clicking on 'Settings' under the 'Startup and Recovery'
  section.</p>
keywords: windows vista bcdedit bcdedit.exe startup boot boot.ini
createdOn: '2006-03-25 23:47:50'
modifiedOn: '2011-10-17 15:46:06'
basename: changing_the_windows_vista_boot_options
atomId: 'tag:www.cbulock.com,2006://2.424'
weekNumber: '200612'
routeYear: '2006'
routeMonth: '03'
routeKey: 2006/03/changing_the_windows_vista_boot_options
canonicalRouteEntryId: '424'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
<p>If you tried to install Windows Vista and weren't successful, you may have had a issue where you have a new boot loader that tries to install Vista over and over.</p>
<p>Here's the issue, Windows traditionally has used a boot.ini file to control the boot options for Windows.  If you have more than one version, you could configure this file to load different versions. In XP, you could also change some of the settings for this file in the System properties under the 'Advanced' tab and by clicking on 'Settings' under the 'Startup and Recovery' section.</p>
<p>OK, so when I installed Vista, it created a boot menu, and it had a setup option.  This is normal for even for previous versions of Windows as it has to reboot during the setup process.  In Vista, the timeout is only three seconds, so if you don't want to enter the setup, you have to be quick.  Problem is, Vista blue screened during the install. Seems I have a bad copy.  But, how do I get rid of the boot menu?  I figured it would be as easy as editing the boot.ini file.  Nope.  Here is comment that now showed up at the top of the boot.ini file.</p>
<pre>
;
;Warning: Boot.ini is used on Windows XP and earlier operating systems.
;Warning: Use BCDEDIT.exe to modify Windows Vista boot options.
;
</pre>
<p>No problem, just got to find the BCDEDIT.exe file.  A search of my drive shows no results though.  Even with hidden and system file scans on.  I assumed it probably wasn't installed yet as the install crashed.  But, tonight I found it.</p>
<p>Open the command prompt and enter the command</p><pre>cd "c:\$WINDOWS.~BT\Windows\System32"</pre> <p>You may need to change the drive letter.  In here, you will find that BCDEDIT.exe file.  To switch back to your XP install, enter the command</p><pre>bcdedit /default {ntldr}</pre><p>Now, upon reboot, XP will now be the default.</p>
