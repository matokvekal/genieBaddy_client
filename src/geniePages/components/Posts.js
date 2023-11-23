import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./Posts.css";
import Post from "./Post";
import { useStore } from "zustand";
import useDataStore from "stores/appStore";
import { useNavigate } from "react-router-dom";
import { POST_STATUS } from "constants/jeneral";

function Posts({ userFilter }) {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { getGeniePosts, setPostId } = useStore(useDataStore);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        localStorage.getItem("scrollPosition") || 0;
    }
  }, []);

  const handleScroll = useCallback(() => {
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
      navigate("/geniePostData");
    },
    [setPostId, navigate]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getGeniePosts();
        if (res && res.length > 0) {
          const sorted = sortedPosts(res);
          setPosts(sorted);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [getGeniePosts]);

  function sortedPosts(posts) {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  }

  const filteredPost = useMemo(() => {
    switch (userFilter) {
      case POST_STATUS.ALL:
        return posts;
      case POST_STATUS.CLOSED:
        return posts.filter((conv) => conv.post_status === POST_STATUS.CLOSED);
      case POST_STATUS.OPEN:
        return posts.filter((conv) => conv.post_status === POST_STATUS.OPEN);
      default:
        return [];
    }
  }, [userFilter, posts]);

  return (
    <div className="posts" ref={scrollContainerRef} onScroll={handleScroll}>
      {filteredPost.length > 0 ? (
        filteredPost.map((post) => (
          <Post key={post.id} post={post} handleSelecPost={handleSelecPost} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default Posts;

// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import "./Posts.css";
// import Post from "./Post";
// import { useStore } from "zustand";
// import useDataStore from "stores/appStore";
// import { useNavigate } from "react-router-dom";
// import { POST_STATUS } from "constants/jeneral";

// function Posts({ userFilter }) {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const { getGeniePosts, setPostId, geniePosts } = useStore(useDataStore);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Restore scroll position when component mounts
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTop =
//         localStorage.getItem("scrollPosition") || 0;
//     }
//   }, []);

//   const handleScroll = useCallback(() => {
//     // Save scroll position in localStorage as the user scrolls
//     if (scrollContainerRef.current) {
//       localStorage.setItem(
//         "scrollPosition",
//         scrollContainerRef.current.scrollTop
//       );
//     }
//   }, []);

//   const handleSelecPost = useCallback(
//     (post) => {
//       setPostId(post.id);
//       navigate("/geniePostData");
//     },
//     [setPostId, navigate]
//   );

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await getGeniePosts();

//         if (res && res.length > 0) {
//           const sorted = sortedPosts(res);
//           setPosts(sorted);
//           if (scrollContainerRef.current) {
//             const savedScrollPosition =
//               Number(localStorage.getItem("scrollPosition")) || 0;
//             setTimeout(() => {
//               scrollContainerRef.current.scrollTop = savedScrollPosition;
//             }, 100);
//           }
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch posts:", error);
//       }
//     };

//     fetchPosts();
//   }, [geniePosts]);

//   function sortedPosts(posts) {
//     return [...posts].sort((a, b) => {
//       const dateA = new Date(a.created_at);
//       const dateB = new Date(b.created_at);
//       return dateB - dateA;
//     });
//   }
//   const filteredPost = useMemo(() => {
//     // console.log("At userFilter", userFilter);

//     switch (userFilter) {
//       case POST_STATUS.ALL:
//         return posts;
//       case POST_STATUS.CLOSED:
//         return posts.filter((conv) => conv.post_status === POST_STATUS.CLOSED);
//       case POST_STATUS.OPEN:
//         return posts.filter((conv) => conv.post_status === POST_STATUS.OPEN);
//       default:
//         return null;
//     }
//   }, [userFilter, posts]);

//   return (
//     <div className="posts" ref={scrollContainerRef} onScroll={handleScroll}>
//       {filteredPost &&
//         filteredPost.length > 0 &&
//         filteredPost.map((post) =>
//           post && post.id ? (
//             <Post key={post.id} post={post} handleSelecPost={handleSelecPost} />
//           ) : null
//         )}
//     </div>
//   );
// }

// export default Posts;
