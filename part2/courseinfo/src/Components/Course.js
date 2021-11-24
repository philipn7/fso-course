const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <h4>
        total of{' '}
        {course.parts.reduce((sum, part) => {
          return sum + part.exercises;
        }, 0)}{' '}
        exercises
      </h4>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

export default Course;
