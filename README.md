# Backend
An example of task upload and resize images
#### Requirements
* docker
* docker-compose
* nodejs >= 14 
#### Installation
> docker-compose -f docker-compose-dev.yml up -d
### Testing
> npm run test
#### OpenApi Specification (OAS)
> url: [http://localhost:3001/docs](http://localhost:3001/docs)

In the Swagger, you can find the specifications for the 2 published endpoints of the API, and you can also directly test these endpoints from there.
* /task
* /task/:taskId

The database (PostgreSQL) and the backend (Node.js) are deployed in Docker containers.



