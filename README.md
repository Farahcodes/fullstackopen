# Full Stack Open 2023

This repository includes my projects and solutions for the [Full Stack Open course](https://fullstackopen.com/en/) from the prestigious University of Helsinki.

Parts 0 through 9 are located within this repository, while Parts 10 through 13 can be found in separate repositories (links are provided in the corresponding sections below).

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

### Part 7- [React Router, Custom Hooks, Styling Apps with CSS and webpack](https://fullstackopen.com/en/part7)

Topics:

* [React Router](https://reactrouter.com/en/main)
* [Custom React hooks](https://legacy.reactjs.org/docs/hooks-custom.html)
* [React class components](https://legacy.reactjs.org/docs/react-component.html)
* UI libraries including [React-Bootstrap](https://react-bootstrap.github.io/) and [Material-UI](https://mui.com/material-ui/)
* [Styled-Components](https://styled-components.com/)
* [Webpack](https://webpack.js.org/)

### Part 8- [GraphQL](https://fullstackopen.com/en/part8)

Topics:

* [GraphQL](https://graphql.org/)
* [Apollo](https://www.apollographql.com/)

Projects:

* [Library Front End](https://github.com/Farahcodes/fullstackopen/tree/master/part8/library-frontend) / [Library Back End](https://github.com/Farahcodes/fullstackopen/tree/master/part8/%20library-backend) - A full-stack application that offers comprehensive book and author information, enabling users to add new books to the database. It leverages Apollo Server on the backend to manage GraphQL queries and Apollo Client on the frontend for sending queries and caching results. The app utilizes subscriptions to keep the frontend in sync with updates from the MongoDB database.

### Part 9 - [TypeScript](https://fullstackopen.com/en/part9)

Topics:

* TypeScript
* Formik
* Yup
* Semantic UI React

Projects:

* **[BMI](https://github.com/Farahcodes/fullstackopen/tree/master/part9/bmi)** - A simple Express-based back end that showcases the power of TypeScript by providing basic BMI and exercise calculators.
* **[Course Info TypeScript](https://github.com/Farahcodes/fullstackopen/tree/master/part9/9.14-9.16/vite-with-typescript)** - An extension of the Course Info app from Part 1, rewritten to demonstrate the use of TypeScript in a React environment.
* **[Patientor Front End](https://github.com/Farahcodes/fullstackopen/tree/master/part9/patientor-frontend)** / **[Patientor Back End](https://github.com/Farahcodes/fullstackopen/tree/master/part9/patientor-backend)** - A full-featured medical records application that allows for the viewing and updating of patient details. Both the front end and back end are implemented using TypeScript to manage the diverse data types associated with medical records. The back end is RESTful, with endpoints for fetching and updating patient records, while the front end is enhanced to display patient information. Form management is handled with Formik and Yup, ensuring a robust and maintainable structure for adding medical entries. The UI is built using Material UI React for a clean, modern look.

### Part 10 - [React Native](https://fullstackopen.com/en/part10)

Topics:

* React Native
* Expo

Projects:

* **[Rate Repository App](https://github.com/Farahcodes/full-stack-open-part10)** - A React Native frontend built for an existing GraphQL back end. The app allows users to browse a list of GitHub repositories, which can be filtered, sorted, and scrolled infinitely. Signed-in users can submit reviews for any public GitHub repository, view the repositories they have reviewed, and delete their own reviews. Form handling and validation are efficiently managed using Formik and Yup.

### Part 11 - [CI/CD](https://fullstackopen.com/en/part11)

Topics:

* Continuous Integration and Continuous Deployment (CI/CD) using GitHub Actions

Projects:

* **[CI/CD Pipeline for Pokedex App](https://github.com/Farahcodes/full-stack-open-pokedex-init)** - Developed a comprehensive CI/CD pipeline utilizing GitHub Actions for a pre-built Pokedex application. The pipeline encompasses linting, building, unit testing, end-to-end testing, deployment, version tagging, and Slack notifications.








