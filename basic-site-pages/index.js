// Import the built-in Node modules we need
const http = require('http'); // Used to create the web server
const fs = require('fs');     // Used to read files from your hard drive
const path = require('path'); // Used to safely combine file paths

// Create the server
const server = http.createServer((req, res) => {
  
  // 1. Figure out which file the user is asking for based on the URL
  let filePath = '';
  
  if (req.url === '/' || req.url === '') {
    filePath = 'index.html';
  } else if (req.url === '/about') {
    filePath = 'about.html';
  } else if (req.url === '/contact-me') {
    filePath = 'contact-me.html';
  } else {
    // If the URL doesn't match anything above, route them to the 404 page
    filePath = '404.html';
  }

  // 2. Read that specific HTML file from your hard drive
  fs.readFile(path.join(__dirname, filePath), (err, content) => {
    
    if (err) {
      // If something goes wrong reading the file (e.g., server error)
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
    } else {
      // 3. Send the file back to the browser!
      // We set the status code to 404 if it's the error page, otherwise 200 (Success)
      const statusCode = filePath === '404.html' ? 404 : 200;
      
      // Tell the browser we are sending HTML
      res.writeHead(statusCode, { 'Content-Type': 'text/html' }); 
      
      // Send the actual content of the file
      res.end(content); 
    }
  });
});

// 4. Tell the server to listen for requests on port 8080
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running! Check it out at http://localhost:${PORT}`);
});