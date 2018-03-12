var EcmRest = function() {
	var defaultObj = {
		"companyId" : 1,
		"documentId" : 0,
		"version" : 1000,
		"parentDocumentId" : 27,
		"privateDocument" : false,
		"manualVersion" : false,
		"documentDescription" : "",
		"cardDescription" : "event",
		"publisherId" : "bruno.bulnes",
		"inheritSecurity" : true,
		"inheritApprovers" : false,
		"uploadFolder" : WCMAPI.getServerURL() + "/webdesk/Upload",
		"deleteUploadFiles" : true,
		"documentType" : "5",
		"infGeralVO" : null,
		"approved" : false,
		"securityPermissionVOs" : null,
		"securityRestrictionVOs" : null,
		"publisherApproverVOs" : null,
		"activeApproverTab" : false,
		"relatedDocumentVO" : null,
		"principalFileName" : "",
		"hasParentApprover" : false,
		"attachments" : [],
		"allocatedPK" : null,
		"editableDocumentData" : "",
		"saveDraft" : false,
		"userSecurityLevel" : 3,
		"defaultPropertyVO" : null,
		"ckbDefaultPropertyVO" : null,
		"adminUser" : true,
		"phisicalFile" : "http://poc.fluig.com:8083/webdesk/streamcontrol/?WDCompanyId=1&WDNrDocto=0&WDNrVersao=0&WDParentDocumentId=27&token=35a87d7b-60c3-461f-9be6-da91664ca225",
		"folderList" : null,
		"formData" : null,
		"attach" : null,
		"relatedFiles" : null,
		"rootPrivateFolder" : false,
		"tabActivated" : false,
		"metaListId" : 0,
		"cardFormData" : [{
				"name" : "event",
				"value" : "Teste"
			}, {
				"name" : "description",
				"value" : ""
			}, {
				"name" : "eventcolor",
				"value" : "#d6e9c6"
			}, {
				"name" : "responsable",
				"value" : ""
			}, {
				"name" : "startDate",
				"value" : ""
			}, {
				"name" : "startHour",
				"value" : ""
			}, {
				"name" : "endDate",
				"value" : ""
			}, {
				"name" : "endHour",
				"value" : ""
			}, {
				"name" : "documentId",
				"value" : ""
			}
		],
		"changeAllActiveCards" : false,
		"permissionType" : 0,
		"restrictionType" : 0,
		"uploadId" : null,
		"oldViewer" : true,
		"uploadUrl" : null,
		"imutable" : null,
		"hasPendentApprovals" : false,
		"datasetOfflineMobileVOs" : null
	};
	
	return {
		'saveNewCardItem': 'saveNewCardItem'
	};
};