var ViewPages = SuperWidget.extend({
	centroCusto: "",
	isOwner: false,
	
	myTable : null,
	tableData: null,
	datasetDadosAdicionais: null,
	bordColor: null,
	qtdRegistros: "",
	
	init : function() {
		this.carregaDadosAdicionais();
		this.loadTable();
		this.colorPicker();
	},
	
	bindings: {
		local: {
			'save-settings': ['click_saveSettings'],
			'show-favorites': ['click_showFavorites'],
			'filtra-centro-custo': ['change_carregaCentroCusto'],
			'filtra-todos': ['change_carregaTodos']
		}
	},
    
	carregaDadosAdicionais: function (){
		var that = this;
		this.qtdRegistros = $("#qtdRegistros_"+this.instanceId).val();
		
        var ct1 = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
        // Fixando limite de registros retornados na constraint - 21/08/2017
        var ct2 = DatasetFactory.createConstraint("sqlLimit", that.qtdRegistros, that.qtdRegistros, ConstraintType.MUST);
        
    	var constraint2   = new Array(ct1, ct2);
		this.datasetDadosAdicionais = DatasetFactory.getDataset("CamposAdcionaisUsuario", null, constraint2, null);	        	
	},
	
	carregaCentroCusto: function (){
		$("#WCMVPage_"+this.instanceId+" #fluig-data-table-input").val("");
		var userCode = WCMAPI.userCode;
		var filtro = new Array();
			var ccFiltro1 = DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', userCode, userCode, ConstraintType.MUST); 
			filtro.push(ccFiltro1);
			var dsGruposUsuario = DatasetFactory.getDataset('colleagueGroup', null, filtro, null);
			
			for(var j=0; j< dsGruposUsuario.values.length; j++){
				constraint = [];
				
				var centroCusto = dsGruposUsuario.values[j]["colleagueGroupPK.groupId"];
				var c1 = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint('CentroCusto', centroCusto, centroCusto, ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint('sqlLimit', this.qtdRegistros, this.qtdRegistros, ConstraintType.MUST);
				constraint.push(c1, c2, c3);
				var datasetReturned = DatasetFactory.getDataset("CamposAdcionaisUsuario", null, constraint, null);        	
				if(datasetReturned.values.length > 0 && datasetReturned != undefined){
					break;
				}
			}
				
				mydata = [];
		        
		        if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
		            var records = datasetReturned.values;
		            
		            for ( var index in records) {
		                var record = records[index];
		                
		                var cNome         = record.fullName;
		                var cTelefone     = record.Telefone;
		                var cFuncao       = record.Cargo;
		                var cDepartamento = record.Departamento; 	
		                var cCelular 	  = record.Celular;
		            	var cRamal        = record.Ramal;
		            	var cCusto        = record.CentroCusto;
		            	var cEmail        = record.Email;
		                                                                                                    	
		
		  			// somente apresenta usuarios com tabalha de extenção	
		                mydata.push({
		                    nome: cNome,
		                    telefone: cTelefone,
		                    celular : cCelular,
		                    ramal : cRamal,
		                    email: cEmail,
		                    funcao: cFuncao,
		                    departamento : cDepartamento,
		                    centrocusto: cCusto,
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
		        
		        this.myTable.reload(mydata,".template_datatable");
			        	
		},
	
	carregaTodos: function (){
		$("#WCMVPage_"+this.instanceId+" #fluig-data-table-input").val("");
		var that = this;
		var ct1 = DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST);
		var ct2 = DatasetFactory.createConstraint('sqlLimit', that.qtdRegistros, that.qtdRegistros, ConstraintType.MUST);
		var datasetReturned = DatasetFactory.getDataset("CamposAdcionaisUsuario", null, [ct1, ct2], null);        	
		
		mydata = [];
        
        if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
            var records = datasetReturned.values;
            
            for ( var index in records) {
                var record = records[index];
                
                var cNome         = record.fullName;
                var cTelefone     = record.Telefone;
                var cFuncao       = record.Cargo;
                var cDepartamento = record.Departamento; 	
                var cCelular 	  = record.Celular;
            	var cRamal        = record.Ramal;
            	var cCusto        = record.CentroCusto;
            	var cEmail        = record.Email;
                                                                                                    	

  			// somente apresenta usuarios com tabalha de extenção	
                mydata.push({
                    nome: cNome,
                    telefone: cTelefone,
                    celular : cCelular,
                    ramal : cRamal,
                    email: cEmail,
                    funcao: cFuncao,
                    departamento : cDepartamento,
                    centrocusto: cCusto,
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
        
        this.myTable.reload(mydata,".template_datatable");
		        	
	},
	
    loadTable: function() {
    	
		var mydata = [];

        var that = this;
        
        if(this.datasetDadosAdicionais != null && this.datasetDadosAdicionais.values != null && this.datasetDadosAdicionais.values.length > 0){
        	var recordsDadosAdicionais = this.datasetDadosAdicionais.values;
        }
        
        for(var index in recordsDadosAdicionais){
        	var recordDadosAdicionais = recordsDadosAdicionais[index];
        
        
		      mydata.push({
		          nome: recordDadosAdicionais.fullName,
		          telefone: recordDadosAdicionais.Telefone,
		          celular : recordDadosAdicionais.Celular,
		          ramal   : recordDadosAdicionais.Ramal,
		          email: recordDadosAdicionais.Email,
		          funcao: recordDadosAdicionais.Cargo,
		          departamento : recordDadosAdicionais.Departamento,
		          centrocusto : recordDadosAdicionais.CentroCusto,
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
	                'title': 'Nome',
	                'standard': true,
	            }, 
	            {
	                'title': 'Celular',
	            }, 
	            {
	                'title': 'Telefone',
	            }, 
	            {
	                'title': 'Ramal',
	            }, 
	                        
	            {
	                'title': 'E-mail',
	            },
	            {
	                'title': 'Departamento',
	            },
	            {
	                'title': 'Função',
	            },
	            {
	                'title': 'Centro Custo'
	            }
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
        that.myTable = FLUIGC.datatable('#wcm-vpage-table', {
            dataRequest: mydata,
            renderContent: '.template_datatable',
            header: aTitulo,
            search: {
                enabled: true,
                onSearch: function(response) {
                	
                	var constraints = null;
                	var cbCentrocusto = $("#cbCentroCusto_"+instanceId+":checked");
                	var cbTodos = $("#cbTodos_"+instanceId+":checked");
                	
                	if (response=="")
                	{
                		
                    	that.loadTable();
                    	
                    	return;
                		
                	}
                	else if(cbTodos.length > 0){
                		
                		var c1 = DatasetFactory.createConstraint("fullName",       "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);                		//var c2 = DatasetFactory.createConstraint("mail"		     , "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c2 = DatasetFactory.createConstraint("Cargo",          "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c3 = DatasetFactory.createConstraint("Departamento",   "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c4 = DatasetFactory.createConstraint("Ramal",          "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c5 = DatasetFactory.createConstraint("CentroCusto",    "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c6 = DatasetFactory.createConstraint("Celular",        "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c7 = DatasetFactory.createConstraint("Telefone",       "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c8 = DatasetFactory.createConstraint("Email",          "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);

                    	constraints   = new Array(c1,c2,c3,c4,c5,c6,c7,c8);
               
                	}
                	else if(cbCentrocusto.length > 0){
                		var c1 = DatasetFactory.createConstraint("fullName",       "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);                		//var c2 = DatasetFactory.createConstraint("mail"		     , "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c2 = DatasetFactory.createConstraint("Cargo",          "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c3 = DatasetFactory.createConstraint("Departamento",   "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c4 = DatasetFactory.createConstraint("Ramal",          "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c5 = DatasetFactory.createConstraint("CentroCusto",    that.centroCusto, that.centroCusto, ConstraintType.MUST,true);
                		var c6 = DatasetFactory.createConstraint("Celular",        "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c7 = DatasetFactory.createConstraint("Telefone",       "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
                		var c8 = DatasetFactory.createConstraint("Email",          "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);

                    	constraints   = new Array(c1,c2,c3,c4,c5,c6,c7,c8);
                	}
                    
                    var datasetReturned = DatasetFactory.getDataset("CamposAdcionaisUsuario", null, constraints, null);        	
                   
                    mydata = [];
                    
                    if (datasetReturned != null && datasetReturned.values != null && datasetReturned.values.length > 0) {
                        var records = datasetReturned.values;
                        
                        for ( var index in records) {
                            var record = records[index];
                            
                            var cNome         = record.fullName;
                            var cTelefone     = record.Telefone;
                            var cFuncao       = record.Cargo;
                            var cDepartamento = record.Departamento; 	
                            var cCelular 	  = record.Celular;
                        	var cRamal        = record.Ramal;
                        	var cCusto        = record.CentroCusto;
                        	var cEmail        = record.Email;
                                                                                                                	

  	        			// somente apresenta usuarios com tabalha de extenção	
                            mydata.push({
                                nome: cNome,
                                telefone: cTelefone,
                                celular : cCelular,
                                ramal : cRamal,
                                email: cEmail,
                                funcao: cFuncao,
                                departamento : cDepartamento,
                                centrocusto: cCusto,
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
                    
                    that.myTable.reload(mydata,".template_datatable");
            		                    
                },
                onlyEnterkey: true,
            },
            scroll: {
                target: ".wcm-vpage",
                enabled: false
            },
            actions: {
	        	enabled: true,
	            template: '.contatos_template_area_actions',
	            actionAreaStyle: 'col-md-6'
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
    	ViewPages.qtdRegistros = $('#qtdRegistros_' + this.instanceId, this.DOM).val();
    	
        var saves = {
    		bordColor: this.bordColor,	
    		qtdRegistros: ViewPages.qtdRegistros
            
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
    }
    
    
});


//$('#botao-favoritos').on('click', '[data-your-add-button]', function(ev) {
//	
//	var userName = null;
//	
//	//==============================
//	
//	var options = {
//			type: 'GET',
//			contentType: "application/json",
//			url: "/api/public/social/favorite",
//			data: JSON.stringify()
//		};
//
//    	FLUIGC.ajax(options, function(err, data) {
//			if(err) {
//				console.log("ERRO")
//			} 
//			else{
//				for(var i = 0; i < data.length; i++){
//					if(data[i].socialType == "USER"){
//						console.log("Nome do Usuário: " + data[i].name);
//						console.log("QTD REGISTROS: " + data.length);
//						userName = data[i].name;
//						var c1 = DatasetFactory.createConstraint("fullName" , "%"+ userName + "%", "%"+ userName + "%", ConstraintType.MUST);                		//var c2 = DatasetFactory.createConstraint("mail"		     , "%"+ response + "%", "%"+ response + "%", ConstraintType.SHOULD,true);
//                    	constraints   = new Array(c1);
//                    	var datasetReturned = DatasetFactory.getDataset("CamposAdcionaisUsuario", null, constraints, null);
//					}
//					
//					mydata = [];
//					
//					mydata.push({
//                        nome: datasetReturned.values[0].Nome,
//                        telefone: datasetReturned.values[0].Telefone,
//                        celular : datasetReturned.values[0].Celular,
//                        ramal : datasetReturned.values[0].Ramal,
//                        email: datasetReturned.values[0].Email,
//                        funcao: datasetReturned.values[0].Cargo,
//                        departamento : datasetReturned.values[0].Departamento,
//                    });
//					
//					
//					
//	               
//	             	this.myTable.reload(mydata,".template_datatable");
//                }
//            }
//        });
//    });



