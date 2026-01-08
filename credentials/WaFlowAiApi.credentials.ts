import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WaFlowAiApi implements ICredentialType {
	name = 'waFlowAiApi'; // Nombre interno único
	displayName = 'WaFloW.ai API'; // Nombre que verá el usuario
	documentationUrl = 'https://waflow.ai'; // Enlace a la doc (opcional)

	// Definición de los campos que pedirá el formulario
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true }, // Oculta los caracteres
			default: '',
			required: true,
		},
		{
			displayName: 'Subaccount ID',
			name: 'subaccountId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Allowed HTTP Request Domains',
			name: 'allowedDomains',
			type: 'string',
			default: '',
			placeholder: 'e.g. api.waflow.ai',
			description: 'Comma separated list of allowed domains',
		},
	];

	// Cómo se usan estas credenciales en las llamadas HTTP
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				// Ejemplo: Authorization: Bearer <API_KEY>
				Authorization: '=Bearer {{$credentials.apiKey}}',
				// Ejemplo: X-Subaccount-Id: <SUBACCOUNT_ID>
				'X-Subaccount-Id': '={{$credentials.subaccountId}}',
			},
		},
	};

	// (Opcional) Configuración para el botón "Test Connection"
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.waflow.ai', // Ajusta esto a la URL real
			url: '/user/me', // Ajusta a un endpoint de prueba real
			method: 'GET',
		},
	};
}