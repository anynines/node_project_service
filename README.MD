# assumption 
a mysql db runs under hostname dockerhost with a database called projects

## run
* `docker pull mysql`
* `docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql`
* create a database called projects
* `npm install`
* `npm start`

## Endpoints

### say hello 
`curl -X GET http://localhost:3000/hello`

### create projects table
`curl -X POST http://localhost:3000/create_table`

### add project entry
`curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"projectname": "blaaaaa"}' http://localhost:3000/project`
