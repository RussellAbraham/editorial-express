# Editorial-Express

## Overview

Editorial Express is a versatile note-taking application that combines a rich text editor with terminal integration, allowing users to seamlessly manage their notes and execute SQL commands within a unified workspace.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `finals`
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:8080/`

## Usage


## Features

### 1. Rich Text Editor

- Utilizes CKEditor for a powerful and intuitive rich text editing experience.
- Format notes with various styling options, making content creation effortless.

### 2. Terminal Integration

- Integrated terminal for executing SQL commands and interacting with the application through a command-line interface.

### 3. Notebooks Hierarchy

- Organize notes effectively with a hierarchical notebook structure.
- Notes can be nested within notebooks, providing a structured content organization.

### 4. Notebooks View

- Centralized catalog view displaying all notebooks and standalone notes for quick navigation.
- Offers a clear overview of the entire content repository.

### 5. Dark Mode Compatibility

- Dark mode option for enhanced user experience and reduced eye strain during extended usage.

### 6. User Authentication

- Robust user authentication system to ensure data security.
- Users can securely log in to access and manage their personalized workspace.

### 7. Dynamic Theme Switching

- Users can dynamically switch between light and dark themes for a customizable visual experience.

### 8. Responsive Design

- Responsive and adaptive design for a consistent and optimal user experience across various devices.

## Team

Editorial Express would not be possible without a strong team of [contributors](https://github.com/RussellAbraham/editorial-express/graphs/contributors) helping push the project forward each day.

#### [Russell Ley](https://github.com/RussellAbraham) - Developer

<img align="left" width="40" height="40" src="https://avatars.githubusercontent.com/u/35252806?v=4">

Russell is an aspiring full stack developer and data analyst from [Lighthouse Labs](https://github.com/lighthouse-labs).

#### [Jubril Bello](https://github.com/jbelloRepo) - Developer

<img align="left" width="40" height="40" src="https://avatars.githubusercontent.com/u/93074451?v=4">

Jubril is an aspiring full stack developer from [Lighthouse Labs](https://github.com/lighthouse-labs).

#### [Bo Yu](https://github.com/BYYu31) - Developer

<img align="left" width="40" height="40" src="https://avatars.githubusercontent.com/u/126260653?v=4">

Bo is an aspiring full stack developer from [Lighthouse Labs](https://github.com/lighthouse-labs).


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
