<#attempt>

<#assign isFriend  = followSvc.findFollowingRelationStatus(loggedSocial.id, social.id)>
<#assign userEmail = socialSvc.findSocialDataValue(social.id, 'email')!"">
<#assign canAccess = svcAccessControl.canAccess(loggedSocial.alias, social.alias)!false>
<#assign userData = securitySvc.findUserDataByAlias(social.alias)>

	<#if !cardPopover??>
		<#-- Card Default -->
		<div class="user-identity-card">
			<figure class="fig-thumb">
				<img data-update-image-profile="${social.alias!''}" data-image-size="MEDIUM_PICTURE" class="fluig-style-guide thumb-profile user-avatar" src="/social/api/rest/social/image/profile/${social.alias}/MEDIUM_PICTURE" alt="${i18n.getTranslation('card.user.avatar')} ${social.alias}">
				<#if social.state == "ACTIVE" && loggedSocial.id != social.id>
				<div class="card-favorite">
					<div class="social-favorite-object-load" data-alias="${social.alias}"></div>
				</div>
				</#if>
			</figure>

			<div class="user-infos-area fluig-style-guide">
				<h1 class="user-name">${social.name}</h1>
				<ul class="user-profile-data">
					<#if userEmail?has_content>
						<li><b>${i18n.getTranslation('card.user.email')}:</b> <a class="totvs-link-default" href="mailto:${userEmail!''}">${userEmail!''}</a></li>
					</#if>

					<#if userData.data.UserProjects?has_content>
						<li><b>${i18n.getTranslation('card.user.area')}:</b> ${userData.data.UserProjects}</li>
					</#if>

					<#if userData.data.UserSpecialization?has_content>
						<li><b>${i18n.getTranslation('card.user.role')}:</b> ${userData.data.UserSpecialization}</li>
					</#if>

					<#if userData.data.UserRamal?has_content>
						<li><b>${i18n.getTranslation('card.user.phone')}:</b> ${userData.data.UserRamal}</li>
					</#if>
				</ul>
				<span class="user-description">
					<#if loggedSocial.id == social.id>
						<button type="button" data-edit-description class="btn-edit-description btn btn-primary btn-xs fl"><span class="fluigicon fluigicon-pencil" title="${i18n.getTranslation('description')}"></span></button>
					</#if>
					<span class="description fl">${social.description!""}</span>
				</span>
				<#if loggedSocial.id == social.id>
					<span class="edit-description totvs-form">
						<textarea id="userDescriptionText" class="user-description-text" maxlength="200" placeholder="${i18n.getTranslation('description')}"></textarea>
						<div id="userDescriptionCounter" class="char-counter"></div>
						<input data-save-description data-user-alias="${social.alias}" class="btn btn-primary btn-sm" type="button" value="${i18n.getTranslation('save')}" />
						<input data-cancel-description class="btn-cancel-description btn btn-default btn-sm" type="button" value="${i18n.getTranslation('cancel')}" />
					</span>
				</#if>
			</div>
		</div>
		<#if social.state == "ACTIVE">
		<div class="user-actions-card">
			<ul class="user-connections-list list-inline">

				<li class="connections-item">
					<a href="${tenantURI}/connections/${social.alias}/followings" class="link-connections">
						<strong class="social-relations relations-number">${social.numberFollowing}</strong>
						<span class="social-relations relations-label">${i18n.getTranslation('label.system.following')}</span>
					</a>
				</li>
				<li class="connections-item">
					<a href="${tenantURI}/connections/${social.alias}/followers" class="link-connections">
						<strong class="social-relations relations-number">${social.numberFollowers}</strong>
						<span class="social-relations relations-label">${i18n.getTranslation('label.system.followers')}</span>
					</a>
				</li>
				<li class="connections-item">
					<a href="${tenantURI}/connections/${social.alias}/my-communities" class="link-connections">
						<strong class="social-relations relations-number">${social.numberParticipations}</strong>
						<span class="social-relations relations-label">${i18n.getTranslation('label.system.communities')}</span>
					</a>
				</li>
			</ul>
			<ul class="user-relation-buttons-list fluig-style-guide list-space list-inline">
				<#switch isFriend>
					<#case "REJECTED">
					<#case "NOT_RELATED">
					<li class="relation-buttons-item">
						<button type="button" class="btn btn-primary btn-sm block" data-follow-action>${i18n.getTranslation('card.user.follow')}</button>
					</li>
					<#break>
					<#case "BLOCKED">
					<#case "PENDING">
					<li class="relation-buttons-item">
						<button type="button" class="btn btn-default btn-sm block disabled" disabled="disabled">${i18n.getTranslation('card.user.request.pending')}</button>
					</li>
					<#break>
					<#case "ACCEPTED">
					<li class="relation-buttons-item">
						<button type="button" class="btn btn-default btn-sm block" data-unfollow-action>${i18n.getTranslation('card.user.unfollow')}</button>
					</li>
					<#break>
					<#case "ITSELF">
					<#--<li class="relation-buttons-item">
						<button type="button" class="totvs-btn-action small block edit-my-profile" data-edit-profile>${i18n.getTranslation('card.user.edit.profile')}</button>
					</li>-->
					<#break>
					<#default>
				</#switch>
				<#if isFriend != "ITSELF">
					<li class="relation-buttons-item">
						<button type="button" class="btn btn-primary btn-sm block" userId="${userData.id}" userName="${userData.fullName}" data-send-message>${i18n.getTranslation('card.user.message')}</button>
					</li>
				</#if>				
				<!-- 
				Removido o botão de compartilhar do card do usuário, funcionalidade será repensada SOCIALECMSUST-3269
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
						<#if loggedSocial.id != social.id>
						<div class="card-favorite">
							<div class="social-favorite-object-load" data-alias="${social.alias}"></div>
						</div>
						</#if>
					</figure>
				</a>
			</div>
			<#if canAccess>
				<div class="container-info">
					<h1 class="user-name ellipsis" title="${social.name}"><a class="link-user-name" href="${tenantURI}/${social.page}">${social.name}</a></h1>
					<div class="container-social-connections">
						<a href="${tenantURI}/connections/${social.alias}/followers" class="totvs-link-default">
							<span>${i18n.getTranslation('label.system.following')} (${social.numberFollowing!"0"})</span>
						</a>
						<span>|</span>
						<a href="${tenantURI}/connections/${social.alias}/followings" class="totvs-link-default">
							<span>${i18n.getTranslation('label.system.followers')} (${social.numberFollowers!"0"})</span>
						</a>
					</div>
					<div class="container-social-actions fluig-style-guide">
						<#switch isFriend>
							<#case "REJECTED">
							<#case "NOT_RELATED">
								<button type="button" class="btn btn-primary btn-xs" data-follow-action>${i18n.getTranslation('card.user.follow')}</button>
							<#break>
							<#case "BLOCKED">
							<#case "PENDING">
								<button type="button" class="btn btn-default btn-xs disabled" disabled="disabled">${i18n.getTranslation('card.user.request.pending')}</button>
							<#break>
							<#case "ACCEPTED">
								<button type="button" class="btn btn-default btn-xs" data-unfollow-action>${i18n.getTranslation('card.user.unfollow')}</button>
							<#break>
							<#default>
						</#switch>
						<#if isFriend != "ITSELF">
							<button type="button" class="btn btn-primary btn-xs" sociableId="${social.id}" shareType="SOCIAL" data-share-card>${i18n.getTranslation('card.user.share')}</button>
							<button type="button" class="btn btn-primary btn-xs" userId="${userData.id}" userName="${userData.fullName}" data-send-message>${i18n.getTranslation('card.user.message')}</button>
						</#if>
					</div>
				</div>
				<div class="container-more-info clearfix">
					<ul class="list-card-more-info">
						<#if userEmail?has_content>
							<li class="list-card-more-info-itens fluig-style-guide">
								<div class="row">
									<div class="col-md-2"><b>Email:</b></div>
									<div class="col-md-10"> <a class="totvs-link-default fs-full-width fs-ellipsis" href="mailto:${userEmail!''}" title="${userEmail!''}">${userEmail!''}</a></div>
								</div>
							</li>
						</#if>
						<li><a class="totvs-link-default" href="${tenantURI}/${social.page}">${i18n.getTranslation('label.system.show.more')}</a></li>
					</ul>
				</div>
			<#else>
				<div class="container-info">
					<a class="link-user-name" href="${tenantURI}/${social.page}"><h1 class="user-name ellipsis" title="${social.name}">${social.name}</h1></a>
					<p class="message-warning message-can-access">${i18n.getTranslation('message.can.access.user')}</p>
				</div>
			</#if>
		</div>
	</#if>

<#recover>
	<#include "/social_error.ftl">
</#attempt>