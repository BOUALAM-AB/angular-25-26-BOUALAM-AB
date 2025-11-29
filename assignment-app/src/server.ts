
const express = require('express');
const path = require('path');
const app = express();


const distFolder = path.join(__dirname, 'dist', 'assignment-app', 'browser');

app.use(express.static(distFolder));

app.get('*', (req: any, res: { sendFile: (arg0: any) => void; }) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

const port = process.env["PORT"] || 4000;
app.listen(port, () => {
  console.log(`Front Angular servi sur http://localhost:${port}`);
});
