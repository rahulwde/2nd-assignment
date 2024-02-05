const http = require('http');
const fs = require('fs');
const url = require('url');
const multer = require('multer');

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;

  // Home page
  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Home Page');
    res.end();
  }
  // About page
  else if (path === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is About Page');
    res.end();
  }
  // Contact page
  else if (path === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is Contact Page');
    res.end();
  }
  // File write
  else if (path === '/file-write') {
    fs.writeFile('demo.txt', 'hello world', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error writing file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('File "demo.txt" created and text "hello world" written');
      }
      res.end();
    });
  }
  // File upload
  else if (path === '/uploads') {
    // Handle file upload using Multer
    upload(req, res, function (error) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("File Upload Fail");
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("File Upload Success");
      }
    });
  }
  // 404 Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, './uploads');
  },
  filename: function (req, file, callBack) {
    callBack(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('myfile');

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
