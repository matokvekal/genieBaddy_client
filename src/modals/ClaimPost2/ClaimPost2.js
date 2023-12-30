import { useEffect, useState } from "react";
import "./ClaimPost2.css";
import HeadGenieClaim from "../../geniePages/heads/HeadGenieClaim";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { genieGetNewPosts } from "services/getData";
import { useNavigate } from "react-router-dom";

const ClaimPost2 = ({ postIndex, newPosts, setNewPosts }) => {
  const {
    updateGenieNewPostCounter,
    triggerToast,
    updateGeniePagesStates,
    updateModalsStates,
  } = useStore(useDataStore);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await genieGetNewPosts();
        if (data && data.data.result?.length > 0) {
          setNewPosts(data.data.result);
          updateGenieNewPostCounter(data.data.result.length);
        } else {
          updateGenieNewPostCounter(0);
          triggerToast(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function goBack() {
    updateGeniePagesStates("geniePosts", "open");
    updateModalsStates("sidebar", "close");
    navigate("/");
    // window.history.back();
  }
  return (
    <>
      <div className="modal-claim-post">
        <div className="claim-post-up" onClick={goBack}>
          <img
            src={require(`assets/PNG/close_post.png`)}
            className="genie-arrow-back"
            alt="arrow back"
          />
        </div>
        {newPosts && newPosts.length > 0 && newPosts[postIndex] ? (
          <>
            <div className="claim-post-down">
              <HeadGenieClaim post={newPosts[postIndex]} />
              <div
                className="claim-babble"
                onClick={() => updateModalsStates("sidebar", "close")}
              >
                {newPosts[postIndex][`user_1`]}
              </div>
            </div>
          </>
        ) : (
          <div className="claim-post-down noposts">
            <div className="nopost-section">
              <div className="nopost-text-upper">
                No ready post yet, please come back later.
              </div>
              <div className="nopost-text-middle">
                Please wait for new posts.
              </div>
              <div className="nopost-text-lower">
                <img src={require(`assets/PNG/4stars.png`)} alt="4stars" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* sender={newPosts[postIndex]["user_nickname"]}
      date={formatDate(newPosts[postIndex][`user_1_date`])}
      message={newPosts[postIndex][`user_1`]}
      isMine={false}
      avatar={newPosts[postIndex]["user_avatar"]} */}
    </>
  );
};

export default ClaimPost2;
