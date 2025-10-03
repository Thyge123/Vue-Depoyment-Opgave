# Vue Team & Project Management App

This is a sample single-page application built with Vue 3 and Vue Router. It serves as a comprehensive example of modern Vue development practices, demonstrating component-based architecture, routing, and state management. The application allows users to browse through lists of teams, users, and projects, showcasing various features of the Vue Router such as nested routes, named views, and programmatic navigation.

## Table of Contents

  - [Project Overview](https://www.google.com/search?q=%23project-overview)
  - [Features](https://www.google.com/search?q=%23features)
  - [Directory Structure](https://www.google.com/search?q=%23directory-structure)
  - [Technologies Used](https://www.google.com/search?q=%23technologies-used)
  - [Setup and Installation](https://www.google.com/search?q=%23setup-and-installation)
  - [Available Scripts](https://www.google.com/search?q=%23available-scripts)
  - [Core Concepts Illustrated](https://www.google.com/search?q=%23core-concepts-illustrated)
      - [Vue Router](https://www.google.com/search?q=%23vue-router)
      - [Component Architecture](https://www.google.com/search?q=%23component-architecture)
      - [State Management (`provide` / `inject`)](https://www.google.com/search?q=%23state-management-provide--inject)
  - [Component Breakdown](https://www.google.com/search?q=%23component-breakdown)
  - [Configuration Files](https://www.google.com/search?q=%23configuration-files)

-----

## Project Overview

The application is designed to manage fictional teams, users, and projects. The main data is centralized in the root `App.vue` component and made available to all child components using Vue's `provide`/`inject` API. This avoids prop drilling and provides a clean way to manage global state.

The routing is set up to handle different sections of the application, with each section having its own distinct list view and a dedicated footer component, illustrating the power of named router views.

-----

## Features

  - **Multi-View Layout**: The app uses different components for the main content and the footer, which change based on the current route.
  - **Team Management**: View a list of teams and click to see a detailed view of each team's members.
  - **User Listing**: A simple page that displays all users with color-coded roles.
  - **Project Listing**: Displays all projects. Users can click on a project to reveal the details of the associated team, including its members.
  - **Nested Routing**: The team members view is a nested route within the main teams page.
  - **Programmatic Navigation**: Buttons navigate the user programmatically through the application's routes.
  - **Not Found Page**: A custom 404 page handles invalid URLs gracefully.

-----

## Directory Structure

The project follows the standard Vue CLI structure, organizing components by feature into subdirectories.

```
thyge123-vue-depoyment-opgave/
├── babel.config.js
├── package.json
├── vue.config.js
├── .browserslistrc
├── .eslintrc.js
├── .prettierrc
├── public/
│   └── index.html
└── src/
    ├── App.vue
    ├── main.js
    └── components/
        ├── nav/
        │   ├── NotFound.vue
        │   └── TheNavigation.vue
        ├── projects/
        │   ├── ProjectItem.vue
        │   ├── ProjectList.vue
        │   └── ProjectsFooter.vue
        ├── teams/
        │   ├── TeamMembers.vue
        │   ├── TeamsFooter.vue
        │   ├── TeamsItem.vue
        │   └── TeamsList.vue
        └── users/
            ├── UserItem.vue
            ├── UsersFooter.vue
            └── UsersList.vue
```

-----

## Technologies Used

  - **Vue.js v3**
  - **Vue Router v4**
  - **Vue CLI v4.5**
  - ESLint
  - Babel
  - Prettier

-----

## Setup and Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**

    ```sh
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd thyge123-vue-depoyment-opgave
    ```

3.  **Install dependencies:**

    ```sh
    npm install
    ```

4.  **Run the development server:**

    ```sh
    npm run serve
    ```

    The application will be available at `http://localhost:8080`.

-----

## Available Scripts

The `package.json` file includes the following scripts:

  - `npm run serve`: Compiles and hot-reloads the application for development.
  - `npm run build`: Compiles and minifies the code for a production-ready build.
  - `npm run lint`: Lints and automatically fixes code style issues.

-----

## Core Concepts Illustrated

This project is an excellent example of several core Vue.js concepts in action.

### Vue Router

The routing is configured in `src/main.js`.

  - **Named Views**: The application uses named `<router-view>` outlets in `App.vue` to simultaneously render a main component and a corresponding footer component.
    ```javascript
    // from src/main.js
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
    },
    ```
  - **Nested Routes**: The team members page is a child route of the teams page. This is achieved using the `children` property in the route configuration. This allows `TeamMembers.vue` to be rendered inside the `<router-view>` of `TeamsList.vue`.
  - **Passing Props to Route Components**: The `team-members` route is configured with `props: true`. This automatically passes the dynamic route parameter (`:teamId`) as a prop to the `TeamMembers.vue` component, decoupling it from the router.
  - **Programmatic Navigation**: Navigation is triggered programmatically using `this.$router.push()`. For example, in `UsersList.vue`, a button click navigates the user to the teams page.
  - **`<router-link>` with Named Routes**: The `TeamsItem.vue` component uses a named route in its `<router-link>` to build a complex URL that includes both `params` and a `query` string.
  - **Redirects & Wildcard Routes**: The root path `/` redirects to `/teams`, and a wildcard route `/:notFound(.*)` catches all invalid URLs and displays the `NotFound.vue` component.

### Component Architecture

  - **Props**: Components like `UserItem.vue` and `TeamsItem.vue` receive data from their parent components via props, making them reusable and configurable.
  - **Custom Events (`$emit`)**: Child components communicate with their parents using custom events. For example, `ProjectItem.vue` emits a `toggle-team-details` event when clicked, which is handled by the parent `ProjectList.vue`.
  - **Computed Properties**: Used for deriving data based on other properties. For instance, `UserItem.vue` uses a computed property `roleClass` to apply dynamic CSS classes based on the user's role.
  - **Watchers**: The `watch` option is used to react to data changes. Both `TeamMembers.vue` and `ProjectList.vue` watch for changes in IDs to fetch and update their data accordingly.

### State Management (`provide` / `inject`)

To avoid prop drilling, the application uses Vue's `provide` and `inject` API for state management.

  - **`provide`**: The root component, `App.vue`, provides the `teams`, `users`, and `projects` arrays to all of its descendant components.
  - **`inject`**: Descendant components like `TeamsList.vue`, `UsersList.vue`, and `ProjectList.vue` inject this data to gain access to it without needing it to be passed down through multiple levels of props.

-----

## Component Breakdown

  - **`App.vue`**: The root component. It defines the main layout with a header, a main content area, and a footer. It also provides the global application data.
  - **`main.js`**: The entry point of the application. It initializes the Vue app and sets up the Vue Router instance with all the route configurations.
  - **`TheNavigation.vue`**: A global navigation bar with links to the Teams, Users, and Projects pages.
  - **`TeamsList.vue`**: Displays a list of teams using the `TeamsItem` component. It also contains a `<router-view>` to display the nested `TeamMembers` component.
  - **`TeamMembers.vue`**: A detailed view that displays the members of a specific team. It retrieves the `teamId` from the route params as a prop.
  - **`UsersList.vue`**: Displays a list of all users using the `UserItem` component.
  - **`ProjectList.vue`**: Displays a list of projects. It contains the logic to show/hide the details of a project's associated team when a project is clicked.

-----

## Configuration Files

  - **`vue.config.js`**: Configuration file for Vue CLI. In this project, it sets the `publicPath` to `/`.
  - **`.eslintrc.js`**: Configuration for ESLint. It defines rules to warn about `console.log` and `debugger` statements in production builds, ensuring cleaner production code.
  - **`package.json`**: Defines project metadata, dependencies, and scripts.
  - **`public/index.html`**: The main HTML template for the application. The Vue app is mounted on the `<div id="app"></div>` element.
