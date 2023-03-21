import React from "react";

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};
const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </ul>
  );
};
const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <strong> total of {total} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
