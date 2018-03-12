var menuoflinks = SuperWidget.extend({
	instanceId: null,
	
	productsList: [],
	
	menuIcon: null,
	
	editMode: false,
	viewMode: false,
	
	navbarSubMenuOpen: '',
	
	init: function() {
		var $this = this;
		
		if (this.editMode) {
			
			// build element
			var $i = $("#menu-icon", $this.getContainer());
			//var selected = $this.menuIcon || "fluigicon-plus";
			var selected = $this.menuIcon;
			var icons = FLUIGC.icons().iconsMap;
			
			$.each(icons, function(key, item) { 
				var $option = $("<option>", {
					"data-icon": key,
					"text": key
				});
				
				if (key == selected) {
					$option.attr("selected", true);
				}
				
				$i.append($option);
			});
			
			// combobox customized
			$('.selectpicker').selectpicker();
		}
		
		if (this.viewMode) {
			
			this.getContainer().parent().siblings(".wcm_title_widget").hide();
			
			this.listData();
			this.sortListData();
			
			if (this.navbar == "navbar") {
				
				navbarSubMenuOpen = this.navbarSubMenuOpen;
				
				this.createNavbar();
				this.loadNavbarCSS();		
				
				
				$($('#menuoflinks_' + this.instanceId).find("ul.navbar-center")[0]).hide();
				
				instanceId = this.instanceId;
//				
//				setTimeout(function() {					
//					var $container = $this.getContainer();
//					var navbarContainerWidth = $($container.find("div.navbar-collapse")[0]).css("width");					
//					var navbarCenterWidth = $($container.find("ul.navbar-center")[0]).css("width");
//					var navbarCenter = (parseInt(navbarContainerWidth) / 2.5) - (parseInt(navbarCenterWidth) / 2);
//					var navbarContainerWidth = $($container.find("ul.navbar-center")[0]).css("left", navbarCenter + "px").show();				
//				}, 5);
				
				if(this.navbarVerticalAlign == "topo")
				{
					$($('#menuoflinks_' + this.instanceId + ' > div.navbar')[0]).addClass('navbar-fixed-top');
				}
				
				this.navBarColors();
				this.createMenu();
				
			} else {
				this.createMenu();
				this.menuColors();
			}
		}
    },
    
	bindings: {
		local: {
			'save': ['click_save'],
    		'nomepasta': ['click_chooseFolder']
		}
	}, 
	
	createNavbar: function() {
		var $this = this;
		
		$.each($this.productsList, function(key, product) {
			if (product.origin == "") {
				$this.createNavbarTopItem(product);
			} else {
				$this.createNavbarSubItem(product);
			}
		});
	},
	
	createNavbarSubItem: function(p) {
		
		var $a = $("a[data-id=" + p.origin + "]");
		$a.addClass("dropdown-toggle").addClass("disabled").attr("data-toggle", "dropdown");
		
		//if ($a.find(".caret").length == 0) {
		//	var $span = $("<span>", {
		//		"class": "caret"
		//	})
		//	$a.append($span);
		//}
		
		var $ul = null;
		var $li = null;
		var $li_a = null;
		
		$ul = $a.siblings("ul");
		
		if ($ul.length == 0) {
			
			$ul = $("<ul>", {
				"class": "dropdown-menu",
				"aria-labelledby": p.origin
			})
			.insertAfter($a);
		}
		
		$li = $("<li>");
		$li_a = $("<a>", {
			"href": p.link == "" ? "#" : p.link,
			"text": " " + p.name + " ",
			"data-id": p.id,
			"title": p.title
			
		}).prepend(p.icon);
		
		$li.append($li_a);
		$ul.append($li);
	},
	
	createNavbarTopItem: function(p) {
		
		var $this = this;		
		var menuColor = this.menuColor;
		var fontColor = this.fontColor;
		
		$li = $("<li>", {
			"class": "dropdown firstListNav"
		});
		var $a = $("<a>", {
			"id": p.id,
			"href": p.link == "" ? "#" : p.link,
			"role": "button",
			"aria-haspopup": "true",
			"aria-expanded": "false",
			"text": " " + p.name + " ",
			"data-id": p.id,
			"title": p.title
		})[p.icon_align](p.icon).css({
			"background-color": menuColor,
			"color": fontColor
		});
		
		$li.append($a);
		
		$li.hover(function(){
			
			$(this).children('a').css({ "background-color": p.background,
				 "color": p.color
			});
			
			if (navbarSubMenuOpen == 'mouseover')
			{
				$(this).addClass('open');
			}
			
		}, function(){
			
			$(this).children('a').css({ "background-color": menuColor,
				 "color": fontColor
			});
			
			if (navbarSubMenuOpen == 'mouseover')
			{
				$(this).removeClass('open');
			}
		});
		
		$($('#menuoflinks_' + this.instanceId).find($this[p.align]())[0]).append($li);
		
	},
	
	loadNavbarCSS: function() {		
		var url = "/menuoflinks/resources/css/tp_navbar.css";
		$("body").append(
			$("<link>", {
				"type": "text/css",
				"rel": "stylesheet",
				"href": url
			})
		);
	},
	
	getNavbarLeftMenu: function() {
		if (!this.navbarLeftMenu) {
			this.navbarLeftMenu = $(".navbar-left");
		}
		return this.navbarLeftMenu;
	},
	
	getNavbarCenterMenu: function() {
		if (!this.navbarCenterMenu) {
			this.navbarCenterMenu = $(".navbar-center");
		}
		return this.navbarCenterMenu;
	},
	
	getNavbarRightMenu: function() {
		if (!this.navbarRightMenu) {
			this.navbarRightMenu = $(".navbar-right");
		}
		return this.navbarRightMenu;
	},
	
	createMenu: function() {
		var $this = this;	
		
		
		// list elements that doesn't have father
		var elements = this.lookingFor(null);
		
		var $level1 = $("<div>", {"id": "level1"});
		$this.getAccordionContainer().append($level1);
		
		// level 1
		$.each(elements, function(key, item) {
			var itemName = item.name;
			var $panel = $this.createPanel(item, false);
			$level1.append($panel);
			
			// level 2
			var $target = $("#" + item.id + " .list-group");
			var elementsLevel2 = $this.lookingFor(item.id);
			$.each(elementsLevel2, function(key, value) {
				var $a = $("<a>", {
					"href": "#" + value.id,
					"class": "list-group-item",
					"text": value.name,
					'data-link': value.link,
					'data-parentname': itemName
				});
				
				$target.append($a);
			});
		});
		
		// level n
		$(document).on("click", ".list-group-item", function(e) {
			e.preventDefault();
			
			if ($(this).attr('data-link').trim() !== '') {
				var idProduct = $(this).attr("href").replace("#", "");
				var url = $(this).attr("data-link");
				window.open(url, $this.targetLink);
				return;
			}
			
			var itemId = $(this).attr("href").split("#").reverse()[0];
			var itemName = $(this).text().trim();
			
			var $levelContainer = $("#level" + itemId);
			
			if ($levelContainer.length == 0) {
				$levelContainer = $("<div>", {'id': 'level' + itemId});
				
				var $panel = $this.createPanel({
					'id': itemId,
					'name': itemName
				}, false);
				
				$levelContainer.append($panel);
				$this.getAccordionContainer().append($levelContainer);
				
				var elements = $this.lookingFor(itemId);
				
				$.each(elements, function(key, value) {
					var $a = $("<a>", {
						"href": "#" + value.id,
						"class": "list-group-item",
						"text": value.name,
						'data-link': value.link,
					});
					
					$panel.append($a);
				});
			}
			
			var $firstLink = $this.createListItem(itemName, true);
        	
        	var $breadcrumb = $(".breadcrumb", $this.getContainer());
        	
        	$breadcrumb
        	.append( $firstLink )
        	.show('slow'); 
        	
        	$firstLink.click(function() {
        		$("[id^=level]:not(#level" + itemId + ")", $this.getContainer()).hide('slow');
            	$("#level" + itemId, $this.getContainer()).show('slow');
            	
        	});

			$("[id^=level]:not(#level" + itemId + ")", $this.getContainer()).hide('slow');
        	$("#level" + itemId, $this.getContainer()).show('slow');
        	
        	$this.menuColors();
		});
		
		// breadcrumbs
		$(document).on("click", ".breadcrumb li", function(e) {
			e.preventDefault();
			
			$(this).addClass('breadcrumb-selected');
			
			$(".breadcrumb li.breadcrumb-selected").nextAll().remove();
			
			$(this).removeClass('breadcrumb-selected');
			
			if ($(".breadcrumb li").length <= 1) {
				$(".breadcrumb").hide("slow");
				$("[id^=level]:not(#level1)", $this.getContainer()).hide('slow');
	        	$("#level1").show('slow');
			}
		});
	},
	
	createPanel: function(element, isClose) {
		var $this = this;
		var $panel = $("<div>", { 'class': 'panel panel-default painelWrapper' });
		
		var $panelHeading = $("<div>", {'class': 'panel-heading painel-personalizado'});
		var $h4 = $("<h4 class='linkPersonalizado'>", {'class': 'panel-title'});
		var $span = $("<span>", {'class': " spanIcon " + $(element.icon[0]).attr("class")});
		
		if ($.trim(element.link) !== "") {
			var $aTitle = $("<a>", {
				"href": element.link,
				"html": $span[0].outerHTML + " " + element.name,
				"target": $this.targetLink,
				"data-parent": ""
			});
		}
		else {
			var $aTitle = $("<a>", {
				"data-toggle": "",
				"data-parent": "#accordion",
				"href": "#" + element.id,
				"html": $span[0].outerHTML + " " + element.name,
			});
		}
		
		var $panelCollapse = $("<div>", {
			'id': element.id,
			'class': '',
		});
		var $panelBody = $("<div>", {'class': 'panel-body'});
		var $listGroup = $("<div>", {'class': 'list-group'});
		
		$h4.append($aTitle);
		$panelHeading.append($h4);
		
		$panelBody.append($listGroup);
		$panelCollapse.append($panelBody);
		
		$panel.append($panelHeading).append($panelCollapse);
		
		return $panel;
	},
	
	createListItem: function(textContent, hasLink) {
		var $li = $("<li>", {'html': textContent});
		
		if (hasLink) {
			$li.addClass("active");
		}
		
		return $li;
	},
	
	getAccordionContainer: function() {
		if (!this.accordionContainer) {
			this.accordionContainer = $("#menu_accordion", this.getContainer());
		}
		return this.accordionContainer;
	},
	
	getContainer: function() {
		if (!this.container) {
			this.container = $("[id^=menuoflinks_" + this.instanceId + "]");
		}
		return this.container;
	},
	
	listData: function() {
		var $this = this;
		var constraints = [
            DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
        ];
		
		var ds = DatasetFactory.getDataset(this.datasetName, null, constraints, ["id"]);

		$this.productsList = [];
		
        $.each(ds.values, function(key, value) {

        	var title = value.mdp_name;
        	var $icon = $("<span>");
        	if (value.mdp_icon != "") {
        		$icon.addClass("fluigicon").addClass(value.mdp_icon);
        	}
        	if (value.mdp_icononly == "icononly") {
        		value.mdp_name = "";
        	}
        	
        	$this.productsList.push({
        		'id': value.documentid,
        		'name': value.mdp_name,
        		'link': value.mdp_link,
        		'origin': value.mdp_origin,
        		'icon': $icon,
        		'align': value.mdp_align,
        		'icon_align': value.mdp_iconalign == "right" ? "append" : "prepend",
				'background': value.mdp_linkbackground,
				'color': value.mdp_linkcolor,
				'title': title,
        	});
        });
	},
	sortListData: function() {
		this.productsList.sort( function (a,b) {
		
		    if (a.origin == null || a.origin == "")
			{
				if (a.id > b.id) return  1;
				if (a.id < b.id) return -1;
				if (a.id > b.id) return  1;
				if (a.id < b.id) return -1;
			
		    }
			else
			{			
				if (a.origin > b.origin) return  1;
				if (a.origin < b.origin) return -1;
				if (a.origin > b.origin) return  1;
				if (a.origin < b.origin) return -1;
			}
		    return 0;
		});
	},
	lookingFor: function(isSonOf) {
		var sons = [];
		
		$.each(this.productsList, function(key, item) {
			if (item.origin == "") {
				item.origin = null;
			}
			
			if (isSonOf == item.origin) {
				sons.push(item);
			}
		});
		
		return sons;
	},
	
	menuColors: function() {
		$(".panel-heading", this.getContainer())
		.css({'background-color': this.menuColor});

		$(".panel-heading h4 *", this.getContainer())
		.css({'color': this.fontColor});
	},
	
	navBarColors: function() {
		
		$($('#menuoflinks_' + this.instanceId).find(".container")[0]).css({'background-color': this.menuColor});
	},
	
	chooseFolder: function(el){
		var self = this;
		self.ecmThings(function(pastaDestino, nome) {
			if ( pastaDestino && nome ) {
				el.value = nome;
				$('input[id="nrPasta"]', self.DOM).val(pastaDestino);
				return;
			}
			
		});
	},
	
	ecmThings: function(callback) {

		var zoomECM = function(){
			ECM.findDocument = new Object();

			var cfg = {
				url: "/ecm_finddocument/finddocument.ftl",
				width: 750,
				height: 600,
				maximized:true,
				title: "${i18n.getTranslation('edit.form.selectfolderwindowtitle')}", 
				callBack: function(){
					ECM.findDocument.getDocuments(0,0,false,3);
				},
				customButtons: new Array("${i18n.getTranslation('edit.form.selectfolder')}") 
			};

			ECM.findDocument.panel = WCMC.panel(cfg);

			ECM.findDocument.panel.bind("panel-button-0", function(){
				var pastaDestino, nome;

				if(ECM.findDocument.dataTable.selectedRows.length > 1){
					WCMC.messageWarn("${i18n.getTranslation('edit.form.selectonlyonefolder')}" + ".");
					return;
				}

				pastaDestino = parseInt(ECM.findDocument.dataTable.selectedRows[0]);

				if(ECM.findDocument.dataTable.selectedRows.length === 0 || pastaDestino === undefined || pastaDestino === NaN || pastaDestino === 0){
					WCMC.messageWarn("${i18n.getTranslation('edit.form.selectfolder')}" + ".");
					return;
				}

				nome = ECM.findDocument.dataTable.getData(pastaDestino).documentDescription;

				//ECM.findDocument.load.hide();
				ECM.findDocument.panel.close();
				//callback(pastaDestino, nome, ECM.findDocument.dataTable.getData(pastaDestino));
				callback(pastaDestino, nome);
			});

			ECM.findDocument.panel.bind("panel-button-close", function() {
				var pastaDestino = false, nome = false;
				callback(pastaDestino, nome);
			});
		};
		zoomECM.apply();
	},
	
	save: function() {
		var menuColor = $("#menu-color", this.getContainer()).val();
		var fontColor = $("#font-color", this.getContainer()).val();
		var targetLink = $("#targetLink", this.getContainer()).is(":checked") ? '_blank' : '_self';
		var navbar = $("#navbar", this.getContainer()).is(":checked") ? 'navbar' : '';
		var navbarVerticalAlign = $("#navbarVerticalAlign", this.getContainer()).is(":checked") ? 'topo' : '';
		var navbarSubMenuOpen = $("#navbarSubMenuOpen", this.getContainer()).is(":checked") ? 'mouseover' : '';
		var menuIcon = $("#menu-icon", this.getContainer()).val();
		var nomePasta = $("#nomePasta", this.getContainer()).val();
		var nrPasta = $("#nrPasta", this.getContainer()).val();
		var datasetName = "";
		
		var constraints = [
              	DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST),
               DatasetFactory.createConstraint('documentPK.documentId', nrPasta, nrPasta, ConstraintType.MUST)
               
           ];
		
   		//var ds = DatasetFactory.getDataset('menuoflinks', null, constraints, ["mdp_path","mdp_origin"]);
   		var ds = DatasetFactory.getDataset("document", null, constraints, null);
           
   		$.each(ds.values, function(key, value) {
   			datasetName = ds.values[key]["datasetName"]; 
   		});
   		 	
       	if (datasetName != '' && datasetName != null && datasetName != undefined) 
		{
       		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({async: false}, this.instanceId, {
           		'menuColor': menuColor,
           		'fontColor': fontColor,
           		'targetLink': targetLink,
           		'menuIcon': menuIcon,
           		'navbar': navbar,
           		'navbarVerticalAlign': navbarVerticalAlign,
           		'navbarSubMenuOpen': navbarSubMenuOpen,
           		'datasetName': datasetName,
           		'nomePasta': nomePasta,
           		'nrPasta': nrPasta
           	});
       		
       		if (result) {
       			this.showToast('', "${i18n.getTranslation('js.toast.save.message')}", 'success');
       		}
       		else {
       			this.showToast("${i18n.getTranslation('js.toast.error.title')}", "${i18n.getTranslation('js.toast.error.message')}", 'danger');
       		}
		}
		else {
			this.showToast("${i18n.getTranslation('js.toast.error.title')}", "${i18n.getTranslation('js.toast.error.messageFolder')}", 'danger');
		}
		
		
	},
	
	showToast: function(title, message, type) {
		FLUIGC.toast({
			title: title,
			message: message,
			type: type
		});
	}
});
