import { useState, useEffect, useRef, useCallback } from "react";
import "./Posts.css";
import Post from "./Post";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useNavigate } from "react-router-dom";
import { POST_STATUS } from "constants/jeneral";
import NoPosts from "./NoNewPostsToClame";

function Posts() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { getGeniePosts, setPostId, userGenieFilter, genieReadPost,geniePosts } =
    useStore(useDataStore);
  // const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    // Restore scroll position when component mounts
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        localStorage.getItem("scrollPosition") || 0;
    }
  }, []);

  const handleScroll = useCallback(() => {
    // Save scroll position in localStorage as the user scrolls
    if (scrollContainerRef.current) {
      localStorage.setItem(
        "scrollPosition",
        scrollContainerRef.current.scrollTop
      );
    }
  }, []);
  const handleSelectPost = useCallback(
    (post) => {
      if (post.genie_read === 0) {
        genieReadPost(post.id);
      }
      setPostId(post.id);
      navigate("/geniePostData");
    },
    [setPostId, navigate]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getGeniePosts();
        if (res && res.length > 0) {
          // setPosts(res);
          if (scrollContainerRef.current) {
            const savedScrollPosition =
              Number(localStorage.getItem("scrollPosition")) || 0;
            setTimeout(() => {
              scrollContainerRef.current.scrollTop = savedScrollPosition;
            }, 100);
          }
        } else {
          // setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [getGeniePosts]);



  useEffect(() => {
    const fetchPosts = async () => {
      let data = await getGeniePosts();

      data =
        data &&
        data.filter((post) => {
          switch (userGenieFilter) {
            case POST_STATUS.ALL:
              return true;
            case POST_STATUS.CLOSED:
              return post.post_status === POST_STATUS.CLOSED;
            case POST_STATUS.OPEN:
              return post.post_status === POST_STATUS.OPEN;
            case POST_STATUS.SAVED:
              return (
                post.post_status === POST_STATUS.CLOSED && post.user_save === 1
              );
            default:
              return true;
          }
        });
      setFilteredPost(data);
    };
    fetchPosts();
  }, [userGenieFilter, getGeniePosts,geniePosts]);

  return (
    <>
      {(filteredPost && filteredPost.length) > 0 ? (
        <div
          className="posts-rows"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {filteredPost.map((post) =>
            post && post.id ? (
              <Post
                key={post.id}
                post={post}
                handleSelectPost={handleSelectPost}
              />
            ) : null
          )}
        </div>
      ) : (
        <NoPosts />
      )}
    </>
  );
}

export default Posts;
