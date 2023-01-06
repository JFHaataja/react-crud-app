# React CRUD App ("NW Traders")

React CRUD App (in-app name: NW Traders) is part of a Full Stack Web Application project consisting of two separate applications. It is the React.js SPA Front End application for an ASP .NET Core RESTful API Back End service. I've built both applications myself and published them to Vercel (React App) and Azure (ASP .NET Core App). My Back End RESTful Application is in a private repository for security matters but if you'd like to take a look at it, please send me a message at jon.haataja@gmail.com so I can invite you to that repository.

## Application overview

This is a simple CRUD demo application for a fictional wholesale company called NW Traders. The data used in the application is Northwind example data stored in an Azure Cloud hosted MS SQL database. There are two user groups: Basic Users and Admin Users. All Users can perform CRUD operations (CREATE/READ/UPDATE/DELETE) on Products and Customers. Admin Users can also perform CRUD operations on all of the application users. I have also included a Posts page which includes some example cards created by fetching data from [JSON Placeholder](https://jsonplaceholder.typicode.com/).
When users Log in, they get a JWT Access Token from the web API which is then stored in the browser's Local Storage. All content apart from the Login page is only accessible by having a valid Access Token. Passwords are hashed using the Md5 function and public API endpoints are accessed using Axios library.

## Live demo

Do you have User Login details for my application? Click the link below to log in to try out the live version:

[Live demo of NW Traders](https://nwtraders.vercel.app/)

If you wish to download the app and run it in your own computer, follow the instructions below.

## Get started

Prerequisites:

- Node

1. To set up the app execute the following commands.

```bash
git clone https://github.com/JFHaataja/react-crud-app
cd react-crud-app
npm install
```

2. After everything has finished installing, you need to then create an empty .env file at the root level of the project:

![image](https://user-images.githubusercontent.com/96774962/210604332-98094c22-d35b-467e-b79a-388dc4e82def.png)

3. After that open the .env file and paste the necessary Rest API endpoint URL:s into it. (Note: you can find them in my job application or by contacting me via e-mail at jon.haataja@gmail.com.)

4. Here is a list of available commands you can run:

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

`npm run build`

Builds the app for production to the build folder.

`npm run lint`

Analyzes the code with ESlint.

`npm run format`

Formats the app with Prettier.

`npm run eject`

Note: this is a one-way operation. Once you `eject`, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

## Project Structure

```bash
src
|
+-- api               # Axios API service files for fetching data from the REST API
|
+-- assets            # React-icons and SASS files
|
+-- components        # shared components used across the entire application
|
+-- features          # feature based module files divided into their own subfolders
|
+-- pages             # separate files for all application pages
```

## Tech Stack

**Front End:** React.js, SASS, React-Bootstrap, Vercel

**Back End:** ASP .NET Core, Microsoft SQL, Microsoft Azure

## Testing

This app includes some Cypress E2E tests.

To open up Cypress testing tool run the following command:

`npm run cypress:open`

You can run the tests after you have added the necessary .env content and updated the login details into the test files. To update the login details, open up the e2e folder in the cypress folder and replace the parts where the code instructs you to do so:

![image](https://user-images.githubusercontent.com/96774962/210837644-8c2afa4d-6287-4f5f-941e-b789670e4446.png)

## Contact

If you have any questions or if something's not working, please send me an email at jon.haataja@gmail.com. Thank you!
