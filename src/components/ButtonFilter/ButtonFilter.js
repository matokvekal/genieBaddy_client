import "./ButtonFilter.css";

function ButtonFilter({ text, items, className }) {
  return (
    <>
      <button className={`buttonFilter ${className}`}>
        <div className="buttonFilter-text">{text}</div>
        <div className="buttonFilter-icon">{items}</div>
      </button>
    </>
  );
}

export default ButtonFilter;
