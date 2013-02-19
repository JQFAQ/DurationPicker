DurationPicker
==============
Duration defines the diffreance between two dates. In JQuery UI, there is no editor ot edit the duration.
This is derived from <a href="http://api.jqueryui.com/datepicker/">JQuery UI Spinner widget<a/>. You can see the <a href="http://jqfaq.com/how-to-use-durationpicker-widget/">Example<a/> here for how to use the DuratioPicker widget



Usage.
=====

var $durationPicker= $("#durationPicker")
$durationPicker.DurationPicker();


<p>HTML </p>
&lt;input id="durationPicker" value="08:00:00" /&gt;

Description.
===========

The format must be like this.

d.hh.mm.ss (RegExp : /^(\d.\d{2}:\d{2}:\d{2})/ )  
hh.mm.ss (RegExp : /^(\d{2}:\d{2}:\d{2})/ )  

Examples valid values:        
08.07.00                       
1.00.00.00       

<strong>Note: This widget is dependent with JQFAQTimeSpan library. this library deals with timespans(durations).</strong>
     
<strong>Sponsored By</strong><a href="http://jqfaq.com/">jqfaq.com</a>        

