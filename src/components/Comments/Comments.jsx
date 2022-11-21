import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase-config";
import { v4 as uuidv4 } from "uuid";
import "./Comments.css";

function Comments({ id }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(db, "Articles", id);
  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="commentContainer">
      <p className="commentsLabel">Comments</p>
      <div className="container">
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId} className="comment">
              <div className="border p-2 mt-2 row">
                <div className="col-11">
                  <span className="userLabel">{userName}</span>
                  <div className="commentText">{comment}</div>
                </div>
                <div className="col-1">
                  {currentlyLoggedinUser != null  && currentlyLoggedinUser.uid === user ? (
                    <i
                      className="fa fa-times"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleDeleteComment({
                          commentId,
                          user,
                          comment,
                          userName,
                          createdAt,
                        })
                      }
                    ></i>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        {currentlyLoggedinUser && (
          <input
            type="text"
            className="form-control mt-4 mb-5"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add a comment"
            onKeyUp={(e) => {
              handleChangeComment(e);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Comments;
