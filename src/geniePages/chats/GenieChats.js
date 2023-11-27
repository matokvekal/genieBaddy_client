import { Navbar } from "components";
import "./genieChats.css";
import { useState, useEffect } from "react";
import Chats from "./Chats";
import { getGenieChatHeaders } from "services/getData";
const GenieChats = () => {
  const [headers, setHeaders] = useState([]);
  const [headerType, setHeaderType] = useState("new");
  const [message, setMessage] = useState(null);
  const text = {
    topText: "Hi genie, please select up to 5 topics that you can help with",
  };
  const fetchData = async (type) => {
    try {
      setMessage(null);
      setHeaders(null);
      let response = await getGenieChatHeaders(type);
      const data = response?.data?.result;
      if (data.length === 0) {
        setMessage(response?.data?.message);
      } else {
        setHeaders(data);
      }
    } catch (error) {
      console.log("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    fetchData("open");
  }, []);

  const handleHeaders = (type) => {
    setHeaderType(type);
    // console.log(type);
    fetchData(type);
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="upper-message">
          <div className="upper-header">
            GenieChats Here you can search or select new posts
          </div>
          <div className="search">
            <input type="text" placeholder="search" />
          </div>
          <div className="filter">
            <button onClick={() => handleHeaders("closed")}>Closed</button>
            <button onClick={() => handleHeaders("open")}>Open</button>
            <button onClick={() => handleHeaders("new")}>New</button>
            <button onClick={() => handleHeaders("stars")}>Stars</button>
          </div>
        </div>
        <div>
          {headers ? (
            <Chats
              headers={headers}
              headerType={headerType}
              user="genie"
              message={message}
              setChat={setHeaders}
              chat={headers}
              sendChat={setHeaders}
            />
          ) : (
            <div className="message">{message}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default GenieChats;

//write function to reload wether from server
//write function to send message to server
