# Online Test Application

This repository contains a single-page application for conducting online tests. The application consists of three main pages: Login Page, Test Page, and Results Page.

## Features

### 1. Login Page
- Allows users to log in using their email and password.
- Includes a category dropdown ('sports', 'arts', 'history', 'physics') to filter test questions.
- Basic validations for email format and empty form fields are implemented.
- Default login credentials:
  - Username: testuser@gmail.com
  - Password: testuser@2021
- Alternatively, new user registration can be managed in local storage or indexedDBs.

### 2. Test Page
- Presents filtered questions based on the category selected during login.
- Users can navigate back and forth between questions.
- Ability to skip questions.
- Remembered answers for previously answered questions.
- Countdown timer from 05:00 to 00:00.
- Notepad field for users to take notes during the test.
- Users are prevented from navigating back to the Login Page once on this page.

### 3. Results Page
- Displays results after completing the test or when the timer expires.
- Graphical representation of results:
  - Accurate answers
  - Missed questions
  - Wrong answers
  - Total score in percentage
- Displays notes scribbled by the user during the test.
- Prevents navigation back to the Test Page or Login Page from this page.

## Installation and Setup

### 1.Clone the repository
```bash
$ git clone https://github.com/gauthamsureshh/TestHive.git
$ cd TestHive
```

### 2.Install dependencies
```bash
$ npm install
```

### 3.Run the application
```bash
$ npm start
```

This will start the development server. Open http://localhost:3000 to view the application in your browser.

## Technologies Used

- **React.js**: Used for building the user interface.
- **Redux**: Utilized for state management.
- **React Router**: Implemented for page navigation.
- **HTML/CSS**: Used for styling and layout.
- **JavaScript (ES6+)**: Used for application logic.

## Contributing
 Contributions are welcome! Please feel free to fork the repository and submit pull requests to suggest improvements or add new features.

## Incase of error, try running 
 '''bash
 $ npm install react-scripts
 '''
