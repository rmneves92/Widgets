<#attempt>
<#if !orderByField??>
    <#assign orderByField = "documentid">
</#if>
<#assign parameters = '{"numberOfArticles": "${numberOfArticles!5}", "widgetVersion" : "${applicationVersion}", "orderByField": "${orderByField}"}'?html>

<div id="Vagas_${instanceId}"	class="wcm-widget-class super-widget fluig-style-guide tp_alerta_border tp_alerta_border_${instanceId} fonte-calibri fonte-calibri-alertas-noticias"	data-params="Vagas.instance(${parameters})">
	
	<h2 class="tp_page_header_${instanceId} page-header tp_page_header" style="padding-bottom: 10px!important;">
		<span class="icone-topo-vagas fluigicon fluigicon-newspaper fluigicon-md"></span>
		 ${i18n.getTranslation('application.title')}
	</h2>
	<div class="row">
		<div class="col-xs-12">
    		<ul class="list-group tp_list_group" data-list-news></ul>
		</div>
	</div>
	<div class="row" data-row-load-more>
		<div class="col-xs-12 text-center">
			<button type="button" class="btn btn-default btn-md btn-block tp_button_veja_mais tp_button_veja_mais_${instanceId}" id="tp_button_veja_mais_${instanceId}" data-load-more-news>${i18n.getTranslation('vagas.load.more')}</button>
		</div>
	</div>
    	
	<script type="text/template" class="template-news">
		<li class="list-group-item fs-no-border-left fs-no-border fs-cursor-pointer fs-no-padding-left fs-no-padding-right vagasList" data-show-news-detail data-array-position="{{arrayPosition}}">
			<div class="media">
			    <a class="pull-left" href="#">
			    	<!-- img width="120" class="media-object" src="{{imgUrl}}" alt=""-->
			    </a>
		        <h2 class="media-heading">{{news_title}}<br></h2>
		        <h4 class="data-publicacao"><small>{{#formatPublishDate}}{{formatPublishDate}}{{/formatPublishDate}}</small></h4>
				<p class="hidden-xs vagas_min">{{news_body_min}}</p>
				<button type="button" class="btn btn-default hidden-xs btn-vagas vagas_min"><span class="fluigicon fluigicon-plus fluigicon-xs"></span></button>
			</div>
			<br>
		</li>
	</script>
	
	<script type="text/template" class="template-no-news">
		<div class="alert alert-info">
			${i18n.getTranslation('vagas.no.news')}
		</div>
	</script>
	
	
	<script type="text/template" class="template-news-detail">
		<div class="container-fluid">
			<h2 class="page-header">{{news_title}}</h2>
			{{#imgUrl}}
				<div class="row">
					<div class="col-xs-12 text-center">
						<img style="max-width: 100%; max-height: 300px;" class="img-rounded" src="{{imgUrl}}" alt="">
						<br><br>
					</div>
				</div>
			{{/imgUrl}}
			<div class="row">
				<div class="col-xs-12">
					<p>{{news_body}}</p>
				</div>
			</div>
		</div>
	</script>
</div>

<script src="/webdesk/vcXMLRPC.js" type="text/javascript"></script>
<script>
$( document ).ready(function() {
	$('.tp_alerta_border_${instanceId}').css('border-color','${bordColor!}');
	$('.tp_page_header_${instanceId}').css('background-color', '${bordColor!}');
	$('.tp_button_veja_mais_${instanceId}').css('border-color', '${bordColor!}');
	$('.tp_button_veja_mais_${instanceId}').css('background-color', '${bordColor!}');

});
</script>
<#recover>
	<#include "/social_error.ftl">
</#attempt>