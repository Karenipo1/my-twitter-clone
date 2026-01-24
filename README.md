# Twitter (X) Clone – Full Stack Web Application

## Overview

This project is a full stack web application developed as part of a Full Stack Web Development Bootcamp, with a strong focus on hands-on practice using modern technologies.

The application is a Twitter (X) clone, implementing a UI inspired by the current platform, core social media features, authentication, protected routes, and dynamic data handling.

The goal of this project is to demonstrate real-world React and Next.js experience, covering both frontend and backend development.

## Demo

🔗 [Vercel deployment recommended](https://my-twitter-clone-liart.vercel.app/)
📸 Coming soon Screenshots

👉 **Click “Login as Demo User” on the login page to access the application instantly.**  
> Demo access is provided for evaluation purposes only.

## Project Description

The application reproduces the main structure and functionality of a social media platform similar to Twitter (X):

- Three-column layout (left menu, main feed, right sidebar)

- User authentication and session handling

- Dynamic content rendering

- Responsive design with light/dark mode

- Integration with external and internal APIs

The backend is implemented using **Next.js API Routes, connected to MongoDB Atlas, with authentication handled by NextAuth.js and middleware-based route protection.**

## Main Features:

- Authentication

- User registration

- Login and logout

- Session management using cookies and JWT

- Protected routes using Next.js middleware

## Structure
🏠 Home Layout

- Left sidebar: navigation menu

- Center feed: tweets/posts

- Right sidebar: news section (public API consumption)


📂 Left Sidebar Navigation

- Home – Redirects to home or login depending on authentication status

- Search / Explore – Uses dummy data, active/inactive tabs, and dynamic styles

- Notifications – React page reusing shared components and styles

- Messages – React page reusing shared components and styles

- More menu:

Profile – Reads session data from cookies and database

Settings – Validates current password and allows password updates

- Post (Compose) – Modal with relative/absolute positioning and image URL storage

- Logout – Sign out using NextAuth


🧩 Components

- Header – Session data handling, theme toggle (light/dark), responsive behavior

- Footer – Dynamic data rendering

- Reusable UI components across pages


## Technologies Used

Next.js – Server-side rendering, routing, API routes, middleware

React – Component-based architecture and state management

JavaScript (ES6+) – Application logic and UI interactions

MongoDB Atlas (Cloud) – NoSQL database

Mongoose – Data modeling and database interaction

NextAuth.js (JWT) – Authentication and authorization

Tailwind CSS – Responsive and scalable styling

REST APIs / Fetch / Axios – Data consumption

Cookies & Sessions – Client session handling

Lucide React – Icons library

## What This Project Demonstrates

- Frontend Development

- Component-based UI with React

- State management and reusable components

- Responsive layouts and UI patterns

- Advanced UI & UX

- Multi-column layouts

- Modals and overlays

- Light/Dark theme switching

- Active/inactive navigation states

- Backend Fundamentals

- API Routes with Next.js

- Authentication and middleware

- Database integration with MongoDB

- Full Stack Application Development

- End-to-end feature implementation

- Authentication flow

- Real-world project structure similar to production apps

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser at:

http://localhost:3000

## Future Improvements

- Unit and integration testing

- Improved error handling

- Performance optimizations

- Enhanced accessibility

- Additional features (likes, comments, follow system)

## Author

Developed as a personal and portfolio project to showcase full stack development skills using React and Next.js.
