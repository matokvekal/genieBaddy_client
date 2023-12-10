import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { POST_STATUS } from "constants/jeneral";

function NoPosts() {
  const { userGenieFilter } = useStore(useDataStore);
  return (
    <div className="posts-noposts">
      <div className="nopost-section">
        <div className="nopost-text-upper">
          You dont have  {userGenieFilter===POST_STATUS.ALL?"":userGenieFilter} chats yet.
        </div>
        <div className="nopost-text-middle">
          Start by pressing the “new chat” button.
        </div>
        <div className="nopost-text-lower">
          <img src={require(`assets/PNG/4stars.png`)} alt="4stars" />
        </div>
      </div>
    </div>
  );
}

export default NoPosts;
