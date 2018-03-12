<div id="Parceiras_${instanceId?c}"
     class="${pageSkin!'blue'} wcm-widget-class super-widget fluig-style-guide"
     data-params="Parceiras.instance()">
     
     <div id="wcm-vpage">
        <div class="tp_alerta_border tp_alerta_border_${instanceId} contatos-border fonte-calibri" style="border-color: ${bordColor!}">
			<h2 class=" page-header tp_page_header tp_page_header_${instanceId} strong-header" id="tp_page_header" style="background-color: ${bordColor!}">
				<img class="iconeParcerias" src="${iconeParcerias!}">
				<strong>Parcerias</strong>
			</h2>
        	<div id="table-parceiras"></div>
        </div>
        <input type="hidden" value="${qtdRegistros!}" id="qtdRegistros_${instanceId}"/>
    </div>
    
    <script type="text/template" class="parcerias_template_area_actions">
    	
   		<div id="datatable-area-action" class="col-md-12">
   			<div class="row">
    			<label class="checkbox-inline"> 
    			Categoria
    				<select name="slCategoria_${instanceId}" id="slCategoria_${instanceId}" data-filtra-categoria class="form-control">
    					<option>Selecione</option>
    				</select>
    			</label>
    			<button type="button" class="btn btn-default btnLimpar" id="btnLimpar_${instanceId}" data-limpar-filtros>Limpar</button>
    		</div>
    			
    		<div class="row">
    			<label class="checkbox-inline"> 
    			Local
    				<select name="slLocal_${instanceId}" id="slLocal_${instanceId}" data-filtra-local class="form-control">
    					<option>Selecione</option>
    				</select>
    			</label>
    		</div>
    	</div>
    </script>
    
</div>
<script type="text/template" class="template_datatable_parcerias">

<div class="row">
    <tr>
			 {{#lMobile}}
		      	<td>{{parceria}}</td>
		        <td>{{categoria}}</td>
		        <td>{{beneficios}}</td>
		        <td>{{localizacao}}</td>	
		     {{/lMobile}}
		     {{^lMobile}}
		        <td>{{parceria}}</td>
		        <td>{{categoria}}</td>
		        <td>{{beneficios}}</td>
		        <td>{{localizacao}}</td>		     
		     {{/lMobile}}
    </tr>
</div>          
    
    
</script>

<script src="/webdesk/vcXMLRPC.js?v=${fluigVersion}" type="text/javascript"></script>