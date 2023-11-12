import React, { useEffect, useState } from "react";
import { getAllTopics } from "services/getData";
import TopicCard from "./TopicCard";
import "./Topics.css";

const Topics = (props) => {
  const search = props.search;
  // console.log("At Topics");
  const [genieTopics, setGenieTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    let data = [];
    const fetchData = async () => {
      try {
        let response = await getAllTopics();
        data = response?.data?.result;

        // console.log("Fetched topics:", data);
        setGenieTopics(data);
      } catch (error) {
        console.log("Error fetching topics:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterTopics = () => {
      if (search) {
        const filtered = genieTopics.filter((topic) =>
          topic.topic_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTopics(filtered);
      } else {
        setFilteredTopics(genieTopics);
      }
    };

    filterTopics();
  }, [search, genieTopics]);

  return (
    <div className="topics-container">
      <>
        {filteredTopics.length === 0 && <p>No topics found</p>}
        {filteredTopics &&
          filteredTopics
            .sort((a, b) => (a.topic_name > b.topic_name ? 1 : -1))
            .map((topic) => <TopicCard key={topic.id} topic={topic} />)}
      </>
    </div>
  );
};

export default Topics;
