const express = require('express');
const path = require('path');

const app = express();

// Build Angular (dist)
const distFolder = path.join(__dirname, 'dist', 'assignment-app', 'browser');

// Fichiers statiques
app.use(express.static(distFolder, {
  maxAge: '1y',
  index: false
}));

// Catch-all route (Express 5 compatible)
app.get('/(.*)', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

// Lancement serveur
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Front Angular servi sur http://localhost:${port}`);
});
