const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const accountRouter = require('./summoner/account');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/summoner', accountRouter);

server.get('/', (req, res) => {
    res.send('alive')
});

module.exports = server;