var ContadorDeAcessos = SuperWidget.extend({
    message: null,

    init: function () {
    	var _this = this;
    	var url = document.URL;
    	console.log("url: " + url);
    	var arrUrl = url.split("/");
    	var codComunidade = arrUrl[7];
    	
    	
    	this.gravarDataset(codComunidade);
    },

    bindings: {
        local: {
        }
    },
    
    gravarDataset: function(cod){
    	var campos = new Array();
    	var userCode = WCMAPI.userCode;
    	var comunidadeId = cod;
    	
    	campos.push(userCode, "2", comunidadeId);
    	
    	DatasetFactory.getDataset("ds_salva_clique", campos, null, null);
    }

});