<#attempt>

<div class="fluig-style-guide wcm-widget-class super-widget"
	id="socialtagscloud_${instanceId}"
	data-params="socialtagscloud.instance({mode:'edit',parentPageCode: '${parentPageCode!''}',community: '${community!''}', lastTagsDay: '${lastTagsDay!''}', bordColor: '${bordColor!''}'})">
	<script type="text/mustache" class="message-tagscloud">
		<div class="message-warning" id='msgtagscloud${instanceId}'>
			{{message}}
		</div>
	</script>
	
	<div id="message"></div>
	
	<div id='edit'>
		<form class="form-horizontal" role="form">
			<div class="panel panel-default">
				<div class="panel-body">
					<div id='optionsTagsCloud'>
		 				<div class="radio-inline">
	            			<input id="optGeneral" type="radio" name="optionCloud${instanceId}" value="optGeneral" data-option-cloud-radio>
	            			<label for="optGeneral">${i18n.getTranslation('option.general')}</label>
	        			</div>

           				<div class="radio-inline">
            				<input id="optCommunity" type="radio" name="optionCloud${instanceId}" value="optCommunity" data-option-cloud-radio>
            				<label for="optCommunity">${i18n.getTranslation('option.community')}</label>
           				</div>
           			</div>

					<div class="form-group" id='divCommunity'>
						<label for="community${instanceId}" class="col-md-4 control-label">Comunidade (alias)</label>
						<div class="col-md-8">
				        	<input type="text" class="form-control" id="community${instanceId}" data-community data-btn-save-disable 
				        	placeholder="${i18n.getTranslation('msg.find.community')}" />
				    	</div>
				    </div>
				    
				    <div class="form-group">
						<!-- label for="lastTagsDay${instanceId}" class="col-md-4 control-label">${i18n.getTranslation('tags.period.days')}</label-->
						<label for="lastTagsDay${instanceId}" class="col-md-4 control-label">Período em dias</label>
						<div class="col-md-4">
				        	<input type="number" min="0" step="1" max="99999" class="form-control only-numbers" id="lastTagsDay${instanceId}" data-last-tags-day>
				    	</div>
				    </div>
				    
				    <div class="col-xs-12">
						<div id="color_${instanceId}" class="form-group">
				        	<label for="bordColor_${instanceId}">Selecione a cor</label>
				        	<input class="form-control" id="bordColor_${instanceId}" value="${bordColor!}" data-bordColor/>
			        	</div>
			        </div>
				    
				    <div class="form-group">
				    	<div class="col-md-8">
							<button type="button" class="btn btn-primary"
								id="btn-save${instanceId}" data-btn-save>Salvar
							</button>
				    	</div>
				    </div>
    			</div>
    		</div>
		</form>
	</div>
</div>
<#recover>
	<#include "/social_error.ftl">
</#attempt>
