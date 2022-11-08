import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import LikeArticle from "../LikeArticle/LikeArticle";
import parse from "html-react-parser";
import Comments from "../Comments/Comments";
import "./ArticleView.css";

function ArticleView(props) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, async (snapshot) => {
      const instance = { ...snapshot.data(), id: snapshot.id };
      setArticle(instance);
      console.log(article);
    });
  }, []);

  const body = article ? (
    <Container>
      <Row className="body">
        <Col md={12}>
          <h2 className="viewTitle">{article.title}</h2>
          <img src={article.imageURL} alt={article.title} className="viewImage" />
          <h5 className="authorBy">By {article.createdBy}</h5>
          <div className="createdAt">
            {article.createdAt.toDate().toDateString()}
          </div>
          <h4 className="viewDescription">{article.description}</h4>
          <div className="d-flex flex-row-reverse">
            {user && <LikeArticle id={id} likes={article.likes} />}
          </div>
          <hr></hr>

          <div className="articleBody">
            {article ? parse(String(article.body)) : console.log("nope")}
          </div>

          <Comments id={article.id} />
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );

  return (
    <div className="bg-light border" style={{ marginTop: 70 }}>
      {body}
    </div>
  );
}

export default ArticleView;
