import "./Button1.css";

function Button1({ onClick, disabled = false, text, icon, className }) {
  return (
    <>
      <button
        className={`button1 ${className} ${disabled?"disabled":null} `}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="button1-text">{text}</div>
        <div className="button1-icon">{icon}</div>
      </button>
    </>
  );
}

export default Button1;
