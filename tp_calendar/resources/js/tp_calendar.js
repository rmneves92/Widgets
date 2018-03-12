var calendar = SuperWidget.extend({
	
	fullCalendarElement: null,
	newEventModal: null,
	updatingEventObj: null,
	
	editMode: false,
	viewMode: false,
	
	formid: 0,
	group: [],
	datasetCode: "widget_calendar",
	userGroups: [],
	userAdmin: false,
	
	restUsers: [],
	restGroups: [],
	
	bordColor:null,

	usersAutocomplete: null,
	groupsAutocomplete: null,
	
	xmlECMCardService: {
		"create": "",
		"update": "",
		"delete": "",
	},
	
	addEvent: function(source) {
		var _this = this;
		var hasError = false;
		
		// -> array
		$.each(source, function(k, o) {
			var obj = _this.calendarEventToApplicationObj(o);
			
			$.each(obj, function(j, i) {
				var name = "[name=" + j + "]";
				_this.xmlECMCardService.create.find(name).text(i);
			});
			_this.xmlECMCardService.create.find("parentDocumentId").text(_this.formid);
			_this.xmlECMCardService.create.find("companyId").text( WCMAPI.getTenantId() );
			
			WCMAPI.Create({
	    		async: false,
	            url: WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl",
	            contentType: "text/xml; charset=utf-8",
	            dataType: "xml",
	            data: _this.xmlECMCardService.create[0],
	            
	            error: function() {
	            	hasError = true;
	            },
	            
	            success: function(dados) {
	            	o.cardId = $(dados).find("documentId").text();            	
	            	_this.fullCalendarElement.fullCalendar('addEventSource', [o]);
		        },
	        });
		});
		
		if (hasError) {
			_this.toast("Atenção!", "Não foi possível cadastrar corretamente o evento.", "danger");
		}
	},
	
	addEventModal: function() {
		this.openFormModal({});
	},
	
	applicationObjToCalendarEvent: function(obj) {		
		var start = [obj.startDate, obj.startHour].join(" ");
		var end = [obj.endDate, obj.endHour].join(" ");
		
		return {
			'title': obj.event,
			'start': moment(start, "DD/MM/YYYY HH:mm").format(),
			'end': moment(end, "DD/MM/YYYY HH:mm").format(),
			'description': obj.description,
			'backgroundColor': obj.eventcolor,
			'participatingUsers': obj.participatingUsers,
    		'participatingGroups': obj.participatingGroups,
    		'publicEvent': obj.publicEvent,
    		'cardId': obj.documentId || obj.documentid,
    		'responsable': obj.responsable
		};
    },
	
	autocompleteFields: function() {
		var _this = this;
		_this.loadUsers();
		_this.loadGroups();
		
		_this.usersAutocomplete = FLUIGC.autocomplete("#participatingUsers", {
			source: function(q, cb) {
				var emails = [];
				
				$.each(_this.restUsers, function(k, o) {
					if (o.mail.indexOf(q) != -1)
						emails.push(o);
				});
				
				cb(emails);
			},
		    displayKey: 'mail',
		    tagClass: 'tag-gray',
		    type: 'tagAutocomplete'
		});

		_this.groupsAutocomplete = FLUIGC.autocomplete("#participatingGroups", {
			source: function(q, cb) {
				var groups = [];
				
				$.each(_this.restGroups, function(k, o) {
					if (o["groupPK.groupId"].indexOf(q) != -1)
						groups.push(o);
				});
				
				cb(groups);
			},
		    displayKey: 'groupDescription',
		    tagClass: 'tag-gray',
		    type: 'tagAutocomplete'
		});
		
		// -> set 
		if (_this.updatingEventObj) {
			if (_this.updatingEventObj.hasOwnProperty("participatingUsers")) {
				var mails = _this.updatingEventObj.participatingUsers.split(",");				
				$.each(mails, function(k, i) {
					_this.usersAutocomplete.add({mail: i});
				});
			}
			
			if (_this.updatingEventObj.hasOwnProperty("participatingGroups")) {
				var groupsIds = _this.updatingEventObj.participatingGroups.split(",");				
				$.each(_this.restGroups, function(k, o) {
					if ($.inArray(o["groupPK.groupId"], groupsIds) !== -1)
						_this.groupsAutocomplete.add(o);
				});
			}
		}
		
	},
    
    bindings: {
        local: {
        	'addeventmodal': ['click_addEventModal'],
        	'changeviewtoday': ['click_changeViewToDay'],
        	'changeviewtomonth': ['click_changeViewToMonth'],
        	'changeviewtoweek': ['click_changeViewToWeek'],
        	'currentdataprev': ['click_currentDatePrev'],
        	'currentdatanext': ['click_currentDateNext'],
        	'currentdatatoday': ['click_currentDateToday'],
        	'saveform': ['click_saveForm']
        },
        global: {
    		'closemodal': ['click_closeModal'],
    		'deletemodal': ['click_deleteModal'],
        	'savemodal': ['click_saveModal'],
        	'updatemodal': ['click_saveModal'],
        }
    },
    
    calendarEventToApplicationObj: function(event) {
    	return {
    		'event': event.title,
    		'startDate': moment(event.start).format("DD/MM/YYYY"),
    		'startHour': moment(event.start).format("HH:mm"),
    		'endDate': moment(event.end).format("DD/MM/YYYY"),
    		'endHour': moment(event.end).format("HH:mm"),
    		'description': event.description,
    		'eventcolor': event.backgroundColor,
    		'participatingUsers': event.participatingUsers,
    		'participatingGroups': event.participatingGroups,
    		'publicEvent': event.publicEvent,
    		'documentId': event.cardId,
    		'responsable': event.responsable
    	};
    },
    
    calendarPlugin: function() {
    	var calendarSelector = [
        	$("#startDate", this.getModalContext()).selector,
        	$("#endDate", this.getModalContext()).selector
        ].join(", ");
		
		FLUIGC.calendar(calendarSelector);
    },
    
    checkUserGroup: function() {
    	var _this = this;
    	
    	$.each(_this.group.split(','), function(k, g) {
    		if ($.inArray(g.toUpperCase(), _this.userGroups) !== -1 && !_this.userAdmin)
    			_this.userAdmin = true;
    	});
    },
    
    closeModal: function() {
    	this.updatingEventObj = null;
    	this.calendarModal.remove();
    },

    changeViewToDay: function() {
    	this.fullCalendarElement.fullCalendar('changeView', 'agendaDay');
    },
    
    changeViewToMonth: function() {
    	this.fullCalendarElement.fullCalendar('changeView', 'month');
    },
    
    changeViewToWeek: function() {
    	this.fullCalendarElement.fullCalendar('changeView', 'agendaWeek');
    },
    
    currentDatePrev: function() {
    	this.fullCalendarElement.fullCalendar('prev');
    	this.updatePanel();
    },
    
    currentDateNext: function() {
    	this.fullCalendarElement.fullCalendar('next');
    	this.updatePanel();
    },
    
    currentDateToday: function() {
    	this.fullCalendarElement.fullCalendar('today');
    	this.updatePanel();
    },
    
    deleteEvent: function(event) {
    	var _this = this;
    	var obj = _this.calendarEventToApplicationObj(event);
		
		_this.xmlECMCardService["delete"].find("cardId").text(obj.documentId);
		_this.xmlECMCardService["delete"].find("companyId").text( WCMAPI.getTenantId() );
		
		WCMAPI.Create({
			async: false,
			contentType: "text/xml; charset=utf-8",
			data: _this.xmlECMCardService["delete"][0],
			dataType: "xml",
			
			complete: function() {
				_this.updatingEventObj = null;
			},
			
			success: function() {
				_this.fullCalendarElement.fullCalendar("removeEvents", _this.updatingEventObj._id);
			},
			
			url: WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl",
		});
    },
    
    deleteModal: function() {
    	var _this = this;
    	
    	FLUIGC.message.confirm({
    	    message: 'Deseja excluir este evento?',
    	    title: 'Excluir evento',
    	    labelYes: 'Excluir',
    	    labelNo: 'Cancelar'
    	}, function(result, el, ev) {
    	    if (result) {
    	    	_this.deleteEvent(_this.loadFormFields());
    	    	_this.closeModal();
    	    }
    	});
    },
    
    editModeConfig: function() {
    	var _this = this;
    	
		this.loadGroups();
		this.groupsAutocomplete = 
			FLUIGC.autocomplete($("#group", this.getContext()).selector, {
    			source: function(q, cb) {
    				var groups = [];	    				
    				$.each(_this.restGroups, function(k, o) {
    					if (o["groupPK.groupId"].indexOf(q) != -1) groups.push(o);
    				});	    				
    				cb(groups);
    			},
    		    displayKey: 'groupDescription',
    		    tagClass: 'tag-gray',
    		    type: 'tagAutocomplete'
    		});
		
		var groupsIds = _this.group.split(",");				
		$.each(_this.restGroups, function(k, o) {
			if ($.inArray(o["groupPK.groupId"], groupsIds) !== -1)
				_this.groupsAutocomplete.add(o);
		});
    },
    
    eventColorPlugin: function() {
    	$('#eventcolor', this.getModalContext()).simplecolorpicker({
			theme: 'regularfont'
		});
    },
    
    getContext: function() {
    	if (this.context !== null) {
    		this.context = $("#calendar_" + this.instanceId);
    	}
    	return this.context;
    },
    
    getModalContext: function() {
    	if (this.modalContext !== null) {
    		this.modalContext = $("#calendar-modal");
    	}
    	return this.modalContext;
    },
    
    hourMask: function() {
    	$("#startHour, #endHour", this.getModalContext()).mask("99:99");
    },
	
    init: function() {
    	var _this = this;
    	
		_this.loadXMLRPC();
		
		
    	if (_this.editMode) {
    		_this.editModeConfig();
    		_this.colorPicker();
    	}
    	
    	if (_this.viewMode) {
    		_this.viewModeConfig();
    	}    		
    	
    },
    
    listUserGroups: function() {
    	var _this = this;
    	$.ajax({
    		async: false,
    		success: function(groups) {
    			_this.userGroups = groups;
    		},
    		type: "GET",
    		url: "/api/public/wcm/group/byuser/" + WCMAPI.userLogin
    	});
    },
    
    loadDataset: function() {
    	var _this = this;
    	var constraint = [
            DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST)
        ];
    		    	
        var c1 = DatasetFactory.createConstraint('documentType', '4', '4', ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint('documentPK.documentId', this.formid, this.formid, ConstraintType.MUST);
        var dsDocument = DatasetFactory.getDataset('document', null, new Array(c1, c2, c3), null);
    	
        
        if (dsDocument.values.length > 0){
        	
        	return $.map(
        			(DatasetFactory.getDataset(dsDocument.values[0].datasetName, null, constraint, null)).values,
        			function(obj) {
        				return _this.applicationObjToCalendarEvent(obj);
        			}
            	);
        	
        }
        
    	
    },
    
    loadFormFields: function() {
    	var event     			= $("#event", this.getModalContext()).val();
    	var description 		= $("#description", this.getModalContext()).val();
    	var startDate 			= $("#startDate", this.getModalContext()).val();
    	var startHour 			= $("#startHour", this.getModalContext()).val();
    	var endDate   			= $("#endDate", this.getModalContext()).val();
    	var endHour   			= $("#endHour", this.getModalContext()).val();
    	var backgroundColor 	= $("#eventcolor", this.getModalContext()).val();
    	/*
    	var publicEvent			= $("#publicEvent", this.getModalContext()).is(":checked") ? "true" : "false";
    	var participatingUsers 	= ($.map(this.usersAutocomplete.items(), function(i) {
			return i.mail;
		})).join(',');
    	var participatingGroups = ($.map(this.groupsAutocomplete.items(), function(i) {
			return i['groupPK.groupId'];
		})).join(',');    
		*/
    	var cardId				= $("#documentId", this.getModalContext()).val();
    	var responsable			= $("#responsable", this.getModalContext()).val();
    	
    	var start = [startDate, startHour].join(' ');
    	var end   = [endDate, endHour].join(' ');
    	
    	start = moment(start, "DD/MM/YYYY HH:mm").format();
    	end = moment(end, "DD/MM/YYYY HH:mm").format();
    	
    	return {
    		'title': event,
			'start': start,
			'end': end,
			'description': description,
			'backgroundColor': backgroundColor,
			'publicEvent': "true",
			'participatingUsers': "",
			'participatingGroups': "",
			'cardId': cardId,
			'responsable': responsable
		};
    	
    	/*
    	return {
			'title': event,
			'start': start,
			'end': end,
			'description': description,
			'backgroundColor': backgroundColor,
			'publicEvent': publicEvent,
			'participatingUsers': participatingUsers,
			'participatingGroups': participatingGroups,
			'cardId': cardId,
			'responsable': responsable
		};
		*/
    },
    
    loadXMLRPC: function() {
    	var script = $("<script>", {
			"src": "/webdesk/vcXMLRPC.js"
		});    	
    	$("body").append(script);
    },
    
    loadGroups: function() {
    	this.restGroups = (DatasetFactory.getDataset("group", ["groupPK.groupId", "groupDescription"], null, null)).values;
    },
    
    loadUsers: function() {   
    	this.restUsers = (DatasetFactory.getDataset("colleague", ["mail"], null, null)).values;
    },
    
    loadXMLFiles: function() {    	
    	var _this = this;
    	
    	$.each([
	        "ECMCardService_create.xml",
	        "ECMCardService_update.xml",
	        "ECMCardService_delete.xml"
        ], function(key, file) {
    		var method = file.split(".")[0].split("_").reverse()[0];
    		
    		// load XML file
    		// Caso o codigo da widget seja alterado, alterar tambem linha 464
    		$.ajax({
        		dataType: "xml",
        		success: function(xml) {
        			_this.xmlECMCardService[method] = $(xml);
        	    },
        		url: "/tp_calendar/resources/js/xmls/" + file
        	});
    	});
    },
    
    openFormModal: function(configuration) {
    	var _this = this;
    	var actionsObj = [{
	        'label': 'Salvar',
	        'bind': 'data-savemodal',
	    },{
	        'label': 'Cancelar',
	        'bind': 'data-closemodal',
	    }];
    	
    	this.isUpdateMode = configuration.hasOwnProperty("documentId");
    	
    	// delete button
    	if (this.isUpdateMode) {
    		
    		var cancelButton = actionsObj[1];
    		actionsObj[0] = {
    			'label': 'Atualizar',
    			'bind': 'data-updatemodal'
    		};
    		actionsObj[1] = {
    			'label': 'Excluir',
    			'bind': 'data-deletemodal'
    		};
    		actionsObj[2] = cancelButton;
    		
    		if (!_this.userAdmin) {
    			actionsObj[0].bind += ' style="display:none"';
    			actionsObj[1].bind += ' style="display:none"';
    		}
    	}
    	
    	_this.calendarModal = FLUIGC.modal({
		    title: 'Calendar',
		    content: {
		        widgetCode: 'tp_calendar', 
		        ftl: 'newEvent.ftl',
		        data: configuration
		    },
		    id: 'calendar-modal',
		    actions: actionsObj,
		    size: 'full'
		}, function(err, data) {
			if (!err) {
				_this.loadXMLFiles();
				_this.eventColorPlugin();
				_this.calendarPlugin();
				_this.hourMask();
				_this.autocompleteFields();
				
				// disable fields
				if (_this.isUpdateMode && !_this.userAdmin) {
					$("input", _this.getModalContext()).attr("disabled", true);
					$("textarea", _this.getModalContext()).attr("disabled", true);
				}
			}
		});
    },
    
    saveForm: function() {
    	var args = {
    		bordColor: $('#bordColor_' + this.instanceId, this.getContext()).val(),
			formid: $('#formid', this.getContext()).val(),
			group: ($.map(this.groupsAutocomplete.items(), function(i) {
				return i['groupPK.groupId'];
			})).join(',')
		};
	
    	if ($('#formid', this.getContext()).val() == null || $('#formid', this.getContext()).val() == "" )
    	
    	{
    		
    	 this.toast("", "Formulário não existe.", "danger");	
    
    	 return;
    	 
    	}
    	else 
    	   {
    			
    	    var c1 = DatasetFactory.createConstraint('documentType', '4', '4', ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
            var c3 = DatasetFactory.createConstraint('documentPK.documentId', $('#formid', this.getContext()).val(), $('#formid', this.getContext()).val(), ConstraintType.MUST);
            var dsDocument = DatasetFactory.getDataset('document', null, new Array(c1, c2, c3), null);
        
            if (dsDocument == null || dsDocument.values.length == 0)
            {
            	
   	    	 this.toast("", "Documento informado não é um formulário", "danger");	
            	
   	    	 return;

            }
            else 
            {
            
	    	  if (dsDocument.values[0].datasetName == ""){
	    		  
	    	    	 this.toast("", "Formulário informa esta Nome de Dataset em branco.", "danger");	
	    	    	 
	    	    	 return;

	    	  }
    	   }
        }  	
    	
		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({async:false}, this.instanceId, args);	
		
	    if (result) {
	        this.toast("", result.message, "success");
	    } 
	    else {
	    	this.toast("", "Não foi possível completar esta operação.", "danger");
	    }
    },
    
    saveModal: function() {    
    	FLUIGC.loading('#calendar-modal').show();
    	
    	var obj = this.loadFormFields();
    	
    	if(obj.start == "Invalid date" || obj.end == "Invalid date" || !obj.title.trim()){
    		FLUIGC.message.error({
    		    title: 'Erro',
    		    message: 'Insira dados válidos',
    		    details: ''
    		})
    	}
    	
    	if (this.updatingEventObj) {
    		this.updatingEventObj = $.extend(this.updatingEventObj, obj);
    		
    		this.updateEvent(this.updatingEventObj);
    	} else {
    		this.addEvent([obj]);
    	}
    	
    	this.closeModal();
    },
    
    toast: function(title, message, type) {
    	FLUIGC.toast({
    		title: title,
    		message: message,
    		type: type
    	});
    },
    
    updateEvent: function(event) {    	
    	var _this 	 = this;
    	var obj 	 = _this.calendarEventToApplicationObj(event);
    	var hasError = false;
		
		$.each(obj, function(j, i) {
			var name = "[name=" + j + "]";
			_this.xmlECMCardService["update"].find(name).text(i);
		});
		_this.xmlECMCardService["update"].find("cardId").text(obj.documentId);
		_this.xmlECMCardService["update"].find("companyId").text( WCMAPI.getTenantId() );
		
		WCMAPI.Create({
    		async: false,
            url: WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl",
            contentType: "text/xml; charset=utf-8",
            dataType: "xml",
            data: _this.xmlECMCardService['update'][0],
            
            complete: function() {
            	_this.updatingEventObj = null;
            },
            
            error: function() {
            	hasError = true;
            },
            
            success: function(dados) {
            	_this.fullCalendarElement.fullCalendar("updateEvent", event);
	        },
        });
		
		if (hasError) {
			_this.toast("Atenção!", "Não foi possível atualizar corretamente o evento.", "danger");
		}
    },
    
    updateEventModal: function(event) {
    	var obj = this.calendarEventToApplicationObj(event);
    	
    	this.updatingEventObj = event;
    	this.openFormModal(obj);
    },
    
    updateModal: function() {
		var _this = this;
    	
    	FLUIGC.message.confirm({
    	    message: 'Deseja atualizar este evento?',
    	    title: 'Atualizar evento',
    	    labelYes: 'Atualizar',
    	    labelNo: 'Cancelar'
    	}, function(result, el, ev) {
    	    if (result) {
    	    	_this.updateEvent(_this.loadFormFields());
    	    	_this.closeModal();
    	    }
    	});
    },
    
    updatePanel: function() {
    	var _this = this;
    	
    	// update widget title
    	$(".panel-title strong", this.getContext()).text(
			this.fullCalendarElement.fullCalendar("getDate").format("MMMM YYYY")
    	);
    },
    
    viewModeConfig: function() {
    	var _this = this;
    	var data = _this.loadDataset();
		var width = _this.getContext().width();
    	var aspectRatio = (function() {
    		var ratio = 1.3;
    		
    		if (width < 421)
    			ratio = 1.1
    		else if (width < 821)
    			ratio = 1.8;
    		else if (width > 820)
    			ratio = 2.4;
    		return ratio;
    	})();
    	
    	if (width < 421) {
    		$(".heading-view", _this.getContext()).addClass("fs-display-none");
    		//$(".panel-footer", _this.getContext()).removeClass("fs-display-none");
    	} else {
    		$(".heading-view", _this.getContext()).removeClass("fs-display-none");
    		//$(".panel-footer", _this.getContext()).addClass("fs-display-none");
    	}
    	
    	// hide widget title
    	this.getContext().parent().siblings(".wcm_title_widget").hide();
    	
    	this.listUserGroups();
    	this.checkUserGroup();
    	
    	if (_this.userAdmin) {
    		$("#addeventmodal", _this.getContext()).removeClass("fs-display-none");
    	}
    	
    	// start calendar    	
    	
    	this.fullCalendarElement = $("#calendar", this.getContext());
    	this.fullCalendarElement.fullCalendar({
    		aspectRatio: aspectRatio,
    		events: data,
    		header: {
    			left: '',
                center: '',
                right: '',
			},
			lang: "${i18n.getTranslation('view.fullcalendar.lang')}",
    		
    		eventClick: function(event, jsEvent, view) {
    			_this.updateEventModal(event);
    		},
    	});
    	this.updatePanel();
    },
    
    colorPicker: function(){
    	var settings = {
		    changeDelay: 200,
		    control: 'wheel',
		    defaultValue: '#58595b',
		    inline: false,
		    letterCase: 'lowercase',
		    opacity: true,
		    position: 'bottom left',
		    customColorNames: {
		        'mycustomcolor': '#123456'
		    }
		} 
    	var target = $('#bordColor_' + this.instanceId);
    	FLUIGC.colorpicker(target, settings);
    }
});