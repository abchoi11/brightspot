import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase-config";
import "./Articles.css"

function Articles(props) {
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
      console.log(articles);
    });
  }, []);

  return (
    <div>
      {articles.length === 0 ? (
        <p>no articles found!</p>
      ) : (
        articles.map(({id, title, description, imageURL, createdAt}) => (
          <div key={id} className="border mt-3 p-3 bg-light">
            <div className="row article-box">
                <div className="col-3">
                    <img className="coverImage" src={imageURL} alt="title image"/>
                </div>
                <div className="col-9 ps-3">
                  <h2>{title}</h2>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <h4>{description}</h4>
                </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Articles;
