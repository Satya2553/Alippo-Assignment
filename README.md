# Alippo Assignment

# React Table Component

This is a simple React table component with edit and delete functionalities. It fetches data from an API and displays it in a table format. Users can edit the entries in the first column and delete entries.

## Features

- Fetches data from the provided API: [https://assets.alippo.com/catalog/static/data.json](https://assets.alippo.com/catalog/static/data.json)
- Displays the data in a table format
- Allows users to edit entries in the first column
- Provides delete functionality for each entry

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm: [https://www.npmjs.com/](https://www.npmjs.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Satya2553/Alippo-Assignment
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Usage

4. Run the application:

    ```bash
    npm start
    ```

    This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

5. Explore the table:

    - View the table with data fetched from the API.
    - Click the "Edit" button to edit entries in the first column.
    - Click the "Delete" button to remove entries.

## File Structure

- `src/`
  - `Components/`
    - `Table.js`: The main React table component code.
    - `Table.css`: CSS styles for the table component.
  - `index.js`: Entry point for the React application.
