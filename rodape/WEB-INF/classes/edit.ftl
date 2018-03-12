<div id="Rodape_${instanceId}" class="wcm-widget-class super-widget fluig-style-guide"	data-params="Rodape.instance()">
     <div class="container-fluid">	
		<div class="row">
			<div class="col-xs-12">
				<form role="form">
				    <div class="form-group">
				    	<h3>Informações</h3>
				    	<table class="table">
				    		<thead>
				    			<tr>
				    				<th>Cor</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    			<tr>
				    				<td><input type="text" class="form-control" id="footerColor_${instanceId}" value="${footerColor!}" placeholder="" value=""/></td>
				    			</tr>
				    		</tbody>
				    	</table>
				    	<table class="table">
				    		<thead>
				    			<tr>
				    				<th>Texto</th>
				    				<th>Link</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    			<tr>
				    				<td><input type="text" class="form-control" id="infoText_${instanceId}" value="${infoText!}" placeholder="" value=""/></td>
				    				<td><input type="text" class="form-control" id="infoLink_${instanceId}" value="${infoLink!}" placeholder="" value=""/></td>
				    			</tr>
				    		</tbody>
				    	</table>
				    	
				    	<h3>Links</h3>
				   		<table class="table">
					    	<thead>
					      		<tr>
					        		<th>Texto</th>
					        		<th>Link</th>
					        		<th>Ícone</th>
					      		</tr>
					    	</thead>
						    <tbody>
						      	<tr>
						       		<td><input type="text" class="form-control" id="footerText0_${instanceId}" value="${footerText0!}" placeholder="" value=""/></td>
						       		<td><input type="text" class="form-control" id="footerLink0_${instanceId}" value="${footerLink0!}" placeholder="" value=""/></td>
						       		<td><select class="form-control footerColorIcon" id="footerIcon0_${instanceId}"></select></td>
						      	</tr>
						      	<tr>
						      		<td><input type="text" class="form-control" id="footerText1_${instanceId}" value="${footerText1!}" placeholder="" value=""/></td>
						      		<td><input type="text" class="form-control" id="footerLink1_${instanceId}" value="${footerLink1!}" placeholder="" value=""/></td>
						      		<td><select class="form-control footerColorIcon" id="footerIcon1_${instanceId}"></select></td>
						      	</tr>
						       	<tr>
						       		<td><input type="text" class="form-control" id="footerText2_${instanceId}" value="${footerText2!}" placeholder="" value=""/></td>
						       		<td><input type="text" class="form-control" id="footerLink2_${instanceId}" value="${footerLink2!}" placeholder="" value=""/></td>
						      		<td><select class="form-control footerColorIcon" id="footerIcon2_${instanceId}"></select></td>
						      	</tr>
						       	<tr>
						       		<td><input type="text" class="form-control" id="footerText3_${instanceId}" value="${footerText3!}" placeholder="" value=""/></td>
						       		<td><input type="text" class="form-control" id="footerLink3_${instanceId}" value="${footerLink3!}" placeholder="" value=""/></td>
						      		<td><select class="form-control footerColorIcon" id="footerIcon3_${instanceId}"></select></td>
						      	</tr>
						       	<tr>
						       		<td><input type="text" class="form-control" id="footerText4_${instanceId}" value="${footerText4!}" placeholder="" value=""/></td>
						       		<td><input type="text" class="form-control" id="footerLink4_${instanceId}" value="${footerLink4!}" placeholder="" value=""/></td>
						      		<td><select class="form-control footerColorIcon" id="footerIcon4_${instanceId}"></select></td>
						      	</tr>
						      	
						    </tbody>
					  </table>
				    </div>
				</form>
			</div>
		</div>
		
		<div class="form-group">
	    	<div class="text-right">
	   			<button type="button" class="btn btn-primary" data-save-settings>Salvar</button>
		   	</div>
		</div>
	</div>
</div>
