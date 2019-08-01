# voting_system
This is a simple voting system which allow user to create and vote for campaign by front-end and back-end.  

### Config
#### Development config
Copy and update parameters in `config/development.example.js` to `config/development.js`  
Default development configs provided can be used with `docker-compose` 
#### Production config
Copy and update parameters in `config/production.example.js` to `config/production.js`  
You can leave an empty module exports if you don't need a production config  
```module.exports = {};```

### Usage
1. Startup stacks in local environment
```
$ docker-compose up -d
```
2. Install node modules
```
$ npm install
```
3. Start the process (Node 8+)
```
$ NODE_ENV=[your_environment] npm start
```
Default config endpoints:  
Front-end site: [http://localhost:1234/campaigns](http://localhost:1234/campaigns)  
Back-end docs: [http://localhost:1234/docs](http://localhost:1234/docs)
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
### TODO
- Scalable architecture
- Display campaigns within start/end time and order by total number of votes.
- Display most recent ended campaign afterward 
