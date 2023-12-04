import "./GenieClaimPost.css";
import React, { useEffect } from "react";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { genieGetNewPosts } from "services/getData";
import { formatDate } from "utils/dateUtils";
import HeadGenieNewPost from "geniePages/heads/HeadGenieNewPost";
import MessageBubble from "./MessageBubble";
import NoNewPostsToClame from "./NoNewPostsToClame";

const GenieClaimPost = ({
  postIndex,
  posts,
  setPosts,
}) => {
  const {
    updateGenieNewPostCounter,
    triggerToast,
    genieNewPostsCounter,
  } = useStore(useDataStore);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await genieGetNewPosts();
        if (data && data.data.result?.length > 0) {
          setPosts(data.data.result);
          updateGenieNewPostCounter(data.data.result.length);
        } else {
          updateGenieNewPostCounter(0);
          triggerToast(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // const increment = () => {
  //   setindex((prev) => (prev + 1) % genieNewPostsCounter);
  // };

  // const decrement = () => {
  //   setindex((prev) => (prev - 1 + genieNewPostsCounter) % genieNewPostsCounter);
  // };

  // const handleChoose = async () => {
  //   try {
  //     const avatar = localStorage.getItem("avatar");
  //     const res = await genieClaimPost(posts[index].id, avatar);
  //     if (res && res.status === 200 && res.statusText === "OK") {
  //       await cleanGeniePosts();
  //       updateGeniePagesStates("geniePosts", "open");
  //       // console.log(POST_STATUS.OPEN);
  //       // setUserFilter(POST_STATUS.OPEN);
  //       // setUserFilter(POST_STATUS.OPEN);
  //       //refreshData();
  //       //go to tab open with sort acs
  //       // fetchData();
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  return (
    <>
      <div className="claimpost-container">
        <div className="carouselContainer">
        </div>
        <HeadGenieNewPost post={posts[postIndex]} />
        <div className="claimpost-content">
          {genieNewPostsCounter > 0 ? (
            <>
              {posts?.length > 0 && posts[postIndex] && (
                <MessageBubble
                  sender={posts[postIndex]["user_nickname"]}
                  date={formatDate(posts[postIndex][`user_1_date`])}
                  message={posts[postIndex][`user_1`]}
                  isMine={false}
                  avatar={posts[postIndex]["user_avatar"]}
                />
              )}
            </>
          ) : (
            <div className="emptyState">
              <NoNewPostsToClame />
              {/* <p>No New posts available come back later.</p> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GenieClaimPost;

//when page  open
//go to server and select 5 post
//newr each post we will write that ocupide by the ginie id and time
//now the genie can carusel  in this 5 post
//if he choose then client go directly to answer page for this post
// at server we mark this post and free other 4
//if genie exit this pade  server free them but, server write those 5 at the geny  so if gene try select again he will get those 5  only but if there will be allredy taken, idf so he will get  other ,
//genie max can see up to 30 new each 24 hours
