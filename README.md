# Full Stack Open 2023

This repository includes my projects and solutions for the [Full Stack Open course](https://fullstackopen.com/en/) from the prestigious University of Helsinki. Parts 0 to 9 of the course will be all available in this repository. Parts 10 to 13 will be accessed through the links provided in the associated sections below.

This comprehensive course is known for its exceptional quality and rigorous curriculum, covering essential web development skills and modern technologies such as:
* React
* Redux
* Node.js
* Express
* REST APIs
* GraphQL
* MongoDB
* Relational Databases
* TypeScript
* React Native
* Unit testing, integration testing, and end-to-end testing
* CI/CD

## Course Contents and Projects Summary

### Part 0 - [Fundamentals of Web Apps](https://fullstackopen.com/en/part0)

Topics:

* HTML/CSS
* HTTP requests
* JSON
* The Document Object Model (DOM)
* JavaScript libraries

Projects:

[Sequence diagrams](https://github.com/Farahcodes/fullstackopen/tree/master/part0) - Diagrams to illustrate the chain of events during network communication for single page apps and for traditional apps

### Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)

Topics:

* React
* Props
* Event handlers
* State management using hooks

Projects:

* [Course Info](https://github.com/Farahcodes/fullstackopen/tree/master/part1/1.3.-1.5.%20course-info-app) - A simple page to display course information.
* [Unicafe](https://github.com/Farahcodes/fullstackopen/tree/master/part1/1.6.-1.11.%20unicafe) - A feedback page and statistics page to demonstrate state using React hooks.
* [Anecdotes](https://github.com/Farahcodes/fullstackopen/tree/master/part1/1.12.-1.14.Anecdotes) - A page that shows the user random anecdotes that can be voted upon.

### Part 2 - [Communicating with the Server](https://fullstackopen.com/en/part2)

Topics:

* HTTP requests using axios
* 3rd party APIs
* Forms
* Rendering collections of data from the server

Projects:

* [Course Info 2](https://github.com/Farahcodes/fullstackopen/tree/master/part2/2.1.-2.5) - A continuation of the project from the part 1 that has been refactored into a more maintainable structure
* [Countries](https://github.com/Farahcodes/fullstackopen/tree/master/part2/2.18.-2.20) - A page that pulls country and weather data from 3rd party APIs as the user searches for country names.
* [Phonebook Front End](https://github.com/Farahcodes/fullstackopen/tree/master/part2/2.16.-2.17) - A phonebook front end that displays and filters phonebook entries. New entries can be added, deleted, or modified. JSON server is used as a mock REST API.

### Part 3- [Programming a Server with Node.js and Express](https://fullstackopen.com/en/part3)

Topics:

* REST APIs using Node.js and Express
* MongoDB with Mongoose
* Express middleware for logging, error handling, etc.
* ESlint

Projects

* [Phonebook back End](https://github.com/Farahcodes/fullstackopen/tree/master/part3/phonebook%20fullstack/phonebook%20backend) - A RESTful back end in Express for the phonebook front end from the previous part. Uses Mongoose and a MongoDB database.
[Backend deployed here with fly](https://phonebook-fullstack-helsinki.fly.dev/)

### Part 4- [Testing Express Servers, User Administration](https://fullstackopen.com/en/part4)

Topics:

* Unit testing and integration testing Express back ends with Jest and SuperTest
* User entication using using JSON web tokens
* Password hashing using bcrypt

Projects

* [Blog List back End](https://github.com/Farahcodes/fullstackopen/tree/master/part4-blogList-backend) - A RESTful back end in Express for creating, reading, and updating blog post data. Certain endpoints are limited to authenticated users only. Unit and integration tests were done using Jest and SuperTest.

### Part 5- [Testing React Apps](https://fullstackopen.com/en/part5)

Topics:

* Unit testing of React components using [Jest](https://jestjs.io/) and [React Testing Library](https://github.com/testing-library/react-testing-library)
* End-to-end testing of full stack applications using [Cypress](https://www.cypress.io/)
* Handling login on the front end using [JSON web tokens](https://jwt.io/)
* Defining props using [PropTypes](https://github.com/facebook/prop-types)


Projects

* [Blog List front End](https://github.com/Farahcodes/fullstackopen/tree/master/part5/bloglist-frontend) - A React front end for the blog list back end from the previous part. Users can add or like their favourite blog posts. Unit testing of React components using Jest and React Testing Library. End-to-End testing of the full stack application using Cypress.

### Part 6- [State Management with Redux](https://fullstackopen.com/en/part6)

Topics:

* [Redux](https://redux.js.org/) for state management (using both hooks and connect)
* [Redux Thunk ](https://github.com/reduxjs/redux-thunk) middleware for asynchronous actions
* [React Query ](https://tanstack.com/query/latest/docs/framework/react/overview) for fetching and updating server state (using useQuery and useMutation hooks).
* [React's useReducer and useContext](https://react.dev/learn/scaling-up-with-reducer-and-context) for global notification state management and access across components.

Projects

* [Unicafe Redux](https://github.com/Farahcodes/fullstackopen/tree/master/part6/unicafe-redux) - The unicafe app from part 1 revisited with Redux for state management. Tests for the reducer implemented using Jest.
* [Redux Anecdotes](https://github.com/Farahcodes/fullstackopen/tree/master/part6/redux-anecdotes) - The anecdotes app from part 1 revisited with Redux for state management. Uses reducers for notifications, filtering data, and initializing/adding/voting for anecodtes. Uses Redux Thunk middleware for for asynchronous actions.
* [Query Anecdotes](https://github.com/Farahcodes/fullstackopen/tree/master/part6/query-anecdotes) - The anecdotes app enhanced with React Query for fetching and mutating data, and React's context and reducer for notifications. Implements useQuery and useMutation hooks for handling anecdotes and votes, alongside global notifications managed through custom hooks.


