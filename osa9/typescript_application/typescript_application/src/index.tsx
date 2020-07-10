import React from "react";
import ReactDOM from "react-dom";
import { HeaderProps, ContentProps, TotalProps } from "./types";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header: React.FC<HeaderProps> = (props) => {
    return <h1>{props.name}</h1>;
  };
  
  const Content: React.FC<ContentProps> = (props) => {
    return (
      <div>
        {props.exArray.map(course => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
      </div>
    )
  };
  
  const Total: React.FC<TotalProps> = (props) => {
    return (
      <p>
        Number of exercises{" "}
        {props.exArray.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content exArray={courseParts} />
      <Total exArray={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));