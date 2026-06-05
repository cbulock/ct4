---
contentFormat: markdown
sortOrder: 15
entryId: '15'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: __default__
categoryId: '2'
originalCategoryId: '2'
title: Divx playback for Clie's!
excerpt: >-
  [MMPlayer](http://mmplayer.com) has been updated to include Clie support
  meaning now Clie handhelds can have a full multimedia player on our
  machine that doesn't require files to be converted.
keywords: Divx Clie multimedia PDA MQV MPEG-4
createdOn: '2003-07-12 22:59:08'
modifiedOn: '2011-10-17 15:46:06'
basename: divx_playback_for_clies
atomId: 'tag:www.cbulock.com,2003://2.15'
weekNumber: '200328'
routeYear: '2003'
routeMonth: '07'
routeKey: 2003/07/divx_playback_for_clies
canonicalRouteEntryId: '15'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
[MMPlayer](http://mmplayer.com) has been updated to include Clie support meaning now Clie handhelds can have a full multimedia player on our machine that doesn't require files to be converted.  The sound playback for the Clie's ain't all that great though (8kHz) since Sony won't release any info to developers on how to fully use the sound system (and for the fact that even though Palm OS 5 has a standard audio system built-in, Sony decided not to use it).  Right now I am doing some experimenting converting a Divx movie into a 320x176 Divx file that will fit onto a 128MB Memory Stick.  But the Memory Stick will only actually hold 123MB of files.   I have the movie down to 125MB by using a Divx calculator and changing the bitrate to 164kB/sec and changing the audio to a 1kB/s MP3 stream (which translates to 8kHz mono audio).  Then I chopped off most of the credits and the opening sequence  that displayed the 20th Century Fox logo. Now I have to converting the video from 24-bit to 16-bit color since that all the Clie can display.  Hey, looks liked it worked and the file is exactly 123MB.  Hopefully this will all work now.

Up until now, the only way to get movies on the Clie was to use either an app called Kinoma or use the built-in Sony Movie Player.  Kinoma's okay, but the file sizes are large since it uses the older Cinepak mobile compression.  The Sony Movie Player plays MPEG-4 based movies, but the are in .MQV format.  It is based on a Quicktime format and the only way to make the movies is to run it through an app called Image Convertor which will convert .MPG's, some .MOV's and some .AVI's.  If the movie doesn't work, you have to use another app to do a 'pre-conversion'.  I use QuickTime Pro for .MOV files and convert the files to .AVI format.  I use VirtualDub for Divx files.  One thing to note is, the audio has to be uncompressed for the Image Convertor to work.  Basically all Divx movies have the audio compressed using MP3 and a lot of higher quality Quicktime videos have some form of compression too.
So, for a video to work, you have to run it through an app like VirtualDub, and then just totally guess on what kind of settings to use to output since the Image Convertor does a pretty good job of compressing, but it's hard to tell how much it will do, especially if you want to convert a full movie and fit it on a 128MB stick.  (These movies are over 4GB in their original format.) 

So, whats this got to do with native support for Divx on the Clie?  Well, to fit a Divx movie onto a 128MB stick, it still needs to be converted since these movies are normally around 600-700MB so they will fit on CD.  But, the good news is, I can tell exactly the setting I need to use to convert in VirtualDub, since there is only one conversion being done.  I just use an app called Advanced Divx calculator, plugged in the movie length, size the outputted movie needs to be and audio bitrate and it tells me what bitrate to use for the video.  Plug these settings into the Divx settings (leaving some leeway) and away it goes.  Takes about an hour to do the full conversion on my PC (Athlon XP 2000, 1.6GHz).
