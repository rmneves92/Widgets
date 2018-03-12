var Rodape = SuperWidget.extend({
	that: this.instanceId,
	
	footerColor: null,
	
	infoText: null,
	infoLink: null,
	
	footerLink0: null,
	footerLink1: null,
	footerLink2: null,
	footerLink3: null,
	footerLink4: null,

	footerText0: null,
	footerText1: null,
	footerText2: null,
	footerText3: null,
	footerText4: null,
	
	footerIcon0: null,
	footerIcon1: null,
	footerIcon2: null,
	footerIcon3: null,
	footerIcon4: null,
	
	bindings: {
        local: {
        	"save-settings": ["click_saveSettings"]
        }
    },
	
    init: function () {
    	if (this.isEditMode) {
            this.findIcons();
            this.colorPicker();
        }
    	else{
    	}
    },

    

    saveSettings: function(el, ev) {
    	this.footerColor = $('#footerColor_' + this.instanceId, this.DOM).val();
    	
    	this.infoText = $('#infoText_' + this.instanceId, this.DOM).val();
    	this.infoLink = $('#infoLink_' + this.instanceId, this.DOM).val();
    	
    	this.footerText0 = $('#footerText0_' + this.instanceId, this.DOM).val();
    	this.footerText1 = $('#footerText1_' + this.instanceId, this.DOM).val();
    	this.footerText2 = $('#footerText2_' + this.instanceId, this.DOM).val();
    	this.footerText3 = $('#footerText3_' + this.instanceId, this.DOM).val();
    	this.footerText4 = $('#footerText4_' + this.instanceId, this.DOM).val();
    	
    	this.footerLink0 = $('#footerLink0_' + this.instanceId, this.DOM).val();
    	this.footerLink1 = $('#footerLink1_' + this.instanceId, this.DOM).val();
    	this.footerLink2 = $('#footerLink2_' + this.instanceId, this.DOM).val();
    	this.footerLink3 = $('#footerLink3_' + this.instanceId, this.DOM).val();
    	this.footerLink4 = $('#footerLink4_' + this.instanceId, this.DOM).val();
    	
    	this.footerIcon0 = $('#footerIcon0_' + this.instanceId, this.DOM).val();
    	this.footerIcon1 = $('#footerIcon1_' + this.instanceId, this.DOM).val();
    	this.footerIcon2 = $('#footerIcon2_' + this.instanceId, this.DOM).val();
    	this.footerIcon3 = $('#footerIcon3_' + this.instanceId, this.DOM).val();
    	this.footerIcon4 = $('#footerIcon4_' + this.instanceId, this.DOM).val();
    	
        var settings = {
        	footerColor: this.footerColor,
        	
        	infoText: this.infoText,
        	infoLink: this.infoLink,
        		
        	footerText0: this.footerText0,
        	footerText1: this.footerText1,
        	footerText2: this.footerText2,
        	footerText3: this.footerText3,
        	footerText4: this.footerText4,
        	
        	footerLink0: this.footerLink0,
        	footerLink1: this.footerLink1,
        	footerLink2: this.footerLink2,
        	footerLink3: this.footerLink3,
        	footerLink4: this.footerLink4,
        	
        	footerIcon0: this.footerIcon0,
        	footerIcon1: this.footerIcon1,
        	footerIcon2: this.footerIcon2,
        	footerIcon3: this.footerIcon3,
        	footerIcon4: this.footerIcon4,
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
    	$('#footerIcon0_' + this.instanceId, this.DOM).find("option[value='" + this.quantityPublication + "']").prop(
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
					$('.footerColorIcon').append($('<option>', {
					    value: data[i].iconPathFile,
					    text: data[i].descUtilization
					}));
				}
			}
		});
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
    	var target = $('#footerColor_' + this.instanceId);
    	FLUIGC.colorpicker(target, settings);
    }
});