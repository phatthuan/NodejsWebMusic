# Nodejs final project

## How to run this project

- Prequisites: Nodejs lts version or docker engine

- Clone this repo

1. With docker

- Run the following commands in `sources` directory to build docker image and container

```bash
docker build -t nodejs-final-project .

docker run --name nodejs-final-project -d -p 3000:3000 nodejs-final-project
```

- Open your browser and go to http://localhost:3000
- To stop the container

```bash
docker stop nodejs-final-project
```

- To rebuild the container you need to run again the docker build command

2. With nodejs
   > Note: You need to have nodejs lts version installed

- Run the following commands to install dependencies and run the project

```bash
npm install
npm start
```

- Open your browser and go to http://localhost:3000

## Notes

- The environment variables are in the config.env file and should not change unless you know what you are doing
- The account admin is created by default with the following credentials
- The following json format is the admin credentials to access this project
  ```json
  {
  	"email": "admin@gmail.com",
  	"password": "admin123"
  }
  ```
- The database is hosted in mongodb atlas and you can access it without the credentials
- In case, you want to use your own database, you need to change the connection string in the config.env file. Make sure to change the `DATABASE_URI` variable and the `DATABASE_PASSWORD` variable and do the following steps to import database:
  1. Download mongodb-database-tools (https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.7.0.zip)
  2. Unzip the file and access the bin folder
  3. Run the following command to import the database
  ```bash
  mongorestore --uri="<DATABASE_URI>" "<path-to-folder-database>"
  ```
  4. Replace the `<DATABASE_URI>` with your mongodb uri and the `<path-to-folder-database>` with the path to the folder database in the project. For example:
  ```bash
    mongorestore --uri=mongodb+srv://admin:admin@cluster0.osdgozj.mongodb.net/test D:\\Nodejs\\midterm\\database\\database\\zingmp3
  ```

## Testing

- To test the project you need to access the following url to get API in Postman

```bash
https://elements.getpostman.com/redirect?entityId=17521959-23d9b37a-9430-42a5-b886-04b05a977a84&entityType=collection
```
