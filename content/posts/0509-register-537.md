---
sortOrder: 509
entryId: '537'
blogId: '3'
status: '2'
authorId: '2'
allowComments: '0'
allowPings: '0'
convertBreaks: '0'
categoryId: null
originalCategoryId: null
title: Register
excerpt: ''
keywords: ''
createdOn: '2007-08-08 18:16:15'
modifiedOn: '2008-02-18 11:12:12'
basename: register
atomId: 'tag:www.cbulock.com,2007://3.537'
weekNumber: '200732'
routeYear: '2007'
routeMonth: 08
routeKey: 2007/08/register
canonicalRouteEntryId: '537'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
<?php
if ($_GET['referer'])
{
$referer = $_GET['referer'];
} else {
$referer = $_SERVER['HTTP_REFERER'];
}
if ($_GET['url'])
{
$url = $_GET['url'];
} else {
$url = "http://";
}
if ($_GET['err'] == "missing") echo "<p><strong>There are some fields missing.</strong></p>";
if ($_GET['err'] == "pass") echo "<p><strong>The passwords did not match.</strong></p>";
if ($_GET['err'] == "dup") echo "<p><strong>That login name already exists, please choose another.</strong></p>";
if ($_GET['err'] == "cookie") echo "<p><strong>You must have cookies enabled to register an account.</strong></p>";
if ($_GET['err'] == "mismatch") echo "<p><strong>There was a problem with cookies being saved. Registering will be unsuccessful.</strong></p>";
?>

<form action='/auth/register.php' method='post'>
<input type='hidden' name='guid' value='<?php echo $guid ?>' />
<label for='loginname'>Username:*</label><br />
<input type='text' name='loginname' id='loginname' value='<?php echo $_GET['loginname'] ?>' /><br />
<label for='pass'>Password:*</label><br />
<input type='password' name='pass' id='pass' /><br />
<label for='pass2'>Confirm Password:*</label><br />
<input type='password' name='pass2' id='pass2' /><br />
<label for='name'>Your name:*</label><br />
<input type='text' name='name' id='name' value='<?php echo $_GET['name'] ?>' /><br />
<label for='email'>Email address: (will not be displayed publicly)</label><br />
<input type='text' name='email' id='email' value='<?php echo $_GET['email'] ?>' /><br />
<label for='url'>Website URL:</label><br />
<input type='text' name='url' id='url' value='<?php echo $url ?>' /><br />
<input type='hidden' name='referer' value='<?php echo $referer ?>' />
<input type='submit' value='Register' class='button' />
*Required fields
</form>
