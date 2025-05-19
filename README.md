# Full Stack Open Course Exercises

This repository contains my solutions to exercises Part3 (Node.js and Express) of the Helsinki University Full Stack Open course (2024-2025).

## Course Information

This course is designed to introduce modern web development practices and technologies. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

Course website (Part 3): [Full Stack Open](https://fullstackopen.com/en/part3)

## Repository Structure

- `phonebook-backend/` - Solutions for Part 3

## Getting Started

Each subdirectory contains its own React application with specific instructions on how to run it.

You will need to run `npm install` and

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the backend directory with your local paths:

```env
FRONTEND_PATH=<path-to-your-frontend>
BACKEND_PATH=<path-to-your-backend>
```

Example:

```env
FRONTEND_PATH=/Users/username/code/phonebook-frontend
BACKEND_PATH=/Users/username/code/phonebook-backend
```

## Available Scripts

In the project directory, you can run:

### Development Mode

```bash
npm run dev
```

Runs the app in development mode using nodemon.
Server will run on http://localhost:3001

### Production Mode

```bash
npm start
```

Runs the app in production mode.
Server will run on the specified PORT or default to 3001.
