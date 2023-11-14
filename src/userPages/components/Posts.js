import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./Posts.css";
import Post from "./Post";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useNavigate } from "react-router-dom";
import { POST_STATUS } from "constants/jeneral";

function Posts({ convFilter }) {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { getUserPosts, setPostId } = useStore(useDataStore);
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

  const handleSelecPost = useCallback(
    (post) => {
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
  }, [getUserPosts]);

  const filteredPost = useMemo(() => {
    console.log("At convFilter", convFilter);

    switch (convFilter) {
      case POST_STATUS.ALL:
        return posts;
      case POST_STATUS.CLOSED:
        return posts.filter((conv) => conv.post_status === POST_STATUS.CLOSED);
      case POST_STATUS.OPEN:
        return posts.filter((conv) => conv.post_status !== POST_STATUS.CLOSED);
      case POST_STATUS.STARS:
        return posts.filter(
          (conv) => conv.post_status === POST_STATUS.CLOSED && conv.rating > 0
        );
      default:
        return posts;
    }
  }, [convFilter, posts]);
  debugger
  return (
    <div className="posts" ref={scrollContainerRef} onScroll={handleScroll}>
      {filteredPost &&filteredPost.length>0&&
        filteredPost.map((post) =>
          post && post.id ? (
            <Post key={post.id} post={post} handleSelecPost={handleSelecPost} />
          ) : null
        )}
    </div>
  );
}

export default Posts;
