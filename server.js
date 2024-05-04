const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Handling the save-image endpoint
  if (req.url === '/save-image' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', () => {
      // Parse JSON body
      const imageData = JSON.parse(body);
      // Decode base64 image data
      const base64Data = imageData.image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      // Save image to server (adjust path as needed)
      const filePath = path.join(__dirname, 'BMICalculator', 'images', 'friend_photo.jpg');

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error('Error saving image:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Error saving image' }));
        } else {
          console.log('Image saved successfully');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Image saved successfully' }));
        }
      });
    });
  } else {
    // Handling other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
