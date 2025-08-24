const EntrpItems = (props) => {
  return (
    <li>
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </li>
  );
};

export default EntrpItems;
