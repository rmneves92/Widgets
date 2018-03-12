<#attempt>
<#include '/social_widget_logged.ftl'>

<#if parentPageCode == "subject" >
	<#assign aliasPage = pageCode >
<#else>
	<#assign aliasPage = p1!"" >
</#if>


<#assign social = socialSvc.findSocialVOByAlias(aliasPage)>

<div style="border-color: ${bordColor!}" class="wcm-widget-class widget-favorite-full super-widget clearfix fav-border tp_alerta_border fonte-calibri" data-params="SocialFavorite.instance({'aliasPage': '${aliasPage}', 'iconic': false})" id="socialfavorite_${instanceId}">
	<div class="fluig-style-guide">
	    <div style="background-color: ${bordColor!}" class="page-header tp_page_header fav-page-header">
		    <h1 class="panel-title"><span class="fluigicon fluigicon-thumbs-up-on fluigicon-md icone-topo-fav"></span>${i18n.getTranslation('application.title')}</h1>
		</div>
	</div>
	<div class="divFav">
		<form id="social-favorite-form" class="totvs-form inline">
			<div class="grid">
				<div class="col-2-3" style="text-align: right; padding: 8px 8px 0 0;">
					<label>${i18n.getTranslation('filter.by.type')}</label>
				</div>
				<div class="col-1-3">
					<select class="fr" id="social-favorites-type" data-favorite-filter-grid>
						<option value="ALL">${i18n.getTranslation('all')}</option>
						<option value="USER">${i18n.getTranslation('only-users')}</option>
						<option value="COMMUNITY" selected="selected">${i18n.getTranslation('only-communities')}</option>
					</select>
				</div>
			</div>
		</form>
		<div id="social-favorites-buttons"></div>
		<table id="social-favorites-grid"></table>
		<div id="social-favorites-page"></div>
	</div>
</div>

<#recover>
	<#include "/social_error.ftl">
</#attempt>
