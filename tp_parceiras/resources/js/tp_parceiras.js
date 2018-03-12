var Parceiras = SuperWidget.extend({
	centroCusto: "",
	isOwner: false,
	
	myTable : null,
	tableData: null,
	datasetParcerias: null,
	bordColor: null,
	iconeParcerias: null,
	qtdRegistros: "",
	datasetParcerias: null,
	
	init : function() {
		this.carregaParcerias();
		this.loadTable();
		this.colorPicker();
		this.addOptions();
	},
	
	bindings: {
		local: {
			'save-settings': ['click_saveSettings'],
			'filtra-categoria': ['change_buscaCategoria'],
			'filtra-local': ['change_buscaLocal'],
			'limpar-filtros': ['click_limparFiltros']
		}
	},
    
	carregaParcerias: function (){
		var that = this;
		this.qtdRegistros = $("#qtdRegistros_"+this.instanceId).val();
		
        var ct1 = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
        // Fixando limite de registros retornados na constraint - 21/08/2017
        var ct2 = DatasetFactory.createConstraint("sqlLimit", "5", "5", ConstraintType.MUST);
        
    	var constraint2   = new Array(ct1, ct2);
		this.datasetParcerias = DatasetFactory.getDataset("dsFormParcerias", null, constraint2, null);	        	
	},
	
	getFluigFileUrl: function(item){
		var nrDocto = item.parceria;
		var companyId = WCMAPI.getTenantId();
		var nrVersao = "1000";
		
		var imgUrl =  WCMAPI.getServerURL() + "/webdesk/streamcontrol/?WDCompanyId="+ companyId + "&WDNrDocto="+ nrDocto +"&WDNrVersao="+ nrVersao;
		
		var $image = $("<img>", {
			'src': imgUrl,
		})
	},
	
	
    loadTable: function() {
    	
		var mydata = [];

        var that = this;
        
        if(this.datasetParcerias != null && this.datasetParcerias.values != null && this.datasetParcerias.values.length > 0){
        	var recordsParcerias = this.datasetParcerias.values;
        }
        
        for(var index in recordsParcerias){
        	var recordParcerias = recordsParcerias[index];
        
        	
        	var nrDocto = recordParcerias.parceria;
    		var companyId = WCMAPI.getTenantId();
    		var nrVersao = "1000";
    		
    		var imgUrl = WCMAPI.getServerURL() + "/webdesk/streamcontrol/?WDCompanyId="+ companyId + "&WDNrDocto="+ nrDocto +"&WDNrVersao="+ nrVersao;
    		
    		var image = $("<img>").attr("src", imgUrl);
    		
		    mydata.push({
		    	parceria: recordParcerias.parceria,
		    	categoria: recordParcerias.categoria,
		    	beneficios: recordParcerias.beneficios,
		    	localizacao: recordParcerias.localizacao,
		    });
		    
        }
        
        if (WCMAPI.isMobileAppMode()){
        	
        
           var aTitulo = [{
               'title': 'Telefones',
               'standard': true,
           }, 
           
           {
               'title': '',
           }, 
           {
               'title': '',
           }, 
           {
               'title': '',
           }, 
                       
           {
               'title': '',
           },
           {
               'title': '',
           },
           {
               'title': '',
           },
           {
               'title': '',
           },
   
           ];
        	
        	
        }
        else {
        	
            var aTitulo = [
	            {
	                'title': 'Parcerias',
	                'standard': true,
	            }, 
	            {
	                'title': 'Categoria',
	            }, 
	            {
	                'title': 'Benefícios',
	            }, 
	            {
	                'title': 'Local',
	            },
            ];
        }
        
    
        //ordenan por nome
        
        mydata.sort(function (a, b) {
        	  if (a.nome > b.nome) {
        	    return 1;
        	  }
        	  if (a.nome < b.nome) {
        	    return -1;
        	  }
        	  // a must be equal to b
        	  return 0;
        	});
        
        var instanceId = this.instanceId;
        that.myTable = FLUIGC.datatable('#table-parceiras', {
            dataRequest: mydata,
            renderContent: '.template_datatable_parcerias',
            header: aTitulo,
            search: {
                enabled: true,
                onSearch: function(response) {
                	
                	if (response=="")
                	{
                    	that.loadTable();
                    	that.addOptions();
                    	return;
                	}
                	else{
                		
                		var c1 = DatasetFactory.createConstraint("parceria",        "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);                		//var c2 = DatasetFactory.createConstraint("mail"		     , "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c2 = DatasetFactory.createConstraint("categoria",       "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c3 = DatasetFactory.createConstraint("beneficios",      "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c4 = DatasetFactory.createConstraint("localizacao",     "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);

                    	constraints   = new Array(c1,c2,c3,c4);
               
                	}
                    
                    var datasetReturned = DatasetFactory.getDataset("dsFormParcerias", null, constraints, null);        	
                   
                    mydata = [];
                    
                    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
                        var records = datasetReturned.values;
                        
                        for ( var index in records) {
                            var record = records[index];
                            
                            var cParcerias         = record.parceria;
                            var cCategoria         = record.categoria;
                            var cBeneficios         = record.beneficios;
                        	var cLocal             = record.localizacao;
                                                                                                                	
  	        			// somente apresenta usuarios com tabalha de extenção	
                            mydata.push({
                            	parceria: cParcerias,
                            	categoria: cCategoria,
                            	beneficios : cBeneficios,
                            	localizacao: cLocal,
                                lMobile : WCMAPI.isMobileAppMode()
                            });
                            
                           
                           
                        }
                    }
                    
                    mydata.sort(function (a, b) {
                    	  if (a.nome > b.nome) {
                    	    return 1;
                    	  }
                    	  if (a.nome < b.nome) {
                    	    return -1;
                    	  }
                    	  // a must be equal to b
                    	  return 0;
                    	});
                    
                    that.myTable.reload(mydata,".template_datatable_parcerias");
            		                    
                },
                onlyEnterkey: true,
            },
            scroll: {
                target: ".wcm-vpage",
                enabled: false
            },
            actions: {
            	enabled: true,
	            template: '.parcerias_template_area_actions',
	            actionAreaStyle: 'col-md-12'
			},
            navButtons: {
                enabled: false,
            },
            draggable: {
                enabled: false
            },
            navButtons: {
                enabled: false,
                forwardstyle: 'btn-warning',
                backwardstyle: 'btn-warning',
            }
            
        }, function(err, data) {
            if (err) {
                FLUIGC.toast({
                    message: err,
                    type: 'danger'
                });
            }
        });
        
        that.myTable.on('fluig.datatable.loadcomplete', function() {
            if (!that.tableData) {
            	            	
                that.tableData = that.myTable.getData();
            }
        });
        
    },
    
    saveSettings: function(el, ev) {
    	this.bordColor = $('#bordColor_' + this.instanceId, this.DOM).val();
    	this.qtdRegistros = $('#qtdRegistros_' + this.instanceId, this.DOM).val();
    	this.iconeParcerias = $('#iconeParcerias_' + this.instanceId, this.DOM).val();
    	
        var saves = {
    		bordColor: this.bordColor,	
    		qtdRegistros: this.qtdRegistros,
    		iconeParcerias: this.iconeParcerias
            
        };
        
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
                FLUIGC.toast({
                    title: '${i18n.getTranslation("contatos.error.saving.preferences")}',
                    message: errorData.message,
                    type: "warning"
                })
            }
        }, this.instanceId, saves)
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
    },
    
    addOptions: function(){
		if(this.datasetParcerias != null && this.datasetParcerias.values != null && this.datasetParcerias.values.length > 0){
        	var recordsParcerias = this.datasetParcerias.values;
        }
        
        for(var index in recordsParcerias){
        	var recordParcerias = recordsParcerias[index];
        
        	//Categoria
        	var selectCagoria = document.getElementById("slCategoria_"+this.instanceId);
    		var optCat = document.createElement("option");
    		
    		optCat.value = recordParcerias.categoria;
    		optCat.innerHTML = recordParcerias.categoria;
    		selectCagoria.appendChild(optCat);
    		
    		
    		// Localização
    		var selectLocal = document.getElementById("slLocal_"+this.instanceId);
    		var optLoc = document.createElement("option");
    		
    		optLoc.value =  recordParcerias.localizacao;
    		optLoc.innerHTML = recordParcerias.localizacao;
    		selectLocal.appendChild(optLoc);
    		
        }
        
    },
    
    addOptionsLocal: function(){
    	var categoria = $("#slCategoria_"+this.instanceId).val();
		if(this.datasetParcerias != null && this.datasetParcerias.values != null && this.datasetParcerias.values.length > 0){
			
			var recordsParcerias = this.datasetParcerias.values;
        }
        
        for(var index in recordsParcerias){
        	var recordParcerias = recordsParcerias[index];
        	
        	if(recordParcerias.categoria == categoria){
        		// Localização
        		var selectLocal = document.getElementById("slLocal_"+this.instanceId);
        		var optLoc = document.createElement("option");
        		
        		optLoc.value =  recordParcerias.localizacao;
        		optLoc.innerHTML = recordParcerias.localizacao;
        		selectLocal.appendChild(optLoc);
        	}
        }
    },
    
    buscaCategoria: function(){
    	var that = this;
    	var categoria = $("#slCategoria_"+this.instanceId).val();
    	
    	if(categoria != "Selecione"){
    	
	    	var cCat1 = DatasetFactory.createConstraint("categoria", categoria, categoria, ConstraintType.MUST);
	    	var datasetReturned = DatasetFactory.getDataset("dsFormParcerias", null, [cCat1], null);      
	    	
	    	mydata = [];
	        
	        if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
	            var records = datasetReturned.values;
	            
	            for ( var index in records) {
	                var record = records[index];
	                
	                var cParcerias         = record.parceria;
	                var cCategoria         = record.categoria;
	                var cBeneficios         = record.beneficios;
	            	var cLocal             = record.localizacao;
	                                                                                                    	
	  			// somente apresenta usuarios com tabalha de extenção	
	                mydata.push({
	                	parceria: cParcerias,
	                	categoria: cCategoria,
	                	beneficios : cBeneficios,
	                	localizacao: cLocal,
	                    lMobile : WCMAPI.isMobileAppMode()
	                });
	                
	               
	               
	            }
	        }
	        
	        mydata.sort(function (a, b) {
	        	  if (a.nome > b.nome) {
	        	    return 1;
	        	  }
	        	  if (a.nome < b.nome) {
	        	    return -1;
	        	  }
	        	  // a must be equal to b
	        	  return 0;
	        	});
	        
	        that.myTable.reload(mydata,".template_datatable_parcerias");
    	}
    	else{
        	that.loadTable();
        	that.addOptions();
        }
    	that.addOptionsLocal();
    },
    
    buscaLocal: function(){
    	var that = this;
    	var local = $("#slLocal_"+this.instanceId).val();
    	
    	if(local != "Selecione"){
    	
	    	var cLocal1 = DatasetFactory.createConstraint("localizacao", local, local, ConstraintType.MUST);
	    	var datasetReturned = DatasetFactory.getDataset("dsFormParcerias", null, [cLocal1], null);      
	    	
	    	mydata = [];
	        
	        if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
	            var records = datasetReturned.values;
	            
	            for ( var index in records) {
	                var record = records[index];
	                
	                var cParcerias         = record.parceria;
	                var cCategoria         = record.categoria;
	                var cBeneficios         = record.beneficios;
	            	var cLocal             = record.localizacao;
	                                                                                                    	
	  			// somente apresenta usuarios com tabalha de extenção	
	                mydata.push({
	                	parceria: cParcerias,
	                	categoria: cCategoria,
	                	beneficios : cBeneficios,
	                	localizacao: cLocal,
	                    lMobile : WCMAPI.isMobileAppMode()
	                });
	                
	               
	               
	            }
	        }
	        
	        mydata.sort(function (a, b) {
	        	  if (a.nome > b.nome) {
	        	    return 1;
	        	  }
	        	  if (a.nome < b.nome) {
	        	    return -1;
	        	  }
	        	  // a must be equal to b
	        	  return 0;
	        	});
	        
	        that.myTable.reload(mydata,".template_datatable_parcerias");
    	}
    	else{
        	that.loadTable();
        	that.addOptions();
        }
    },
    
    limparFiltros: function(){
    	var that = this;
    	that.loadTable();
    	that.addOptions();
    }
    
});