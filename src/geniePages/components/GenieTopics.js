import { useState, useEffect } from "react";
import "./UserTopics.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useTranslation } from "react-i18next";

function UserTopics({ selectedTopic, setSelectedTopic }) {
  const [topics, setTopics] = useState([]);
  const { getTopics,modals } = useStore(useDataStore);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      const topics = await getTopics();
      const priorityTopic =topics && topics?.find((topic) => topic.id === 1);
      const otherTopics = topics && topics.filter((topic) => topic.id !== 1);
      setTopics(priorityTopic ? [priorityTopic, ...otherTopics] : topics);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={`topic-container ${modals.usertopics ? "open" : null}`}>
        {topics &&
          topics
            .sort((a, b) => b.used - a.used)
            .map((topic) => (
              <>
                <button
                disabled={!modals.usertopics}
                  key={topic.id}
                  className="button-topic"
                  onClick={() => {
                    setSelectedTopic(topic);
                  }}
                >
                  <div className="button-topic-text">{t(topic.topic_name)}</div>
                  <div className="button-topic-icon">{topic.active_genies}</div>
                </button>
              </>
            ))}
      </div>
    </>
  );
}

export default UserTopics;
