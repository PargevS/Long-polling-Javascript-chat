const express = require('express');
const cors = require('cors');
const events = require('events');

// main vars
const emitter = new events.EventEmitter();
const PORT = 8000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/get-message', (req, res) => {
    //creating an event to receive a new message
    emitter.once('newMessage', (message) => res.json(message));
});

app.post('/add-message', (req, res) => {
    // receiving a new message
    const message = req.body;

    console.log(req.body)

    //sending a new message to the chat to show
    emitter.emit('newMessage', message);

    res.status(200);
});



// run server
app.listen(PORT, () => console.log(`server started on port ${PORT}`));