<#attempt>
<#include '/social_widget_logged.ftl'>
<#include '/social_widget_context.ftl'>
<#include 'variables.ftl'>



<div class="wcm-widget-timeline wcm-widget-class wcm-widget-timeline-loading super-widget fluig-style-guide fonte-calibri" id="socialTimeline_${instanceId}" data-params="SocialTimeline.instance(${params})" style="display: block!important;">
	<script type="text/template" class="social-timeline-master-template">
		
		<div class="tp_alerta_border tp_alerta_border_${instanceId}" id="tp_alerta_border_${instanceId}" style="max-height: 1200px; overflow-y: scroll; overflow-x: hidden; border-bottom-right-radius: 0px;">



		<div class="timelineHeader">

			<h2 class="h2timeline page-header tp_page_header tp_page_header_${instanceId}" id="tp_page_header">
				<span class="icone-topo-timeline fluigicon fluigicon-group fluigicon-md"></span>
				<strong>Comunidades</strong>
			</h2>
			
			{{#viewOrdering}}
			<div class="page-header fs-sm-space fs-no-padding-top fs-no-padding-right fs-no-padding-left">
			    <div class="row">
			        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			            <div class="pull-right">
							{{>btnOrderAction}}
			            </div>
			        </div>
			    </div>
			</div>
		{{/viewOrdering}}
		</div>

		<ul data-timeline-list-posts class="timeline-list-posts"></ul>
		</div>
	</script>

	<script type="text/template" class="social-timeline-btn-order-template">
		<div class="dropdown" data-timeline-order>
		    <button class="btn btn-default dropdown-toggle btn-timeline" type="button" id="timeline-ordering-posts" data-toggle="dropdown">
			    {{order}}
			    <span class="caret"></span>
		    </button>
		    <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="timeline-ordering-posts">
		    	{{#orderActions}}
			        <li role="presentation">
			        	<a role="menuitem" tabindex="-1" href="#" data-timeline-action="order" data-order-type="{{orderType}}">{{orderName}}</a>
			        </li>
		        {{/orderActions}}
		    </ul>
		</div>
	</script>

	<script type="text/template" class="social-timeline-post-template">
		<li data-post-id="{{postId}}" data-post-community-hidden="{{social.hidden}}" data-post-permissions="{{permissions}}" class="timeline-list-posts-item">
			<div class="panel panel-default margin-timeline">
				<div class="panel-body fs-sm-space clearfix">
					<div class="media">
						<a class="pull-left" href="{{tenantURI}}/{{user.page}}">
							<div data-user-popover="{{user.alias}}">
								<img
									src="/social/api/rest/social/image/profile/{{user.alias}}/SMALL_PICTURE"
									alt="{{user.name}}"
									class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy"
									data-update-image-profile="{{user.alias}}"
									data-image-size="SMALL_PICTURE"
								>
							</div>
						</a>
						<div class="media-body">
							{{#postHeader}}
								<h5 class="media-heading">
									<strong>
										{{#person}}
											<a href="{{tenantURI}}/{{personPage}}" data-user-popover="{{personAlias}}">{{personName}}</a>
										{{/person}}
										{{#verb}}
											<span class="timeline-header-no-link"> {{verb}} </span>
										{{/verb}}
										{{#object}}
											<a href="{{tenantURI}}{{objectUrl}}">{{objectType}}</a>
										{{/object}}
										{{#place}}
											<span class="timeline-header-no-link"> {{i18n.on}} </span>
											<a href="{{tenantURI}}/{{placePage}}" data-user-popover="{{placeAlias}}">{{placeName}}</a>
										{{/place}}
										{{#viaThe}}
											<span class="timeline-header-no-link"> {{i18n.via}} </span>
											<a href="{{tenantURI}}/{{viaThePage}}" data-user-popover="{{viaTheAlias}}">{{viaTheName}}</a>
										{{/viaThe}}
										{{#creationDate}}
											<br/>
											<h6>
												<a href="{{tenantURI}}{{url}}" class="fs-no-bold" data-creation-date="{{creationDate}}"></a>&nbsp;
											{{#updateDate}}
												<span data-icon-edited-date-{{postId}} class="fluigicon fluigicon-user-edit fluigicon-xs fs-cursor-default" title="{{i18n.edited}} {{i18n.in}} {{updateDate}}"></span>
											{{/updateDate}}
											{{^updateDate}}
												<div data-edited-date-{{postId}}></div>
											{{/updateDate}}
											</h6>
										{{/creationDate}}
									</strong>
								</h5>
							{{/postHeader}}
							{{#allowsEditActions}}
								<div class="timeline-edit-area" data-edit-area-{{postId}}>
								</div>
							{{/allowsEditActions}}
							{{#text}}
								<p data-timeline-content-{{postId}} class="timeline-text-content">{{{text}}}</p>
							{{/text}}
							{{#variableContent}}
								<#-- Esse input será provisório para facilitar a manuteção dos templates. -->
								<input type="hidden" value="{{tlpName}}" data-variable-content-template>
								{{>postContent}}
							{{/variableContent}}
						</div>
					</div>
				</div>
				<div class="tp_panel_footer tp_alerta_border_${instanceId} seiLa_${instanceId}" style="background-color: ${bordColor!};">
					<ul class="list-inline timeline-list-actions">
					{{#canLike}}
						<li class="timeline-list-actions-item">
							<span class="counter-group">
								{{#supported}}
									<a href="#" class="fluigicon fluigicon-thumbs-up-on fs-no-text-underline" title="{{i18n.dislike}}" data-request-running="false" data-timeline-action="support"></a>
								{{/supported}}
								{{^supported}}
									<a href="#" class="fluigicon fluigicon-thumbs-up fs-no-text-underline" title="{{i18n.like}}" data-request-running="false" data-timeline-action="support"></a>
								{{/supported}}
								<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberLikes}}" title="{{i18n.manylike}}" data-request-running="false" data-timeline-action="listLikes">{{numberLikes}}</a>
							</span>
						</li>
					{{/canLike}}
					{{#canComment}}
						<li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-comment fs-no-text-underline" title="{{i18n.comment}}" data-timeline-action="comment"></a>
								<a href="{{tenantURI}}{{url}}" class="counter counter-warning pos-right-bottom {{existsNumberComments}}" title="{{i18n.manycomment}}">{{numberComments}}</a>
							</span>
						</li>
					{{/canComment}}
					{{#canNotify}}
						<li class="timeline-list-actions-item">
							<span class="counter-group">
								{{#watching}}
									<a href="#" class="fluigicon fluigicon-bell fs-no-text-underline" title="{{i18n.stopwatching}}" data-request-running="false" data-timeline-action="watch"></a>
								{{/watching}}
								{{^watching}}
									<a href="#" class="fluigicon fluigicon-bell-empty fs-no-text-underline" title="{{i18n.startwatching}}" data-request-running="false" data-timeline-action="watch"></a>
								{{/watching}}
								<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberWatchers}}" title="{{i18n.manywatch}}" data-request-running="false" data-timeline-action="listWatchers">{{numberWatchers}}</a>
							</span>
						</li>
					{{/canNotify}}
					{{#canShare}}
						<li class="timeline-list-actions-item">
							<span class="counter-group">
								{{#shared}}
									<a href="#" title="${i18n.getTranslation('recommend')}" data-clipboard-text="link to copy" data-timeline-action="share" class="fluigicon fluigicon-share-on fs-no-text-underline"></a>
								{{/shared}}
								{{^shared}}
									<a href="#" title="${i18n.getTranslation('recommend')}" data-clipboard-text="link to copy" data-timeline-action="share" class="fluigicon fluigicon-share fs-no-text-underline"></a>
								{{/shared}}
								<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberShares}}" title="{{i18n.manywatch}}" data-request-running="false" data-timeline-action="listShares">{{numberShares}}</a>
							</span>
						</li>
					{{/canShare}}
					{{#allowsEditActions}}
						<li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-pencil fs-no-text-underline" title="{{i18n.edit}}" data-request-running="false" data-timeline-action="editPost"></a>
							</span>
						</li>
					{{/allowsEditActions}}
					{{#canDenounce}}
						<li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-flag fs-no-text-underline" title="{{i18n.denounce}}" data-request-running="false" data-timeline-action="denounce"></a>
							</span>
						</li>
					{{/canDenounce}}
					{{#allowsRemoveActions}}
						<li class="timeline-list-actions-item">
							<span class="counter-group">
								<a href="#" class="fluigicon fluigicon-trash fs-no-text-underline" title="{{i18n.remove}}" data-request-running="false" data-timeline-action="remove"></a>
							</span>
						</li>
					{{/allowsRemoveActions}}
					</ul>
				</div>
			</div>
			<ul class="fs-md-space fs-no-padding-top fs-no-padding-bottom timeline-list-comments" data-timeline-list-comments>
				{{#comments}}
					{{>postComments}}
				{{/comments}}
				{{#existsMoreComments}}
					{{>postMoreComments}}
				{{/existsMoreComments}}
			</ul>
		</li>
	</script>

	<script type="text/template" class="social-timeline-comment-template">
		<li data-comment-id="{{id}}" class="panel panel-default fs-no-margin timeline-list-comments-item">
			<div class="panel-body fs-sm-space clearfix">
				<div class="media">
					<a class="pull-left" href="{{tenantURI}}/{{user.page}}">
						<div data-user-popover="{{user.alias}}">
							<img
								src="/social/api/rest/social/image/profile/{{user.alias}}/SMALL_PICTURE"
								alt="{{user.name}}"
								class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy"
								data-update-image-profile="{{user.alias}}"
								data-image-size="SMALL_PICTURE"
							>
						</div>
					</a>
					<div class="media-body">
						<h5 class="media-heading">
							<strong>
								<a href="{{tenantURI}}/{{user.page}}" data-user-popover="{{user.alias}}">{{user.name}}</a>
								<br/>
								<h6>
									<a href="{{tenantURI}}{{url}}" class="fs-no-bold" data-creation-date="{{creationDate}}"></a>&nbsp;
									{{#updateDate}}
										<span data-icon-edited-date-{{id}} class="fluigicon fluigicon-user-edit fluigicon-xs fs-cursor-default" title="{{i18n.edited}} {{i18n.in}} {{updateDate}}"></span>
									{{/updateDate}}
									{{^updateDate}}
										<div data-edited-date-{{id}}></div>
									{{/updateDate}}
								</h6>
							</strong>
						</h5>
						<p data-timeline-content-{{id}} class="timeline-text-content">{{{comment}}}</p>
					</div>
				</div>
				{{#allowsEditActions}}
					<div class="timeline-edit-area" data-edit-area-{{id}}>
					</div>
				{{/allowsEditActions}}
			</div>
			<div class="tp_panel_footer fs-no-bg fs-no-border-top fs-no-padding-top seiLa_${instanceId}">
				<ul class="list-inline">
				{{#canLike}}
					<li class="timeline-list-actions-item">
						<span class="counter-group">
							{{#supported}}
								<a href="#" class="fluigicon fluigicon-thumbs-up-on fs-no-text-underline" title="{{i18n.dislike}}" data-request-running="false" data-timeline-action="support"></a>
							{{/supported}}
							{{^supported}}
								<a href="#" class="fluigicon fluigicon-thumbs-up fs-no-text-underline" title="{{i18n.like}}" data-request-running="false" data-timeline-action="support"></a>
							{{/supported}}
							<a href="#" class="counter counter-warning pos-right-bottom {{existsNumberLikes}}" title="{{i18n.manylike}}" data-request-running="false" data-timeline-action="listLikes">{{numberLikes}}</a>
						</span>
					</li>
				{{/canLike}}
				{{#allowsEditActions}}
					<li class="timeline-list-actions-item">
						<span class="counter-group">
							<a href="#" class="fluigicon fluigicon-pencil fs-no-text-underline" title="{{i18n.edit}}" data-request-running="false" data-timeline-action="editComment"></a>
						</span>
					</li>
				{{/allowsEditActions}}
				{{#canDenounce}}
					<li class="timeline-list-actions-item">
						<span class="counter-group">
							<a href="#" class="fluigicon fluigicon-flag fs-no-text-underline" title="{{i18n.denounce}}" data-request-running="false" data-timeline-action="denounce"></a>
						</span>
					</li>
				{{/canDenounce}}
				{{#allowsRemoveActions}}
					<li class="timeline-list-actions-item">
						<span class="counter-group">
							<a href="#" class="fluigicon fluigicon-trash fs-no-text-underline" title="{{i18n.remove}}" data-request-running="false" data-timeline-action="remove"></a>
						</span>
					</li>
				{{/allowsRemoveActions}}
				</ul>
			</div>
		</li>
	</script>

	<script type="text/template" class="social-timeline-content-media-image-template">
		{{^isRecommendation}}
		<div class="panel panel-default fs-no-margin">
			<div class="panel-body text-center">
				{{^multipleAttachments}}
			   		<a href="{{tenantURI}}{{linkedObject.url}}">
						<img class="timeline-photo" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}" src="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}" onerror="socialTimeline_${instanceId?c}.showUnreachableContentWarning(this, event);">
					</a>
				{{/multipleAttachments}}
				{{#multipleAttachments}}
					<div id="post_carousel_{{postId}}" class="start-images-carousel">
						<div data-attachments="{{attachments}}"></div>
					</div>
				{{/multipleAttachments}}
		    </div>
	    </div>
		{{/isRecommendation}}
		{{#isRecommendation}}
			<div class="well timeline-recommendation-content">
				<div class="media">
				    <div class="pull-left media-center">
				    	<span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
				    </div>
				    <div class="media-body">
				    {{^removeText}}
					    {{#originalText}}
					    	<div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
					        	<div class="panel-body">
					        		<p class="fs-no-margin">{{{originalText}}}</p>
					        	</div>
					        </div>
					    {{/originalText}}
					{{/removeText}}
				        <div class="panel panel-default fs-no-margin">
						    <div class="panel-body text-center">
						    	{{^multipleAttachments}}
							   	    <a href="{{tenantURI}}{{linkedObject.url}}">
	                                    <img class="timeline-photo" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}" src="/webdesk/streamcontrol/?WDCompanyId={{linkedObject.tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}" onerror="socialTimeline_${instanceId?c}.showUnreachableContentWarning(this, event);">
									</a>
								{{/multipleAttachments}}
								{{#multipleAttachments}}
									<div id="post_carousel_{{postId}}" class="start-images-carousel">
										<div data-attachments="{{attachments}}"></div>
									</div>
								{{/multipleAttachments}}
						    </div>
						</div>
				    </div>
				</div>
			</div>
		{{/isRecommendation}}
	</script>

	<script type="text/template" class="image-carousel-template">
	    <div class="carousel-action" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{documentVersion}}"></div>
	</script>

	<script type="text/template" class="social-timeline-content-media-video-template">
		{{^isRecommendation}}
			<div class="panel panel-default fs-no-margin">
				<div class="panel-body text-center">
					<div id="timeline-video-{{documentId}}-{{postId}}" class="start-video-player" data-url="/socialmedia/api/rest/media/mediafile/{{linkedObject.social.alias}}/VIDEO/{{documentId}}"
						style="background-image: url('/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}') !important;">
					</div>
				</div>
			</div>
			<div data-url-media="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}" style="display:none"></div>
		{{/isRecommendation}}
		{{#isRecommendation}}
			<div class="well timeline-recommendation-content">
				<div class="media">
			    	{{#originalText}}
				    	<div class="pull-left media-center">
					    	<span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
					    </div>
				    	<div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
				        	<div class="panel-body">
				        		<p class="fs-no-margin">{{{originalText}}}</p>
				        	</div>
				        </div>
				    {{/originalText}}
				    <div class="media-body">
				        <div class="panel panel-default fs-no-margin">
						    <div class="panel-body text-center">
								<div id="timeline-video-{{documentId}}-{{postId}}" class="start-video-player" data-url="/socialmedia/api/rest/media/mediafile/{{linkedObject.social.alias}}/VIDEO/{{documentId}}"
									style="background-image: url('/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}') !important;">
								</div>
						    </div>
						</div>
				    </div>
				</div>
			</div>
			<div data-url-media="/webdesk/streamcontrol/?WDCompanyId={{tenantId}}&WDNrDocto={{documentId}}&WDNrVersao={{linkedObject.objectId}}&thumbnail={{thumbEnum}}" style="display:none"></div>
		{{/isRecommendation}}
	</script>

	<script type="text/template" class="social-timeline-content-media-document-template">
		{{^isRecommendation}}
			<div class="media">
				{{#linkedObject.thumbURL}}
				    <div class="pull-left media-center">
				    	<img src="{{linkedObject.thumbURL}}">
				    </div>
			    {{/linkedObject.thumbURL}}
			    <div class="media-body">
			        <div class="panel panel-default fs-no-margin">
					    <div class="panel-body">
					    	<p {{#isFolder}}class="fs-no-margin"{{/isFolder}}>{{linkedObject.description}}</p>
					    	{{^isFolder}}
					    		<p class="fs-no-margin">{{i18n.version}}/{{i18n.revision}}: {{documentVersion}}</p>
					    	{{/isFolder}}
					    </div>
					</div>
					<a href="{{tenantURI}}{{linkedObject.url}}" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}">{{i18n.details}}</a>
			    </div>
			</div>
		{{/isRecommendation}}
		{{#isRecommendation}}
			<div class="well timeline-recommendation-content">
				<div class="media">
					{{#originalText}}
				    	<div class="pull-left media-center">
					    	<span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
					    </div>
				    	<div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
				        	<div class="panel-body">
				        		<p class="fs-no-margin">{{{originalText}}}</p>
				        	</div>
				        </div>
				    {{/originalText}}
					{{#linkedObject.thumbURL}}
					    <div class="pull-left media-center">
					    	<img src="{{linkedObject.thumbURL}}">
					    </div>
				    {{/linkedObject.thumbURL}}
				    <div class="media-body">
				        <div class="panel panel-default fs-no-margin">
						    <div class="panel-body">
						    	<p {{#isFolder}}class="fs-no-margin"{{/isFolder}}>{{linkedObject.description}}</p>
						    	{{^isFolder}}
						    		<p class="fs-no-margin">{{i18n.version}}/{{i18n.revision}}: {{documentVersion}}</p>
						    	{{/isFolder}}
						    </div>
						</div>
						<a href="{{tenantURI}}{{linkedObject.url}}" data-timeline-action="openDocument" data-timeline-document-id="{{documentId}}" data-timeline-document-version="{{linkedObject.objectId}}">{{i18n.details}}</a>
				    </div>
				</div>
			</div>
		{{/isRecommendation}}
	</script>


	<script type="text/template" class="social-timeline-content-form-template">
		<div class="well timeline-recommendation-content">
			<div class="media gallery">
				    <div class="pull-left media-center">
				    	<img src="/webdesk/assets/icons/formulario.png">
				    </div>
			    <div class="media-body">
			        <div class="panel panel-default fs-no-margin">
					    <div class="panel-body">
					    	<p class="fs-no-margin">{{linkedObject.description}}</p>
					    </div>
					</div>
					<a href="{{tenantURI}}{{linkedObject.url}}" data-timeline-form-id="{{documentId}}" data-timeline-action="openAnswerForm">{{i18n.anwser}}</a>
			    </div>
			</div>
		</div>
	</script>

	<script type="text/template" class="social-timeline-content-gallery-template">
		<div class="well timeline-recommendation-content">
			<div class="media gallery">
				    <div class="pull-left media-center">
				    	<img src="/webdesk/assets/icons/folder_24.png">
				    </div>
			    <div class="media-body">
			        <div class="panel panel-default fs-no-margin">
					    <div class="panel-body">
					    	<p class="fs-no-margin">{{linkedObject.description}}</p>
					    </div>
					</div>
					<a href="{{tenantURI}}/{{urlOrigin}}">{{i18n.details}}</a>
			    </div>
			</div>
		</div>
	</script>

	<script type="text/template" class="social-timeline-content-social-template">
		{{^isRecommendation}}
			<input type="hidden" value="social-timeline-content-social-template" data-untreated-content-post="{{postId}}">
		{{/isRecommendation}}
		{{#isRecommendation}}
			<div class="well timeline-recommendation-content">
				<div class="media">
					{{#linkedObject.thumbURL}}
				    	<a class="pull-left" href="{{tenantURI}}{{linkedObject.url}}">
				    		<img class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy" src="{{linkedObject.thumbURL}}">
				    	</a>
				    {{/linkedObject.thumbURL}}
				    <div class="media-body">
				        <div class="panel panel-default fs-no-margin">
						    <div class="panel-body">
						    	<p class="fs-no-margin"><a href="{{tenantURI}}{{linkedObject.url}}">{{linkedObject.description}}</a> {{i18n.sharedsocial}}.</p>
						    </div>
						</div>
						<a href="{{tenantURI}}{{linkedObject.url}}">{{i18n.details}}</a>
				    </div>
				</div>
			</div>
		{{/isRecommendation}}
	</script>

	<script type="text/template" class="social-timeline-content-article-template">
		{{^isRecommendation}}
			<div class="container-fluid row fs-cursor-pointer" data-timeline-action="articleLink" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
				{{#hasShareText}}
					<div class="panel panel-default"><div class="panel-body">
				{{/hasShareText}}
				{{#linkedObject.thumbURL}}
				<div class="col-xs-12">
					{{^hasShareText}}&nbsp;{{/hasShareText}}
					<div class="row embed-responsive embed-responsive-5by1 img-rounded">
				    	<a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
				    		<img class="embed-responsive-item" src="{{linkedObject.thumbURL}}">
				    	</a>
				    </div>
				    &nbsp;
				</div>
				{{/linkedObject.thumbURL}}
	    		<h2 {{#hasShareText}}{{^linkedObject.thumbURL}}class="fs-no-margin-top"{{/linkedObject.thumbURL}}{{/hasShareText}}>
	    			<a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{linkedObject.description}}</a>
	    		</h2>
	    		<p>
	    			<a class="fs-no-text-underline fs-break-text" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}">{{linkedObject.text}}</a> &nbsp;
	    			<a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-href="{{tenantURI}}/articleview/{{sourceShare}}/{{variableContent.documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{i18n.details}}</a>
	    		</p>
				{{#hasShareText}}
					</div></div>
				{{/hasShareText}}
			</div>
		{{/isRecommendation}}
		{{#isRecommendation}}
			<div class="well timeline-recommendation-content">
				<div class="media">
				    <div class="pull-left media-center">
				    	<span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
				    </div>
				    <div class="media-body">
				    {{#originalText}}
				    	<div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
				        	<div class="panel-body">
				        		<p class="fs-no-margin">{{{originalText}}}</p>
				        	</div>
				        </div>
				    {{/originalText}}
				   		<div class="panel panel-default fs-no-margin">
							<div class="panel-body">
								<div class="container-fluid row fs-cursor-pointer" data-timeline-action="articleLink" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
									{{#linkedObject.thumbURL}}
									<div class="col-xs-12">
										<div class="row embed-responsive embed-responsive-5by1 img-rounded">
									    	<a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">
									    		<img class="embed-responsive-item" src="{{linkedObject.thumbURL}}">
									    	</a>
									    </div>
									    &nbsp;
									</div>
									{{/linkedObject.thumbURL}}
						    		<h2 {{#originalText}}{{^linkedObject.thumbURL}}class="fs-no-margin-top"{{/linkedObject.thumbURL}}{{/originalText}}>
						    			<a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{linkedObject.description}}</a>
						    		</h2>
						    		<p>
						    			<a class="fs-no-text-underline fs-break-text" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}">{{linkedObject.text}}</a> &nbsp;
						    			<a data-timeline-action="articleLink" href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-href="{{tenantURI}}/articleview/{{user.alias}}/{{documentId}}" data-articleId="{{documentId}}" data-articleTitle="{{linkedObject.description}}">{{i18n.details}}</a>
						    		</p>
								</div>
							</div>
						</div>
				    </div>
				</div>
			</div>
		{{/isRecommendation}}

	</script>

	<script type="text/template" class="social-timeline-content-generic-template">
		{{^isRecommendation}}
			<input type="hidden" value="social-timeline-content-generic-template" data-untreated-content-post="{{postId}}">
		{{/isRecommendation}}
		{{#isRecommendation}}
			{{#originalText}}
				<div class="well timeline-recommendation-content">
					<div class="media">
					    <div class="pull-left media-center">
					    	<span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
					    </div>
					    <div class="media-body">
					    	<div class="panel panel-default fs-no-margin">
					        	<div class="panel-body">
					        		<p class="fs-no-margin">{{{originalText}}}</p>
					        	</div>
					        </div>
					    </div>
					</div>
				</div>
			{{/originalText}}
		{{/isRecommendation}}
	</script>

	<script type="text/template" class="social-timeline-content-generic-media-template">
		{{^isRecommendation}}
			<input type="hidden" value="social-timeline-content-generic-media-template" data-untreated-content-post="{{postId}}">
		{{/isRecommendation}}
		{{#isRecommendation}}
			<input type="hidden" value="social-timeline-content-generic-media-template - isRecommendation" data-untreated-content-post="{{postId}}">
		{{/isRecommendation}}
	</script>

	<script type="text/template" class="social-timeline-content-youtube-template">
		{{^isRecommendation}}
			<div class="panel panel-default fs-no-margin">
				<div class="panel-body text-center">
					<div class="embed-responsive embed-responsive-16by9">
					    	<iframe id="ytplayer-{{youtubeVideoId}}-{{postId}}" type="text/html"
							src="https://www.youtube.com/embed/{{youtubeVideoId}}"
							frameborder="0" allowfullscreen="allowfullscreen"/>
						<input type="hidden" data-post-youtube-id="{{postId}}" data-youtube-video-id="{{youtubeVideoId}}" data-youtube-video-link="{{formattedLink}}">
					</div>
			    </div>
		    </div>
	    {{/isRecommendation}}
		{{#isRecommendation}}
			<div class="well timeline-recommendation-content">
				<div class="media">
				    <div class="pull-left media-center">
				    	<span class="media-object fluigicon fluigicon-share-on fluigicon-xl"></span>
				    </div>
				    <div class="media-body">
				    	{{#text}}
					    	<div class="panel panel-default fs-no-margin timeline-recommendation-content-text">
					        	<div class="panel-body">
					        		<p class="fs-no-margin">{{{text}}}</p>
					        	</div>
					        </div>
				        {{/text}}
				        <div class="panel panel-default fs-no-margin">
							<div class="panel-body text-center">
								<div class="embed-responsive embed-responsive-16by9">
								    	<iframe id="ytplayer-{{youtubeVideoId}}-{{postId}}" type="text/html"
										src="https://www.youtube.com/embed/{{youtubeVideoId}}"
										frameborder="0" allowfullscreen="allowfullscreen"/>
									<input type="hidden" data-post-youtube-id="{{postId}}" data-youtube-video-id="{{youtubeVideoId}}" data-youtube-video-link="{{formattedLink}}">
								</div>
						    </div>
					    </div>
				    </div>
				</div>
			</div>
		{{/isRecommendation}}
	</script>

	<script type="text/template" class="social-timeline-content-removed-template">
		{{^isRecommendation}}
			<div class="panel panel-default fs-no-margin">
				<div class="panel-body text-center">
			    	<div class="alert alert-warning fs-no-margin" role="alert">{{i18n.documentremoved}}</div>
			    </div>
		    </div>
		{{/isRecommendation}}
		{{#isRecommendation}}
			<div class="well timeline-recommendation-content">
				<div class="panel panel-default fs-no-margin">
					<div class="panel-body text-center">
						<div class="alert alert-warning fs-no-margin" role="alert">{{i18n.documentremoved}}</div>
					</div>
				</div>
			</div>
		{{/isRecommendation}}
	</script>

	<script type="text/template" class="social-timeline-unreachable-content-template">
 		<div class="alert alert-warning fs-no-margin" role="alert">{{unreachableContent}}</div>
	</script>

	<script type="text/template" class="social-timeline-add-comment-template">
		<li class="panel panel-default fs-no-margin timeline-list-comments-item timeline-container-comment" data-timeline-container-comment style="display: none;">
			<div class="panel-body fs-sm-space media clearfix fs-overflow-visible">
				<form role="form" action="#" data-timeline-submit-comment>
					<div class="form-group">
						<textarea class="form-control" rows="3" placeholder="{{i18n.leaveyourcomment}}" data-comment-textarea data-comment-textarea-mentions></textarea>
					</div>
					<div class="form-group text-right fs-no-margin">
						<button type="submit" class="btn btn-primary btn-sm" data-submit-comment data-loading-text="{{i18n.commentsending}}">{{i18n.comment}}</button>
					</div>
				</form>
			</div>
		</li>
	</script>

	<script type="text/template" class="social-timeline-show-more-posts-template">
  		<button type="button" class="btn fs-full-width  tp_button_veja_mais tp_button_veja_mais_${instanceId}" data-timeline-show-more-posts style="background-color: ${bordColor!};">
			<span class="caret"></span>
		</button>
	</script>

	<script type="text/template" class="social-timeline-show-more-comments-template">
		<li class="panel panel-default fs-no-margin timeline-list-comments-item">
			<button type="button" class="btn btn-default btn-xs fs-full-width timeline-show-more-comments" data-timeline-show-more-comments="{{postId}}">
				<span class="caret"></span>
			</button>
		</li>
	</script>

	<script type="text/template" class="social-timeline-message-no-results-template">
		<li class="alert alert-info" role="alert" data-timeline-content-message>
			<h3 class="fs-no-margin-top">
				<strong>{{i18n.timelinewithoutcontent}}</strong>
			</h3>
			{{i18n.notcontent}} {{#isCommunity}}{{i18n.incommunity}} <a href="{{tenantURI}}/subject/{{socialAlias}}">{{socialName}}</a>{{/isCommunity}}
		</li>
	</script>

	<script type="text/template" class="social-timeline-message-post-not-found-template">
		<li class="alert alert-warning" role="alert" data-timeline-content-message>
			<h3 class="fs-no-margin-top">
				<strong>{{i18n.postnotfound}}</strong>
			</h3>
			{{i18n.postnotfoundmessage}}
		</li>
	</script>

	<script type="text/template" class="social-timeline-message-list-error-template">
		<li class="alert alert-warning" role="alert" data-timeline-content-message>
			<h3 class="fs-no-margin-top">
				<strong>{{i18n.unavailabletimeline}}</strong>
			</h3>
			{{i18n.contactadministrator}}
		</li>
	</script>

	<script type="text/template" class="social-timeline-mention-template">
		<a href="{{{tenantURI}}}/social/{{alias}}" data-user-popover="{{alias}}">{{name}}</a>
	</script>

	<script type="text/template" class="social-timeline-tag-template">
		<a href="#" data-timeline-action="search">$1</a>
	</script>

	<script type="text/template" class="social-timeline-link-template">
		<a href="$1" target="_blank">$1</a>
	</script>

	<script type="text/template" class="social-timeline-line-break-template">
		<br>
	</script>

	<script type="text/template" class="social-timeline-video-not-supported-template">
		<div class="timeline-video-not-supported">
			<div class="clearfix fs-margin-auto timeline-container-icon-download-video">
				<img class="fs-float-left timeline-icon-download-video" src="${basePath}/resources/images/image-video-error.svg">
				<h1 class="fs-txt-left fs-no-margin-top">Ops!</h1>
				<p class="fs-txt-left">{{i18n.videoNotSupported}}</p>
			</div>
			<p class="timeline-description-download-video text-center">
				<a href="#" class="fs-text-underline" data-timeline-action="downloadVideo">{{i18n.videoNotSupportedDownload}}</a> {{i18n.videoNotSupportedSulfix}}
			</p>
		</div>
	</script>

	<script type="text/template" class="social-timeline-edit-content-template">
		<div class="">
			<textarea name="content-text-edit-{{id}}" class="content-text-edit" id="content-text-edit" data-content-text-edit data-sociable-type="{{sociable}}">{{text}}</textarea>
		</div>
		<div class="edit-buttons-area fr">
			<span class="post-text-limit-edit">{{count}}</span>
			<button class="btn btn-default" data-timeline-action="cancelEdit">{{i18n.cancel}}</button>
			<button class="btn btn-primary edit-content-button" data-timeline-action="saveEdit">{{i18n.publish}}</button>
		</div>
	</script>

	<script type="text/template" class="social-edited-date">
		<span class="fluigicon fluigicon-user-edit fluigicon-xs fs-cursor-default" title="{{updateDate}}"></span>
	</script>

</div>

<script>
$( document ).ready(function() {
	
	
	
	
	$('.tp_alerta_border_${instanceId}').css('border-color','${bordColor!}');
	$('.tp_page_header_${instanceId}').css('background-color', '${bordColor!}');
	$('.tp_button_veja_mais_${instanceId}').css('background-color', '${bordColor!}');
	
	
	
	
	
	//$('#tp_alerta_border_${instanceId} button:last').css("background-color", "${bordColor!}");
	
	//$('.seiLa_${instanceId}').css('background-color','${bordColor!}');
	
	


	
});
</script>


<#recover>
	<#include "/social_error.ftl">
</#attempt>
