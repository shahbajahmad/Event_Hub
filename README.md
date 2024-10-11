

### General Project README

**Filename**: `README.md`


# EventHub Project

EventHub is a web application that allows users to create, manage, and attend events. It consists of a frontend built with modern JavaScript frameworks and a backend powered by Node.js and Express. The app is integrated with MongoDB Atlas for managing event data.

## Project Structure

- **EventHub Frontend**: Contains the frontend source code.
- **EventHub Backend**: Contains the backend source code.
- **MongoDB Atlas**: Used for the database (no local MongoDB instance is required).

## Prerequisites

Before you can run this project, ensure the following software is installed on your system:

- Node.js (version 14 or later)
- Docker and Docker Compose (if running using Docker)

## Running the Project Locally

### Option 1: Running with Docker Compose

1. Ensure that Docker and Docker Compose are installed.
2. In the root directory of the project, run the following command to start the services:
    ```bash
    docker-compose up --build
    ```
3. The backend will be available at [http://localhost:3000](http://localhost:3000) and the frontend at [http://localhost:5173](http://localhost:5173).

### Option 2: Running Without Docker

You can manually run the frontend and backend without Docker. Follow the instructions in their respective directories:

- [EventHub Frontend README](./EventHub%20Frontend/README.md)
- [EventHub Backend README](./EventHub%20Backend/README.md)

## MongoDB Atlas Configuration

Ensure you have a MongoDB Atlas cluster and update the backend environment with the MongoDB connection string.

Example `.env` file in `EventHub Backend`:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
