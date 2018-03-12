<div id="Parceiras_${instanceId?c}"
     		class="${pageSkin!'blue'} wcm-widget-class super-widget fluig-style-guide"
     				data-params="Parceiras.instance()">
		
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-xs-12">
					<div id="color_${instanceId}" class="form-group">
						<label for="bordColor_${instanceId}">${i18n.getTranslation('contatos.label.bordColor')}</label>
						<input class="form-control" id="bordColor_${instanceId}" value="${bordColor!}" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4">
					<div class="form-group">
						<label for="qtdRegistros_${instanceId}">Quantidade de Registros</label>
						<input class="form-control" id="qtdRegistros_${instanceId}" value="${qtdRegistros!}" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4">
					<div class="form-group">
						<label for="iconeParcerias_${instanceId}">URL do ícone</label>
						<input class="form-control" id="iconeParcerias_${instanceId}" value="${iconeParcerias!}" />
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-xs-12">
					<div class="text-right">
						<button type="button" class="btn btn-primary" data-save-settings>${i18n.getTranslation('contatos.save.settings')}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

