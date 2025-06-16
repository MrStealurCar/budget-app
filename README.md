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

## Description

This project uses the budget-api I built as part of Codecademys Back-End Engineer career path, I decided to add a simple user interface to it using React after completing the API to make it my first fullstack application! The API was built using Express.js, and I used Node.js to run the server. Originally, the app would display a default list of budget entries, and the API would add and pull data from a mock database I had created in the api folder. However, shortly after completing the project, I decided to replace this with a real PostgreSQL database instead. I found creating the new database, and hooking up my API to PostgreSQL both fun and challenging. Refactoring my original routes to interact with the real database was also very engaging.

The original version of the app allowed users to:

- View a default list of budget entries.
- Add a new budget entry to the list.
- View more details of a specific budget by clicking the eye emoji.
- While in the detailed view, the user has the option to:

1. Delete the current entry (❌)
2. Edit the current entries title or amount (✏️)
3. Transfer funds between 2 entries (🔁)

After refactoring to use PostgreSQL, the app now:

- Adds budget entries and total to a real PostgreSQL database.
- Lets users set their own budget and create entries which will deduct from their saved total.
- Features updated API routes to interact with SQL functions.
- Retains the detailed view feature with the same options as before.
- Prevents users from setting a negative total amount or creating an entry with a negative budget.
- Keeps and saves entries and total amount on refresh.
- Adds any leftover money back to total amount if entry is deleted.

## Why I built this

This was an impromptu portfolio project I decided to create after completing the budget-api project. At first, the API could only be tested in Postman, and the lack of user interface made it feel incomplete to me. So, I decided to put my skills with React to use and build a complete fullstack application using the API.

## Getting started

**Note:** This project is currently intended to run **locally**. It uses Node.js and Express to run the server, and is connected to a PostgreSQL database.

1. ### Clone the repository

- `git clone https://github.com/your-username/your-repo-name.git`
- `cd your-repo-name`

2. ### Starting the mock server

- In the terminal, run `cd api`
- `npm install`
- `node server.js` (You should see the terminal respond with: "Server listening on port 3005")

3. ### Starting the Front-End

- In a **separate terminal**, cd into the project directory again and run `cd client`
- `npm install`
- `npm start` (You should now be running on localhost:3000)

## Contributors

- Jacob Rodriguez
