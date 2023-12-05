// import { useState, useEffect } from "react";
// import posts from "../data/posts.json";
// const useData = () => {
//   const [data, setData] = useState(posts);

//   const loadData = async () => {
//     try {
//       setData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addData = async (newData) => {
//     try {
//       await fetch("data.json", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newData),
//       });
//       setData([...data, newData]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteData = async (postId) => {
//     try {
//       await fetch(`data.json/${postId}`, {
//         method: "DELETE",
//       });
//       setData(data.filter((item) => item.postId !== postId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return { data, loadData, addData, deleteData };
// };

// export default useData;
