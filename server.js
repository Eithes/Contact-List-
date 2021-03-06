const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// app.get('/', (req, res) => {
//   res.json({
//     msg: 'Welcome to Contacts API'
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })