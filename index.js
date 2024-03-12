const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello!')
});

const port = 3003;
app.listen(process.env.PORT || port);

console.log('Web Server is listening at port ' + (process.env.PORT || port));