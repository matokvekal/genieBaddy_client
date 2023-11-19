function NoPosts() {
  return (
    <div className="posts-noposts">
      <div className="nopost-section">
        <div className="nopost-text-upper">
          You dont have any active chats yet.
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
