const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Endpoints/Routes
// INDEX
router.get('/', (req, res) => {
	Todo.find()
		.then(todos => res.json(todos))
		.catch(err => console.log(`Error: ${err}`));
});


// SHOW
router.get('/:id', (req, res) => {
	Todo.findById(req.params.id)
		.then(todo => res.status(200).json(todo))
		.catch(err => res.status(400).json("Item not found"));
});


// NEW/CREATE
router.post('/add', (req, res) => {
	let todo = new Todo(req.body);

	todo.save()
		.then(todo => res.status(200).json(todo))
		.catch(err => res.status(400).json("Todo creation failed.  Please try again."));
});


// EDIT/UPDATE
router.post('/edit/:id', (req, res) => {
	Todo.findById(req.params.id, (err, todo) => {
		if(!todo) {
			res.status(404).res.json("Todo not found")
		} else {
			todo.description = req.body.description;
			todo.responsible = req.body.responsible;
			todo.priority = req.body.priority;
			todo.completed = req.body.completed;
		}
		todo.save()
			.then(() => res.json("Updated successfully"))
			.catch(() => res.json(err))
	})
});


// DELETE
router.delete('/delete/:id', (req, res) => {
	Todo.findById(req.params.id)
		.then(todo => todo.remove().then(() => res.json("Todo has been deleted")))
		.catch(err => res.status(404).json("Deletion error: Please try again"))
});

module.exports = router;