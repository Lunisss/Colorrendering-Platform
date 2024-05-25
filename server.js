const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const api = require('./server/routers/api');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist/colorrendering-platform/browser/')));

app.use('/api', api);


// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/colorrendering-platform/browser/index.html'));
});



// Start server
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
