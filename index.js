const express = require('express');
const app = express();
const PORT = 4444;

app.get('/', (req, res) => {
    res.send('hello nikesh');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
