

import Chatrow from "./Chatrow";
const Chats = (props) => {
  const { headers, user } = props;

  return (
    <>
      {headers && (
        <div className="chats-container">
          {headers.map((item) => (
            <Chatrow item={item} key={item.id} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default Chats;
