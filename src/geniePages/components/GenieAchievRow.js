import "./GenieAchievRow.css";

const GenieAchievRow = ({ header, text, image, number }) => {
  return (
    <>
      <div className="achiev-row-item">
        <div className="achiev-item-left">
          <img src={require(`assets/PNG/${image}.png`)} alt="calendar" />
        </div>
        <div className="acieve-item-middle">
          <div className="acieve-middle-up">{header}</div>
          <div className="acieve-middle-lower">{text}</div>
        </div>
        <div className="achiev-item-right">{number}</div>
      </div>
    </>
  );
};

export default GenieAchievRow;
