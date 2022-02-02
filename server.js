//Require Express And Mongoose
const express = require('express');
const mongoose = require('mongoose');

//Middleware
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

//Connect To Mongoose Server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.set('debug', true);


//Listen For Server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
