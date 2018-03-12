<div id="calendar_${instanceId}"
	class="super-widget wcm-widget-class fluig-style-guide tp_alerta_border tp_alerta_border_${instanceId} calendario_tp fonte-calibri"
	data-params="calendar.instance({formid: '${formid!}', group: '${group!}', viewMode: true})">

	
       <div class="fs-overflow-hidden fs-xs-space tp_page_header tp_page_header_${instanceId} tp-header-calendar">
       	

     		<h2 class="panel-title fs-sm-space tp-title-calendario">
     			<span class="icone-topo-calendario fluigicon fluigicon-calendar fluigicon-md"></span>
         		<strong class="fs-text-capitalize subtitleCalendar"></strong>
         	</h2>
       </div>
	
	<div class="panel panel-default panelWrapper">
		<div id="menu-botoes" class="menu-botoes">
		
        	<div class="btn-group fs-float-right fs-xs-space">
                <button type="button" class="btn btn-default" title="Anterior" data-currentdataprev>
                    <span class="fluigicon fluigicon-chevron-left iconColor"></span>
                </button>
                <button type="button" class="btn btn-default" title="Próximo" data-currentdatanext>
                    <span class="fluigicon fluigicon-chevron-right iconColor"></span>
                </button>
            </div>

         	<div class="fs-float-right fs-xs-space">
	        	<button type="button" class="btn btn-default" title="Hoje" data-currentdatatoday>
	        		<span class="fluigicon fluigicon-home iconColor"></span>
	       		</button>
       		</div>

          	<div id="addeventmodal" class="fs-float-right fs-xs-space fs-display-none ">
	        	<button type="button" class="btn btn-default iconColor" title="Adicionar evento" data-addeventmodal>
	                <span class="fluigicon fluigicon-plus iconColor"></span>
	            </button>
            </div>
		</div>
		
        <div id="calendar">
        	
        </div>

        <div id="footer-calendario" class="panel-footer tp_button_veja_mais tp_button_veja_mais_${instanceId} footerCalendar">
        	<div id="botoes-calendario" class="btn-group">
		        <button type="button" class="btn btn-default" data-changeviewtomonth>Mês</button>
		        <button type="button" class="btn btn-default" data-changeviewtoweek>Semana</button>
		        <button type="button" class="btn btn-default" data-changeviewtoday>Dia</button>
			</div>
        </div>
    </div>
</div>

<script type="text/javascript">
	$('.tp_alerta_border_${instanceId}').css('border-color', '${bordColor!}');
	$('.tp_page_header_${instanceId}').css('background-color', '${bordColor!}');
	$('.tp_button_veja_mais_${instanceId}').css('background-color', '${bordColor!}');
</script>
