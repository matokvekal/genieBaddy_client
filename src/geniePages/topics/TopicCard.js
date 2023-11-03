import React, { useEffect, useState } from "react";
import { updateTopic } from "services/getData";
import "./TopicCard.css";

const Topic = (props) => {
  const topic = props.topic;
  const [checked, setChecked] = useState(topic.topic_exists);

  const handleTopic = async () => {
    setChecked(!checked);
    let data = {
      topic_id: topic.id,
      topic_exists: !checked,
    };
    try {
      let response = await updateTopic(data);
      // console.log("response:", response);
    } catch (error) {
      console.log("Error updating topic:", error);
    }
  };

  return (
    <section className="topic-card">
      <header className="card-header">{topic.topic_name}</header>
      <div className="card-content">
        <div className="icon-container">
          <i className="fa fa-area-chart"></i>
        </div>
        <div className="total-header">
          <div>Total genies:</div>
          <div>{topic.active_genies}</div>
        </div>
      </div>
      <div className="card-footer">
        <input
          type="checkbox"
          className="topic-checkbox"
          checked={checked}
          onChange={handleTopic}
        />
      </div>
    </section>
  );
};

export default Topic;
