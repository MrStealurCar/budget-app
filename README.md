# Budget Planner

Budget Planner is a simple fullstack app that allows users to view, add, edit, or delete budget entries.

## Description

This project uses the budget-api I built as part of Codecademys Back-End Engineer career path, I decided to add a simple user interface to it using React after completing the API to make it my first fullstack application! The back-end was built using Express.js and I used Node.js to run the server. I found hooking up the API I built both fun and challenging, facing many difficulties along the way such as the transfer feature. This app allows users to:

- View a default list of budget entries.
- Add a new budget entry to the list.
- View more details of a specific budget by clicking the eye emoji.
- While in the detailed view, the user has the option to:

1. Delete the current entry (❌)
2. Edit the current entries title or amount (✏️)
3. Transfer funds between 2 entries (🔁)

I am currently refactoring this app to become more practical and real-world. Some new features will include:

- Letting the user set their own budget
- Replacing the default list of entries with a prompt telling the user to add new ones
- Automatically deducting from the user's set budget as they create new entries

Check back soon to see the finished product!

## Why I built this

This was an impromptu portfolio project I decided to create after completing the budget-api project. At first, the API could only be tested in Postman, and the lack of user interface made it feel incomplete to me. So, I decided to put my skills with React to use and build a complete fullstack application using the API.

## Getting started

**Note:** This project uses a Node-based mock server to simulate backend API functionality. For now, the app is intended to run **locally**.

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
