


import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import { getGeniePosts } from "api/geniePosts"; // Import


const NotFound = () => {
  return (
    <div className="posts-noposts">
      <div className="nopost-section">
        <div className="nopost-text-upper">
          We are working on it.
        </div>
        <div className="nopost-text-middle">
         404
        </div>
        <div className="nopost-text-lower">
            <img src={require(`assets/PNG/4stars.png`)} alt="4stars" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
