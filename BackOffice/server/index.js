const port = process.env.PORT || 5000
const cors = require('cors')
const express = require('express');
const connect = require('./data/connection');
const routes = require('./data/routes');
connect();
const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(cors());

app.listen(port, () => {
    console.log(`Application running at port ${port}`)
})