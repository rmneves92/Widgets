var SocialCard = SuperWidget
	.extend({

		instanceId: null,
		socialId: null,
		usersDatatable: null,
		groupsDatatable: null,
		offset: 0,
		compLoading: null,
		alias: null,

		relationStatusType: {
			"NOT_RELATED": 'Seguir',
			"PENDING": 'Pending request',
			"ACCEPTED": 'Following',
			"REJECTED": 'Pending request',
			"BLOCKED": 'Pending request',
			"ITSELF": ''
		},

		init: function() {
			
			var that = this;
			
			if (this.socialId == 0) {
				socialGlobal.showHome();
			}

			this.compLoading = FLUIGC.loading(window);

			socialGlobal.showCardPopover();

			$("#userDescriptionText").keyup(this.refreshCounter);
			
			that.getInfoCommunity(that.alias, function(data) {
				var permissions = data.permissions;
				that.renderizeAdministrativeOptions(permissions);
			});
		},

		bindings: {
			local: {
				'follow-action': ['click_followAction'],
				'unfollow-action': ['click_unfollowAction'],
				'participate-action': ['click_participateAction'],
				'participate-action-popover': ['click_participateActionPopover'],
				'remove-participation-action': ['click_removeParticipationAction'],
				'remove-participation-action-popover': ['click_removeParticipationActionPopover'],
				'share-card': ['click_shareCard'],
				'edit-profile': ['click_editProfile'],
				'edit-community': ['click_editCommunity'],
				'show-more-info': ['click_showMoreInfo'],
				'add-user': ['click_addUser'],
				'add-group': ['click_addGroup'],
				'edit-description': ['click_editDescription'],
				'cancel-description': ['click_cancelEditDescription'],
				'save-description': ['click_saveDescription'],
				'watch-community': ['click_watchCommunity'],
				'card-link-tag': ['click_globalSearch'],
				'send-message': ['click_sendMessage']
			}
		},
		
		renderizeAdministrativeOptions: function(permissions) {
			var data = {};
			var html, tpl = this.templates['social-permissions-card-template'], target = $('.dropdown-actions');
			var canEditCommunity, canAdministerUser, showActions;
			
			canEditCommunity = permissions.indexOf('PROFILE_EDIT') != -1 || false;
			canAdministerUser = permissions.indexOf('ADMINISTER_USER') != -1 || false;
			showActions = canEditCommunity || canAdministerUser;
			
			if(showActions) {
				data['showActions'] = showActions;
				data['canEditCommunity'] = canEditCommunity;
				data['canAdministerUser'] = canAdministerUser;
			}
			html = Mustache.render(tpl, data);
			target.html(html);
		},
		
		getInfoCommunity: function(alias, callback) {
			var that = this;
			this.serviceSocialCommunity(alias, function(err, data) {
				if (err) {
					FLUIGC.toast({
						message: 'Error when loading permission information',
						type: 'danger'
					});
					return false;
				}
				callback(data);
			});
		},
		
		serviceSocialCommunity: function(alias, callback) {
			var options = {
				url: '/api/public/social/community/' + alias,
				contentType: 'application/json',
				dataType: 'json',
				loading: false
			};

			FLUIGC.ajax(options, callback);
		},

		showMoreInfo: function(el, ev) {
			var el = $(el);

			el.siblings(".user-more-info-list").stop(true, true).slideToggle("fast");

			el.preventDefault();
		},

		followAction: function(el, ev) {
			var btnReqFollow = el, that = this;

			SocialAPI.FollowService.REQUESTFOLLOW({
				async: true,
				success: function(data) {
					if (data)
						data = data.content;

					if (data === 'ACCEPTED') {
						//durante o request de amizade, seu amigo tbm solicitou amizade
						//ou vc solicitou a amizade de alquem que já havia solicitado a sua
						$(btnReqFollow).hide('fast');
					} else {
						btnReqFollow.value = that.relationStatusType[data];
						$(btnReqFollow).attr('disabled', 'disabled').text(
							"Pending");
					}
				},
				errorCallback: that.errorMessage
			}, that.socialId);
		},

		errorMessage: function(oObj, XMLHttpRequest, data, errorThrown, info) {
			var msg = '', err = (data && data.error) ? data.error : '', title, social1, social2;
			if (oObj.status && oObj.status == 403) {
				title = "Action canceled.";
				social1 = (data.social1 || 'social 1').bold();
				social2 = (data.social2 || 'social 2').bold();
				msg += social1 + " " + "and" + " " + social2 + " "
					+ "do not belong to the same relationship cloud";
			} else {
				title = '';
				msg = err;
			}
			FLUIGC.toast({
				title: title,
				message: msg,
				type: 'danger'
			});

		},

		unfollowAction: function(el, ev) {
			var that = this;
			this.rest(SocialAPI.FollowService.REMOVEFOLLOWING, [this.socialId], function() {
				window.location.reload();
			}, that.errorMessage);
		},

		participateAction: function(el, ev) {
			var that = this;
			this.rest(SocialAPI.ParticipationService.REQUESTPARTICIPATION, [this.socialId], function() {
				window.location.reload();
			}, that.errorMessage);
		},

		participateActionPopover: function(el, ev) {
			var parent = $('#socialcard_' + this.instanceId);
			var that = this;
			this.rest(SocialAPI.ParticipationService.REQUESTPARTICIPATION, [this.socialId], function(data) {
				$(el).remove();
			}, that.errorMessage);
		},

		removeParticipationAction: function(el, ev) {
			var that = this;
			FLUIGC.message.confirm({
				message: "You will no longer be part of the community. Do you wish to continue?",
				title: "Cancel participation",
				labelYes: "Yes",
				labelNo: "No"
			}, function(result, el, ev) {
				if (result) {
					that.rest(SocialAPI.ParticipationService.REMOVEPARTICIPATION, [that.socialId], function() {
						window.location.reload();
					}, that.errorMessage);
				}
			});
		},

		removeParticipationActionPopover: function(el, ev) {
			var parent = $('#socialcard_' + this.instanceId);
			var that = this;
			FLUIGC.message
				.confirm(
					{
						message: "You will no longer be part of the community. Do you wish to continue?",
						title: "Cancel participation",
						labelYes: "Yes",
						labelNo: "No"
					},
					function(result, el, ev) {
						if (result) {
							that
								.rest(
									SocialAPI.ParticipationService.REMOVEPARTICIPATION,
									[that.socialId],
									function(data) {
										$(el).remove();
										if (!$('[data-participate-action-popover]', parent).length) {
											$('.container-social-actions', parent)
												.prepend(
													'<button class="totvs-btn-relation mini" data-participate-action-popover>Join</button>');
										}
									}, that.errorMessage);
						}
					});
		},
		
		sendMessage: function(el, ev) {
			var that = this;
			
			that.createMessage([$(el).attr('userId')], $(el).attr('userName'), function(err, data) {
				if (err) {
					FLUIGC.toast({
						message: "Unable to start the conversation",
						type: "danger"
					});					
				} else {
					window.open(WCMAPI.getProtectedContextPath() + '/' + WCMAPI.getTenantCode() + '/messaging/' + data.content.id.substring(data.content.id.lastIndexOf("/")+1), '_blank');
				}
			});
		},
		
		createMessage: function(participantId, participantName, cb) {
			var options = {
				type: 'POST',
				url: '/api/public/messaging/createConversation/v2',
				data: JSON.stringify({ "idOwner": WCMAPI.getUserId(),
						"participantsIds": participantId,
						"distinct": true,
						"metaData": {
							"admins": "[" + WCMAPI.getUserId() + "]",
							"conversationTitle": participantName,
							"group": "false"
						}
				}),
				contentType: 'application/json'			
			};		
			
			FLUIGC.ajax(options, cb);				
		},

		shareCard: function(el, ev) {
			var $el = $(el), sociableId = $(el).attr('sociableId'), shareType = $(el).attr('shareType'), socialType = $(
				el).parents('[data-social-type]').data('social-type'), link = $el.parents('.container-info').find(
				'a.link-user-name').attr('href'), image = $('[data-social-id=' + sociableId + '] .container-image img'), description, moreInfo, url, preview, tpl, tlpData, html;

			description = $('[data-social-id=' + sociableId + '] .user-name').text()

			if (socialType == 'USER') {
				moreInfo = $('[data-social-id=' + sociableId + '] .container-more-info .totvs-link-default:nth(0)');
			} else {
				moreInfo = $('[data-social-id=' + sociableId + '] .container-social-connections');
			}

			tpl = $('.social-share-card-template').html();

			tplData = {
				image: image.wrap('<p>').parent().html(),
				description: description,
				moreInfo: moreInfo.html(),
			}

			html = Mustache.render(tpl, tplData);

			url = WCMAPI.getServerURL() + link;

			SOCIALBC.share($el, {
				showOnlyLink: false,
				shareType: shareType,
				type: 'community',
				preview: html,
				link: url,
				paramId: sociableId,
				width: '200px',
				minWidth: '50%',
				widthNoFlash: '200px',
			});

			$(document).on('fluig.share.loadcomplete', function() {
				$(el).parents('.totvs-popover').hide();
			});

		},

		editProfile: function(el, ev) {
			//var socialAlias = $(el).data('social-alias');
			location.href = socialGlobal.defaultURL() + '/wcmuserpreferences';
		},

		editCommunity: function(el, ev) {
			var socialAlias = $(el).data('social-alias');
			location.href = socialGlobal.defaultURL() + '/profile/' + socialAlias;
		},

		showFollowers: function(el, ev) {
			var socialAlias = $(el).data('social-alias');
			socialGlobal.showFollowers(socialAlias);
		},

		editDescription: function(el, ev) {
			var parent = $(el).parents('.user-description:first');
			parent.hide();
			$('.edit-description textarea').val($(el).siblings('.description:first').html());
			parent.siblings('.edit-description:first').css('display', 'block');
			this.refreshCounter();
			$("#userDescriptionText").focus();
		},

		cancelEditDescription: function(el, ev) {
			var parent = $(el).parents('.edit-description:first');
			parent.hide();
			parent.siblings('.user-description:first').css('display', 'block');
		},

		saveDescription: function(el, ev) {
			var that = this;
			var alias = $(el).data('user-alias');
			var description = $('#userDescriptionText').val();
			if (/<[a-z][\s\S]*>/i.test(description)) {
				$('#userDescriptionText').val('');
				WCMC.messageWarn("This field cannot contain HTML content");
				return false;
			}

			this.rest(SocialAPI.SocialService.UPDATESOCIALDESCRIPTION, [alias, description], function(data) {
				var parent = $(el).parents('.edit-description:first');
				$('.user-description .description').html(description);
				parent.hide();
				parent.siblings('.user-description:first').css('display', 'block');
			}, function(error) {
				var parent = $(el).parents('.edit-description:first');
				parent.hide();
				parent.siblings('.user-description:first').css('display', 'block');
			});
		},

		watchCommunity: function(el, ev) {
			socialGlobal.showLoading();

			var url = SocialAPI.WatchService.WATCHSOCIAL__PATH(), service = SocialAPI.WatchService.WATCHSOCIAL, communityId = this.socialId, watchLis = $('[data-start-watching], [data-stop-watching]'), watchBtns = $('[data-start-watching] button, [data-stop-watching] button');

			watchBtns.attr('disabled', 'disabled');

			this.rest(service, [communityId], function(data) {
				watchLis.toggleClass('c-hidden');

				socialGlobal.hideLoading();
				watchBtns.removeAttr('disabled');

			}, function(err) {
				errMessage = JSON.parse(err.responseText);
				errMessage = errMessage.message ? errMessage.message : errMessage;
				socialGlobal.message({
					text: errMessage,
					type: 'error',
					timeout: 3000
				});

				socialGlobal.hideLoading();
				watchBtns.removeAttr('disabled');

			});
		},

		globalSearch: function(el, ev) {
			socialGlobal.showSearch($(el).text());
		},

		refreshCounter: function() {
			$("#userDescriptionCounter").html((200 - $("#userDescriptionText").val().length) + " caracteres restantes");
		},

		addUser: function(el, ev) {
			var that = this;

			WCMBC.selectUser({
				multiselect: true,
				required: true,
				onlyActiveUsers: true
			}, function(data) {
				that.sendUser(data);
			});
		},

		addGroup: function(el, ev) {
			var that = this;

			WCMBC.selectGroup({
				multiselect: true,
				required: true
			}, function(data) {
				that.sendGroup(data);
			});
		},

		sendUser: function(users) {
			var that = this, communityId = this.socialId, usersList = [], i = 0;

			for (i; i < users.length; i++) {
				usersList.push(users[i].login);
			}

			this.compLoading.show();

			that.rest(SocialAPI.CommunityService.ADDSOCIAL, [communityId, usersList], function() {
				that.compLoading.hide();

				socialGlobal.message({
					text: 'User(s) added successfully.',
					type: 'success',
					timeout: 2000
				});

				setTimeout(function() {
					window.location.reload();
				}, 2000);
			},
				function(oObj, XMLHttpRequest, data, errorThrown, info) {

					if (oObj.status == 403 && data && data.origin && data.origin == 'SocialAccessControl') {
						locale = window.WCMAPI ? WCMAPI.getLocale() : 'pt_BR';

						var social1 = (data.social1 || 'social 1').bold(), social2 = (data.social2 || 'social 2')
							.bold(), messageTitle = 'Action canceled.', messageError = social1
							+ " " + 'and' + " " + social2 + " "
							+ 'do not belong to the same relationship cloud';

						if (FLUIGC) {
							FLUIGC.toast({
								title: messageTitle,
								message: messageError,
								type: "danger"
							});
						} else {
							window.alert(messageError);
						}
						
					}else if((oObj.status == 400 || oObj.status == 500) && data && data.message && data.message.message){
						FLUIGC.toast({
							message: data.message.message,
							type: "danger"
						});
					}
					that.compLoading.hide();
				});
		},

		sendGroup: function(groups) {
			var that = this, communityId = this.socialId, groupList = [], i = 0;

			for (i; i < groups.length; i++) {
				groupList.push(groups[i].code);
			}

			this.compLoading.show();

			that.rest(SocialAPI.CommunityService.ADDGROUP, [communityId, groupList], function() {
				that.compLoading.hide();

				socialGlobal.message({
					text: 'Request for adding group is in progress.',
					type: 'success',
					timeout: 2000
				});
			},
			function(oObj, XMLHttpRequest, data, errorThrown, info) {
				 if((oObj.status == 400 || oObj.status == 500) && data && data.message && data.message.message){
					FLUIGC.toast({
						message: data.message.message,
						type: "danger"
					});
				}
				that.compLoading.hide();
			});
		}

	});
