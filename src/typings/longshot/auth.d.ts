declare module "ls-auth-api" {
	function login(username: string, password: string): Promise<string>;
	function register(user: User): Promise<number>;
	function verify(token: string): Promise<boolean>;
	function startWebServer(port?: number): void;

	interface User {
		username: string;
		email: string;
		password: string;
		enabled?: number;
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
