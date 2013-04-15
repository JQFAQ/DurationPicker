DurationPicker
==============
This widget lets you pick the duration or time span and return the value as a string.
This widget is derived from the <a href="http://api.jqueryui.com/datepicker/">JQuery UI Spinner widget<a/>. Please check <a href="http://jqfaq.com/how-to-use-durationpicker-widget/">Example<a/> for how to use the DuratioPicker widget and a live demo.



Usage
=====

var $durationPicker= $("#durationPicker")
$durationPicker.DurationPicker();


<p>HTML </p>
&lt;input id="durationPicker" value="08:00:00" /&gt;

Description
===========

The format must be like this.

d.hh.mm.ss (RegExp : /^(\d.\d{2}:\d{2}:\d{2})/ )  
hh.mm.ss (RegExp : /^(\d{2}:\d{2}:\d{2})/ )  

Examples valid values:        
08.07.00                       
1.00.00.00       

<strong>Note: This widget is dependent on JQFAQTimeSpan extension. This extension defines a TimeSpan type.</strong>
     
<strong>Sponsored By</strong><div><a href="http://radiantq.com/"><img src="http://jqfaq.com/wp-content/uploads/banner_468x60.jpg"</a></div>
