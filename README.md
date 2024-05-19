# HataraShift: Simple Shift Booking System

- Project done for skill assessment at Siga Infotech

HataraShift is a simple shift booking system created with MERN Stack in typescript.

User registration and login is required for any of the operations.

The user can create shifts, view available shifts, book a shift, view booked shifts, cancel their booking, etc.

## Instructions on how to run

### Backend

1. You should have nodejs and npm installed.

2. Clone the repo, go to backend folder.

3. Install all the dependencies with ```npm i```

4. Create a ```.env.backend``` file in ```/backend/config``` folder with the following information:

    ```ini
    PORT=3000 // Your desired port where server should listen
    MONGOURI="mongodb://localhost:27017/hatarashift" // either use the local MongoDB instance or use from atlas

    JWT_SECRET="YOURSECRET" // Your JWT Secret
    ```

5. After configuring environment variables, simply run the server by typing ```npm run dev```, or if you want to build
    the server, then type
    ```
    npm run build
    npm run start
    ```
    This will compile the typescript files into javascript and produce the output at ```./dist``` folder

    Now you can test the APIs with any API client tools such as Postman, Insomnia, etc.

## Frontend

![HataraShift Dashboard](./snaps/dashboard.png)

1. Go to ```/frontend``` folder and install the dependencies with ```npm i```

2. To run the frontend, simply type ```npm run dev``` or if you want to build
    the frontend for production, then type
    ```
    npm run build
    ```

3. To run the production build, you can use a simple file server like ```serve```
    Go to ```./dist``` folder and then:
    ```
    npm i -g serve
    serve -s -l 5173
    ```