# React CRUD App ("NW Traders")

React CRUD App (in-app name: NW Traders) is part of a full stack web application project. It is the live SPA application for an ASP .NET Core restful API back end service which I have also running live on Microsoft Azure.

## Application overview

This is a simple CRUD demo application for a fictional wholesale company called NW Traders. App data is Northwind example data stored in an Azure cloud hosted MS SQL database. All users can perform CRUD operations (CREATE/READ/UPDATE/DELETE) on products and customers. Logged in admin users can also perform CRUD operations on application users. App also contains a Post page which includes some example cards created by fetching data from [JSON Placeholder](https://jsonplaceholder.typicode.com/).
Logged in users get a JWT Access Token from the web API which is then stored in the browser's Local Storage. All content apart from the Login page is only accessible by having a valid Access Token. Passwords are hashed using the Md5 function and public API endpoints are accessed using Axios library.

## Live demo

Do you have login details for my application? Click the link below to log in to the live version:

[Live demo of NW Traders](https://nwtraders.vercel.app/)

## Get started

Prerequisites:

-   Node

To set up the app execute the following commands.

```bash
git clone https://github.com/JFHaataja/react-crud-app
cd react-crud-app
npm install
```

After everything has finished installing, you need to then create an empty .env file at the root level of the project:

![image](https://user-images.githubusercontent.com/96774962/210604332-98094c22-d35b-467e-b79a-388dc4e82def.png)

After that open the .env file and paste the necessary Rest API endpoint URL:s into it.

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

`npm run build`

Builds the app for production to the build folder.

`npm run test`

Launches the test runner in the interactive watch mode.

`npm run lint`

Analyzes the code with ESlint.

`npm run format`

Formats the app with Prettier.

`npm run eject`

Note: this is a one-way operation. Once you `eject`, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

## Important

If I've applied for a job in your company, you can find the .env file content along with the necessary log-in details in my job application. And if I haven't and you'd like to try out my application, please send me an
e-mail at jon.haataja@gmail.com.

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

You can run the tests after you have added the necessary .env content.

## Contact

If you have any questions or something's not working, please send me an email at jon.haataja@gmail.com. Thank you!
