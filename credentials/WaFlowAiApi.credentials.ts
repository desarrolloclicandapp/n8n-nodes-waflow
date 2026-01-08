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
			displayName: 'Agencyid/Locationid',
			name: 'subaccountId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.waflow.ai',
			placeholder: 'http://localhost:3000',
			description: 'The base URL of your WaFloW.ai installation',
			required: true,
		}
	];

	// Cómo se usan estas credenciales en las llamadas HTTP
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				'X-Subaccount-Id': '={{$credentials.subaccountId}}',
			},
		},
	};

	// (Opcional) Configuración para el botón "Test Connection"
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/agency/api-keys', // Valid endpoint we just created
			method: 'GET',
		},
	};
}