# URL Shortener

A simple URL shortener application that allows users to shorten long URLs and manage the shortened versions.

## Features

- **Shorten URLs:** Convert long URLs into shorter, more manageable links.
- **Authentication:** User authentication for URL shortening and management.
- **User Registration:** New users can register to access the URL shortening functionality.
- **Login/Logout:** Authentication system with login and logout functionality.
- **View Shortened URLs:** Access and manage the list of shortened URLs.

## Technologies Used

- React.js for the front-end user interface.
- Nest.js for the backend API.
- MongoDB for data storage.
- Tailwind CSS for styling.
- React Router for routing.
- Axios for HTTP requests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shobi172/Url_shortener.git
   ```

2. Install dependencies for the frontend and backend:

   ```bash
   cd Url_shortener/frontend
   npm install

   cd ../backend
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the `backend` directory and add the following configuration:

     ```dotenv
     DB_URI="your-mongouri"
     JWT_SECRET="your-secret"
     JWT_EXPIRES="your-expiry-time"
     ```

   - Ensure you replace `your-mongouri`, `your-secret`, and `your-expiry-time` with your actual MongoDB URI, JWT secret, and token expiry time respectively.

4. Run the application:

   ```bash
   # Start the backend server
   cd backend
   npm run start

   # Start the frontend server
   cd ../frontend
   npm start
   ```

5. Access the application at `http://localhost:3001` in your browser.

## Usage

- Register or login to access the URL shortening functionality.
- Enter a long URL and click "Shorten" to generate a shortened link.
- View and manage the list of shortened URLs.

## Contribution

Contributions are welcome! Please fork the repository and create a pull request with your changes.
