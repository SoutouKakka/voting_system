# voting_system
This is a simple voting system which allow user to create and vote for campaign by front-end and back-end.  
Front-end site: [http://localhost:1234/campaigns](http://localhost:1234/campaigns)  
Back-end docs: [http://localhost:1234/docs](http://localhost:1234/docs)
<details>
<summary><strong>Environment setup</strong></summary>

1. Install [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
2. Install node.js version 10
```
$ nvm install 10
```
</details>
<details>
<summary><strong>Install node modules</strong></summary>

1. Use NPM to install required node modules
```
$ npm install
```
</details>

### Usage
1. Copy `config/development.example.js` to `config/development.js`
2. Copy `config/production.example.js` to `config/production.js`
3. Fill in `config/development.js` with your MongoDB Atlas connection string and database name (you may change the server port also if you want)
4. Fill in `config/production.js` with your API server port
5. Start the process
```
$ NODE_ENV=[your_environment] npm start
```
### Logging
This service enables console logging for request and responses.  
You may use `bunyan` for betting formatted logs
```
$ npm install -g bunyan
```
Add `| bunyan` after `npm start`
```
$ npm start | bunyan
```
