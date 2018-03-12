var MenuColorido = SuperWidget.extend({
	that: this.instanceId,
	menuLink0: null,
	menuLink1: null,
	menuLink2: null,
	menuLink3: null,
	menuLink4: null,
	menuLink5: null,
	
	menuColor0: null,
	menuColor1: null, 
	menuColor2: null, 
	menuColor3: null, 
	menuColor4: null, 
	menuColor5: null,
	
	menuText0: null,
	menuText1: null,
	menuText2: null,
	menuText3: null,
	menuText4: null,
	menuText5: null,
	
	menuIcon0: null,
	
	bindings: {
        local: {
        	"save-settings": ["click_saveSettings"]
        }
    },
	
    init: function () {
    	if (this.isEditMode) {
            console.log("menu edit");
            this.findIcons();
        }
    	else{
    		console.log("menu view");
    	}
    },

    

    saveSettings: function(el, ev) {
    	this.menuColor0 = $('#menuColor0_' + this.instanceId, this.DOM).val();
    	this.menuColor1 = $('#menuColor1_' + this.instanceId, this.DOM).val();
    	this.menuColor2 = $('#menuColor2_' + this.instanceId, this.DOM).val();
    	this.menuColor3 = $('#menuColor3_' + this.instanceId, this.DOM).val();
    	this.menuColor4 = $('#menuColor4_' + this.instanceId, this.DOM).val();
    	this.menuColor5 = $('#menuColor5_' + this.instanceId, this.DOM).val();
    	
    	this.menuText0 = $('#menuText0_' + this.instanceId, this.DOM).val();
    	this.menuText1 = $('#menuText1_' + this.instanceId, this.DOM).val();
    	this.menuText2 = $('#menuText2_' + this.instanceId, this.DOM).val();
    	this.menuText3 = $('#menuText3_' + this.instanceId, this.DOM).val();
    	this.menuText4 = $('#menuText4_' + this.instanceId, this.DOM).val();
    	this.menuText5 = $('#menuText5_' + this.instanceId, this.DOM).val();
    	
    	this.menuLink0 = $('#menuLink0_' + this.instanceId, this.DOM).val();
    	this.menuLink1 = $('#menuLink1_' + this.instanceId, this.DOM).val();
    	this.menuLink2 = $('#menuLink2_' + this.instanceId, this.DOM).val();
    	this.menuLink3 = $('#menuLink3_' + this.instanceId, this.DOM).val();
    	this.menuLink4 = $('#menuLink4_' + this.instanceId, this.DOM).val();
    	this.menuLink5 = $('#menuLink5_' + this.instanceId, this.DOM).val();
    	
    	this.menuIcon0 = $('#menuIcon0_' + this.instanceId, this.DOM).val();
    	this.menuIcon1 = $('#menuIcon1_' + this.instanceId, this.DOM).val();
    	this.menuIcon2 = $('#menuIcon2_' + this.instanceId, this.DOM).val();
    	this.menuIcon3 = $('#menuIcon3_' + this.instanceId, this.DOM).val();
    	this.menuIcon4 = $('#menuIcon4_' + this.instanceId, this.DOM).val();
    	this.menuIcon5 = $('#menuIcon5_' + this.instanceId, this.DOM).val();
    	
        var settings = {
        	menuColor0: this.menuColor0,	
        	menuColor1: this.menuColor1,	
        	menuColor2: this.menuColor2,	
        	menuColor3: this.menuColor3,	
        	menuColor4: this.menuColor4,	
        	menuColor5: this.menuColor5, 
        	
        	menuText0: this.menuText0,
        	menuText1: this.menuText1,
        	menuText2: this.menuText2,
        	menuText3: this.menuText3,
        	menuText4: this.menuText4,
        	menuText5: this.menuText5,
        	
        	menuLink0: this.menuLink0,
        	menuLink1: this.menuLink1,
        	menuLink2: this.menuLink2,
        	menuLink3: this.menuLink3,
        	menuLink4: this.menuLink4,
        	menuLink5: this.menuLink5,
        	
        	menuIcon0: this.menuIcon0,
        	menuIcon1: this.menuIcon1,
        	menuIcon2: this.menuIcon2,
        	menuIcon3: this.menuIcon3,
        	menuIcon4: this.menuIcon4,
        	menuIcon5: this.menuIcon5
        };
        
        // nao esta salvando os icones no edit
        WCMSpaceAPI.PageService.UPDATEPREFERENCES({
            async: true,
            success: function(data) {
                FLUIGC.toast({
                    title: 'Preferências alteradas com sucesso!',
                    message: '',
                    type: "success"
                })
            },
            fail: function(xhr, message, errorData) {
                FLUIGC.toast({
                    title: 'Erro ao salvar',
                    message: '',
                    type: "warning"
                })
            }
        }, this.instanceId, settings)
    },
    
    setIcons: function(value) {
    	$('#menuIcon0_' + this.instanceId, this.DOM).find("option[value='" + this.quantityPublication + "']").prop(
			'selected', this.quantityPublication);
	},
	
    
    
    findIcons: function() {
		var that = this;
		
		var options = {
			type: 'GET',
			contentType: "application/json",
			url: "/ecm/api/rest/ecm/folderPublisher/getIconList",
			data: JSON.stringify()
		}
		
		FLUIGC.ajax(options, function(err, data) {
			if(err) {
				console.log("ERRO")
			} else {
				for(var i = 0; i < data.length; i++){
					$('.menuColorIcon').append($('<option>', {
					    value: data[i].iconPathFile,
					    text: data[i].descUtilization
					}));
				}
			}
		});
	}
});