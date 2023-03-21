const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
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
    ],
  };

  const Header = (props) => {
    return <h1>{props.name}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    );
  };
  const Content = () => {
    return (
      <ul>
        {course.parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
      </ul>
    );
  };
  const Total = () => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p> total of {total} exercises</p>;
  };

  const Course = () => {
    return (
      <>
        <Header name={course.name} />
        <Content />
      </>
    );
  };

  return (
    <div>
      <Course />
      <Total />
    </div>
  );
};

export default App;
