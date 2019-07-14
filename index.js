const express = require('express');
const cors = require('cors')
const server = express();


server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.json({ message: `The server is on and waiting for requests...`})
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))