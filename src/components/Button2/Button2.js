import "./Button2.css";

function Button2({ text, onclick=null }) {
  return (
    <>
      <button className={`button2`} onClick={onclick?onclick:null}>
        <div className="button2-text">{text}</div>
      </button>
    </>
  );
}

export default Button2;
