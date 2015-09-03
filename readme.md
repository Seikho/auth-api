# Longshot Authentication API

### Installation
As a dependency:
```
npm install ls-auth-api --save
```

As a standalone server:
```
git clone https://github.com/longshot-io/auth-api
```

### Usage
As a dependency:
```javascript
var Auth = require("ls-auth-api");
// Optionally, start the web API
authApi.startWebServer(1337);

authApi.login("username", "password");
```

As a standalone server:
```
// Example: npm start [portNumber]
npm start 8181
```

### API
#### Programmatic
User
```javascript
interface User {
	username: string;
	password: string;
	enabled?: number; // Optional
}
```

##### Registration
*register(...)*: Returns a promise containing the new user ID
```javascript
Auth.register(user: User): Promise<number>;
```

##### Authentication
*login(...)*: Returns a promise containing the new JWT token or gets rejected
```javascript
Auth.login(username: string, password: string): Promise<string>;
```

##### Token/Session Verification
*verify(...)*: Returns a promise that resolves a boolean. True if the token is valid
```javascript
Auth.verify(token: string): Promise<boolean>;
```

##### Web Server Initialization
*startWebServer(...)*: Returns void
```javascript
Auth.startWebServer(portNumber: number): void;
```

### HTTP Endpoints
##### POST /login
Accepts PAYLOAD:
`username: string`
`password: string`

##### POST /register
Accepts PAYLOAD:
`username: string`
`password: string`

##### POST /verify
Accepts PAYLOAD:
`token: string`

### License
MIT