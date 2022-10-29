import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../../firebase-config";
import {toast} from "react-toastify"
import {ref, deleteObject} from "firebase/storage"

function DeleteArticle({ id, imageURL }) {
  const handleDelete = async() => {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted successfully", {type: "success"})
        const storageRef = ref(storage, imageURL)
        await deleteObject(storageRef)
      } catch (error) {
        toast("Error deleting article", {type: "error"})
      }
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeleteArticle;
