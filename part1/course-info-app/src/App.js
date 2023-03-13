const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const Header = (props) => {
    return <h1>{props.course}</h1>;
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
      <div>
        <Part part={parts[0].name} exercises={parts[0].exercises} />
        <Part part={parts[1].name} exercises={parts[1].exercises} />
        <Part part={parts[2].name} exercises={parts[2].exercises} />
      </div>
    );
  };

  const Total = (props) => {
    return <p>Number of exercises {props.total}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total
        total={parts[0].exercises + parts[1].exercises + parts[2].exercises}
      />
    </div>
  );
};

export default App;
