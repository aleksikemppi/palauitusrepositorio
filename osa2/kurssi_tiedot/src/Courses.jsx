import React from 'react';

const Courses = () => {
  const courseParts = [
    {
      name: 'Half Stack application development',
      parts: [
        { name: 'Fundamentals of React', exercises: 10 },
        { name: 'Using props to pass data', exercises: 7 },
        { name: 'State of a component', exercises: 14 },
        { name: 'Redux', exercises: 11 }
      ],
      total: 42
    },
    {
      name: 'Node.js',
      parts: [
        { name: 'Routing', exercises: 3 },
        { name: 'Middlewares', exercises: 7 }
      ],
      total: 10
    }
  ];

  return (
    <div>
      {courseParts.map(course => (
        <div key={course.name}>
          <h2 style={{ marginTop: '20px' }}>{course.name}</h2>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {course.parts.map(part => (
              <li key={part.name} style={{ marginBottom: '5px' }}>
                {part.name} {part.exercises}
              </li>
            ))}
          </ul>
          <strong>total of {course.total} exercises</strong>
        </div>
      ))}
    </div>
  );
};

export default Courses;
