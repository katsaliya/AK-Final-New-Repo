[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-ndVndbb)
# CSC317 Fall 2024 Final Project

In this group project, your team will put together the things we've learned over the course of this class and build a web application from scratch. Teams should be 2-3 people in size.

Goals for this assignment:
- Apply the web application concepts we've learned over the course of the semester
- Get practice collaborating on a project in a team context
- Build a web application of a topic of your choice

There are 3 deliverables for the final project:
- Design document, to be added the `README.md` file in the `design/` directory 
- Code for the web application described in the document and, in the `server/` directory 
- In-class presentation featuring your project 

The topic of the website is up to you. Since this is a group project, I suggest deciding something that all teammate(s) would enjoy working on. Here are some potential ideas, which you are welcome to use if you're stuck coming up with one:
- A todo list that keeps track of various list items, and allows users to cross them out as they complete them
- A recipe sharing platform where users can track and share thier favorite recipies
- An event planner that lets users manage events and invite friends, and track thier friends RSVP responses

## Requirements

Your project must include these requirements:
- Frontend
    - 2 or more distinct HTML pages fully styled with CSS
    - at least 1 page that render swith EJS; this can be one of the two in the above bullet points
- Backend
    - a Node.js/Express.js server that serves frontend static files
    - implementation of REST-style API endpoints for creating, editing, and deleting resource(s) (POST, PATCH, DELETE)
- Database
    - a Railway-hosted postgres database
    - a schema with 2 or more models
    - a seed script that populates your DB with some default data
    - a one-to-one or one-to-many relationship between two models

These are strech features that are available for bonus points if you choose to implement them:
- user accounts and authentication with bcrypt
- deployment onto an application hosting service such as Railway

## Section 1: Design Document - Due date: Wed Nov 20 - 11:59PM

Add the contents of this portion of the assignment to the `README.md` file in the `design/` directory.

Your design document should include the following:

- the topic of your website
    
    Include a high level description of what the purpose of the website in 2-5 sentences.

- feature list
    
    List the features you intend to include. Make sure that the list of features you include meet the requirements above.

    Examples of feature descriptions for an event tracking app:
        
    - an "events" page that list all upcoming events, sorted by date
        
    - a "event details" page that shows an event's name, date, description, and number of attendees
        
    - a form that users can fill out to add new events

    - user accounts and the ability to associate events with thier account


- Bonus: Wireframes and Entity Relationship Diagram*

    - Wireframes for your frontend pages. 
    
        A wireframe is a visual diagram that outlines the structure and layout of a website, app, or other digital product. 

        For an example of a wireframe, reference the Travel Page wireframes from the README of Project 1, at the beginning of the course. The assignment description included wireframes for the pages you implemented.

        You are welcome to draw them by hand and include a photo, or use software such as Figma or Lucidchart.

    - Entity relationship diagrams for your database models.

        An ERD contains the models in your app, the fields and thier types, and relationships.

        You are welcome to draw them by hand and include a photo, or use software such as dbdiagram.io or Lucidchart. Both services provide some examples on how to accomplish this.



## Section 2: Implementation - Due date: Fri Dec 13 - 11:59PM

Include the code in the `server/` directory. I should be able to start your server with our usual start up commands, and visit your webiste on `localhost:3000`. If you choose to deploy the site to a public URL, include the URL in `server/README.md`.

From within the `server/` directory, I should be able to run:
```
> npm install
> npm run seed-db
> npm start
```

## Section 3: Final Presentation - Due date: Tues Dec 10 or Dec Nov 12

Your group will give a presentation on your final project during the last week of class. You must be present at the final presetnation to recieve a grade. If you cannot attend for whatever reason, please let me know so we can see if other arrangements are possible.


The presentation requirements are as follows:

- 3-5 min long
- explains your project idea
- what your team implemented
- your favorite feature(s)
- most challenging aspect
    - maybe a bug, or anything you struggled with during the project
- anything else you would like to share about development
- next steps
    - if you had more time, what would you work on next

Feel free to prepare slides!

The due date for the code is Friday of that week, so you will present before your code is due. Even though your project may not be code complete by your presentation, please prepare to show what you have.


## Rubric

Total Points: 120

Bonus: 10, marked with *


| Team Set Up & Design Document | 20 |
|---|---|
| Teammate submission | 5 
| Project topic description |	5
| Feature list | 5
| Proper use of branches and PRs | 5
| Wireframes & ERD | 0-5*

| Code and Implementation | 70 |
|---|---|
| Proper implementation of frontend features    | 20 |
| Proper implementation of server features 	    | 20 |
| Proper implementation of database features 	| 20 |
| Proper use of branches and PRs to merge code into the `main` branch	| 10 |
| Proper implementation of **bonus** features | 0-5* |


| Final Presentation | 30 |
|---|---|
|	Content includes the required criteria |	20
|	Presentation (meeting the time limit, smooth transitions, organized and understandable)  |	10
