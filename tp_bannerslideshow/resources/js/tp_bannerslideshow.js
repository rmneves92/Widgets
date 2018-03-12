var bannerSlideShow = SuperWidget.extend({
	instanceId: null,
	arrDocumento: null,
	arrImagem: null,
	editMode: false,
	viewMode: false,
	index: null,
	
	
	_doThisWhenIsInEditMode: function() {
		FLUIGC.switcher.init('[id^=bannerslideshow_] #localeon');
	},
	
	_doThisWhenIsInViewMode: function() {
		var $this = this;
		arrDocumento = [];
		arrImagem = [];
		index = 0;
		
		
		$.ajax({
			data: {
				'rows': 5000
			},
			
			error: function(data, textStatus, jqXHR) {
				FLUIGC.toast({'message': data.responseText, 'type': 'danger'});
			},
			
			success: function(data) {
				
				$.each(data.invdata, function(key, document) {
					// imagens
					if (document.mimeType.split('/')[0] == 'image') {
						
						$this.createImageContainer(document);
//						$this.createNews(document);
					}					
				}); 
			},
			
			url: [
		      WCMAPI.getServerURL(),
		      'ecm/api/rest/ecm/navigation/content', 
		      $this.folderNumber
		    ].join('/')
		});
	},
	
	bindings: {
		local: {
			'folder': ['click_chooseFolder'],
			'save': ['click_save'],
		}
	},
	
	createImageContainer: function(document) {
		
		var $this = this;
		var url = [
            WCMAPI.getServerURL(),
            'ecm/api/rest/ecm/documentView/contentVersion',
            document.documentId,
            '1000',
        ].join('/');
		
		$.ajax({
			async: true,
			
			success: function(data) {
				var imageURL = data.phisicalFile;
				
				
				// load image
				(new Image()).src = imageURL;
				
				var $image = $("<img>", {
					'src': imageURL,
					'style': 'cursor: pointer;'
				});
				
				$this.createNews(document);
				$this.getContext().find(".cycle-slideshow").cycle('add', $image);
				
				setTimeout(function() {
					
					
					if (data.additionalComments) {
						if (data.additionalComments.indexOf('http://') !== -1 || 
							data.additionalComments.indexOf('https://') !== -1) {
							$a = $("<a>", {
								'href': $.trim( data.additionalComments ),
								'target': ($this.linkimage == 'same') ? '_self' : '_blank' 
							});
							
							$image.wrap( $a );
						}
					}
				}, 1000);				
			},
			url: url
		});
	},
	
	/**
	 * Choose Fluig folder
	 */
	chooseFolder: function(el){
		var $context = this.getContext();
		
		this.ecmThings(function(pastaDestino, nome) {			
			if (pastaDestino && nome) {
				el.value = nome;
				$("#folderNumber", $context).val(pastaDestino);				
				return;
			}			
		});
	},
	
	/**
	 * Open dialog to choose Fluig folder
	 */
	ecmThings: function(callback) {
		
		var zoomECM = function(){
			ECM.findDocument = new Object();

			var cfg = {
				url: "/ecm_finddocument/finddocument.ftl",
				width: 750,
				height: 600,
				maximized:true,
				title: "${i18n.getTranslation('slideshow.selectfolderwindowtitle')}", 
				callBack: function(){
					ECM.findDocument.getDocuments(0,1,false,0);
				},
				customButtons: new Array("${i18n.getTranslation('slideshow.selectfolder')}") 
			};

			ECM.findDocument.panel = WCMC.panel(cfg);

			ECM.findDocument.panel.bind("panel-button-0", function(){
				var pastaDestino, nome;

				if(ECM.findDocument.dataTable.selectedRows.length > 1){
					WCMC.messageWarn("${i18n.getTranslation('slideshow.selectonlyonefolder')}" + ".");
					return;
				}

				pastaDestino = parseInt(ECM.findDocument.dataTable.selectedRows[0]);

				if(ECM.findDocument.dataTable.selectedRows.length === 0 || pastaDestino === undefined || pastaDestino === NaN || pastaDestino === 0){
					WCMC.messageWarn("${i18n.getTranslation('slideshow.selectafolder')}" + ".");
					return;
				}

				nome = ECM.findDocument.dataTable.getData(pastaDestino).documentDescription;

				//ECM.findDocument.load.hide();
				ECM.findDocument.panel.close();
				callback(pastaDestino, nome);
			});

			ECM.findDocument.panel.bind("panel-button-close", function() {
				var pastaDestino = false, nome = false;
				callback(pastaDestino, nome);
			});
		};
		zoomECM.apply();
	},
	
	init: function() {
		var $this = this;
		
		if (this.editMode) {
			this._doThisWhenIsInEditMode();
		}
		else if (this.viewMode) {
			this._doThisWhenIsInViewMode();
		}
	},
	
	/**
	 * Get Div Context
	 */
	getContext: function() {
		if (!this.divContext) {
			this.divContext = $("#bannerslideshow_" + this.instanceId);
		}
		return this.divContext;
	},
	
	/**
	 * Get JCycle Container Context
	 */
	getCycleContext: function() {
		if (!this.cycleContext) {
			this.cycleContext = $("#cycleslideshowbannerslideshow" + this.instanceId);
		}
		return this.cycleContext;
	},
	
	/**
	 * Save the widget configuration
	 */
	save: function(element, event) {	
		var $context = this.getContext();
		
		var result = WCMSpaceAPI.PageService.UPDATEPREFERENCES({ async:false }, this.instanceId, {
			'folder': 					$("#folder", $context).val(),
			'folderNumber': 			$("#folderNumber", $context).val(),
			'type': 					$("#type", $context).val(),
			'fx': 						$("#fx", $context).val(),
			'loop': 					$("#loop", $context).val(),
			'mark': 					$("#mark", $context).val(),
			'time': 					$("#time", $context).val(),
			'transition': 				$("#transition", $context).val(),
			'linkimage': 				$("#linkimage", $context).val(),
			'marklocation': 			$("#marklocation", $context).val(),
			'marktype': 				$("#marktype", $context).val()
		});
		
	    if (result) {
	    	FLUIGC.toast({
	            message: result.message,
	            type: 'success'
	        });
	    } 
	    else {
	    	FLUIGC.toast({
	            message: "${i18n.getTranslation('bannerslideshow.save.error')}",
	            type: 'danger'
	        });
	    }
	},
	
	createNews: function(document){
		setTimeout(function() {
		
			var imgAtual = "";
			
			//var qtdImagens = arrDocumento.length - 1;
			
			arrDocumento.push(document.documentId);
			
			for(index; index < arrDocumento.length; index++){
				imgAtual = $("img.cycle-slide:not('.cycle-sentinel')")[index];
				
				arrImagem.push(imgAtual);
				
				$(imgAtual).on("click", function(){
					var nrDoc = document.documentId;
					var c1 = DatasetFactory.createConstraint("idImagem", nrDoc, nrDoc, ConstraintType.MUST);
					var filtro = new Array(c1);
					var ds = DatasetFactory.getDataset("ds_img_news", null, filtro, null);
					
					if(ds.values[0] != undefined){
						
						var idNoticia = ds.values[0].idNoticia
						
						var cNoticia = DatasetFactory.createConstraint("documentid", idNoticia, idNoticia, ConstraintType.MUST);
						var dsNoticia = DatasetFactory.getDataset("alertas", null, [cNoticia], null);
						
						var tituloNoticia = dsNoticia.values[0].news_title;
						var conteudoNoticia = dsNoticia.values[0].news_body;
						var idImagem = dsNoticia.values[0].idImageECM;
						
						if(idImagem != undefined && idImagem != ""){
							var imgUrl = WCMAPI.getServerURL() + "/webdesk/streamcontrol/padrao.png?WDCompanyId=" + WCMAPI.getTenantId() + "&WDNrDocto=" + idImagem + "&WDNrVersao=" + dsNoticia.values[0]["metadata#version"];
//							var imgUrl = $("<img>", {
//								'src': imgUrl
//								//'style': "max-width: 100%; max-height: 2000px;",
//								//'class': "img-rounded"
//							});
							
							var imagemNoticia = '<img src="' + imgUrl + '" style="margin-left: 22%; max-width: 100%; max-height: 2000px;" class="img-rounded" alt="'+ tituloNoticia +'"></img>';
							
							var myModal = FLUIGC.modal({
					            title: tituloNoticia,
					            content: imagemNoticia,
					            id: "tp_fluig-modal_" + this.instanceId,
					            size: "large",
					            actions: [{
					                'label': 'Fechar',
					                'autoClose': true
					            }]
					        });
						}
						
						else{
							 var myModal = FLUIGC.modal({
					            title: tituloNoticia,
					            content: conteudoNoticia,
					            id: "tp_fluig-modal_" + this.instanceId,
					            size: "large",
					            actions: [{
					                'label': 'Fechar',
					                'autoClose': true
					            }]
					        });
						}
					}
				});
			}
		},2000);
	}
});