// server.js à la racine de assignment-app
const express = require('express');
const path = require('path');

const app = express();

// Dossier du build Angular (ng build)
const distFolder = path.join(__dirname, 'dist', 'assignment-app', 'browser');

// Fichiers statiques Angular
app.use(
  express.static(distFolder, {
    maxAge: '1y'
  })
);


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

// Lancement du serveur
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Front Angular servi sur http://localhost:${port}`);
});
