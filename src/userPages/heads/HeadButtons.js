import { useEffect, useMemo } from "react";
import HeadButton from "./HeadButton";
import { useStore } from "zustand";
import { POST_STATUS } from "constants/jeneral";
import useDataStore from "../../stores/appStore";

function HeadButtons({ convFilter, setConvFilter }) {
  const { allPosts, getUserPosts } = useStore(useDataStore);

  useEffect(() => {
    if (!allPosts.length) {
      getUserPosts();
    }
  }, [getUserPosts, allPosts.length]);
debugger
  const postCounts = useMemo(() => {
    let open = 0,
      closed = 0,
      stars = 0,
      all = allPosts.length;
    allPosts &&allPosts.length>0&&
      allPosts.forEach((post) => {
        if (post.post_status === POST_STATUS.CLOSED) {
          closed++;
          if (post.rating > 0) stars++;
        } else {
          open++;
        }
      });

    return { open, closed, stars, all };
  }, [allPosts]);

  const buttonsData = [
    {
      name: POST_STATUS.OPEN,
      posts: postCounts.open,
      filter: POST_STATUS.OPEN,
    },
    {
      name: POST_STATUS.ALL,
      posts: postCounts.all,
      filter: POST_STATUS.ALL,
    },
    {
      name: POST_STATUS.CLOSED,
      posts: postCounts.closed,
      filter: POST_STATUS.CLOSED,
    },
    {
      name: POST_STATUS.STARS,
      posts: postCounts.stars,
      filter: POST_STATUS.STARS,
    },
  ];

  return (
    <div className="head chats">
      {buttonsData.map((button) => (
        <HeadButton
          key={button.filter}
          name={button.name}
          posts={button.posts}
          active={convFilter === button.filter}
          setConvFilter={() => setConvFilter(button.filter)}
        />
      ))}
    </div>
  );
}

export default HeadButtons;
