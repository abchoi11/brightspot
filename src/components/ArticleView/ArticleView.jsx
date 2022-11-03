import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import LikeArticle from "../LikeArticle/LikeArticle";
import parse from "html-react-parser";
import Comments from "../Comments/Comments";

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
    <Row>
      <Col md={3}>
        <img
          src={article.imageURL}
          alt={article.title}
          style={{ width: "100%", padding: 10 }}
        />
      </Col>
      <Col md={9}>
        <h2>{article.title}</h2>
        <h5>Author: {article.createdBy}</h5>
        <div>Cready At: {article.createdAt.toDate().toDateString()}</div>
        <hr></hr>
        <h4>{article.description}</h4>

        <div className="d-flex flex-row-reverse">
          {user && <LikeArticle id={id} likes={article.likes} />}
          <div className="pe-2">
            <p>{article != undefined && article != null ? article.likes.length  : console.log("nope")}</p>
            {article ? parse(String(article.body)) : console.log("nope")}
          </div>
        </div>
        <Comments id={article.id}/>
      </Col>
    </Row>
  ) : (
    <></>
  );

  return <div className="bg-light border" style={{ marginTop: 70 }}>
      {body}
  </div>;
}

export default ArticleView;
