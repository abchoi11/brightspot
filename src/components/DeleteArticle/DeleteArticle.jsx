import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../../firebase-config";
import { toast } from "react-toastify";
import { ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";

import "./DeleteArticle.css";

function DeleteArticle({ id, imageURL }) {
  const handleDelete = async () => {
    if (window.confirm("Art you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageURL);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting article", { type: "error" });
      }
    }
  };
  return (
    <div>
      <Link onClick={handleDelete} className="deleteButton">
        Delete
      </Link>
    </div>
  );
}

export default DeleteArticle;
