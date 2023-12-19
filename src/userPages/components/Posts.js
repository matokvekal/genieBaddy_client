import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./Posts.css";
import Post from "./Post";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useNavigate } from "react-router-dom";
import { POST_STATUS } from "constants/jeneral";
import NoPosts from "./NoPosts";

function Posts() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { getUserPosts, setPostId, userGenieFilter, userReadPost, userPosts } =
    useStore(useDataStore);
  const [posts, setPosts] = useState([]);

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
      if (post.user_read === 0) {
        userReadPost(post.id);
      }
      setPostId(post.id);
      navigate("/userPostData");
    },
    [setPostId, navigate]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getUserPosts();
        if (res && res.length > 0) {
          setPosts(res);
          if (scrollContainerRef.current) {
            const savedScrollPosition =
              Number(localStorage.getItem("scrollPosition")) || 0;
            setTimeout(() => {
              scrollContainerRef.current.scrollTop = savedScrollPosition;
            }, 100);
          }
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [userPosts, getUserPosts]);

  const filteredPost = useMemo(() => {
    let filtered;
    switch (userGenieFilter) {
      case POST_STATUS.ALL:
        filtered = posts;
        break;
      case POST_STATUS.CLOSED:
        filtered = posts.filter(
          (conv) => conv.post_status === POST_STATUS.CLOSED
        );
        break;
      case POST_STATUS.OPEN:
        filtered = posts.filter(
          (conv) => conv.post_status === POST_STATUS.OPEN
        );
        break;
      case POST_STATUS.SAVED:
        filtered = posts.filter(
          (conv) =>
            conv.post_status === POST_STATUS.CLOSED && conv.user_save === 1
        );
        break;
      default:
        filtered = posts;
    }
    return Array.isArray(filtered) ? filtered : [];
  }, [userGenieFilter, posts]);
  return (
    <>
      {(filteredPost && filteredPost.length) > 0 ? (
        <div
          className="posts-rows"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {filteredPost.sort((a,b)=>b.id-a.id).map((post) => //sort by id desc
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
