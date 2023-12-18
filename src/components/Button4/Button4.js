import "./Button4.css";

function Button4({ text }) {
  return (
    <>
      <button className={`button4`}>
        <div className="button4-text">{text}</div>
      </button>
    </>
  );
}

export default Button4;
