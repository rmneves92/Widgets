<div id="WCMVPage_${instanceId?c}"
     class="${pageSkin!'blue'} wcm-widget-class super-widget fluig-style-guide"
     data-params="ViewPages.instance()">
     
     <div id="wcm-vpage">
        <div class="tp_alerta_border tp_alerta_border_${instanceId} contatos-border fonte-calibri">
			<h2 class=" page-header tp_page_header tp_page_header_${instanceId} strong-header" id="tp_page_header">
				<span class="fluigicon fluigicon-phone fluigicon-md icon-word"></span>
				<strong>Contatos</strong>
			</h2>
        	<div id="wcm-vpage-table"></div>
        </div>
        <input type="hidden" value="${qtdRegistros!}" id="qtdRegistros_${instanceId}"/>
    </div>
    
    <script type="text/template" class="contatos_template_area_actions">
    	<div class="row">
    		<div id="datatable-area-action" class="col-md-9">
    			<h3 class="lblFiltra">Filtrar por:</h3>
    			<label class="checkbox-inline">	
    				<input type="radio" name="cbGroup_${instanceId}" id="cbCentroCusto_${instanceId}" data-filtra-centro-custo/>
    			Centro de Custo</label>
    			<label class="checkbox-inline"> 
    				<input type="radio" name="cbGroup_${instanceId}" id="cbTodos_${instanceId}" data-filtra-todos checked="true"/>
    			Todos</label>
    		</div>
    	</div>
    </script>

</div>
<script type="text/template" class="template_datatable">

<div class="row">
    <tr>
			 {{#lMobile}}
		      <td><h3><strong>{{nome}}</strong></h3><br>
		        <span><strong>Celular:</strong><a href="tel://{{celular}}">{{celular}}</a><br>
		        <span><strong>Telefone:</strong></span><a href="tel://{{telefone}}">{{telefone}}</a> <br>
		        <span><strong>Ramal:</strong></span>{{ramal}} <br>
		        <span><strong>E-mail:</strong></span><span> <a href="mailto:{{email}}"'>{{email}}</a> </span> <br>
				<span><strong>Departamento:</strong></span>{{departamento}} <br>
		        <span><strong>Função:</strong></span>{{funcao}}<br>
		        <span><strong>Centro Custo:</strong></span>{{centrocusto}}<br> 
		       </td>
		     {{/lMobile}}
		     {{^lMobile}}
		        <td>{{nome}}</td>	
		        <td><a href="tel://{{celular}}">{{celular}}</a></td>
		        <td><a href="tel://{{telefone}}">{{telefone}}</a></td>
		        <td>{{ramal}}</td>
		        <td><span class ="col-xs-4 col-sm-4"> <a href="mailto:{{email}}">{{email}}</a> </span> </td>		     
				<td>{{departamento}}</td>
		        <td>{{funcao}}</td>
		        <td>{{centrocusto}}</td>
		     {{/lMobile}}
    </tr>
    
</div>          
    
    
</script>

<script src="/webdesk/vcXMLRPC.js?v=${fluigVersion}" type="text/javascript"></script>
<script>
	$( document ).ready(function() {
	$('.tp_alerta_border_${instanceId}').css('border-color','${bordColor!}');
	$('.tp_page_header_${instanceId}').css('background-color', '${bordColor!}');
	$('.tp_button_veja_mais_${instanceId}').css('border-color', '${bordColor!}');
	$('.tp_button_veja_mais_${instanceId}').css('background-color', '${bordColor!}');	
	
});
</script>