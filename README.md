# 42_Camagru
This project aims to create a small Instagram-like site allowing users to create and share photo-montages.

## Expected result
- Create a website from scratch, reproduzing the concept of the famous app in a simplified version.  
![0e8c57af3170411681c65c0a9572daf8](https://user-images.githubusercontent.com/52746061/205192190-aa374336-2588-4912-859c-42125d200416.jpg)  
![Feed-por-ordem-cronologica](https://user-images.githubusercontent.com/52746061/205190718-b47a1c93-b13a-4201-afb4-285faad6ee9d.jpg)  

## Minimal requirements
- Users must create an account with a valid email, a password and a username of their choice.  
- Once connected, users can go to the "Editing" page to take photos with their webcam (upload is also possible) then add some funny stickers.  
![Screenshot 2022-12-20 at 20-02-36 camagru en pdf](https://user-images.githubusercontent.com/52746061/208756181-9461aa6d-a4c2-4ae9-bc3e-898e34c9a3b3.png)  
- The layout of the "Editing" page must include a header, a footer, a main section (displaying the webcam), a side section (displaying last pictures taken), as below:  
![Screenshot 2022-12-02 at 01-56-00 camagru en pdf](https://user-images.githubusercontent.com/52746061/205191086-b01a7ef1-ee52-42d7-862f-b926de75c88f.png)  
- The final picture must be created serverside.  
- All the user's photos are displayed in the homepage, also called "Gallery".  
- There is a pagination constraint for the Gallery with 5 user's pictures per page, but also infinite scrolling as a bonus.  
- The design for other parts of the website is completely free.  
- Users can also like and comment the photos.  
- The picture's author must receive a mail after a new comment. 
- The user's preference, like mails reception, can be edited.
- Users can edit their username, email and password (including password recovery).
- Once registrated, users must validate their account with a mail containing a unique link.
- The website must be completely responsive.  
- The whole website must be secured (unencrypted passwords, SQL injection, HTML/JS injection, XSS, upload bad content, etc.).  
- No one back-end framework is authorized for this project. Exception has been made for Express as it can be considered a (very) micro-framework.  
- No one front-end framework is authorized for this project. Exception has been made for the use of a CSS Framework (TailwindCSS in my case).  
- The choice of the database is completely free. ORM/ODM are not allowed for this project.  
- As usual, a lot of bonus functionalities has been added to the scope of the initial project. They are all described in the man file.  

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
- MongoDB Atlas (NoSQL - Cloud database)

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
