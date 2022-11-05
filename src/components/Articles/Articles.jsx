import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase-config";
import DeleteArticle from "../DeleteArticle/DeleteArticle";
import LikeArticle from "../LikeArticle/LikeArticle";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Articles.css";

function Articles(props) {
  const [user] = useAuthState(auth);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);

  return (
    <div>
      {articles.length === 0 ? (
        <p>no articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            imageURL,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div key={id} className="border mt-3 p-3 bg-light">
              <div className="row article-box">
                <div className="col-3">
                  <Link to={`/article/${id}`}>
                    <img
                      className="coverImage"
                      src={imageURL}
                      alt="title image"
                    />
                  </Link>
                </div>
                <div className="col-9 ps-3">
                  <Row>
                    <Col md={6}>
                      {createdBy && (
                        <span className="badge bg-primary">{createdBy}</span>
                      )}
                    </Col>
                    <Col md={6}>
                      {user && user.uid === userId && (
                        <Col md={6}>
                          {createdBy && (
                            <span>
                              <DeleteArticle id={id} imageURL={imageURL} />
                            </span>
                          )}
                        </Col>
                      )}
                    </Col>
                  </Row>
                  <h2>{title}</h2>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <h5>{description}</h5>
                  <div className="d-flex flex-row-reverse">
                    {user && <LikeArticle id={id} likes={likes} />}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Articles;
