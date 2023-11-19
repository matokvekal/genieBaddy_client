// import "./Head.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

function HeadUserPost() {
  function goBack() {
    window.history.back();
  }
  return (
    <>
      <div className="mainhead">
        <div className="head navmenu">
          <div className="menu-icons">
            {
              <FontAwesomeIcon
                className="fa-icon faArrowAltCircleLeft"
                icon={faArrowAltCircleLeft}
                onClick={goBack}
              />
            }
            <span>Genie Baddy</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadUserPost;
