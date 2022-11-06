import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase-config";
import "./LikeArticle.css"

function LikeArticle({ id, likes }) {
  const [user] = useAuthState(auth);
  const likesRef = doc(db, "Articles", id);

  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="main">
      <i
        className={`fa fa-heart${likes?.includes(user.uid) ? "" : "-o"} fa-lg`}
        style={{
          cursor: "pointer",
          color: likes?.includes(user.uid) ? "red" : null,
        }}
        onClick={handleLike}
      />
      <p className="count">{likes.length}</p>
    </div>
  );
}

export default LikeArticle;
