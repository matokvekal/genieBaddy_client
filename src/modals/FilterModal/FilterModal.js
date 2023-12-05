import { useState, useMemo, useEffect } from "react";
import "./FilterModal.css";
import ButtonFilter from "components/ButtonFilter/ButtonFilter";
import { POST_STATUS } from "constants/jeneral";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
// import { getGeniePosts } from "api/geniePosts"; // Import
const FilterModal = () => {
  const { getUserPosts, modals, setUserFilter } = useStore(useDataStore);
  const [selectedFilter, setSelectedFilter] = useState(POST_STATUS.ALL);

  const [data, setData] = useState([]);
  const [counter, setCounter] = useState({
    all: 0,
    open: 0,
    closed: 0,
    saved: 0,
  });
  useEffect(() => {
    debugger
    const fetchData = async () => {
      const fetchedData = await getUserPosts();
      setData(fetchedData);
    };

    fetchData();
  }, [getUserPosts]);
  useMemo(() => {
    let all = 0;
    let open = 0;
    let closed = 0;
    let saved = 0;
    data && !data.status && data?.forEach((post) => {
      if(post){
      all++;
      if (post.post_status === POST_STATUS.CLOSED) {
        closed++;
      } else if (post.post_status === POST_STATUS.OPEN) {
        open++;
      } else if (post.post_status === POST_STATUS.SAVED) {
        saved++;
      }}
    });
    setCounter({ all: all, open: open, closed: closed, saved: saved });
  }, [data]);


  const handleFilterClick = (filter) => {
    setUserFilter(filter);
    setSelectedFilter(filter);
  };
  const buttonsData = [
    {
      className: "",
      text: POST_STATUS.OPEN,
      items: counter.open,
      filter: POST_STATUS.OPEN,
    },
    {
      className: "",
      text: POST_STATUS.CLOSED,
      items: counter.closed,
      filter: POST_STATUS.CLOSED,
    },
    {
      className: "",
      text: POST_STATUS.SAVED,
      items: counter.saved,
      filter: POST_STATUS.SAVED,
    },
    {
      className: "",
      text: POST_STATUS.ALL,
      items: counter.all,
      filter: POST_STATUS.All,
    },
  ];

  return (
    <>
      <div className={`filter-modal ${modals.filter ? "open" : ""}`}>
        <div className="filter-modal-container">
          {buttonsData.map((button) => (
            <div
              key={button.text}
              onClick={() => handleFilterClick(button.filter)}
            >
              <ButtonFilter
                className={selectedFilter === button.filter ? "selected" : ""} // Your existing class
                text={button.text}
                items={button.items}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterModal;
