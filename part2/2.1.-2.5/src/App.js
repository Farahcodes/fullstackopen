const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

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
      </>
    );
  };

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Course course={course} />
          <Total course={course} />
        </div>
      ))}
    </div>
  );
};

export default App;
