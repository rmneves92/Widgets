<#attempt>

	<#if !cardPopover??>
		<div class="user-identity-card">
			<figure class="user-avatar-area">
				<img data-update-image-profile="${social.alias!''}" data-image-size="MEDIUM_PICTURE" class="fluig-style-guide thumb-profile user-avatar" src="/social/api/rest/social/image/profile/${social.alias}/MEDIUM_PICTURE" alt="${i18n.getTranslation('card.user.avatar')} ${social.alias}">
			</figure>
			<div class="user-infos-area">
				<h1 class="user-name">${social.name}</h1>
				<div class="user-email">${i18n.getTranslation('application')}</div>
			</div>
		</div>
	<#else>
		<div class="card-popover clearfix">
			<div class="container-image">
				<img data-update-image-profile="${social.alias!''}" data-image-size="SMALL_PICTURE" class="fluig-style-guide thumb-profile thumb-profile-sm user-avatar" src="/social/api/rest/social/image/profile/${social.alias}/SMALL_PICTURE" alt="${social.name}" />
			</div>
			<div class="container-info">
				<div class="link-user-name"><h1 class="user-name ellipsis" title="${social.name}">${social.name}</h1></div>
				<div class="container-social-connections">
					<p>${i18n.getTranslation('application')}</p>
				</div>
			</div>
		</div>
	</#if>

<#recover>
	<#include "/social_error.ftl">
</#attempt>