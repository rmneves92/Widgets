<#attempt>

<form class="totvs-form" style="text-align: right;">
	<input type="text" id="search-user-input" placeholder="${i18n.getTranslation('filter')}" data-search-input-user />
</form>

<div class="card-list-user-paginations">
	<button type="button" class="btn-pagination btn-prev-page" data-user-pagination="prevPage">Preview page</button>
	<button type="button" class="btn-pagination btn-next-page" data-user-pagination="nextPage">Next page</button>
	<select data-itens-pagination name="list-user-itens">
		<option value="30">30</option>
		<option value="50">50</option>
		<option value="75">75</option>
		<option value="100">100</option>
	</select>
</div>

<div id="social-community-user-buttons"></div>
<table id="social-community-user-grid"></table>

<form class="totvs-form form-inline" style="text-align: right;">
	<button type="button" class="totvs-btn-action small" data-send-input-user>${i18n.getTranslation('add')}</button>
	<button type="button" class="totvs-btn small" data-close-input-user>${i18n.getTranslation('close')}</button>
</form>

<#recover>
	<#include "/social_error.ftl">
</#attempt>