var socialtagscloud = SuperWidget
		.extend({
			instanceId : null,
			communityRest: null,
			parentPageCode: null,
			community: null,
			minSizeCloud: 3,
			defaultDays: 60,
			countSearch: 0,
			

			init : function() {
				if(this.isPageCommunity()) {
					this.findCommunity();
				} else {
					this.validateCommunity();
				}				
			},

			bindings : {
				local : {
					'btn-save': ['click_updatePreferences'],
					'btn-save-disable': ['click_disableSave'],
					'option-cloud-radio': ['click_optionCloudRadio']
				}
			},
			
			updatePreferences: function(el, ev) {
				var that = this, args = {}, $community = $('[data-community]', this.DOM), $lastTagsDay = $('[data-last-tags-day]',
					this.DOM), hasError = null;

				var btn = $(el);
				btn.prop('disabled', true);

				this.community = $community.val();
				this.lastTagsDay = $lastTagsDay.val();

				args['community'] = this.community;
				args['lastTagsDay'] = this.lastTagsDay;
				
				if (hasError == null) {
					this.rest(WCMSpaceAPI.PageService.UPDATEPREFERENCES, [that.instanceId, args], function(res) {
						if (res) {
							FLUIGC.toast({
								message: "Widget successfully updated!",
								type: "success"
							});
						}
						if(el)
						btn.prop('disabled', false);
					}, function(xhr, text, errData) {
						btn.prop('disabled', false);
						FLUIGC.toast({
							message: errData.message,
							type: "danger"
						});

					});
				} else {
					FLUIGC.toast({
						title: "Unable to update the widget Contact the administrator.",
						message: hasError,
						type: "warning"
					});

					btn.prop('disabled', false);
				}
			},
			
			updatePreferencesAuto: function(communityAuto) {
				var that = this, args = {}, hasError = null;


				this.community = communityAuto;

				args['community'] = this.community;
				args['lastTagsDay'] = this.defaultDays;
				
				if (hasError == null) {
					this.rest(WCMSpaceAPI.PageService.UPDATEPREFERENCES, [that.instanceId, args], function(res) {
						
					}, function(xhr, text, errData) {
						FLUIGC.toast({
							message: errData.message,
							type: "danger"
						});
					});
				} else {
					FLUIGC.toast({
						title: "Unable to update the widget Contact the administrator.",
						message: hasError,
						type: "warning"
					});
				}
			},
			
			optionCloudRadio : function(){
				var radioVal = $("input[name='optionCloud" + this.instanceId + "']:checked").val();
				if(radioVal == 'optGeneral') {
					$('#community'+ this.instanceId).val('');
					$('#divCommunity').hide();
					this.hideMessage();
					$('button[id="btn-save'+ this.instanceId +'"]', this.DOM).prop('disabled', false);
				} else {
					$('#divCommunity').show();
					this.showMessage('Only tags from the selected community’s posts will be displayed');
					$('button[id="btn-save'+ this.instanceId +'"]', this.DOM).prop('disabled', true);
				}
			},
			
			findTagsCloud: function() {
				var that = this;
				
				var alias = this.community;
				var maxDays = this.lastTagsDay;
				
				var options = {
					type: 'POST',
					contentType: "application/json",
					url: "/api/public/2.0/tags",
					data: JSON.stringify({
						communitiesAlias : [alias],			  
						maxDays : maxDays,			  
						limit : ""
					})
				}
				
				this.serviceFindTagsCloud(options, function(err, data) {
					if(err) {
						for(var i=that.countSearch; i <1; i++){
							that.countSearch++;
							that.serviceSearchAdvanced(function(err2, data2) {
								if(err2) {
									that.showMessage('Tags cloud currently unavailable.');
									return false;
								}
								that.findTagsCloud();
								return false;
							});
						}
						if(that.countSearch >= 1) {
							that.showMessage('Tags cloud currently unavailable.');
							return false;
						}
					} else {
						that.loadTagsCloud(data.content);
					}
				});
			}, 
			
			loadTagsCloud: function(content) {
				var initLink = "searchresult?text=";
				
				var words = [];
				$.each(content, function(key, value) {
					if(value > 0) {
						words.push({text: key, weight: value, link: initLink + key});
					}
				});
				
				if(words.length < this.minSizeCloud) {
					$('#cloud').hide();
					this.showMessage('There aren\'t enough tags to display the tag cloud');
					return;
				}
				FLUIGC.tagscloud('#cloud', words, {
					removeOverflowing: false
				});
			},
			
			loadInputsEdit: function(community, lastTagsDay) {
				
				if(lastTagsDay == '') {
					lastTagsDay = this.defaultDays;
				}
				
				if(community != null){
					$('input[id="community'+ this.instanceId +'"]', this.DOM).val(community);
				}
				
				if(lastTagsDay != null) {
					$('input[id="lastTagsDay'+ this.instanceId +'"]', this.DOM).val(lastTagsDay);
				}
			},
			
			isPageCommunity: function() {
				if(!this.parentPageCode) {
					var page = window.location.toString() 
					
					var index = WCMAPI.tenantCode + '/subject/'; 
					
					return page.indexOf(index) > -1 ? true : false;
				}
				
				return this.parentPageCode == 'subject' ? true : false; 
			},

			validateCommunity: function() {
				if(this.communityRest != null) {
					if(this.communityRest.hidden) {
						$('#cloud').hide();
						$('#edit').hide();
						this.showMessage('Compatible with public communities only');
						return;
					}
					
					$('input[id="community'+ this.instanceId +'"]', this.DOM)
						.val(this.communityRest.alias)
						.prop('disabled', true);
					
					if(this.community == null || this.community == '' || this.community != this.communityRest.alias) {
						this.updatePreferencesAuto(this.communityRest.alias)
					}
				}
								
				if(this.mode == "edit"){
					var that = this;
					if(this.isPageCommunity()) {
						this.loadInputsEdit(null, this.lastTagsDay);
						$('#optionsTagsCloud').hide();
					} else {
						
						// AutoComplete de Comunidades
						$("#community"+ this.instanceId).autocomplete({
							source: function(request, response) {
								that.serviceListCommunity(request, function(err, data) {
									if(err) {
										FLUIGC.toast({
											message: "Error fetching the communities. Contact the administrator. " + data.message,
											type: 'danger'
										});
										return false;
									}
									response($.map(data.content, function(item) {
										return {
											label: item.name,
											value: item.alias,
											hidden:item.hidden
										}
									}));
								});
							},
							minLength: 3,
							select: function(event, ui) {
								if(ui.item.hidden) {
									FLUIGC.toast({
										message: "Compatible with public communities only ",
										type: 'danger'
									});
								} else {
									$("#community"+ that.instanceId).val(ui.item.alias);
									$('button[id="btn-save'+ that.instanceId +'"]', that.DOM).prop('disabled', false);
								}
							},
							open: function() {
								$('.ui-autocomplete').css('z-index', 5000);
							}
						});
						
						this.loadInputsEdit(this.community, this.lastTagsDay);
						
						//options
						if(this.community){
							$('#optCommunity').prop('checked', true);
						}else {
							$('#optGeneral').prop('checked', true);
						}
						this.optionCloudRadio();
						//
					}
					
					// Allows only numbers
					$(this.DOM.selector).on('keydown', '.only-numbers', function (e) {
						if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					            (e.keyCode == 65 && e.ctrlKey === true) ||
					            (e.keyCode >= 35 && e.keyCode <= 39)) {
					                 return;
					        }

				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				        	e.preventDefault();
				        }
				    });
				}
				
				if(this.mode == "view"){
					this.findTagsCloud();
				}
			},
			
			findCommunity: function() {
				var that = this;
				var alias = WCMAPI.getPageCode();
				
				that.serviceFindCommunity(alias, function (err, data) {
					if(err) {
						FLUIGC.toast({
							message: "Error fetching the community. Contact the administrator. " + data.message,
							type: 'danger'
						});
						return false;
					}
					that.communityRest = data;
					that.validateCommunity();
				});
			},
			
			serviceFindTagsCloud: function(options, cb) {
				FLUIGC.ajax(options, cb);
			},
			
			serviceListCommunity: function(request, cb) {
				var options = {
					url: "/api/public/social/community/listCommunitiesWithRelevance/",
					dataType: 'json',
					data: {
						pattern: request.term,
						limit: 10,
						offset: 0
					}
				};
				FLUIGC.ajax(options, cb);
			},
			
			serviceFindCommunity: function(alias, cb) {
				var options = {
					url: "/api/public/social/community/" + alias,
					dataType: 'json'
				};
				FLUIGC.ajax(options, cb);
			},
			
			serviceSearchAdvanced: function(cb) {
				var options = {
					type: 'POST',
					contentType: "application/json",
					url: "/api/public/search/advanced",
					data: JSON.stringify({
						searchType : 'POST',			  
						pattern : 'activateSolr',			  
						ordering : 'RELEVANT',			  
						limit : 2,				
						offset : 2
					})
				};
				FLUIGC.ajax(options, cb);
			},
			
			showMessage: function(i18nMessage) {
				var template = $('.message-tagscloud').html(), html = '', data = {};
											   							
				html = Mustache.render(template, {
					message: i18nMessage
				});
				$('#message')
					.empty()
					.append(html);
			},
			
			hideMessage: function() {
				$('#message')
				.empty();
			},
			
			disableSave: function() {
				$('button[id="btn-save'+ this.instanceId +'"]', this.DOM).prop('disabled', true);
			}
		});