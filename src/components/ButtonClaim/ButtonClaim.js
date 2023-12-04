import "./ButtonClaim.css";

function Button2({ text, onclick=null }) {
  return (
    <>
      <button className={`buttonClaim`} onClick={onclick?onclick:null}>
        <div className="buttonClaim-text">{text}</div>
      </button>
    </>
  );
}

export default Button2;
