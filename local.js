const app = require('./app.js');
const port = 3000;

// Server
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});
