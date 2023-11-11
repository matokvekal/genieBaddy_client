import { Navbar } from "components";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";

const Landing = () => {

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="upper-message">
          <div className="upper-header">This is landing page</div>
          Hello Genie/User
          <div className="search">
            <input type="text" placeholder="search" />
          </div>
          <div className="filter">
            <button>History</button>
            <button>Open posts</button>
            <button>New post</button>
          </div>
        </div>
        "GenieBudy's safe space for anonymous sharing of struggles. Our
        compassionate volunteers offer guidance and support to help you on your
        journey to healing and growth.",
      </div>
    </>
  );
};

export default Landing;
