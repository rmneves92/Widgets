<script src="/webdesk/vcXMLRPC.js"></script>

<#-- cria uma div para a classe wcm-widget-class -->
<div class="wcm-widget-class super-widget fluig-style-guide edit"
    id="menuoflinks_${instanceId}"
    data-params="menuoflinks.instance({instanceId: '${instanceId!}', menuIcon: '${menuIcon!'fluigicon-plus'}', menuColor: '${menuColor!'#e74c3c'}', fontColor: '${fontColor!'#ffffff'}', targetLink: '${targetLink!'_self'}', navbar: '${navbar!''}', navbarVerticalAlign: '${navbarVerticalAlign!''}', navbarSubMenuOpen: '${navbarSubMenuOpen!''}', viewMode: true, datasetName: '${datasetName!'menuoflinks'}', nrPasta: '${nrPasta!''}', folderId: '${folderId!''}'})">
	
	<div class="form-group">
		<label>${i18n.getTranslation('edit.form.menucolor.legend')}</label>
		<input type="color" name="menu-color" id="menu-color" class="form-control" value="${menuColor!'#e74c3c'}" />
		<p class="help-block">${i18n.getTranslation('edit.form.helpblock')}</p>
	</div>
	
	<div class="form-group">
		<label>${i18n.getTranslation('edit.form.fontcolor.legend')}</label>
		<input type="color" name="font-color" id="font-color" class="form-control" value="${fontColor!'#ffffff'}" />
		<p class="help-block">${i18n.getTranslation('edit.form.helpblock')}</p>
	</div>
	
	<!-- div class="form-group">
		<label>${i18n.getTranslation('edit.form.menu.icon.legend')}</label>
		<select name="menu-icon" id="menu-icon" class="selectpicker" data-width="100%"></select>
	</div-->
		
	<div class="form-group">
		<label>${i18n.getTranslation('edit.form.folderName.legend')}</label>
		<input type="text" name="nomePasta" id="nomePasta" data-nomepasta value = '${nomePasta!''}' readonly class="form-control" placeholder="${i18n.getTranslation('edit.form.selectfolderwindowtitle')}" />
		<input type="hidden" name="nrPasta" id="nrPasta" data-nrpasta value = '${nrPasta!''}' readonly />
		<input type="hidden" name="datasetName" id="datasetName" data-datasetName value = '${datasetName!'menuoflinks'}' readonly />
	</div>
		
	<div class="checkbox">
		<label>
			<input type="checkbox" name="navbar" id="navbar" <#if '${navbar!}' == "navbar">checked="checked"</#if> /> 
			${i18n.getTranslation('edit.form.navbar.legend')}
		</label>		
	</div>
	<div class="checkbox">
		<label>
			<input type="checkbox" name="navbarVerticalAlign" id="navbarVerticalAlign" <#if '${navbarVerticalAlign!}' == "topo">checked="checked"</#if> /> 
			${i18n.getTranslation('edit.form.navbar.verticalAlign')}
		</label>		
	</div>
	<!-- div class="checkbox">
		<label>
			<input type="checkbox" name="navbarSubMenuOpen" id="navbarSubMenuOpen" <#if '${navbarSubMenuOpen!}' == "mouseover">checked="checked"</#if> /> 
			${i18n.getTranslation('edit.form.navbar.navbarSubMenuOpen')}
		</label>		
	</div-->
	<!-- div class="checkbox">
		<label>
			<input type="checkbox" name="targetLink" id="targetLink" <#if '${targetLink!}' == "_blank">checked="checked"</#if> /> 
			${i18n.getTranslation('edit.form.link.legend')}
		</label>		
	</div-->
	
	<div class="form-group">
		<button class="btn btn-primary" data-save>${i18n.getTranslation('edit.form.save')}</button>
	</div>
</div>