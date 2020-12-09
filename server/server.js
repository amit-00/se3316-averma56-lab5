const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDb = require('./config/db');

const app = express();

const PORT = process.env.PORT || 3000;

connectDb();

app.use(express.json({ extended: false }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
app.use(cors());
//Set static folder to serve html
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/courses', require('./routes/api/courses'));
app.use('/api/schedule', require('./routes/api/schedule'));
app.use('/api/docs', require('./routes/api/docs'));


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => (`Server started on port ${PORT}`));