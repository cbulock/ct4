---
contentFormat: markdown
sortOrder: 138
entryId: '133'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: '0'
categoryId: '2'
originalCategoryId: '2'
title: MMPlayer - Divx on my Clie is Even Better Now
excerpt: >-
  I had wrote a couple of posts in the past about playing Divx on Palm PDA's:


  - [Divx playback for Clie's!](http://www.cbulock.com/archives/000016.html
  "Divx playback for Clie's!")

  - [Divx Playback Update](http://www.cbulock.com/archives/000017.html "Divx
  Playback Update")


  At the time when I wrote those, Divx support was brand new on Clie's.  Things
  have changed since then.  There have been some updates to the MMPlayer app
  that made it possible. But the biggest change happened within the last couple
  of weeks.  Fellow ClieSource member CliePet was able to accomplish an amazing
  task.  He figured out a way to access the high quality audio system that is
  built in to the OS5 Clies.
keywords: Clie OS5 Divx audio MMPlayer movie MCA
createdOn: '2004-03-31 12:12:08'
modifiedOn: '2011-10-17 15:46:06'
basename: mmplayer_divx_on_my_clie_is_even_better_now
atomId: 'tag:www.cbulock.com,2004://2.133'
weekNumber: '200414'
routeYear: '2004'
routeMonth: '03'
routeKey: 2004/03/mmplayer_divx_on_my_clie_is_even_better_now
canonicalRouteEntryId: '133'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I had wrote a couple of posts in the past about playing Divx on Palm PDA's:

- [Divx playback for Clie's!](http://www.cbulock.com/archives/000016.html "Divx playback for Clie's!")
- [Divx Playback Update](http://www.cbulock.com/archives/000017.html "Divx Playback Update")

At the time when I wrote those, Divx support was brand new on Clie's.  Things have changed since then.  There have been some updates to the MMPlayer app that made it possible. But the biggest change happened within the last couple of weeks.  Fellow ClieSource member CliePet was able to accomplish an amazing task.  He figured out a way to access the high quality audio system that is built in to the OS5 Clies.
*Here's some history.*  The NX, NZ, and TG series of Clies all have Palm OS5.  OS5 has a built in CD quality audio API.  Sony choose to remove it and include there own audio system.  Problem is, only two apps can access the CD quality audio.  The built-in MP3 player and built-in video player.  Other than that, all you could do is have the old style beeps and blips, or you could do 8-bit 8kHz mono sound. Not to great for trying to playback MP3's or watch videos when CD audio is 16-bit 44kHz stereo sound. Newer Clies don't have this limitation any more, but Sony would never revel how developers could access the sound on the older OS5 Clie like the one I have (NX60).
*Now, back to today.* CliePet, using the same magic he has for other projects like this, not only figured out how to access the audio, but created his own API known as MCA (Modern Clie Audio) and modeled it after the PalmOS5 streaming sound API.  What this means is that any developer only needs to make a minor change in their apps to support this.  The developers of MMPlayer have been the first one's to do so only days after this has been released.
[This is the download](http://mmplayer.com/MMPlayer0.2.9MCA.zip "MMPlayer 0.2.9 w/ MCA support") for the experimental beta version of MMPlayer with MCA support.  I have tested it on my NX60 and am very impressed.  I took a Divx movie, and do zero audio conversion.  I did convert the video bitrate down as the player doesn't handle high bitrates due to CPU limitation of the Clie.  But, the sound was crystal clear.  Unlike previous tests where the sound was very rough and sometimes hard to make out what was going on.  On a 128MB MS, it's unlikely a full movie will fit and still have high quality audio.  But, for people with 256MB, and larger MS's, not only can you fit full high quality videos on your PDA, you can now have high quality audio.  This really opens the door to mobile movies on the older Clies since it can now play any Divx movie that will work on any other Palm or Pocket PC. Also to note, MMPlayer also know supports a variety of video formats including MPEG1,2,4,H263, DivX and MJpeg. Also limited MOV support.  I haven't had a chance to test any of that yet though.
