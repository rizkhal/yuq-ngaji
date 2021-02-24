import * as firebase from "@/firebase";

const db = firebase.database.ref("/likes");

const create = (obj) => {
  return db.push(obj);
};

const get = () => {
  return db;
}

export { create, get };
