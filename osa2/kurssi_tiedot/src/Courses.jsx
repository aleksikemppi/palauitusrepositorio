import React from 'react';

const Header = ({ course }) => {
    if (course && course.name) {
      return <h1>{course.name}</h1>;
    } else {
      return <h1>Unknown course</h1>;
    }
  }
  
  const Total = ({ parts }) => {
    if (Array.isArray(parts) && parts.length > 0) {
      const sum = parts.reduce((total, part) => {
        return total + part.exercises;
      }, 0);
  
      return <p><b>Number of exercises {sum}</b></p>;
    } else {
      return <p><b>Unknown number of exercises</b></p>;
    }
  } 
  
  const Content = ({ parts }) => {
    if (Array.isArray(parts) && parts.length > 0) {
      return (
        <div>
          <p>Course info</p>
          <ul>
            {parts.map((part, index) => (
              <li key={index}>
                {part.name + " " +  part.exercises}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>No course info available</p>;
    }
  }
const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};



export default Courses;
