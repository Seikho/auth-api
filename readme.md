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
var authApi = require("ls-auth-api");
authApi.startWebServer(1337);

authApi.login("username", "password");
```