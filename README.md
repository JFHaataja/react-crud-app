# React CRUD App ("NW Traders")

React CRUD App (in-app name: NW Traders) is part of a full stack web application project. It is the client side front end application for an ASP .NET Core RESTful API back end service which I have running live on Microsoft Azure. To learn more about and to download the back end application of this project please visit [react-crud-app-backend](https://linkhere.com/).

## Application overview

This is a simple CRUD demo application for a fictional wholesale company called NW Traders. App data is Northwind example data stored in an Azure cloud hosted MS SQL database. All users can perform CRUD operations (create/read/update/delete) on products and customers. Logged in admin users can also perform CRUD operations on application users. App also contains a Post page which includes some example cards created by fetching data from [JSON Placeholder](https://jsonplaceholder.typicode.com/).

Logged in users get a JWT Access Token from the web API which is then stored in the browser's Local Storage. All content apart from the Login page is only accessible by having a valid Access Token. Passwords are hashed using the Md5 function and public API endpoints are accessed using Axios library.

## Live demo

[Live demo of the app](https://putlinkhere.com/)

## Get started

Prerequisites:

-   Node 16+

To set up the app execute the following commands.

```bash
git clone https://github.com/JFHaataja/react-crud-app
cd react-crud-app
npm install
```

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

`npm run build`

Builds the app for production to the build folder.

`npm run cypress:open`

Opens the testing tool Cypress.

`npm run test`

Launches the test runner in the interactive watch mode.

`npm run lint`

Analyzes the code with ESlint.

`npm run format`

Formats the app with Prettier.

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
+-- features          # feature based modules
|
+-- pages             # separate files for all application pages.
```

## Tech Stack

**Front End:** React.js, SASS, React-Bootstrap, Vercel

**Back End:** ASP .NET Core, Microsoft SQL, Microsoft Azure
