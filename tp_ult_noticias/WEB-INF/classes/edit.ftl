<#if !newsSource??>
    <#assign newsSource = "#">
</#if>

<#if !numberOfArticles??>
    <#assign numberOfArticles = 5>
</#if>
<#if !orderByField??>
    <#assign orderByField = "documentid;desc">
</#if>

<#assign parameters = '{"newsSource": "${newsSource}", "numberOfArticles": "${numberOfArticles!5}", "orderByField": "${orderByField}"}'?html>

<div id="Alertas_${instanceId}" class="wcm-widget-class super-widget fluig-style-guide"	data-params="Alertas.instance(${parameters})">

    <div class="container-fluid">
		<div class="row">
			<div class="col-xs-12">
				<form role="form">
				    <div class="form-group">
				        <label for="formLink">${i18n.getTranslation('alertas.form.link')}</label><br>
				        <a data-form-link href="${newsSource!}" class="fs-word-break"></a>
				    </div>
				    <div class="form-group">
				        <label for="numberOfRecords">${i18n.getTranslation('alertas.register.limit')}</label>
				        <input type="number" class="form-control" id="numberOfArticles" placeholder="" value="${numberOfArticles}" data-number-of-articles>
				        <p class="help-block"><small>${i18n.getTranslation('alertas.register.limit.helper')}</small></p>
				    </div>
				    <div class="form-group">
				    	<label for="orderByField">${i18n.getTranslation('alertas.order.by')}</label>
					    <select class="form-control" id="orderByField">
							<option value="documentid;desc">${i18n.getTranslation('alertas.field.id')}</option>
							<option value="news_title;asc">${i18n.getTranslation('alertas.field.title.asc')}</option>
							<option value="news_title;desc">${i18n.getTranslation('alertas.field.title.desc')}</option>
							<option value="publishDate;asc">${i18n.getTranslation('alertas.field.publish.date.asc')}</option>
							<option value="publishDate;desc">${i18n.getTranslation('alertas.field.publish.date.desc')}</option>
						</select>
					</div>
					
					<div class="col-xs-12">
						<div id="color_${instanceId}" class="form-group">
				        	<label for="bordColor_${instanceId}">${i18n.getTranslation('tp_convenios.label.bordColor')}</label>
				        	<input class="form-control" id="bordColor_${instanceId}" value="${bordColor!}" />
			        	</div>
			        </div>
       
				    <div class="form-group">
				    	<div class="text-right">
				   			<button type="button" class="btn btn-primary" data-save-settings>${i18n.getTranslation('alertas.save.settings')}</button>
					   	</div>
					</div>
				</form>
			</div>
		</div>
	</div>

</div>
