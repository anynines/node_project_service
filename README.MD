# Assumption
A psql db runs under hostname dockerhost with a database called projects

# Run
* Start a PostgreSQL server
* Within the PostgreSQL server, create a database named projects
* `npm install`
* `npm start`

## API Usage

### Say hello
`curl -X GET http://localhost:3000/hello`

### Create projects table
`curl -X POST http://localhost:3000/create_table`

### Add project entry
`curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"projectname": "cf-training"}' http://localhost:3000/project`
