declare module App {

	export interface User {
		displayName: string;
		username: string;
		email: string;
		password: string;
		enabled: number;
		company?: string;
	}

	export interface Login {
		username: string;
		password: string;
	}
}
