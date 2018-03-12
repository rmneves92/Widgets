<script src="/webdesk/vcXMLRPC.js"></script>

<#-- cria uma div para a classe wcm-widget-class -->
<div class="fluig-style-guide wcm-widget-class super-widget"
	id="menuoflinks_${instanceId}"
	style="margin-bottom: -20px !important;"
    data-params="menuoflinks.instance({instanceId: '${instanceId!}', menuIcon: '${menuIcon!'fluigicon-plus'}', menuColor: '${menuColor!'#e74c3c'}', fontColor: '${fontColor!'#ffffff'}', targetLink: '${targetLink!'_self'}', navbar: '${navbar!''}', navbarVerticalAlign: '${navbarVerticalAlign!''}', navbarSubMenuOpen: '${navbarSubMenuOpen!''}', viewMode: true, datasetName: '${datasetName!'menuoflinks'}', nrPasta: '${nrPasta!''}', folderId: '${folderId!''}'})">
	
	<#if navbar == "navbar">
	
	<div class="tp-menu-navbar navbar-default" role="navigation" style="display: block">
	    <div class="container divMenuLinks">	 
	    	<div class="navbar-header">
	            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
	                <span class="sr-only">Toggle navigation</span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	            </button>
	        </div>       
	        <div class="collapse navbar-collapse">	   
	        	<ul class="nav navbar-nav navbar-left firstFontStyle" style="font-family: SancoaleSoftenedRegularItal;"></ul>
	        	<ul class="nav navbar-nav navbar-center firstFontStyle" style="font-family: SancoaleSoftenedRegularItal;"></ul>
	        	<ul class="nav navbar-nav navbar-right firstFontStyle" style="font-family: SancoaleSoftenedRegularItal;"></ul>
			</div><!--/.nav-collapse -->
	    </div>
	</div>
	
	<#else>
	
	<ol class="breadcrumb">
		<li>${i18n.getTranslation('view.breadcrumb.title')}</li>
	</ol>
	
	<div class="panel-group" id="menu_accordion"></div>
	
	</#if>
</div>

<script>
	$(document).ready(function(){
		$('.navbar-nav > li').css('float', 'left!important');
		
		
	});

</script>
