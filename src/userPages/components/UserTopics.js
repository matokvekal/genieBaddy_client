import { useState, useEffect } from "react";
import "./UserTopics.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useTranslation } from "react-i18next";

function UserTopics({ selectedTopic, setSelectedTopic }) {
  const [topics, setTopics] = useState([]);
  const { getTopics, modals, user_limits } = useStore(useDataStore);
  const { t } = useTranslation();

  const fetchData = async () => {
    const topics = await getTopics();
    const priorityTopic = topics && topics?.find((topic) => topic.id === 1);
    const otherTopics = topics && topics.filter((topic) => topic.id !== 1);
    setTopics(priorityTopic ? [priorityTopic, ...otherTopics] : topics);
  };

  useEffect(() => {
    fetchData();
  }, [user_limits.USER_POSTS_LEFT, getTopics]);

  if (!topics) {
    fetchData();
  }
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

// user_limits: {
//   USER_CHATS_PER_POST: null,
//   USER_POSTS_PER_DAY: null,
//   USER_POSTS_USED: null,
//   USER_POSTS_USED_DATE: null,
//   USER_POSTS_LEFT: null,
