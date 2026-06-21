---
sortOrder: 191
entryId: '184'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '1'
convertBreaks: __default__
categoryId: '11'
originalCategoryId: '11'
title: Sending Your Opera Contacts to GMail
excerpt: >-
  Now that GMail has support for importing your contact list, it's now time to
  upload your address book to GMail from Opera.  

  But, GMail currently only imports CSV (comma separated values) format files. 
  Not a big deal as most programs work with this format, but Opera doesn't
  export to CSV.

  Fortunately, there is a web-based tool that will convert Opera's format to CSV
  format.
keywords: GMail opera address book contacts e-mail email CSV
createdOn: '2004-07-19 11:34:36'
modifiedOn: '2011-10-17 15:46:06'
basename: sending_your_opera_contacts_to_gmail
atomId: 'tag:www.cbulock.com,2004://2.184'
weekNumber: '200430'
routeYear: '2004'
routeMonth: '07'
routeKey: 2004/07/sending_your_opera_contacts_to_gmail
canonicalRouteEntryId: '184'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
Now that GMail has support for importing your contact list, it's now time to upload your address book to GMail from Opera.  
But, GMail currently only imports CSV (comma separated values) format files.  Not a big deal as most programs work with this format, but Opera doesn't export to CSV.
Fortunately, there is a web-based tool that will convert Opera's format to CSV format. [Address book conversion: ADR to TAB or CSV-separated](http://www.hallvord.com/opera/adr2tab.htm "Address book conversion: ADR to TAB or CSV-separated") will convert the .ADR Opera address book format to CSV or tab separated files.  What you need to do is either locate where your address book is located on your hard drive, like the site mentions, or even easier, just go to the File Menu and choose File-->Export-->Opera contacts.  Then save the contact list somewhere (probably not a bad idea to have a backup anyway).  Then upload the file to that site, choose 'Comma seperated' then click 'Send File'.  You will be prompted to save a .php file.  Save that, then rename it to something.csv.
But, GMail won't take this file exactly as it comes.  One little edit needs to be made. If you view GMail's info on [how to import contacts](http://gmail.google.com/support/bin/answer.py?answer=8301 "How do I import addresses into my Contacts list? "), you will see that the CSV file needs to have a header, which isn't included when you convert using the website above.  Don't worry, this step is simple.  Just open the CSV file in your favorite spreadsheet app, like Excel, or my favorite, OpenOffice.org.  Then add a row to the beginning of the file.  The first column should say 'Name' and the second column should say 'Email Address'.
Then simply save, go to GMail, open your contacts, then click 'Import Contacts' and upload this CSV file.  Much easier than adding all those by hand, unless you only know two or three people.
