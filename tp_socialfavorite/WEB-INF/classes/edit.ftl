<div id="WCMVPage_${instanceId?c}"
     		class="${pageSkin!'blue'} wcm-widget-class super-widget fluig-style-guide"
     				data-params="ViewPages.instance()">
		
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-xs-12">
					<div id="color_${instanceId}" class="form-group">
						<label for="bordColor_${instanceId}">${i18n.getTranslation('favoritos.label.bordColor')}</label>
						<input class="form-control" id="bordColor_${instanceId}" value="${bordColor!}" />
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-xs-12">
					<div class="text-right">
						<button type="button" class="btn btn-primary" data-save-settings>${i18n.getTranslation('favoritos.save.settings')}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

