<#attempt>
<#include '/social_widget_logged.ftl'>
<#include '/social_widget_context.ftl'>

<#-- Validar se quem está renderizando essa ftl é o popover na timeline -->
<#if instanceIdPopover??>
	<#-- instanceIdPopover eh um numero randomico para diferenciar todos os cards dentro do popover na timeline -->
	<#assign instanceId = instanceIdPopover>
</#if>

<div class="wcm-widget-class widget-card-user super-widget clearfix" data-social-type="${social.type}" data-params="SocialCard.instance({socialId: ${social.id!0}, alias: '${social.alias!}'})" id="socialcard_${instanceId}" style="height: 71px; margin-top: -20px;">
	<#if social.id != 0>
		<#switch social.type>
			<#case "USER">
				<#include "cardUser.ftl">
				<#--
				23/May/2013 - Eduardo Rabelo
				Remoção provisória do IF para uma nova proposta de Card,
				Ainda não confirmado se ficará assim
				<#if loggedSocial.id == social.id >
					<#include "cardLoggedUser.ftl">
				<#else>
					<#include "cardUser.ftl">
				</#if>
				-->
			<#break>
			<#case "COMMUNITY">
				<#include "cardCommunity.ftl">
			<#break>
			<#case "APPLICATION">
				<#include "cardApplication.ftl">
			<#break>			
			<#default>
				${i18n.getTranslation('invalid.social.type')}
		</#switch>
	</#if>
<script type="text/template" class="social-share-card-template">
	<div class="media fs-overflow-visible">
	    <a class="pull-left" href="/portal/p/1/social/bob">
	        <span class="wrap-element-popover">
	            {{{image}}}
	        </span>
	    </a>
	    <div class="media-body">
	        <div class="page-header fs-no-margin">
	            <div class="row">
	                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
	                    <h4 class="media-heading ellipsis">
	                        {{description}}
	                    </h4>
	                </div>
	                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
	                </div>
	            </div>
	            <div class="row">
	                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	                    <div class="ellipsis">
	                        {{{moreInfo}}}
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</script>
<script type="text/template" class="social-permissions-card-template">
	{{#showActions}}
	<div class="dropdown">
    	<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
    	${i18n.getTranslation('administrate')}
    	<span class="caret"></span>
    	</button>
    	<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu1">
	        {{#canEditCommunity}}
			<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-social-alias="${social.alias}" data-edit-community>${i18n.getTranslation('card.user.edit.community')}</a></li>
        	{{/canEditCommunity}}
			{{#canAdministerUser}}
			<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-add-user>${i18n.getTranslation('add.user')}</a></li>
			<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-add-group>${i18n.getTranslation('add.group')}</a></li>
			{{/canAdministerUser}}
    	</ul>
	</div>
	{{/showActions}}
</script>
</div>

<#recover>
	<#include "/social_error.ftl">
</#attempt>