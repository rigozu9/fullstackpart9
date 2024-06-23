import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong>
          </p>
          <p><i>{props.part.description}</i></p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong>
          </p>
          <p>project exercises: {props.part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong>
          </p>
          <p><i>{props.part.description}</i></p>
          <p>Bbckground material: <a href={props.part.backgroundMaterial}>{props.part.backgroundMaterial}</a></p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <strong>{props.part.name} {props.part.exerciseCount}</strong>
          </p>
          <p><i>{props.part.description}</i></p>
          <p>required skills: {props.part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return <div />;
  }
};

export default Part;
