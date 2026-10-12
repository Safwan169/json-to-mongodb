const fs = require('fs');
const path = require('path');
const { MongoClient, BSON } = require('mongodb');

const URI = process.env.MONGODB_URI;
const DIR = process.env.JSON_DIR;
(async () => {
  const client = new MongoClient(URI);
  await client.connect();
  const db = client.db('ecoweb');

  for (const file of fs.readdirSync(DIR).filter(f => f.endsWith('.json'))) {
    const name = path.basename(file, '.json');
    const docs = BSON.EJSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
    if (docs.length) {
      await db.collection(name).insertMany(docs);
    } else {
      await db.createCollection(name).catch(() => {});
    }
    console.log(`${name}: ${docs.length} docs`);
  }

  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  console.log('Done');
  await client.close();
})().catch(err => { console.error(err.message); process.exit(1); });