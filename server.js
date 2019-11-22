const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(
	'mongodb://127.0.0.1:27017/todos', 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('Connected to MongoDB...')
});


// ROUTES
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);


// Run Server
app.listen(PORT, () => {
	console.log(`Server running on Port: ${PORT}`);
});