import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import { getGeniePosts } from "api/geniePosts"; // Import


function NoNewPostsToClame() {
  return (
    <div className="posts-noposts">
      <div className="nopost-section">
        <div className="nopost-text-upper">
          You dont have any post yet
        </div>
        <div className="nopost-text-middle">
          Start by searcing for new posts.
        </div>
        <div className="nopost-text-lower">
            <img src={require(`assets/PNG/4stars.png`)} alt="4stars" />
        </div>
      </div>
    </div>
  );
}

export default NoNewPostsToClame;
