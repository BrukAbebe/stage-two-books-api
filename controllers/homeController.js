const DEPLOYMENT_URL = "http://localhost:3000"; 

exports.getHome = (req, res) => {
    res.status(200).json({
        success: true,
        message: {
            welcome: "Welcome to the Book Collection API!",
            description: "This API allows you to:",
            actions: [
                {
                    action: "Create a new book",
                    method: "POST /books",
                    description: "Add a new book to the collection."
                },
                {
                    action: "Retrieve all books",
                    method: "GET /books",
                    description: "Get a list of all books."
                },
                {
                    action: "Retrieve books with pagination",
                    method: "GET /books?page=1&limit=10",
                    description: "Get a paginated list of books."
                },
                {
                    action: "Update a book by ID",
                    method: "PUT /books/:id",
                    description: "Modify an existing book's details."
                },
                {
                    action: "Delete a book by ID",
                    method: "DELETE /books/:id",
                    description: "Remove a book from the collection."
                },
                {
                    action: "Get a random book recommendation",
                    method: "GET /books/recommendations",
                    description: "Receive a random book suggestion."
                },
                {
                    action: "Mark a book as a favorite",
                    method: "PUT /books/favorite/:id",
                    description: "Add a book to your favorites."
                },
                {
                    action: "Retrieve all favorite books",
                    method: "GET /books/favorites",
                    description: "Get a list of your favorite books."
                },
                {
                    action: "Search for books",
                    method: "GET /books/search",
                    description: "Find books based on search criteria."
                }
            ],
            apiLink: DEPLOYMENT_URL
        }
    });
};