var SlideShow = SuperWidget.extend({
    instanceId: null,
    widgetVersion: null,
    sourceType: null,
    instagramTargetAccount: null,
    instagramTargetAccountID: null,
    applicationSourceClientID: null,
    fluigDirectoryName: null,
    fluigDirectoryID: null,
    showImageTitle: null,
    autoSize: false,
    resize: false,
    
    arrDocumento: null,
    arrImagem: null,
    index2: null,
    
    mapAttrs: {
        TYPE_INSTAGRAM: "Instagram",
        TYPE_FLUIGDIR: "FluigDir",
        ERROR_TYPE_API_NOT_ALLOWED: "APINotAllowedError",
        ERROR_TYPE_API_INVALID_CLIENT: "OAuthParameterException",
        DOCTYPE_DIRECTORY: "1",
        LIMIT_CHAR_MESSAGE: 119
    },
    bindings: {
        local: {
            "option-instagram": ["click_instagramChosen"],
            "option-fluigdir": ["click_fluigDirChosen"],
            "addnew-clientid": ["click_goToInstagramClientManager"],
            "usedefault-clientid": ["click_useDefaultClientID"],
            igprofile: ["click_goToInstagramProfile"],
            "save-preferences": ["click_savePreferences"],
            "find-fluigdir": ["click_chooseDirectory"]
        },
        global: {}
    },
    init: function() {
        var that = this;
        this.DOM.parents(".wcm_corpo_widget_single").siblings(".wcm_title_widget").remove();
        if (that.isEditMode) {
            that.editMode()
        } else {
        	arrDocumento = [];
        	arrImagem = [];
        	index2 = 0;
            that.processTemplate("template_slideshow", {}, "#SlideShow_" + that.instanceId, function() {
                that.viewMode()
            })
        }
    },
    definePreferences: function() {
        var mode = this.getMode();
        this.sourceType = $("#sourceType" + mode).val();
        this.instagramTargetAccount = $("#instagramTargetAccount" + mode).val();
        this.instagramTargetAccountID = $("#instagramTargetAccountID" + mode).val();
        this.applicationSourceClientID = $("#applicationSourceClientID" + mode).val();
        this.fluigDirectoryID = $("#fluigDirectoryID" + mode).val();
        this.fluigDirectoryName = $("#fluigDirectoryName" + mode).val();
        this.showImageTitle = $("#showImageTitle" + mode).prop("checked");
        this.autoSize = $("#autoSize" + mode).prop("checked");
        this.resize = $("#resize" + mode).prop("checked")
    },
    getMode: function() {
        return ((this.isEditMode) ? "Edit" : "View") + "_" + this.instanceId
    },
    setDirectory: function(doc) {
        var mode = this.getMode();
        this.fluigDirectoryID = doc.documentId;
        $("#fluigDirectoryID" + mode).val(this.fluigDirectoryID);
        this.fluigDirectoryName = doc.documentDescription;
        $("#fluigDirectoryName" + mode).val(this.fluigDirectoryName)
    },
    viewMode: function() {
        var that = this;
        if (that.sourceType === that.mapAttrs.TYPE_FLUIGDIR) {
            that.getFluigImageReader()
        } else {
            that.getInstagramImageReader(function(response) {
                if (response) {
                    var data = response.content.result;
                    if (response.content.description.indexOf(":SUCCESS") !== -1) {
                        that.loadInstagramImages(data)
                    } else {
                        that.showMessage("", "danger", that.parseError(response))
                    }
                } else {
                    that.showMessage("", "danger", 'Não houve resposta do Instagram. Tente novamente mais tarde')
                }
            })
        }
    },
    loadFluigImages: function(data) {
        var that = this, images = [], len = data.length, item, image;
        for (var i = 0; i < len; i++) {
            item = data[i];
            if (item.mimetype && that.validateMimeType(item)) {
                image = {
                    src: that.getFluigFileUrl(item),
                    title: (/^true$/i.test(that.showImageTitle)) ? that.cropMessage(that.getFluigFileDescription(item)) : "",
                    alt: that.getFluigFileDescription(item),
                    linkhref: item.versionDescription,
                    docId: item["documentPK.documentId"],
                };
                images.push(image);
                that.createNews(image);
            }
            else if(item.documentType == "1"){
				$.ajax({
					async: true,
					type: "GET",
					url: WCMAPI.getServerURL() + "/api/public/ecm/document/listDocument/" + item.documentId,
					success: function(img){
						imagem = img.content;
						console.log("Sucesso!");
						for(var indexChild in imagem){
							$this.createImageContainerChildren(imagem[indexChild]);
						}
						
					},
					error: function(err){
						console.log("Erro");
					}
				})
			}
        }
        if (images.length > 0) {
            that.buildSlideShow(images);
        } else {
            this.displayNoDataFoundMessage()
        }
    },
    validateMimeType: function(item) {
        var mimeTypes = ["image/jpeg", "image/bmp", "image/x-windows-bmp", "image/pjpeg", "image/png", "image/gif"];
        for (var index in mimeTypes) {
            var mime = mimeTypes[index];
            if (item.mimetype === mime) {
                return true
            }
        }
        return false
    },
    loadInstagramImages: function(data) {
        var images = [], arr = JSON.parse(data).data, len = arr.length, item, image;
        for (var i = 0; i < len; i++) {
            item = arr[i];
            image = {
                src: this.getInstagramImageUrl(item),
                alt: this.getInstagramCaptionMessage(item),
                linkhref: item.link
            };
            images.push(image)
        }
        this.buildSlideShow(images)
    },
    buildSlideShow: function(images) {
        var settings, photoList = $("#photoList_" + this.instanceId);
        if (images && images.length) {
            settings = {
                id: "kitIntranetSlideshow" + this.instanceId,
                images: images,
                autoSize: this.autoSize,
                resize: this.resize,
            };
            FLUIGC.carousel(photoList, settings)
        } else {
            this.showMessage("", "warning", 'Não há imagens a serem exibidas')
        }
    },
    getInstagramImageUrl: function(item) {
        return item.images.standard_resolution.url
    },
    getFluigFileUrl: function(item) {
        var nrDocto = item["documentPK.documentId"];
        var nrVersao = item["documentPK.version"];
        var companyId = item["documentPK.companyId"];
        return WCMAPI.getServerURL() + "/webdesk/streamcontrol/" + item.phisicalFile + "?WDNrDocto=" + nrDocto + "&WDNrVersao=" + nrVersao + "&WDCompanyId=" + companyId
    },
    getInstagramCaptionMessage: function(item) {
        if (item && item.caption) {
            return item.caption.text
        }
        return ""
    },
    getFluigFileDescription: function(item) {
        if (item.additionalComments) {
            return item.additionalComments
        }
        return item.documentDescription
    },
    editMode: function() {
        if (this.sourceType === this.mapAttrs.TYPE_FLUIGDIR) {
            this.fluigDirChosen()
        } else {
            this.instagramChosen()
        }
    },
    savePreferences: function() {
        var that = this;
        this.definePreferences();
        that.save(that.getPreferences())
    },
    parseError: function(response) {
        var that = this;
        switch (response.meta.error_type) {
        case that.mapAttrs.ERROR_TYPE_API_NOT_ALLOWED:
            return 'A conta configurada é um perfil do tipo privado. As imagens não podem ser exibidas.';
        case that.mapAttrs.ERROR_TYPE_API_INVALID_CLIENT:
            return 'O código de cliente informado não é válido';
        default:
            return response.meta.error_message
        }
    },
    getFluigImageReader: function() {
        var constraints = [], dataset;
        constraints.push(DatasetFactory.createConstraint("parentDocumentId", this.fluigDirectoryID, this.fluigDirectoryID, ConstraintType.SHOULD));
        constraints.push(DatasetFactory.createConstraint("activeVersion", true, true, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("checkSecurity", true, true, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("documentType", "1", "1", ConstraintType.MUST));
        dataset = DatasetFactory.getDataset("document", null, constraints, null);
        
        constraints = constraints.slice(0, -1);
        constraints.push(DatasetFactory.createConstraint("documentType", "2", "2", ConstraintType.MUST));
        
        for(var index3 in dataset.values){
    		var docIdChildren = dataset.values[index3]["documentPK.documentId"];
    		constraints.push(DatasetFactory.createConstraint("parentDocumentId", docIdChildren, docIdChildren, ConstraintType.SHOULD));
        }
        var datasetChild = DatasetFactory.getDataset("document", null, constraints, ["priority"]);
		
        
        if (datasetChild && datasetChild.values.length > 0) {
        	datasetChild.values.reverse();
            var docId = datasetChild.values[0].uUID;
            if (docId || docId.length) {
                this.loadFluigImages(datasetChild.values)
            } else {
                this.displayNoDataFoundMessage()
            }
        } else {
            this.displayNoDataFoundMessage()
        }
    },
    displayNoDataFoundMessage: function() {
        this.showMessage("", "info", 'Não há imagens a serem exibidas')
    },
    serviceInstagramUtil: function(url, callback) {
        var params = {
            companyId: WCMAPI.getOrganizationId(),
            serviceCode: "instagram.demo",
            method: "GET",
            endpoint: "/v1/users/self/media/recent"
        };
        var options = {
            url: url,
            data: JSON.stringify(params),
            async: true,
            contentType: "application/json",
            type: "POST"
        };
        FLUIGC.ajax(options, callback)
    },
    getInstagramImageReader: function(callback) {
        var that = this;
        var urlInvokeService = "/api/public/2.0/authorize/client/invoke";
        that.serviceInstagramUtil(urlInvokeService, function(err, data) {
            if (err) {
                FLUIGC.toast({
                    message: 'A conta informada é inválida',
                    type: "danger"
                });
                return false
            }
            callback(data)
        })
    },
    normalizeAccount: function(instagramAccount) {
        var accountWithoutLastSlash, slashIndex = instagramAccount.lastIndexOf("/");
        if (slashIndex >= 0) {
            if (slashIndex === (instagramAccount.length - 1)) {
                accountWithoutLastSlash = instagramAccount.substring(0, slashIndex);
                return this.normalizeAccount(accountWithoutLastSlash)
            } else {
                return instagramAccount.substring(slashIndex + 1)
            }
        } else {
            return instagramAccount
        }
    },
    save: function(preferences) {
        var that = this;
        if (that.sourceType === that.mapAttrs.TYPE_FLUIGDIR && preferences.fluigDirectoryName === "" && preferences.fluigDirectoryID === "") {
            that.showMessageError("", 'Selecione uma Pasta')
        } else {
            WCMSpaceAPI.PageService.UPDATEPREFERENCES({
                async: true,
                success: function(data) {
                    FLUIGC.toast({
                        title: data.message,
                        message: "",
                        type: "success"
                    })
                },
                fail: function(xhr, message, errorData) {
                    that.showMessageError("", errorData.message)
                }
            }, that.instanceId, preferences)
        }
    },
    showMessageError: function(title, error) {
        this.showMessage(title, "danger", error)
    },
    showMessage: function(title, type, message) {
        FLUIGC.toast({
            title: title,
            type: type,
            message: message
        })
    },
    getPreferences: function() {
        return {
            sourceType: this.sourceType,
            instagramTargetAccount: this.instagramTargetAccount,
            instagramTargetAccountID: this.instagramTargetAccountID,
            applicationSourceClientID: this.applicationSourceClientID,
            fluigDirectoryID: this.fluigDirectoryID,
            fluigDirectoryName: this.fluigDirectoryName,
            showImageTitle: this.showImageTitle,
            autoSize: this.autoSize,
            resize: this.resize
        }
    },
    processTemplate: function(templateName, data, target, callback) {
        var that = this;
        var html = Mustache.render(that.templates[templateName], data);
        $(target).html(html);
        if (callback) {
            callback()
        }
    },
    instagramChosen: function() {
        this.chooseSourceType(this.mapAttrs.TYPE_INSTAGRAM)
    },
    fluigDirChosen: function() {
        this.chooseSourceType(this.mapAttrs.TYPE_FLUIGDIR)
    },
    chooseSourceType: function(type) {
        var $optionButton = $("#sourceTypeButton_" + this.instanceId);
        var displayInstagramData = null;
        var displayFluigDirData = null;
        $("#sourceType" + this.getMode()).val(type);
        this.sourceType = type;
        if (type === this.mapAttrs.TYPE_FLUIGDIR) {
            $optionButton.text('Uma Pasta ');
            displayFluigDirData = "";
            displayInstagramData = "none";
            $("#showImageTitleEdit_" + this.instanceId).removeClass("fs-display-none")
        } else {
            $optionButton.text('Instagram ');
            displayFluigDirData = "none";
            displayInstagramData = "";
            $("#showImageTitleEdit_" + this.instanceId).addClass("fs-display-none")
        }
        $("#formFluigDir_" + this.instanceId).attr("style", "display: " + displayFluigDirData + ";");
        $("#formInstagram_" + this.instanceId).attr("style", "display: " + displayInstagramData + ";");
        $("<span>").addClass("caret").appendTo($optionButton)
    },
    goToInstagramClientManager: function() {
        this.openNewTab("http://instagram.com/developer/clients/manage/")
    },
    goToInstagramProfile: function() {
        this.definePreferences();
        this.openNewTab("http://instagram.com/" + this.instagramTargetAccount)
    },
    openNewTab: function(url) {
        var win = window.open(url);
        win.focus()
    },
    chooseDirectory: function() {
        var that = this;
        ECM.findDocument = {};
        var cfg = {
            url: "/ecm_finddocument/finddocument.ftl",
            width: 750,
            height: 500,
            title: 'Selecionar pasta',
            callBack: function() {
                ECM.findDocument.getDocuments(0, "1-2-8")
            },
            customButtons: new Array('Selecionar')
        };
        ECM.findDocument.panel = WCMC.panel(cfg);
        ECM.findDocument.panel.bind("panel-load", function() {});
        ECM.findDocument.panel.bind("panel-button-0", function() {
            if (ECM.findDocument.dataTable.selectedRows.length === 0) {
                WCMC.messageWarn('Selecione uma Pasta.');
                return
            }
            if (ECM.findDocument.dataTable.selectedRows.length === 1) {
                var rowId = ECM.findDocument.dataTable.selectedRows[0];
                var doc = ECM.findDocument.dataTable.getData(rowId);
                if (doc.documentType === that.mapAttrs.DOCTYPE_DIRECTORY) {
                    that.setDirectory(doc);
                    ECM.findDocument.panel.close()
                } else {
                    WCMC.messageWarn('Selecione uma Pasta.');
                    return
                }
            } else {
                WCMC.messageWarn('Selecione apenas uma Pasta.');
                return
            }
        })
    },
    cropMessage: function(message) {
        var croppedMessage = "";
        if (message.length > this.mapAttrs.LIMIT_CHAR_MESSAGE) {
            croppedMessage = message.substring(0, this.mapAttrs.LIMIT_CHAR_MESSAGE);
            croppedMessage = croppedMessage.concat("...")
        } else {
            croppedMessage = message
        }
        return croppedMessage
    },
    
    createNews: function(document){
		var that = this;
		setTimeout(function() {
		
			var imgAtual = "";
			
			//var qtdImagens = arrDocumento.length - 1;
			
			
			if(document.docId != undefined){
				arrDocumento.push(document.docId);
			}
			
			for(index2; index2 < arrDocumento.length; index2++){
				imgAtual = $("#kitIntranetSlideshow"+ that.instanceId + " .carousel-inner .item img")[index2];
				
				arrImagem.push(imgAtual);
				
				
				$(imgAtual).on("click", function(){
					if(document.docId != undefined){
						var nrDoc = document.docId;
					}
					else if(document.id != undefined){
						var nrDoc = document.id;
					}
					
					var c1 = DatasetFactory.createConstraint("idImagem", nrDoc, nrDoc, ConstraintType.MUST);
					var filtro = new Array(c1);
					var ds = DatasetFactory.getDataset("ds_img_news", null, filtro, null);
					
					if(ds.values[0] != undefined){
						
						var idNoticia = ds.values[0].idNoticia
						
						var cNoticia = DatasetFactory.createConstraint("documentid", idNoticia, idNoticia, ConstraintType.MUST);
						var dsNoticia = DatasetFactory.getDataset("alertas", null, [cNoticia], null);
						
						var tituloNoticia = dsNoticia.values[0].news_title;
						var conteudoNoticia = dsNoticia.values[0].news_body;
						var idImagem = dsNoticia.values[0]["metadata#id"];
						
						if(idImagem != undefined && idImagem != ""){
							var imgUrl = WCMAPI.getServerURL() + "/webdesk/streamcontrol/padrao.png?WDCompanyId=" + WCMAPI.getTenantId() + "&WDNrDocto=" + idImagem + "&WDNrVersao=" + dsNoticia.values[0]["metadata#version"];
//							var imgUrl = $("<img>", {
//								'src': imgUrl
//								//'style': "max-width: 100%; max-height: 2000px;",
//								//'class': "img-rounded"
//							});
							
							var imagemNoticia = '<img src="' + imgUrl + '" style="max-height: 2000px;" class="img-rounded" alt="'+ tituloNoticia +'"></img>';
							
							var myModal = FLUIGC.modal({
					            title: tituloNoticia,
					            content: imagemNoticia + conteudoNoticia,
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
		},1000);
	}
});
