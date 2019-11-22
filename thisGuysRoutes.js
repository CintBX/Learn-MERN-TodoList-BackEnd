// Endpoints
// INDEX Todos
todoRoutes.get('/', (req, res) => {
	Todo.find((err, todos) => {
		if(err) {
			console.log(`Error: ${err}`);
		} else {
			res.json(todos);
		}
	});
});
// Other way, using Promises.  Get it working first, then try this. (check ShoppingList)
// todoRoutes.get('/', (req, res) => {
// 	Todo.find()
// 		.then(todos => res.json(todos))
// 		.catch(err => console.log(`Error: ${err}`))
// });


// SHOW Todo
todoRoutes.get('/:id', (req, res) => {
	const id = req.params.id;

	Todo.findById(id, (err, todo) => {
		if(err) {
			console.log(`Error: ${err}`);
		} else {
			res.json(todo);
		}
	});
})
// Other way, using Promises.  Get it working first, then try this. (check ShoppingList)
// todoRoutes.get('/:id', (req, res) => {
// 	const id = req.params.id;
// 	Todo.findById(id)
// 		.then(todo => res.json(todo))
// 		.catch(err => console.log(`Error: ${err}`))
// });


// NEW Todo
todoRoutes.post('/add', (req, res) => {
	let todo = new Todo(req.body);
	todo.save()
		.then(todo => res.status(200).json({ 'todo': 'Todo created successfully' }))
		.catch(err => res.status(400).send('Todo could not be created'))
})


// UPDATE Todo
todoRoutes.post('/edit/:id', (req, res) => {
	const id = req.params.id;
	Todo.findById(id, (err, todo) => {
		if(!todo) {
			res.status(404).send('data is not found')
		} else {
			todo.description = req.body.description;
			todo.responsible = req.body.responsible;
			todo.priority = req.body.priority;
			todo.completed = req.body.completed;

			todo.save()
				.then(todo => res.json('Todo Updated'))
				.catch(err => res.status(400).send('Todo could not be updated'))
		}
	});
});


// DELETE Todo (did this one myself)
todoRoutes.delete('/:id', (req, res) => {
	Todo.findById(req.params.id)
		.then(todo => todo.remove().then(() => res.json("Todo item has been deleted")))
		.catch(err => res.status(404).json({ success: false }));
});