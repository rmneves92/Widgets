<#attempt>

<div class="fluig-style-guide wcm-widget-class super-widget tp_alerta_border tp_alerta_border_${instanceId}" id="socialtagscloud_${instanceId}" data-params="socialtagscloud.instance({mode:'view',parentPageCode: '${parentPageCode!''}',community: '${community!''}', lastTagsDay: '${lastTagsDay!''}'})">
	
	<h2 class="tp_page_header_${instanceId} page-header tp_page_header" style="padding-bottom: 15px; padding-left: 10px;">
		#MaisBuscadas
	</h2>
		<div id="message"></div>
	  	<div id="cloud"></div>
	  	
		<script type="text/mustache" class="message-tagscloud">
			<div class="message-warning" id='msgtagscloud${instanceId}'>
				{{message}}
			</div>
		</script>
	
</div>

<script>
	$('.tp_alerta_border_${instanceId}').css('border-color','${bordColor!}');
	$('.tp_page_header_${instanceId}').css('background-color', '${bordColor!}');
	
</script>

<#recover>
	<#include "/social_error.ftl">
</#attempt>