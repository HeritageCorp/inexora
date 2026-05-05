# Inexora V2

Inexora V2 is a hybrid application built using Next.js 14 with TypeScript, Prisma, and Firebase. This project aims to transform the MVP of Inexora into a production-ready application with real-time capabilities and a robust backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication via Firebase (Google, GitHub, Email/Password)
- Real-time messaging and notifications using Firebase Firestore and Cloud Messaging
- Persistent data storage with PostgreSQL via Prisma ORM
- Image uploads and storage with Firebase Storage
- Responsive UI built with Tailwind CSS and Framer Motion
- State management using Zustand and TanStack Query

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: Firebase Authentication
- **Database**: Supabase/PostgreSQL via Prisma
- **Real-time & Messaging**: Firebase Cloud Messaging and Firestore
- **Storage**: Firebase Storage
- **State Management**: Zustand and TanStack Query
- **UI/UX**: Tailwind CSS, Framer Motion, Radix UI

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/inexora-v2.git
   ```

2. Navigate to the project directory:
   ```
   cd inexora-v2
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your Firebase and database configuration.

5. Run the development server:
   ```
   npm run dev
   ```

## Usage

- Access the application at `http://localhost:3000`.
- Follow the on-screen instructions to sign up or log in.
- Explore the features including posting, chatting, and notifications.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.