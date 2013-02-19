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
<div><a href="http://www.fusioncharts.com/products/suite/?role=Developer&amp;utm_source=jqfaq&amp;utm_medium=banner&amp;utm_content=1_billion_banner_knight_468X60_fo&amp;utm_campaign=FC_v3_2_Mktg" target="_blank"><img src="http://jqfaq.com/wp-content/uploads/2012/07/BB-glass-468X60px.jpg"></a><br>
<a class="ad_links" href="mailto:marketing@jqfaq.com?subject=Advetisement in JqFAQ">Click Here to Sponsor</a>
</div>
