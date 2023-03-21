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
  const Content = (props) => {
    return (
      <ul>
        {course.parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
      </ul>
    );
  };
  const Total = (props) => {
    return <p>Number of exercises {props.total}</p>;
  };

  const Course = (props) => {
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
      <Total
        total={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};

export default App;
