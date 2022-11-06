import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
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
            <Container className="articleContainer">
              <Row>
                <Col lg={6} className="imageContainer">
                  <img
                    className="coverImage"
                    src={imageURL}
                    alt="title image"
                  />
                </Col>
                <Col lg={6}>
                  <p className="date">{createdAt.toDate().toDateString()}</p>
                  <h2 className="title">{title}</h2>
                  <h4 className="author">By {createdBy}</h4>
                  <hr></hr>
                  <h5 className="description">{description}</h5>
                  <Row className="actionItemsContainer">
                    <Col lg={5} className="readButtonContainer">
                      <Link
                        className="callToActionButton"
                        to={`/article/${id}`}
                      >
                        Read More
                      </Link>
                    </Col>
                    <Col lg={3}>
                      {user && user.uid === userId && (
                        <>
                          {" "}
                          {createdBy && (
                            <span>
                              <DeleteArticle id={id} imageURL={imageURL} />
                            </span>
                          )}
                        </>
                      )}
                    </Col>
                    <Col lg={3}>
                      <div className="d-flex flex-row-reverse">
                        {user && <LikeArticle id={id} likes={likes} />}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          )
        )
      )}
      <div className="bottom"></div>
    </div>
  );
}

export default Articles;
