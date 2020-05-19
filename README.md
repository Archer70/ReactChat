## ReactChat

#### Warning: This project is not ready for production use. It is for educational use only.

**Installation**  
Run yarn in the project root and frontend directories, to download dependencies.
```shell script
yarn
cd frontend
yarn
```

**Running**  
This app is run in two parts. You'll need to start both the backend socket, and the frontend dev server or build.

```shell script
yarn start # In project root, to start the socket.
cd frontend

yarn start # Opens the UI in the browser, at localhost:3000
# OR
yarn build # Builds to frontend/build directory.
```