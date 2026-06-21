---
sortOrder: 616
entryId: '676'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '0'
convertBreaks: __default__
categoryId: '15'
originalCategoryId: '15'
title: Displaying a Simple Calendar in PHP
excerpt: >-
  I noticed that there wasn't much out there when it came to just simply
  displaying a calendar on a website.  Most the examples I found were overly
  complicated.  So, I came up with a little snippet of code that outputs a
  calendar for any given month and displays it as an HTML table.
keywords: HTML PHP calendar
createdOn: '2012-01-23 15:20:19'
modifiedOn: '2012-01-23 15:20:19'
basename: displaying_a_simple_calendar_in_php
atomId: 'tag:www.cbulock.com,2012://2.676'
weekNumber: '201204'
routeYear: '2012'
routeMonth: '01'
routeKey: 2012/01/displaying_a_simple_calendar_in_php
canonicalRouteEntryId: '676'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
I noticed that there wasn't much out there when it came to just simply displaying a calendar on a website.  Most the examples I found were overly complicated.  So, I came up with a little snippet of code that outputs a calendar for any given month and displays it as an HTML table.

```php
<?php //prepare calendar

$date = $_REQUEST['date']; //date is a unix timestamp

$firstDay = date('w',mktime(0,0,0,date('m',$date),1,date('Y',$date)));
$numDays = date('t',$date);
$weeks = ceil(($numDays + $firstDay)/7);
$week = array();
$date = 1;
for($i=0;$i<$weeks;$i++) {
	for($x=0;$x<7;$x++) {
		if (($i == 0) & $x < $firstDay) {
			$week[$i][] = NULL;
		}
		elseif ($date > $numDays) {
			$week[$i][] = NULL;
		}
		else {
			$week[$i][] = $date;
			$date++;
		}
	}
}?>

<table class='calendar'>
<thead><tr><th colspan='7'><?=date('F Y',$date)?></th></tr></thead>
<thead><tr>
<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thr</th><th>Fri</th><th>Sat</th>
</tr></thead>
<tbody>
<?php //calendar generation
foreach ($week as $w) {
	echo '<tr>';
	foreach ($w as $day) {
		echo '<td>'.$day.'</td>';
	}
	echo '</tr>';
}
?>
</tbody>
</table>
```
