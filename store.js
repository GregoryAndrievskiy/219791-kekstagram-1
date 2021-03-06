'use strict';

const db = require(`./database/db`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`kekstagramPost`);
  collection.createIndex({name: -1}, {unique: true});
  return collection;
};

class PostsStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getDatedPost(date) {
    return (await this.collection).findOne({date});
  }

  async getAllPosts() {
    return (await this.collection).find();
  }

  async save(postData) {
    return (await this.collection).insertOne(postData);
  }
}

module.exports = new PostsStore(setupCollection().
  catch((e) => console.error(`Failed to set up "kegstagramPosts"-collection`, e)));
