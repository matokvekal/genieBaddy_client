const dbName = "geniebuddy"; 
const storeName = "posts"; 


// window.indexedDB.deleteDatabase(dbName);
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("IndexedDB error: " + event.target.errorCode);
    };
  });
}
async function deleteDb() {
  return new Promise((resolve, reject) => {
    const deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onsuccess = () => {
      resolve();
    };
    deleteRequest.onerror = (event) => {
      reject("Error deleting database: " + event.target.errorCode);
    };
    deleteRequest.onblocked = () => {
      reject("Delete request was blocked");
    };
  });
}
/**
 * Saves data to IndexedDB.
 * @param {string} key - The key to store the data under.
 * @param {*} data - The data to store.
 */
function saveToIndexedDB(dataToSave) {
  const request = window.indexedDB.open(dbName);

  request.onupgradeneeded = function () {
    const db = request.result;
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { autoIncrement: true }); // Use auto-incremented keys
    }
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.put(dataToSave, "someKey"); // Just put data, don't specify a key
  };

  request.onerror = function (event) {
    console.error("Database error:", event.target.error);
  };
}

/**
 * Gets data from IndexedDB.
 * @param {string} key - The key to retrieve the data from.
 */
async function getAllFromIndexedDB() {
  const db = await openDB(dbName); 
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => {
        const data = request.result;

        if (Array.isArray(data) && data.length > 0) {
          resolve(data[0]);
        } else {
          resolve(data); // Return data as is
        }
      };

      request.onerror = (event) => {
        reject("Error retrieving from IndexedDB: " + event.target.errorCode);
      };
    } catch (error) {
      reject("Error with IndexedDB operation: " + error.message);
    }
  });
}
export { saveToIndexedDB, getAllFromIndexedDB, deleteDb };
