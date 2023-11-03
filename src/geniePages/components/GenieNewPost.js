//when page  open
//go to server and select 5 post
//newr each post we will write that ocupide by the ginie id and time
//now the genie can carusel  in this 5 post
//if he choose then client go directly to answer page for this post
// at server we mark this post and free other 4
//if genie exit this pade  server free them but, server write those 5 at the geny  so if gene try select again he will get those 5  only but if there will be allredy taken, idf so he will get  other ,
//genie max can see up to 30 new each 24 hours

//////////////
import React, { useState, useEffect } from "react";
import "./GenieNewPost.css";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { genieGetNewPosts, genieCoosePost } from "services/getData";
import GenieNewBubble from "./GenieNewBubble";
import { POST_STATUS } from "constants/jeneral";
import { formatDate } from "utils/dateUtils";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";

// import Swipe from "swipe-js-iso";

const GenieNewPost = ({ setConvFilter }) => {
  const { cleanGeniePosts, updateGenieNewPostCounter, triggerToast } =
    useStore(useDataStore);
  const [posts, setPosts] = useState([]);
  // const [currentPost, setCurrentPost] = useState({});
  const [postId, setPostId] = useState(0); //
  const [totalMessage, setTotalMessage] = useState(0);

  //   useEffect(() => {
  //     const carousel = document.querySelector('.carouselContainer');
  //     const swipe = new Swipe(carousel, {
  //         startSlide: 0,
  //         speed: 400,
  //         auto: 3000,
  //         continuous: true,
  //         disableScroll: false,
  //         stopPropagation: false,
  //         callback: function(index, elem, dir) {},
  //         transitionEnd: function(index, elem) {}
  //     });

  //     return () => swipe.kill(); // Cleanup the swiper when the component is unmounted
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await genieGetNewPosts();
        if (data && data.result?.length > 0) {
          setPosts(data.result);
          updateGenieNewPostCounter(data.result.length);
          // setCurrentPost(data[0]);
          setTotalMessage(data.result.length);
        } else {
          updateGenieNewPostCounter(0);
          triggerToast(data.error);
          setTotalMessage(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const increment = () => {
    setPostId((prev) => (prev + 1) % totalMessage);
  };

  const decrement = () => {
    setPostId((prev) => (prev - 1 + totalMessage) % totalMessage);
  };

  const handleChoose = async () => {
    try {
      const avatar = localStorage.getItem("avatar");
      const res = await genieCoosePost(posts[postId].id,avatar);
      if (res && res.status === 200 && res.statusText === "OK") {
        await cleanGeniePosts();
        console.log(POST_STATUS.OPEN);
        setConvFilter(POST_STATUS.OPEN);
        // setConvFilter(POST_STATUS.OPEN);
        //refreshData();
        //go to tab open with sort acs
        // fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="carouselContainer">
      <HiChevronDoubleRight className="icon rightArrow" onClick={increment} />
      <HiChevronDoubleLeft className="icon leftArrow" onClick={decrement} />
      {totalMessage > 0 ? (
        <>
          {" "}
          <div className="bubbleContainer">
            {posts[postId].id}
            <GenieNewBubble
              sender={
                posts[postId].user_nickname
                  ? posts[postId].user_nickname
                  : "User"
              }
              date={formatDate(posts[postId][`user_1_date`])}
              message={posts[postId][`user_1`]}
              isMine={false}
            />
          </div>
          <div className="buttonContainer">
            <button className="buttonSelectPost" onClick={handleChoose}>
              Choose
            </button>
          </div>
        </>
      ) : (
        <div className="emptyState">
          <p>No posts available.</p>
        </div>
      )}
    </div>
  );
};

export default GenieNewPost;
