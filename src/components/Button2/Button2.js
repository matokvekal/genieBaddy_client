import "./Button2.css";

function Button2({ text }) {
  return (
    <>
      <button className={`button2`}>
        <div className="button1-text">{text}</div>
      </button>
    </>
  );
}

export default Button2;
