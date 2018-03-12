<#assign loggedSocial = socialSvc.findSocialLogged()>

<#if loggedSocial.alias != alias?string>
	<#assign favorited = favoriteSvc.isFavorited(alias?string)>
	<div class="wcm-widget-class widget-favorite super-widget clearfix" data-params="SocialFavorite.instance({'aliasPage': '${alias}', 'iconic': true})" id="socialfavorite_${customInstance}">
		<a class="byyou-icon byyou-icon-favorites2 unfavorite-it" value="" title="${i18n.getTranslation('remove.favorite')}" data-unfavorite-it data-social-alias="${alias}" <#if favorited == false>style="display:none"</#if>></a>
		<a class="byyou-icon byyou-icon-favorites2 favorite-it" value="" title="${i18n.getTranslation('add.favorite')}" data-favorite-it data-social-alias="${alias}" <#if favorited == true>style="display:none"</#if>></a>
	</div>
</#if>