# GraphQL Mock Server

This project serves as the GraphQL Mock Backend for the Admin Portal. It emulates a basic user management system with login authentication, role-based access control, and user data fetching. The server is designed to run locally and must be active when testing or developing the admin portal frontend.

## Table of Contents
- Tech Stack
- Core Features
- Mock APIs
- Setup Instructions

## Tech Stack:
- GraphQL
- Apollo Server (Express Integration)
- Node.js
- In-memory mock data
- JWT for authentication (mocked)

## Core Features:
This mock server fully supports all frontend integration needs for the Admin Portal project.

1. Authentication:
   - Login API
   - Accepts email and password
   - Returns a JWT token (mocked)
   - Validates credentials from the in-memory users list

2. User Management:
   - Fetch All Users
   - GraphQL Query: **users**
   - Returns a list of mock users with fields:
     - id
     - name
     - email
     - role

3. Role-based Restrictions:
   - Three predefined roles: Administrator, User, and Unknown.
   - Frontend can use this role to enable/disable UI features like "+ Create User".

5. Unauthorized Access Handling:
  - If an invalid username or password is detected in a request, the server returns appropriate error messages to simulate real-world APIs.

## Mock APIs:
1. Login Mutation -
   
```
mutation {
  login(email: "", password: "") {
    token
    user {
      id
      name
      email
      role
    }
  }
}
```
     
2. Get all Users Query - 

```
query {
    users {
      id
      name
      email
      role
    }
  }
```
## Setup Instructions
To set up the project on your local machine, follow these steps:

1.**Clone the admin repository:**
```bash
git clone https://github.com/akashashokkondekar/mock-graphql-server.git
cd <project-folder>
```

2.**Pull all branches** from the origin:
   ```bash
   git fetch --all
   ```

3.**Switch to the Deployment/Prod or main branch:**
  ```bash
  git checkout Deployment/Prod
  ```
or
```bash
git checkout main
```

4.**Install dependencies:** Ensure you are using **Node.js v18.20.0** and **npm v10.5.0** or above versions. (Use nvm or a similar version manager if needed).
  ```bash
  npm install
  ```
5.**Run the development server:**
```bash
  npm run dev
  ```
The application should now be running at **http://localhost:4000/**.

6.**Set up Admin Portal:** After running the server, now you need to set up the Admin Portal to perform various operations using these APIs. clone the Admin Portal repository [Link: https://github.com/akashashokkondekar/itc-compliance-admin.git] and follow its setup instructions.
