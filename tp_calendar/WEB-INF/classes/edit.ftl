<div id="calendar_${instanceId}" 
	class="super-widget wcm-widget-class fluig-style-guide edit fs-lg-space" 
	data-params="calendar.instance({formid: '${formid!}', group: '${group!}',editMode: true})">
	
	<div class="panel panel-default">
		<div class="panel-heading fs-cursor-move">
			<h3 class="panel-title">${i18n.getTranslation('application.title')}</h3>
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group">
						<label for="formid">Código do formulário da widget</label>
						<input type="text" id="formid" name="formid" class="form-control" value="${formid!}" />
					</div>
				</div>
					
				<div class="col-xs-12">
					<div class="form-group">
						<label for="group">Grupo administrador</label>
						<input type="text" name="group" id="group" class="form-control" value="" />
					</div>
				</div>
				
				<div class="col-xs-12">
					<div id="color_${instanceId}" class="form-group">
			          <label for="bordColor_${instanceId}">${i18n.getTranslation('tp_convenios.label.bordColor')}</label>
			          <input class="form-control" id="bordColor_${instanceId}" value="${bordColor!}" />
			        </div>
			    </div>
					
				<div class="col-xs-12">
					<button type="button" class="btn btn-default" data-saveform>Salvar</button>
				</div>
			</div>
		</div>
	</div>
	
	
</div>