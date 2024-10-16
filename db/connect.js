const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _mongoDb;

const getMongoDb = () => {
  if (!_mongoDb) {
    throw Error('Db not initialized');
  }
  return _mongoDb;
};

async function connectDb(callback) {
  if (_mongoDb) {
    console.log('Db is already initialized!');
    return callback(null, _mongoDb);
  }
  const uri = process.env.CONNECTION_STRING;

  try {
    await new MongoClient(uri).connect().then((client) => {
      _mongoDb = client;
      callback(null, _mongoDb);
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  connectDb,
  getMongoDb
};
