declare module App {

	function login(username: string, password: string): Promise<string>;
	function register(user: User): Promise<number>;
	function verify(token: string): Promise<boolean>;

	interface User {
		displayName: string;
		username: string;
		email: string;
		password: string;
		enabled: number;
		company?: string;
	}

	interface Login {
		username: string;
		password: string;
	}
	
	interface Payload {
		guid: string;
	}
	
	interface Session {
		token: string;
		username: string;
		guid: string;
	}
}
