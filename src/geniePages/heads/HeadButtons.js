import { useEffect, useMemo } from "react";
import HeadButton from "./HeadButton";
import { useStore } from "zustand";
import { POST_STATUS } from "constants/jeneral";
import useDataStore from "../../stores/appStore";

function HeadButtons({ userFilter, setUserFilter, newPostCounter }) {
  const { allPosts, getGeniePosts } = useStore(useDataStore);

  useEffect(() => {
    if (!allPosts.length) {
      getGeniePosts();
    }
  }, [getGeniePosts, allPosts.length]);

  const postCounts = useMemo(() => {
    let open = 0;
    let closed = 0;

    allPosts?.forEach((post) => {
      if (post.post_status === POST_STATUS.CLOSED) {
        closed++;
      } else {
        open++;
      }
    });
    return { open, closed };
  }, [allPosts]);

  const buttonsData = [
    {
      name: POST_STATUS.OPEN,
      postsCount: postCounts.open,
      filter: POST_STATUS.OPEN,
    },
    {
      name: POST_STATUS.HISTORY,
      postsCount: postCounts.closed,
      filter: POST_STATUS.CLOSED,
    },
    {
      name: POST_STATUS.NEW,
      filter: POST_STATUS.NEW,
    },
    {
      name: POST_STATUS.RATING,
      filter: POST_STATUS.RATING,
    },
  ];

  return (
    <div className="head chats">
      {buttonsData.map((button) => (
        <>
          <HeadButton
            key={button.filter}
            name={button.name}
            postsCount={button.postsCount}
            active={userFilter === button.filter}
            setUserFilter={() => setUserFilter(button.filter)}
            // newPostCounter= {newPostCounter}
          />
        </>
      ))}
    </div>
  );
}

export default HeadButtons;
