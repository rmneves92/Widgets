var SocialFavorite = SuperWidget.extend({

	instanceId: null,
	aliasPage: null,
	datatable: null,
	iconic: false,

	actions: [{
		label: "Remover selecionados"
	}],

	init: function() {
		//Excepcionalmente foi adicionado esse bind para prevenir o comportamento
		//default de um link quando o mesmo é chamado dentro do datagrid...
		$('#socialfavorite_' + this.instanceId).on('click', 'a', function(ev) {
			ev.preventDefault();
		});

		if (this.iconic == false) {
			this.getList();
			this.events = [this.removeSelected];
			WCMAPI.addListener(this, 'favoriteAdded', this.getList);
			WCMAPI.addListener(this, 'favoriteRemoved', this.getList);
		} else {
			var self = this;
			WCMAPI.addListener(this, 'favoriteListRemoved', function(msg, list) {
				if ($.inArray(this.aliasPage, list) != -1) {
					var el = self.DOM.children(".unfavorite-it");
					el.hide();
					el.removeAttr('disabled');
					el.siblings('.favorite-it').show();
				}
			});
		}
	},

	bindings: {
		local: {
			'favorite-link-user': ['click_linkSocial'],
			'favorite-it': ['click_favorite'],
			'unfavorite-it': ['click_unfavorite'],
			'favorite-filter': ['change_filter'],
			'favorite-filter-grid': ['change_filterGrid']
		}
	},

	translate: {
		USER: "Usuário",
		COMMUNITY: "Comunidade"
	},

	filter: function(el, ev) {
		var socialType = $(el).val();
		var params = {
			'aliasPage': this.aliasPage,
			'socialType': socialType
		};
		WCMAPI.convertFtlAsync('socialfavorite', 'view.ftl', JSON.stringify(params), function(data) {
			$(".widget-favorite").replaceWith(data);
		});
	},

	linkSocial: function(el, ev) {
		var socialAlias = $(el).data('social-alias');
		socialGlobal.showSocial(socialAlias);
	},

	favorite: function(el, ev) {
		var socialAlias = $(el).data('social-alias');
		$(el).attr('disabled', 'disabled');
		this.rest(SocialAPI.SocialFavoriteService.ADD, [socialAlias], function(data) {
			$(el).hide();
			$(el).removeAttr('disabled');
			$(el).siblings('.unfavorite-it').show();
			WCMAPI.fireEvent('favoriteAdded', socialAlias);
		}, function(error) {
			$(el).removeAttr('disabled');
			if (error.status == "403") {
				FLUIGC.toast({
					message: "Este recurso não pode ser marcado como favorito pois não pertence a mesma nuvem de relacionamento.",
					type: 'warning'
				});
			} else {
				FLUIGC.toast({
					message: "Erro ao adicionar aos favoritos.",
					type: 'danger'
				});
			}
		});
	},

	unfavorite: function(el, ev) {
		var socialAlias = $(el).data('social-alias');
		$(el).removeAttr('disabled');
		this.rest(SocialAPI.SocialFavoriteService.REMOVE, [socialAlias], function(data) {
			$(el).hide();
			$(el).removeAttr('disabled');
			$(el).siblings('.favorite-it').show();
			WCMAPI.fireEvent('favoriteRemoved', socialAlias);
		}, function(error) {
			$(el).removeAttr('disabled');
			FLUIGC.toast({
				message: "Erro ao remover dos favoritos.",
				type: 'danger'
			});
		});
	},

	getList: function() {
		this.buildGrid();
		this.loadGrid();
	},

	// jqgrid: funcao que estara no onclick de cada link do menu acima
	// do grid
	buttonsEvent: function(key) {
		this.events[key].call(this);
	},

	buildGrid: function() {

		// Se o grid já foi construido, termina a execução
		if (this.datatable) {
			return;
		}

		// nome da função para os links do menu
		var buttonsEvent = this.DOM[0].id + '.buttonsEvent';

		var self = this;

		// objeto literal com a configuração inicial
		var cfg = {
			idDivGrid: "#social-favorites-grid", // id do table
			buttons: self.actions, // lista com ações do menu
			buttonsEventFunction: buttonsEvent, // nome da função de
			// cada link do menu
			idDivButtons: "#social-favorites-buttons" // id da área do
		// menu acima do
		// grid
		};

		cfg.obj = {
			datatype: 'local', // tipo de dado esperado pelo datatable
			colNames: ["", "", "Nome", "Tipo"], // nomes das
			// colunas do
			// grid
			colModel: [ // modelo de colunas
			{
				name: 'iconPath',
				index: 'iconPath',
				width: 2,
				sortable: false
			}, {
				name: 'thumb',
				index: 'thumb',
				width: 10,
				sorttype: 'string',
				sortable: false,
				title: false
			}, {
				name: 'name',
				index: 'name',
				width: 60,
				sorttype: 'string',
				search: false,
				sortable: true
			}, {
				name: 'socialType',
				index: 'socialType',
				width: 25,
				sorttype: 'string',
				search: false,
				sortable: true
			}],
			localReader: { // campo que representará o id de cada
				// registro
				id: "rowId"
			},
			pager: '#social-favorites-page', // paginação (se não
			// informar a tabela
			// fica sem paginação).
			sortable: false, // Deixa as colunas com drag e drop
			multiselect: true, // permite selecionar multiplas linhas
			forceFit: true, // força o grid a se redimensionar se
			// algo mudar
			height: '100%' // altura do grid
		};

		// cria o grid
		this.datatable = WCMC.datatable(cfg);

		// funções disparadas por eventos
		this.datatable.bind("datatable-loadComplete", function(val) {
		});

		this.datatable.bind("datatable-gridComplete", function(val) {
		});

		this.datatable.bind('datatable-loadError', function(a, b, c) {
		});

	},

	loadGrid: function() {

		var type = $("#social-favorites-type").val();

		var self = this;

		var drawRows = function(data) {
			var rows = data.content, row;

			// limpa os dados do grid antes de
			// populá-lo
			self.datatable.clearGridData();

			for ( var k in rows) {
				row = rows[k];

				self.datatable.addRow(row.id, {
					thumb: '<img width="24" src="/social/api/rest/social/image/thumb/' + row.alias + '" />',
					name: '<span class="favorite-user-link" data-favorite-link-user data-social-alias="' + row.alias
						+ '">' + row.name + '</span>',
					socialType: self.translate[row.socialType]
				});
			}

			// Faz um refresh do grid para exibir os
			// novos dados
			self.datatable.reloadGrid();
		}

		if (type == "ALL") {
			this.rest(SocialAPI.SocialFavoriteService.LIST, [], drawRows);
		} else {
			this.rest(SocialAPI.SocialFavoriteService.LISTBYTYPE, [type], drawRows);
		}
	},

	filterGrid: function() {
		this.loadGrid();
	},

	removeSelected: function() {

		socialGlobal.showLoading();

		var self = this;
		var alias = [];
		$('#social-favorites-grid input:checked.cbox').each(function() {
			var parent = $(this).parents('.ui-row-ltr:first');
			alias.push($('.favorite-user-link', parent).data('social-alias'));
		});

		this.rest(SocialAPI.SocialFavoriteService.REMOVELIST, [alias], function(data) {
			FLUIGC.toast({
				message: "Item(ns) removido(s) dos favoritos com sucesso.",
				type: 'success'
			});
			self.loadGrid();
			WCMAPI.fireEvent('favoriteListRemoved', alias);
		}, function(error) {
			FLUIGC.toast({
				message: "Erro ao remover dos favoritos.",
				type: 'danger'
			});
			self.loadGrid();
		});

		socialGlobal.hideLoading();
	}

});
