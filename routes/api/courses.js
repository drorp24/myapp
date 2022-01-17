const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  { id: '1', name: 'Computer science', instructor: 'David' },
  { id: '2', name: 'Calculation complexity', instructor: 'John' },
  { id: '3', name: 'Data structures', instructor: 'Roger' },
];

router.get('/', function (req, res) {
  // leave original array (+ potential added records) unsorted
  const coursesClone = [...courses];

  const response =
    'sort' in req.query
      ? coursesClone.sort((a, b) => a.name.localeCompare(b.name))
      : courses;

  res.send(response);
});

router.get('/ids/:id', function (req, res) {
  const { id } = req.params;
  const foundCourse = id && courses.find((course) => course.id === id)?.name;

  if (foundCourse) {
    res.send({ foundCourse });
  } else {
    res.status(404).send('The course with given id was not found');
  }
});

router.post('/', function (req, res) {
  const { name } = req.body;
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  const { error, value } = schema.validate({ name });
  if (error) {
    res.status(400).send(error?.details[0]?.message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name,
  };

  courses.push(course);
  res.send(course);
});

module.exports = router;
