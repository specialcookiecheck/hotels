
// standard firestore query for deleting batches (necessary for deleteCollection())
export async function deleteQueryBatch(db, query, resolve) {
  console.log("deleteQueryBatch started");
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

// standard firestore query for deleting collections (uses deleteQueryBatch())
export async function deleteCollection(db, collectionPath, batchSize) {
  console.log("deleteCollection started");
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}



/*
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);


export function connectFirebase() {
    dotenv.config();
  
    // const db = database;
  
    db.on("error", (err) => {
      console.log(`database connection error: ${err}`);
    });
  
    db.on("disconnected", () => {
      console.log("database disconnected");
    });
  
    db.once("open", function () {
      console.log(`database connected to ${this.name} on ${this.host}`);
    });
  }
/*
import { JSONFilePreset } from "lowdb/node";

export const db = await JSONFilePreset("src/models/json/db.json", {
  users: [],
  hotelLists: [],
  hotels: [],
});
*/