import { useState, useEffect } from "react";
import './Topics.css';
import { getTopics } from '../../services/getData';

function UserTopics({ showTopics, setShowTopics ,setSelectedTopic}) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const localData = localStorage.getItem("topics");
      if (localData) {
        setTopics(JSON.parse(localData));
      } else {
        const data = await getTopics();
        if (data && data.length > 0) { 
          localStorage.setItem("topics", JSON.stringify(data));
          setTopics(data);
        }
      }
    };
    fetchData();
  }, []); 

  return (
    <div className="topic-container">
      <span onClick={() => { setShowTopics(false) }}>X</span>
      <div>topics</div>
      {topics.map((topic) => (
        <button
          key={topic.id}
          style={{ backgroundColor: topic.color }}
          className="topic-item"
          onClick={() => { setSelectedTopic(topic); setShowTopics(false) }}
        >
          {topic.topic_name}{`(${topic.active_genies})`}
        </button>
      ))}
    </div>
  );
}

export default UserTopics;
