const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./build'));

app.use('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
