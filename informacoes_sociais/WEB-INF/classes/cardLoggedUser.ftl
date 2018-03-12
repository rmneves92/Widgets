<#attempt>
<#assign status = followSvc.findFollowingRelationStatus(loggedSocial.id, social.id)>

<div class="wcm-content wcm-background">

	<div class="wcm-profile-card-logged clearfix">

		<div class="profile-name">
			<a href="${tenantURI}/social/${social.alias}" class="link-card">${social.name}</a>
			<div class="more-info">
				<a href="${tenantURI}/profile/${social.alias}">${i18n.getTranslation('more.information')}</a>
			</div>
		</div>

		<ul class="connections-numbers list-inline">
			<li class="connections">
				<a href="${tenantURI}/connections/${social.alias}/followings" class="link-connections">
					<span class="social-relations relations-number">${social.numberFollowing}</span>
					<span class="social-relations relations-label">${i18n.getTranslation('label.system.following')}</span>
				</a>
			</li>
			<li class="connections">
				<a href="${tenantURI}/connections/${social.alias}/followers" class="link-connections">
					<span class="social-relations relations-number">${social.numberFollowers}</span>
					<span class="social-relations relations-label">${i18n.getTranslation('label.system.followers')}</span>
				</a>
			</li>
			<li class="connections">
				<a href="${tenantURI}/connections/${social.alias}/my-communities" class="link-connections">
					<span class="social-relations relations-number">${social.numberParticipations}</span>
					<span class="social-relations relations-label">${i18n.getTranslation('label.system.communities')}</span>
				</a>
			</li>
		</ul>

	</div>
</div>

<#recover>
	<#include "/social_error.ftl">
</#attempt>