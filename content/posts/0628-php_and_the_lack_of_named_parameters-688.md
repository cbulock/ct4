---
sortOrder: 628
entryId: '688'
blogId: '2'
status: '2'
authorId: '2'
allowComments: '1'
allowPings: '0'
convertBreaks: __default__
categoryId: '15'
originalCategoryId: '15'
title: PHP and the Lack of Named Parameters
excerpt: >-
  When using PHP, one issue I've had for a while is figuring out a way to map
  API input parameters to methods in my code.


  For instance, I have an <a
  href='https://github.com/cbulock/JohnVanOrange/wiki/API'>API</a> for <a
  href='https://github.com/cbulock/JohnVanOrange'>John VanOrange</a> that allows
  anyone to access most of the site's functionality.  The public API methods all
  map to classes and functions inside those classes. Each of these methods allow
  for various parameters to be passed into them. 
keywords: >-
  PHP parameters John VanOrange API call_user_func call_user_func_array
  call_user_func_assoc_array
createdOn: '2013-04-02 22:02:07'
modifiedOn: '2013-07-22 14:43:07'
basename: php_and_the_lack_of_named_parameters
atomId: 'tag:www.cbulock.com,2013://2.688'
weekNumber: '201314'
routeYear: '2013'
routeMonth: '04'
routeKey: 2013/04/php_and_the_lack_of_named_parameters
canonicalRouteEntryId: '688'
isCanonicalRouteEntry: true
textMoreIgnored: false
---
When using PHP, one issue I've had for a while is figuring out a way to map API input parameters to methods in my code.<br />
<br />
For instance, I have an <a href='https://github.com/cbulock/JohnVanOrange/wiki/API'>API</a> for <a href='https://github.com/cbulock/JohnVanOrange'>John VanOrange</a> that allows anyone to access most of the site's functionality.  The public API methods all map to classes and functions inside those classes. Each of these methods allow for various parameters to be passed into them. <br />
<br />
Here is an example; let's say you want to add a tag to an image.  This requires two parameters, 'name' and 'image'. Using Jquery, the call would look like this:<br />
<br />
<script src="https://gist.github.com/cbulock/5297782.js"></script><br />
<br />
My issue has been, how do I allow users to easily define the parameters of these methods?<br />
<br />
Why is this complicated? PHP doesn't have named parameters. This means that when passing parameters to a function, you must have the parameters be in a specified order.  This is needlessly complicated for some end user that doesn't know, and shouldn't have to know, the internal working of the API method. In the previous example, without named parameters, I would have to require the user to pass the tag and the image in a specific order, and there would be no rhyme or reason for it.<br />
<br />
How have I been solving this problem?  Up until now, all the methods used with the public API had one single parameter, an array.  My interface for the public API would convert the request to an associative array and pass any and all the parameters into that array.<br />
<br />
Example:<br />
<br />
<script src="https://gist.github.com/cbulock/5297786.js"></script><br />
<br />
This has a TON of downsides.  This means that I then have to write code to check for required elements in that array.  I also have to write code to define default values for array elements.  It also means that writing usable PHP DocBlocks are out of the question.  Plus, editors are not able to auto-complete variables. I imagine there may be some security concerns as well, but in general, the whole concept is a big no-no.<br />
<br />
<br />
I figured there had to be a better way.  There is <a href='http://php.net/manual/en/function.call-user-func.php'>call_user_func</a> and <a href='http://www.php.net/manual/en/function.call-user-func-array.php'>call_user_func_array</a> functions that allows calling functions passing the parameters if they are in an array. But, again, that requires an indexed array that already knows what order the parameters need to be in.  What I really need is a call_user_func_assoc_array that maps an associative array to the parameters within a function. But, alas, that doesn't exist.<br />
<br />
There is hope however. PHP 5 introduced the <a href='http://www.php.net/manual/en/book.reflection.php'>Reflection API</a>.  Honestly, I'm not that familiar with it, but after reading up on it, I learned it could solve my problem.<br />
<br />
<script src="https://gist.github.com/cbulock/5297798.js"></script><br />
<br />
What all is that doing?  It's creating a ReflectionClass object that has details of the ins and out of the class we need to call.  Then, you create a ReflectionMethod object that has the details of the specific method we need access to.  Then, we can query the parameters of that method.  After that, it's as simple as a foreach loop to go through all the expected parameters of that method, and match any that are in the associative array that came from the public API.  Finally, we use invokeArgs to call the method.<br />
<br />
I imagine this code could be cleaned up a bit.  But, so far, this is doing exactly what I needed and I've been able to clean up all my code and remove all the arrays as function parameters.
