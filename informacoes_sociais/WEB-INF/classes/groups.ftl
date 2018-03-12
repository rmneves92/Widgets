<#attempt>

<form class="totvs-form" style="text-align: right;">
	<input type="text" id="search-group-input" placeholder="${i18n.getTranslation('filter')}" data-search-input-group />
</form>

<div id="social-community-group-buttons"></div>
<table id="social-community-group-grid"></table>
<div id="social-community-group-page"></div>

<form class="totvs-form form-inline" style="text-align: right;">
	<button type="button" class="totvs-btn-action small" data-send-input-group>${i18n.getTranslation('add')}</button>
	<button type="button" class="totvs-btn small" data-close-input-group>${i18n.getTranslation('close')}</button>
</form>

<#recover>
	<#include "/social_error.ftl">
</#attempt>