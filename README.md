# 42_Camagru
This project aims to create a small Instagram-like site allowing users to create and share photo-montages.

## Example

## Expected Result

## Technical Stack

Front-End: 
- HTML
- TailwindCSS Framework
- Javascript vanilla

Back-End:
- NodeJS
- Express
- EJS Template Engine

DataBase:
- MongoDB Atlas (NoSQL - Cloud)
- ODM FREE (NO Mongoose)

Containerisation:
- Docker

## Docker
This project use Docker for containerisation.  
Docker need to be installed on your system: https://www.docker.com/  

## Start
Start the Backend container.
```
docker-compose up
```

## Stop
Stop the Backend container.
```
docker-compose down
```

## Clean
Delete the Backend Container, the Camagru Image and the associated Volume.  
It will not affect the source code.
```
docker-compose down -v
```
```
docker image prune -a
```
```
docker volume prune
```

## Usage
Open a web browser then go to: http://localhost:3000

## MAN (complete user manual)
The man can be found in the "backend" folder.  

## Screenshots


More screenshots are availables in the "screens" folder.

## Notes
You need to create the "env" variables to start the container.  See an example below:  

The database is hosted on the cloud (Mongo Atlas) and its access is protected by IP. Contact me to add your IP to the whitelist.  

## Keywords
User management  
Permission management  
Data validation  
Registration validation  
Web security  
Mailing  
Micro-Framework  
Server side rendering  
Template engines  
MVC Structure (Model View Controller)  
NOSQL Database  
Cloud Database  
Asynchronous requests  
Back-End  
Containers  
