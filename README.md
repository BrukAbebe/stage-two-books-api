# Stage Two Books API

This repository contains the setup for a backend server using Express.js, specifically designed for managing a collection of books. The server provides several routes to create, retrieve, update, and delete books, as well as additional features like pagination and favorites.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Live Demo](#live-demo)

## Overview

The **Book Collection API** allows users to manage their book collections with various operations including creating new books, retrieving lists of books, and marking favorites. It serves as a practical example of building a RESTful API with Node.js and Express.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/stage-two-books-api.git
   cd stage-two-books-api

2. **Install Dependencies**:
    Make sure you have Node.js and npm installed, then run:

    ```bash
    npm install

3. **Run the Application**:
    Start the server with:

    ```bash
    npm start

4. **Access the API**:
    The API will be available at http://localhost:3000 (or the port specified in your configuration). 

## Usage

Once the server is running, you can interact with the API using tools like Postman or cURL to test the various endpoints.

## Routes

Here’s a list of the available routes:

1. **Create a New Book**
   - **Method**: `POST`
   - **Endpoint**: `/books`
   - **Description**: Add a new book to the collection.

2. **Retrieve All Books**
   - **Method**: `GET`
   - **Endpoint**: `/books`
   - **Description**: Get a list of all books.

3. **Retrieve Books with Pagination**
   - **Method**: `GET`
   - **Endpoint**: `/books?page=1&limit=10`
   - **Description**: Get a paginated list of books.

4. **Update a Book by ID**
   - **Method**: `PUT`
   - **Endpoint**: `/books/:id`
   - **Description**: Modify an existing book's details.

5. **Delete a Book by ID**
   - **Method**: `DELETE`
   - **Endpoint**: `/books/:id`
   - **Description**: Remove a book from the collection.

6. **Get a Random Book Recommendation**
   - **Method**: `GET`
   - **Endpoint**: `/books/recommendations`
   - **Description**: Receive a random book suggestion.

7. **Mark a Book as a Favorite**
   - **Method**: `PUT`
   - **Endpoint**: `/books/favorite/:id`
   - **Description**: Add a book to your favorites.

8. **Retrieve All Favorite Books**
   - **Method**: `GET`
   - **Endpoint**: `/books/favorites`
   - **Description**: Get a list of your favorite books.

9. **Search for Books**
   - **Method**: `GET`
   - **Endpoint**: `/books/search`
   - **Description**: Find books based on search criteria.

## Live Demo

The API is deployed and can be accessed at:

[https://stage-two-books-api.vercel.app](https://stage-two-books-api.vercel.app)