---
contentFormat: markdown
sortOrder: 105
entryId: '100'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '7'
originalCategoryId: '7'
title: And the Sound Card Issues Continue
excerpt: >-
  OK, I bought a Sound Blaster Live 5.1 card. It's one of the older ones.


  I have had problems with the sound stuttering ever since I installed it. It
  will play fine, but every 30 seconds or so an annoying buzz or skipping of the
  sound will occur.
keywords: sound card problems sound blaster windows drivers
createdOn: '2004-02-17 00:09:11'
modifiedOn: '2011-10-17 15:46:06'
basename: and_the_sound_card_issues_continue
atomId: 'tag:www.cbulock.com,2004://2.100'
weekNumber: '200408'
routeYear: '2004'
routeMonth: '02'
routeKey: 2004/02/and_the_sound_card_issues_continue
canonicalRouteEntryId: '100'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
OK, I bought a Sound Blaster Live 5.1 card. It's one of the older ones.

I have had problems with the sound stuttering ever since I installed it. It will play fine, but every 30 seconds or so an annoying buzz or skipping of the sound will occur.

I have tried a number of steps in order to trace the problem, but so far nothing has worked. (The OS is Win XP BTW)

- I first tried reinstalling the device drivers. That had no effect, so I went and made sure I had the latest drivers and I do.
- I then went ahead and updated the motherboard drivers. That also had no effect.
- Since I needed to anyways, I went ahead and reinstalled Windows. I normally wouldn't have given up so quickly, but I planned on doing this within a few weeks anyway. Still, same results.
- So, I made sure to reinstall all the drivers. I also had some trouble with my NIC card since I installed the sound card. I had an onboard NIC and a PCI NIC, so I just removed the PCI NIC.
- I moved the sound card to a different PCI slot since after removing the PCI NIC, the IRQ of the onboard NIC and sound card were the same. I have now verified that nothing shares any resources with the sound card.
- I also went into the Control Panel, then Sounds and Audio Devices. I went to the Audio tab, advanced properties and turned down the hardware acceleration. This seemed to work the other day, but now I am having the sound problems again.

That's everything I have done so far. I kind of stuck now. Has anyone else experienced similar troubles or am I missing something obvious? I have also posted this at [ClieSource](http://www.cliesource.com/forums/showthread.php?s=&threadid=42000 "Sound Card Problems - Any idea's?") hoping to get some more input on this.
