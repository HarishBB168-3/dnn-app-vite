import { openDB, deleteDB } from "idb";

export const initDB = async (dbName) => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("rows")) {
        db.createObjectStore("rows", {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta");
      }
    },
  });
};

export const clearDB = async (dbName) => {
  const db = await initDB(dbName);

  if (db.objectStoreNames.contains("rows")) {
    const tx1 = db.transaction("rows", "readwrite");
    await tx1.objectStore("rows").clear();
    await tx1.done;
  }

  if (db.objectStoreNames.contains("meta")) {
    const tx2 = db.transaction("meta", "readwrite");
    await tx2.objectStore("meta").clear();
    await tx2.done;
  }
};

export const deleteEntireDB = async (dbName) => {
  await deleteDB(dbName);
};

export const loadDatabases = async () => {
  if (!indexedDB.databases) {
    throw new Error("indexedDB.databases() not supported in this browser.");
  }

  const dbList = await indexedDB.databases();

  const detailedList = [];

  for (let dbInfo of dbList) {
    try {
      const db = await openDB(dbInfo.name);
      detailedList.push({
        name: dbInfo.name,
        version: dbInfo.version,
        stores: await Promise.all(
          Array.from(db.objectStoreNames).map(async (storeName) => {
            const tx = db.transaction(storeName, "readonly");
            const count = await tx.objectStore(storeName).count();
            return { storeName, rowCount: count };
          })
        ),
      });
      db.close();
    } catch (err) {
      console.error("Error opening DB:", dbInfo.name);
      throw err;
    }
  }

  return detailedList;
};
