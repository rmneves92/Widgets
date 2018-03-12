<div 
	id="bannerslideshow_${instanceId!}" 
	class="fluig-style-guide wcm-widget-class super-widget"
	data-params="bannerSlideShow.instance({'instanceId': '${instanceId!}', 'viewMode': true, 'folder': '${folder!}', 'folderNumber': '${folderNumber!}', 'type': '${type!}', 'fx': '${fx!}', 'random': '${random!}', 'loop': '${loop!}', 'mark': '${mark!}', 'time': '${time!}', 'transition': '${transition!}', 'linkimage': '${linkimage!}', 'showlastimage': '${showlastimage!}', 'marklocation': '${marklocation!}', 'title': '${title!}', 'titleFontColor': '${titleFontColor!}', 'titleBackgroundColor': '${titleBackgroundColor!}', 'localeon': '${localeon!}'})">
		
	<#if mark == 'yes' && marklocation == 'top'>
	<div class="cycle-slideshow-count-div" style="font-size:1.5em"></div>
	</#if>
	
	<div id="cycleslideshowbannerslideshow${instanceId}"
		data-show-news-detail
		class="cycle-slideshow"
   		data-cycle-fx="${fx!'scrollHorz'}"
    	data-cycle-delay="-1500"
    	data-cycle-log="false"
		data-cycle-loop="${loop!''}"		
		data-cycle-pause-on-hover="true"
		data-cycle-slides="> div"
		data-cycle-speed="${time!''}"
		data-cycle-timeout="${transition!''}"
		
		
		<#if mark == 'yes'>
		data-cycle-pager="#bannerslideshow_${instanceId} .cycle-slideshow-count-div"
		
			<#if marktype == 'number'>
				data-cycle-pager-template="<a href=# class=cycle-slideshow-count-div-number>{{slideNum}}</a>"
			<#else>
				data-cycle-pager-template="<a href=# class=cycle-slideshow-count-div-bull>&bull;</a>"
			</#if>
		</#if>>
	</div>
	
	<#if mark == 'yes' && marklocation == 'bottom'>
	<div id="navegacao-banner" class="cycle-slideshow-count-div" style="font-size:1.5em"></div>
	</#if>
</div>