import { useState, useEffect } from "react";
import "./UserTopics.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";

function UserTopics({ selectedTopic, setSelectedTopic, showTopics }) {
  const [topics, setTopics] = useState([]);
  const { getTopics } = useStore(useDataStore);

  useEffect(() => {
    const fetchData = async () => {
      const topics = await getTopics();
      const priorityTopic =topics&& topics.find((topic) => topic.id === 1);
      const otherTopics = topics && topics.filter((topic) => topic.id !== 1);
      setTopics(priorityTopic ? [priorityTopic, ...otherTopics] : topics);
    };
    fetchData();
  }, []);

  // const toggleTopics = () => {
  //   setSelectedTopic(!showTopics);
  // };
  return (
    <>
      <div className={`topic-container ${showTopics ? "active" : null}`}>
        {topics &&
          topics
            .sort((a, b) => b.used - a.used)
            .map((topic) => (
              <>
                <button
                disabled={!showTopics}
                  key={topic.id}
                  className="button-topic"
                  onClick={() => {
                    setSelectedTopic(topic);
                  }}
                >
                  <div className="button-topic-text">{topic.topic_name}</div>
                  <div className="button-topic-icon">{topic.active_genies}</div>
                </button>
              </>
            ))}
      </div>
    </>
  );
}

export default UserTopics;
