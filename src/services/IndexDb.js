
const storageKey = "geniebuddy_posts";

async function openDB() {
  // In the case of localStorage, there's no need to open it.
  return Promise.resolve();
}

async function deleteDb() {
  localStorage.removeItem(storageKey);
  return Promise.resolve();
}

/**
 * Saves data to localStorage.
 * @param {string} key - The key to store the data under.
 * @param {*} data - The data to store.
 */
function saveToIndexedDB(dataToSave) {
  localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  return Promise.resolve();
}

/**
 * Gets data from localStorage.
 * @param {string} key - The key to retrieve the data from.
 */
function getAllFromIndexedDB() {
  const data = localStorage.getItem(storageKey);
  if (data) {
    return Promise.resolve(JSON.parse(data));
  } else {
    return Promise.resolve(null);
  }
}

export { saveToIndexedDB, getAllFromIndexedDB, deleteDb ,openDB};


// const dbName = "geniebuddy";
// const storeName = "posts";

// async function openDB() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(dbName, 3);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains(storeName)) {
//         db.createObjectStore(storeName);
//       }
//     };

//     request.onsuccess = (event) => {
//       resolve(event.target.result);
//     };

//     request.onerror = (event) => {
//       reject("IndexedDB error: " + event.target.errorCode);
//     };
//   });
// }
// async function deleteDb() {
//   return new Promise((resolve, reject) => {
//     const deleteRequest = window.indexedDB.deleteDatabase(dbName);
//     deleteRequest.onsuccess = () => {
//       resolve();
//     };
//     deleteRequest.onerror = (event) => {
//       reject("Error deleting database: " + event.target.errorCode);
//     };
//     deleteRequest.onblocked = () => {
//       reject("Delete request was blocked");
//     };
//   });
// }

// function saveToIndexedDB(dataToSave) {
//   return openDB().then((db) => {
//     return new Promise((resolve, reject) => {
//       const transaction = db.transaction(storeName, "readwrite");
//       const store = transaction.objectStore(storeName);
//       const request = store.put(dataToSave);

//       request.onsuccess = () => {
//         resolve();
//       };

//       request.onerror = (event) => {
//         reject("Error saving to IndexedDB: " + event.target.errorCode);
//       };
//     });
//   });
// }


// function getAllFromIndexedDB() {
//   return openDB().then((db) => {
//     return new Promise((resolve, reject) => {
//       try {
//         const transaction = db.transaction(storeName, "readonly");
//         const store = transaction.objectStore(storeName);
//         const request = store.getAll();

//         request.onsuccess = () => {
//           const data = request.result;
//           resolve(data);
//         };

//         request.onerror = (event) => {
//           reject("Error retrieving from IndexedDB: " + event.target.errorCode);
//         };
//       } catch (error) {
//         reject("Error with IndexedDB operation: " + error.message);
//       }
//     });
//   });
// }

// export { saveToIndexedDB, getAllFromIndexedDB, deleteDb };
