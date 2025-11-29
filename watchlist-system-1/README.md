# Watchlist System

## Overview
The Watchlist System is an application designed to help users track their favorite stocks and receive daily news summaries related to their watchlist. This project utilizes Mongoose for database interactions and Inngest for handling background tasks.

## Project Structure
```
watchlist-system
├── src
│   ├── database
│   │   ├── models
│   │   │   └── watchlist.model.ts
│   │   └── config.ts
│   ├── actions
│   │   ├── watchlist.actions.ts
│   │   └── news.actions.ts
│   ├── inngest
│   │   ├── functions
│   │   │   └── daily-news-summary.ts
│   │   └── client.ts
│   ├── types
│   │   └── index.ts
│   └── app.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd watchlist-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `src/database/config.ts`.

## Usage
1. Start the application:
   ```
   npm start
   ```

2. The application will initialize the server and set up the necessary routes for interacting with the watchlist and fetching news.

## Features
- **Watchlist Management**: Users can add, remove, and view their stock watchlist.
- **News Fetching**: The application fetches news articles related to the stocks in the user's watchlist.
- **Daily Summaries**: Users receive daily email summaries of news articles related to their watchlist.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.