# MailSync Engine

MailSync Engine is a backend application that synchronizes email data from Outlook using OAuth2 authentication and stores it in MongoDB. The application is built with TypeScript, Node.js, and Express, and uses Docker for containerization.

## Features

- OAuth2 authentication with Outlook.
- Synchronizes email data from Outlook to MongoDB.
- RESTful API endpoints for authentication and email synchronization.

## Requirements

- Node.js
- Docker
- Docker Compose
- Outlook OAuth2 credentials

## Setup and Installation

### 1. Setup

Clone the repo from the following:
```bash
git clone https://github.com/sammsulhoq/mailsync-engine
cd mailsync-engine
```

 Create a `.env` file in the root directory with the following content:
 ```bash
 PORT=5000
 OUTLOOK_CLIENT_ID=your_outlook_client_id
 OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
 CALLBACK_URL=http://localhost:5000/api/auth/callback
 MONGO_URI=mongodb://mongo:27017/mailsync
```
    
    
  Replace `your_outlook_client_id` and `your_outlook_client_secret` with your actual Outlook OAuth client ID and client secret.
  
### 2. Build and Start the Application
Use Docker Compose to build and start the application:
```bash
docker-compose up --build
```

This command will:
- Build the Node.js application and compile TypeScript files.
- Start the Node.js application and MongoDB services.


### 3. Access the Application
Once the containers are up and running, you can access the application at `http://localhost:5000`

## API Endpoints

### 1. POST /api/auth/login
Initiates the OAuth2 login process and generates a URL for users to log in with their Outlook account.
```bash
POST /api/auth/login
```

**Response:**
Redirects to the Outlook login page.

### 2. GET /api/auth/callback
Handles the callback from Outlook after a successful login, saves user details and access token, and returns a JSON response.
```bash
GET /api/auth/callback?code=<auth_code>
```

**Response:**
```js
{
  "message": "Authentication successful",
  "user": {
    "email": "user@example.com",
    "outlookId": "outlook_id",
    "localId": "local_id"
  }
}
```

### 3. POST /api/sync/emails
Synchronizes email data from Outlook to the local MongoDB database for the authenticated user.

**Request:**
```bash
POST /api/sync/emails
{
  "userId": "local_user_id"
}
```

**Response:**
```bash
200 OK
Email data synchronized successfully
```

## Running Locally
If you prefer running the application locally without Docker, follow these steps:
- Install Dependencies: `npm install`
- Compile TypeScript: `npm run build`
- Start Application: `npm start`

*Make sure you have a running MongoDB instance and update the `MONGO_URI` in the `.env` file accordingly.* 

## Testing the Application
You can use tools like Postman or cURL to test the API endpoints.

