# WTWR (What to Wear?): Back End Project 13

The back-end project is focused on creating a server for the WTWR application. This application is a weather-based clothing recommendation app. The main focus is to build a RESTful API, where users can get, add, delete, update clothing items.

- [Project Description](#project-description)
- [Project Features](#project-features)
- [Plan for Improving the Project](#plan-for-improving-the-project)
- [Running the Project](#running-the-project)
- [Deployment Instructions](#deployment-instructions)
- [System Requirements](#system-requirements)
- [Screenshots](#screenshots)
- [Demo Video](demo-video)

## Project Description

- Designing and building a RESTful API
- Set up validation and error handling
- Work with NoSQL databases such as MongoDb
- Secure password storing with hashing
- User authentication using JWT

<!-- The eventual goal is to create a server with an API and user authorization. -->

## Project Features

- Express.js - Web framework for building APIs
- Node.js - Server-side Javascript
- MongoDB - NoSQL database for data storage
- Mongoose - MongoDB object modeling
- ESLint - For code quality
- JWT - (JSON Web Tokens) used for secure user authentication

## Plan for improving the project

- Fix basic error responses using custom error middleware to achieve more informative user feedback
- Fix missing security headers using Helmet middlware vulnerabilities to achieve better protection against XSS

## Deployment Instructions

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/samjamhas10/se_project_express.git
   ```

2. Navigate to project directory:

   `cd se_project_express`

3. Install dependencies

   `npm install`

4. Launch the server

   `npm run start`

5. launch the server with the hot reload feature

   `npm run dev`

## System Requirements

- Node.js: v23.11.0 or higher
- npm: 10.9.2v or higher
- MongoDB: v7.0.20 or higher
- Operating system (Linux, macOS, Windows)

## Screenshots

## Demo Video

## Domain Name

- https://api.wtwr-app.jumpingcrab.com
