const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const api = require('./server/routers/api');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'dist/colorrendering-platform/browser/')));
app.use('/uploads', express.static('uploads'));
app.use('/output_masks', express.static('output_masks'));

app.use('/api', api);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/colorrendering-platform/browser/index.html'));
});

// Multer setup for file uploads with custom storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

// Image upload and processing route
app.post('/upload', upload.single('image'), (req, res) => {
    const imagePath = path.join(__dirname, req.file.path);
    const masksJsonPath = path.join(__dirname, 'masks.json');
    const outputMasksDir = path.join(__dirname, 'output_masks');
    
    // Execute segmentation.py
    exec(`python ./python_code/segmentation.py ${imagePath} ${masksJsonPath}`, (err, stdout, stderr) => {
        if (err) {
            console.error('Error executing segmentation.py:', stderr);
            return res.status(500).send({ error: 'Failed to generate masks' });
        }

        // Execute create_pngs.py
        exec(`python ./python_code/create_masks.py ${masksJsonPath} ${outputMasksDir}`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error executing create_pngs.py:', stderr);
                return res.status(500).send({ error: 'Failed to create PNGs' });
            }

            // Send back the path to the generated masks
            fs.readdir(outputMasksDir, (err, files) => {
                if (err) {
                    console.error('Error reading output_masks directory:', err);
                    return res.status(500).send({ error: 'Failed to read output masks' });
                }
                res.send({ image: req.file.filename, masks: files });
            });
        });
    });
});

// Start server
const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
