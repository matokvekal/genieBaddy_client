import "./Button3.css";

function Button3({ text }) {
  return (
    <>
      <button className={`button3`}>
        <div className="button1-text">{text}</div>
      </button>
    </>
  );
}

export default Button3;
