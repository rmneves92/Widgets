<#attempt>
<#include '/social_widget_logged.ftl'>
<#include '/social_widget_context.ftl'>

<#assign isTenantAdmin = securitySvc.isTenantAdmin()>
<#assign visibility = socialSvc.findSocialVOByAlias(social.alias)>
<#assign communityIsHidden = visibility.isHidden()>
<#assign communityIsPrivateContent = visibility.isPrivateContent()>
<#assign status = participationSvc.findParticipantRelation(loggedSocial.id, social.id)>

<#assign socialPageCode = "">
<#assign socialdocsPageCode = "">
<#assign imagesPageCode = "">
<#assign videosPageCode = "">
<#assign articlesPageCode = "">
<#assign formPageCode = "">
<#assign connectionsPageCode = "">
<#assign forumPageCode = "">

<#if parentPageCode == "subject">
	<#assign socialPageCode = "tab-selected">
<#elseif pageCode?has_content>
	<#switch pageCode>
		<#case "social">
		<#case "community">
			<#assign socialPageCode = "tab-selected">
		<#break>
		<#case "socialdocs">
			<#assign socialdocsPageCode = "tab-selected">
		<#break>
		<#case "images">
			<#assign imagesPageCode = "tab-selected">
		<#break>
		<#case "videos">
			<#assign videosPageCode = "tab-selected">
		<#break>
		<#case "articles">
		<#case "articleview">
			<#assign articlesPageCode = "tab-selected">
		<#break>
		<#case "form">
			<#assign formPageCode = "tab-selected">
		<#break>
		<#case "connections">
			<#assign connectionsPageCode = "tab-selected">
		<#break>
		<#case "forum">
			<#assign forumPageCode = "tab-selected">
		<#break>
	</#switch>
<#else>
	<#assign socialPageCode = "tab-selected">
</#if>

<#if loggedSocial.id != social.id && social.type != "APPLICATION">
	<div class="wcm-widget-class widget-social-navigation super-widget" data-params="tp_socialnavigation.instance({alias:'${social.alias}'})" id="tp_socialnavigation_${instanceId}" style="margin-top: -20px;">
		<ul class="social-navigation-list list-inline ulWrapper">
			
			<li class="itens-navegacao">
				<a class="social-navigation-link ${socialPageCode} link-navegation" href="${tenantURI}/${social.page}">${i18n.getTranslation('timeline')}</a>
			</li>

			<#if social.type != "USER" && social.type != "APPLICATION">
				
				<#assign listCommunityFolder = docBI.findCommunityFolder(loggedSocial.tenantId, aliasPage)>
				
				<#if listCommunityFolder?has_content>
					<#list listCommunityFolder as communityFolder><#t>
						<#if communityFolder.enabled?has_content && communityFolder.enabled && communityFolder.type == "DOCUMENT" && communityFolder.permissionLevel != -1>
							<li class="social-navigation-items aWrapper ">
								<a class="social-navigation-link ${socialdocsPageCode} link-navegation" href="${tenantURI}/socialdocs/${social.alias}">${i18n.getTranslation('docs')}</a>
							</li>
						</#if>
						<#if communityFolder.enabled?has_content && communityFolder.enabled && communityFolder.type == "GALLERY_PHOTO" && communityFolder.permissionLevel != -1 >
							<li class="social-navigation-items aWrapper">
								<a class="social-navigation-link ${imagesPageCode} link-navegation" href="${tenantURI}/images/${social.alias}/${communityFolder.documentId}">${i18n.getTranslation('images')}</a>
							</li>
						</#if>
						<#if communityFolder.enabled?has_content && communityFolder.enabled && communityFolder.type == "GALLERY_VIDEO" && communityFolder.permissionLevel != -1 >
							<li class="social-navigation-items aWrapper">
								<a class="social-navigation-link ${videosPageCode} link-navegation" href="${tenantURI}/videos/${social.alias}/${communityFolder.documentId}">${i18n.getTranslation('videos')}</a>
							</li>
						</#if>
						<#if communityFolder.enabled?has_content && communityFolder.enabled && communityFolder.type == "ARTICLE" && communityFolder.permissionLevel != -1 >
							<li class="social-navigation-items aWrapper">
								<a class="social-navigation-link ${articlesPageCode} link-navegation" href="${tenantURL}/articles/${social.alias}/${communityFolder.documentId}">${i18n.getTranslation('articles')}</a>
							</li>
						</#if>
						<#if communityFolder.enabled?has_content && communityFolder.enabled && communityFolder.type == "FORM" && communityFolder.permissionLevel != -1 >
							<li class="social-navigation-items aWrapper">
								<a class="social-navigation-link ${formPageCode} link-navegation" href="${tenantURI}/form/${social.alias}/${communityFolder.documentId}">${i18n.getTranslation('forms')}</a>
							</li>
						</#if>
					</#list><#t>
				</#if>
			</#if>
			<#if social.state != "BLOCKED" && social.type != "APPLICATION">
				<#if social.type == "USER">
					<li class="social-navigation-items aWrapper">
						<a class="social-navigation-link ${connectionsPageCode}link-navegation " href="${tenantURI}/connections/${social.alias}/followings">${i18n.getTranslation('connections')}</a>
					</li>
				<#else>
					<#if (communityIsHidden && status == "ACCEPTED") || !communityIsHidden || isTenantAdmin>
						<li class="social-navigation-items aWrapper">
							<a class="social-navigation-link ${connectionsPageCode} link-navegation" href="${tenantURI}/connections/${social.alias}/participations">${i18n.getTranslation('connections')}</a>
						</li>
					</#if>
				</#if>
			</#if>
			<#if social.forumId?has_content && social.type == "COMMUNITY" && ((status == "ACCEPTED") || (isTenantAdmin) || (!communityIsPrivateContent))>
				<li class="social-navigation-items aWrapper"> 
					<a class="social-navigation-link ${forumPageCode} link-navegation" href="${tenantURI}/forum/${social.alias}">${i18n.getTranslation('forum')}</a>
				</li>
			</#if>
		</ul>
	</div>
<#elseif pageCode?has_content && pageCode != 'social' && pageCode != 'communities' && pageCode != 'community' && pageCode != 'connections'>
	<div class="message-warning">
		${i18n.getTranslation('compatibility.community')}
	</div>
</#if>

<#recover>
	<#include "/social_error.ftl">
</#attempt>