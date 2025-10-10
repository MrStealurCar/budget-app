# Aura Finance

Aura Finance is a simple fullstack budget planner that allows users to set a total budget, and create, view, edit, or delete budget entries.

## Technologies used

### Front-End:

- HTML/CSS
- JavaScript
- React

### Back-End:

- Express.js
- Node.js
- PostgreSQL
- Google Firebase

## Description

This project uses the budget-api I built as part of Codecademys Back-End Engineer career path, I decided to add a simple user interface to it using React after completing the API to make it my first fullstack application! The API was built using Express.js, and I used Node.js to run the server. Originally, the app would display a default list of budget entries, and the API would add and pull data from a mock database I had created in the api folder. However, shortly after completing the project, I decided to replace this with a real PostgreSQL database instead. I found creating the new database, and hooking up my API to PostgreSQL both fun and challenging. Refactoring my original routes to interact with the real database was also very engaging.

The original version of the app allowed users to:

- View a default list of budget entries.
- Add a new budget entry to the list.
- View more details of a specific budget by clicking the magnifying glass emoji.
- While in the detailed view, the user has the option to:

1. Delete the current entry
2. Edit the current entries title or amount
3. Transfer funds between 2 entries

After refactoring to use PostgreSQL, the app now:

- Adds budget entries and total to a real PostgreSQL database.
- Lets users set their own budget and create entries which will deduct from their saved total.
- Features updated API routes to interact with SQL functions.
- Retains the detailed view feature with the same options as before.
- Prevents users from setting a negative total amount or creating an entry with a negative budget.
- Keeps and saves entries and total amount on refresh.
- Adds any leftover money back to total amount if entry is deleted.

I'm currently making the app personalized for each user. Users can sign in via Google Firebase, and I'm refactoring the SQL queries, API routes, and helper functions to show only entries and budgets matching the signed-in user’s ID. The sign-in feature is optional for now, but the final version will require users to sign in before using the app.

## Why I built this

This was an impromptu portfolio project I decided to create after completing the budget-api project. At first, the API could only be tested in Postman, and the lack of user interface made it feel incomplete to me. So, I decided to put my skills with React to use and build a complete fullstack application using the API.

## Live Demo

I used Render to host the front end and back end, and used Neon to host the database: [Live Demo](https://budget-app-6st9.onrender.com/)

**Note:**

- The app may be slow at first, this is because I used the free tier on Render to host the app, which will cause the app to "go to sleep" after a period of inactivity.
- The app currently pools all budgets together so users may see entries created by other users. I plan on adding user authentication so the app is personalized for each user.

## Contributors

- Jacob Rodriguez
