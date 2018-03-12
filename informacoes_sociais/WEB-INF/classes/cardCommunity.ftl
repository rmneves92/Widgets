<#attempt>
<#assign status = participationSvc.findParticipantRelation(loggedSocial.id, social.id)>
<#assign moderator = participationSvc.isSocialModerator(social.id, loggedSocial.id)>
<#assign isTenantAdmin = securitySvc.isTenantAdmin()>
<#assign visibility = socialSvc.findSocialVOByAlias(social.alias)>
<#assign communityIsHidden = visibility.isHidden()>
<#assign communityHavaApprovalRequired = visibility.isApprovalRequired()>
<#assign canAccess = svcAccessControl.canAccess(loggedSocial.alias, social.alias)!false>
<#assign userIsWatchingCommunity = svcWatch.isWatchingSocial(social.id,socialSvc.findSocialLogged().getAlias())>
<#assign hiddenClassIsWatching = "">
<#assign hiddenClassIsNotWatching = "">
<#assign descriptionWithTags = social.description!"">
<#assign communityDescription = svcTag.parse(descriptionWithTags, "<a class='totvs-link-social' data-card-link-tag>#[tag]</a>")>
<#assign communityInfo = socialSvc.findSocialVOWithDataByAliasNotSupported(social.alias)>
<#assign permissions = communityInfo.permissions>
<#assign canNotifyCommunity = permissions?seq_index_of("NOTIFY_COMMUNITY")>


<#if userIsWatchingCommunity>
	<#assign hiddenClassIsWatching = "c-hidden">
<#else>
	<#assign hiddenClassIsNotWatching = "c-hidden">
</#if>

	<#if !cardPopover??>
		<#-- Card Default -->
		<div class="user-identity-card">
			<!-- figure class="fig-thumb">
				<a href="${tenantURI}/${social.page}">
					<img data-update-image-profile="${social.alias!''}" data-image-size="MEDIUM_PICTURE" class="fluig-style-guide thumb-profile user-avatar" src="/social/api/rest/social/image/profile/${social.alias}/MEDIUM_PICTURE" alt="${i18n.getTranslation('card.user.avatar')} ${social.alias}">
				</a>
				<#if loggedSocial.id != user.id>
				<div class="card-favorite">
					<div class="social-favorite-object-load" data-alias="${social.alias}"></div>
				</div>
				</#if>
			</figure-->
			<div class="user-infos-area">
				<h1 class="user-name">
					<a class="" href="${tenantURI}/${social.page}">Comunidade | <b>${social.name}</b></a>
				</h1>
				<!-- p class="card-description">${communityDescription!}</p-->

				<ul class="fluig-style-guide list-inline">
				<#if communityIsHidden>
					<li class="community-visibility-icon">
						<span class="byyou-controller byyou-controller-circleminus"></span>${i18n.getTranslation('community.hidden')}
					</li>
				<#elseif communityHavaApprovalRequired>
					<li class="community-visibility-icon">
						<span class="fluigicon fluigicon-lock"></span>${i18n.getTranslation('community.private')}
					</li>
				<#else>
					<li class="community-visibility-icon">
						<!-- span class="fluigicon fluigicon-globe"></span-->
						<ul class="user-connections-list list-inline">

							<li class="connections-item <#if social.state == 'BLOCKED'>hide-element</#if>">
								<a href="${tenantURI}/connections/${social.alias}/participations" class="link-connections">
									<strong class="social-relations relations-number">${i18n.getTranslation('community.public')} - ${social.numberParticipations}  ${i18n.getTranslation('participants')}</strong>
									<span class="social-relations relations-label"></span>
								</a>
								<a href="javascript:socialGlobal.showParticipations('${social.alias}');" class="link-connections"><br><span class="social-relations relations-label"></span></a>
							</li>
		
							<li class="connections-item">
								<!-- div class="fluig-style-guide dropdown-actions">
									
								</div-->
							</li>
						</ul>
					</li>
				</#if>

					<#if !communityIsHidden || status == "ACCEPTED" || isTenantAdmin >
						<#switch status>
							<#case "ACCEPTED">
								<#if (canNotifyCommunity != -1)>
								<!-- li class="${hiddenClassIsNotWatching} community-visibility-icon" data-stop-watching>
									<span class="fluigicon fluigicon-bell"></span><a href="#" class="status-watched" data-watch-community>${i18n.getTranslation('stop.watch')}</a>
								</li>
								<li class="${hiddenClassIsWatching} community-visibility-icon" data-start-watching>
									<span class="fluigicon fluigicon-bell-empty"></span><a href="#" class="" data-watch-community>${i18n.getTranslation('watch')}</a>
								</li-->
								</#if>
							<#break>
						</#switch>
					</#if>
					
				</ul>
				<#if social.admin?has_content>
				<ul class="fluig-style-guide list-inline">
					<!-- li class="community-administratio-icon">
						<span class="fluigicon fluigicon-certificate" title="${i18n.getTranslation('administered.by')}"></span><a href="${tenantURI}/${social.admin.page}" class="totvs-link-default" data-user-popover="${social.admin.alias}">${social.admin.name}</a>
					</li-->
				</ul>
				</#if>

			</div>
		</div>
		<#--
		<#if social.state != "BLOCKED">
		-->
		<#if !communityIsHidden || status == "ACCEPTED" || isTenantAdmin >
			<div class="user-actions-card">
				
				<ul class="user-relation-buttons-list fluig-style-guide list-space list-inline">
					<#switch status>
						<#case "NOT_RELATED">
							<#if !communityIsHidden>
								<li class="relation-buttons-item">
									<button type="button" class="btn btn-primary btn-sm block" data-participate-action>${i18n.getTranslation('participate')}</button>
								</li>
							</#if>
						<#break>
						<#case "PENDING">
							<li class="relation-buttons-item">
								<button type="button" class="btn btn-default btn-sm block disabled" disabled="disabled">${i18n.getTranslation('pending')}</button>
							</li>
						<#break>
						<#case "ACCEPTED">
							<#if !moderator>
								<li>
									<button type="button" class="btn btn-warning btn-sm block btn-leave" data-remove-participation-action>${i18n.getTranslation('remove.participation')}</button>
								</li>
							</#if>

						<#break>
						<#case "REJECTED">
							<#if !communityIsHidden>
								<li class="relation-buttons-item">
									<button type="button" class="btn btn-primary btn-sm block" data-participate-action>${i18n.getTranslation('participate')}</button>
								</li>
							</#if>
						<#break>
						<#default>
					</#switch>
					<!-- 
					Removido o botão de compartilhar do card de comunidade, funcionalidade será repensada SOCIALECMSUST-3269
					<li class="relation-buttons-item">
						<button type="button" class="btn btn-primary btn-sm block" sociableId="${social.id}" shareType="SOCIAL" data-share-card>${i18n.getTranslation('card.user.share')}</button>
					</li>
					-->
				</ul>
			</div>
		</#if>
	<#else>
		<#-- Card Popover -->
		<div class="card-popover clearfix" data-social-id="${social.id}">
			<div class="container-image">
				<a href="${tenantURI}/${social.page}">
					<figure class="user-identity-card">
						<img data-update-image-profile="${social.alias!''}" data-image-size="SMALL_PICTURE" class="fluig-style-guide thumb-profile thumb-profile-sm user-avatar" src="/social/api/rest/social/image/profile/${social.alias}/SMALL_PICTURE" alt="${social.name}" />
						<#if loggedSocial.id != user.id>
						<div class="card-favorite">
							<div class="social-favorite-object-load" data-alias="${social.alias}"></div>
						</div>
						</#if>
					</figure>
				</a>
			</div>
			<#if canAccess>
				<div class="container-info">
					<a class="link-user-name" href="${tenantURI}/${social.page}"><h1 class="user-name ellipsis" title="${social.name}">${social.name}</h1></a>
					<div class="container-social-connections">
						<a href="${tenantURI}/connections/${social.alias}/followers" class="totvs-link-default">
							<span>${i18n.getTranslation('label.system.participants')} (${social.numberParticipations!"0"})</span>
						</a>
					</div>
					<#if social.state != "BLOCKED">
						<div class="container-social-actions  fluig-style-guide">
							<#switch status>
								<#case "NOT_RELATED">
									<#if !communityIsHidden>
										<button type="button" class="btn btn-primary btn-xs" data-participate-action-popover>${i18n.getTranslation('participate')}</button>
									</#if>
								<#break>
								<#case "PENDING">
									<button type="button" class="btn btn-default btn-xs disabled" disabled="disabled" data-pending>${i18n.getTranslation('pending')}</button>
								<#break>
								<#case "ACCEPTED">
								<#break>
								<#case "REJECTED">
									<#if !communityIsHidden>
										<button type="button" class="btn btn-primary btn-xs" data-participate-action-popover>${i18n.getTranslation('participate')}</button>
									</#if>
								<#break>
								<#default>
							</#switch>
							<button type="button" class="btn btn-primary btn-xs" sociableId="${social.id}" shareType="SOCIAL" data-share-card>${i18n.getTranslation('card.user.share')}</button>
						</div>
					</#if>
				</div>
				<div class="container-more-info clearfix">
					<ul class="list-card-more-info">
						<#if social.description?has_content>
							<#if social.description?length &gt; 64>
								<#assign newDescription = social.description?substring(0, 64)>
								<li class="list-card-more-info-itens list-description"><b>${i18n.getTranslation('label.system.description')}:</b> ${newDescription!''}... <a class="totvs-link-default" href="${tenantURI}/${social.page}">${i18n.getTranslation('label.system.show.more')}</a></li>
							<#else>
								<li class="list-card-more-info-itens list-description"><b>${i18n.getTranslation('label.system.description')}:</b> ${social.description!''}</li>
							</#if>
						</#if>
					</ul>
				</div>
			<#else>
				<div class="container-info">
					<a class="link-user-name" href="${tenantURI}/${social.page}"><h1 class="user-name ellipsis" title="${social.name}">${social.name}</h1></a>
					<p class="message-warning message-can-access">${i18n.getTranslation('message.can.access.community')}</p>
				</div>
			</#if>
		</div>
	</#if>

<#recover>
	<#include "/social_error.ftl">
</#attempt>