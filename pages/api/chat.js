// In-memory array to store chat comments
// Note: This data will be lost when the server restarts
let comments = [];

export default function handler(req, res) {
  // Handle GET requests - return all comments
  if (req.method === 'GET') {
    res.status(200).json(comments);
  } 
  // Handle POST requests - add new comment
  else if (req.method === 'POST') {
    // Extract name and text from request body
    const { name, text } = req.body;
    
    // Create new comment object with timestamp
    const newComment = { 
      name, 
      text, 
      timestamp: Date.now() // Unix timestamp in milliseconds
    };
    
    // Add new comment to start of array (most recent first)
    comments.unshift(newComment);
    
    // Return 201 Created status with the new comment
    res.status(201).json(newComment);
  } 
  // Handle unsupported HTTP methods
  else {
    res.status(405).end(); // Method Not Allowed
  }
}
