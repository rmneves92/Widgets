<div class="fluig-style-guide">
	<div class="form-horizontal fs-md-space col-xs-12 col-md-8" role="form">
	
 		
			<div class="row">
<!-- 
	
				<div class="col-xs-6">
				-->
					<div class="form-group">
				        <label for="event">Nome</label>
				        <input type="text" class="form-control" id="event" name="event" value="${event!}">
				        <!-- 
				        <p class="help-block">
				        	<input type="checkbox" name="publicEvent" id="publicEvent" value="true" <#if publicEvent! == "true">checked="checked"</#if> />
				        	<label for="publicEvent">Evento público</label>
				        </p>
				        -->
				    </div>
				    <!-- 
	
				</div>
				
				-->
				
			</div>
			
			<div class="row">
			<!-- 
	
				<div class="col-xs-6">
				-->
					<div class="form-group">
				    	<label for="description">Descrição</label>
				    	<textarea class="form-control" rows="8" name="description" id="description">${description!}</textarea>
				    	
				    	<select name="eventcolor" id="eventcolor" class="form-control">
							<option <#if eventcolor! == "#d6e9c6">selected="selected"</#if> value="#d6e9c6">#d6e9c6</option>
							<option <#if eventcolor! == "#bce8f1">selected="selected"</#if> value="#bce8f1">#bce8f1</option>
							<option <#if eventcolor! == "#faebcc">selected="selected"</#if> value="#faebcc">#faebcc</option>
							<option <#if eventcolor! == "#ebccd1">selected="selected"</#if> value="#ebccd1">#ebccd1</option>
							<option <#if eventcolor! == "#7ae7bf">selected="selected"</#if> value="#7ae7bf">#7ae7bf</option>
						</select>
				    </div>
				    
				  <!-- 
	  
				</div>
				-->
				
			</div>
	
	<!-- 
		    		    
		</div>
	

		<div class="col-xs-12">		
-->
			
			<!-- 
			
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group">
						<label for="participating_users">Usuários participantes</label>
						<input type="text" name="participatingUsers" id="participatingUsers" value="${participatingUsers!}" class="form-control" />
						
						<input type="hidden" name="hiddenParticipatingUsers" id="hiddenParticipatingUsers" value="${participatingUsers!}" />
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group">
						<label for="participating_groups">Grupos participantes</label>
						<input type="text" name="participatingGroups" id="participatingGroups" value="${participatingGroups!}" class="form-control" />
					</div>
				</div>
			</div>
			
			-->
			
			<div class="row">
			
			 <!-- 
				<div class="col-xs-6">
				-->
				
					<div class="form-group">
						<label for="responsable">Responsável</label>
						<input id="responsable" name="responsable" class="form-control" value="${responsable!}" type="text" />
					</div>
				<!-- 
		
				</div>
				-->
				
			</div>
		
			<div class="row">

				<!-- 
	
				<div class="col-xs-7">
				
				-->
					 <div class="form-group">
						<label for="startDate">Data inicial</label>
						<div class="input-group">
				            <input class="form-control" type="text" id="startDate" name="startDate" value="${startDate!}">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-calendar"></span>
				            </div>
				        </div>
					</div>
				
				<!-- 
	
				</div>
				-->
				
				<!-- 
	
				<div class="col-xs-5">
				
				-->
					<div class="form-group">
						<label for="startHour">Horário inicial</label>
						<div class="input-group">
				            <input class="form-control" type="text" id="startHour" name="startHour" value="${startHour!}">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-time"></span>
				            </div>
				        </div>
					</div>
					<!-- 
	
				</div>
				
				-->
			</div>
			
			<div class="row">
				
				<!-- 
	
				<div class="col-xs-7">
				
				-->
				
					<div class="form-group">
						<label for="endDate">Data final</label>
						<div class="input-group">
				            <input class="form-control" type="text" id="endDate" name="endDate" value="${endDate!}">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-calendar"></span>
				            </div>
				        </div>
					</div>
				<!-- 
				</div>
				-->
				
				<!-- 
				<div class="col-xs-5">
				-->
				
					<div class="form-group">
						<label for="endHour">Horário final</label>
						<div class="input-group">
				            <input class="form-control" type="text" id="endHour" name="endHour" value="${endHour!}">
				            <div class="input-group-addon">
				            	<span class="fluigicon fluigicon-time"></span>
				            </div>
				        </div>
					</div>
					<!-- 
				</div>
				-->
				
			</div>
		</div>
		
		</div>
	
	<input type="hidden" id="documentId" name="documentId" value="${documentId!}" />
	
</div>