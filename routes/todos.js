var express = require('express');
var router = express.Router();

const todos = [
  {
    id: 1,
    name: "todo 1",
    is_completed: false
  },
  {
    id: 2,
    name: "todo 2",
    is_completed: true
  },
  {
    id: 3,
    name: "todo 3",
    is_completed: true
  }, {
    id: 4,
    name: "todo 4",
    is_completed: false
  }
];

/* GET todos lists. */
router.get('/', function (req, res, next) {
  res.json(todos);
});

/* GET single todo. */
router.get('/:id', function (req, res, next) {
  let todo = todos.find(el => el.id == req.params.id);
  if (todo) {
    return res.json(todo)

  }
  return res.status(404).send()
});
/* add new todo. */
router.post('/', function (req, res, next) {
  let existing = todos.find(el => el.name == req.body.name);
  if (!existing) {
    let newTodo = {
      id: todos.length + 1,
      ...req.body,
      is_completed: false
    };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  }
  return res.status(400).send()
});


module.exports = router;
