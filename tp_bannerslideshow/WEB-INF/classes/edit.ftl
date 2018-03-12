<div 
	id="bannerslideshow_${instanceId!}" 
	class="fluig-style-guide wcm-widget-class super-widget"
	data-params="bannerSlideShow.instance({'instanceId': '${instanceId!}', 'editMode': true, 'folder': '${folder!}', 'folderNumber': '${folderNumber!}', 'type': '${type!}', 'fx': '${fx!}', 'random': '${random!}', 'loop': '${loop!}', 'mark': '${mark!}', 'time': '${time!}', 'transition': '${transition!}', 'linkimage': '${linkimage!}', 'showlastimage': '${showlastimage!}', 'marklocation': '${marklocation!}', 'title': '${title!}', 'titleFontColor': '${titleFontColor!}', 'titleBackgroundColor': '${titleBackgroundColor!}', 'localeon': '${localeon!}'})">
	
    <div class="panel panel-default">
        <div class="panel-body">
            <!-- pasta -->
            <div class="form-group">
                <label for="folder">${i18n.getTranslation('bannerslideshow.folder')}</label>
            
                <div class="input-group">
                    <input type="text" name="folder" id="folder" value="${folder!''}" class="form-control" data-folder>
                    <div class="input-group-addon">
                        <span class="fluigicon fluigicon-search"></span>
                    </div>
                </div>
                            
                <input type="hidden" name="folderNumber" id="folderNumber" value="${folderNumber!''}">
            </div>
            
            <!-- opcoes extras -->
            <div class="panel-group" id="bannerslideshow_accordion_${instanceId!}">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#bannerslideshow_accordion_${instanceId!}" href="#collapseZero_${instanceId!}">
                                <span class="fluigicon fluigicon-plus"></span> 
                                ${i18n.getTranslation('bannerslideshow.configurations.default')}
                            </a>
                        </h4>
                    </div>
                    <div id="collapseZero_${instanceId!}" class="panel-collapse collapse">
                        <div class="panel-body">
                            <!-- tipo de arquivo -->
                            <div class="form-group">
                                <label for="type">${i18n.getTranslation('bannerslideshow.type')}</label>				
                                <select name="type" id="type" class="form-control">
                                    <!-- option value="all" <#if type! == 'all'>selected</#if>   >${i18n.getTranslation('bannerslideshow.type.option.all')}</option -->
                                    <option value="2"   <#if type! == '2'>selected</#if>   >${i18n.getTranslation('bannerslideshow.type.option.images')}</option>
                                    <!-- option value="3"   <#if type! == '3'>selected</#if>   >${i18n.getTranslation('bannerslideshow.type.option.videos')}</option -->
                                </select>
                            </div>
                            
                            <!--  tipo de transicao -->
                            <div class="form-group">
                                <label for="fx">${i18n.getTranslation('bannerslideshow.fx')}</label>
                                <select name="fx" id="fx" class="form-control">								
                                    <option value="fade" <#if fx! == 'fade'>selected</#if> >fade</option>
                                    <option value="fadeout" <#if fx! == 'fadeout'>selected</#if> >fadeout</option>
                                    <option value="flipHorz" <#if fx! == 'flipHorz'>selected</#if> >flipHorz</option>
                                    <option value="flipVert" <#if fx! == 'flipVert'>selected</#if> >flipVert</option>
                                    <option value="scrollHorz" <#if fx! == 'scrollHorz'>selected</#if> >scrollHorz</option>
                                    <option value="scrollVert" <#if fx! == 'scrollVert'>selected</#if> >scrollVert</option>
                                    <option value="shuffle" <#if fx! == 'shuffle'>selected</#if> >shuffle</option>
                                    <option value="tileBlind" <#if fx! == 'tileBlind'>selected</#if> >tileBlind</option>
                                    <option value="tileSlide" <#if fx! == 'tileSlide'>selected</#if> >tileSlide</option>
                                </select>
                            </div>
                            
                            <!-- tempo de cada slide -->
                            <div class="form-group">
                                <label for="transition">${i18n.getTranslation('bannerslideshow.transition')}</label>
                                <input type="number" class="form-control" name="transition" id="transition" start="500" min="500" step="100" value="${transition!'5000'}">
                            </div>
                            
                            <!--  tempo de transicoes -->
                            <div class="form-group">
                                <label for="time">${i18n.getTranslation('bannerslideshow.speed')}</label>
                                <input type="number" class="form-control" name="time" id="time" start="6000" min="1000" step="1000" value="${time!'6000'}">
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#bannerslideshow_accordion_${instanceId!}" href="#collapseOne_${instanceId!}">
                                <span class="fluigicon fluigicon-plus"></span> 
                                ${i18n.getTranslation('bannerslideshow.configurations.title')}
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne_${instanceId!}" class="panel-collapse collapse">
                        <div class="panel-body">
                            <!-- exibir marcadores -->
                            <div class="form-group">
                                <label for="mark">${i18n.getTranslation('bannerslideshow.mark')}</label>
                                <select name="mark" id="mark" class="form-control">
                                    <option value="yes" <#if mark! == 'yes'>selected</#if> >${i18n.getTranslation('bannerslideshow.mark.yes')}</option>
                                    <option value="no"  <#if mark! == 'no'>selected</#if>  >${i18n.getTranslation('bannerslideshow.mark.no')}</option>
                                </select>
                            </div>
                            
                            <!-- posicao do marcador -->
                            <div class="form-group" style="display: none;">
                                <label for="marklocation">${i18n.getTranslation('bannerslideshow.marklocation')}</label>
                                <select name="marklocation" id="marklocation" class="form-control">
                                    <option value="bottom" <#if marklocation! == 'bottom'>selected</#if> >${i18n.getTranslation('bannerslideshow.marklocation.bottom')}</option>
                                    <option value="top"    <#if marklocation! == 'top'>selected</#if>    >${i18n.getTranslation('bannerslideshow.marklocation.top')}</option>
                                </select>
                            </div>
                            
                            <!-- tipo do marcador -->
                            <div class="form-group">
                                <label for="marktype">${i18n.getTranslation('bannerslideshow.marktype')}</label>
                                <select name="marktype" id="marktype" class="form-control">
                                    <option value="disc"   <#if marktype! == 'disc'>selected</#if>   >${i18n.getTranslation('bannerslideshow.marktype.disc')}</option>
                                    <option value="number" <#if marktype! == 'number'>selected</#if> >${i18n.getTranslation('bannerslideshow.marktype.number')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#bannerslideshow_accordion_${instanceId!}" href="#collapseTwo_${instanceId!}">
                                <span class="fluigicon fluigicon-plus"></span> 
                                ${i18n.getTranslation('bannerslideshow.imageConfigurations.title')}
                            </a>
                        </h4>
                    </div>
                    <div id="collapseTwo_${instanceId!}" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="linkimage">${i18n.getTranslation('bannerslideshow.hiperlink')}</label>
                                <select name="linkimage" id="linkimage" class="form-control">
                                    <option value="same"  <#if linkimage! == 'same'>selected</#if>  >${i18n.getTranslation('bannerslideshow.hiperlink.same')}</option>
                                    <option value="other" <#if linkimage! == 'other'>selected</#if> >${i18n.getTranslation('bannerslideshow.hiperlink.other')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <button type="button" class="btn btn-default" data-save>${i18n.getTranslation('bannerslideshow.save')}</button>
            </div>
        </div>
    </div>
</div>