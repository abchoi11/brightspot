import "./App.css";
import AddArticle from "./components/AddArticle/AddArticle";
import Articles from "./components/Articles/Articles";
import { Container, Col, Row } from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import ArticleView from "./components/ArticleView/ArticleView";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<AddArticle />} />
          <Route path="/article/:id" element={<ArticleView />} />
          <Route
            path="/"
            element={
              <div className="home">
                <Header />
                <Row>
                  <Col md={12}>
                    <Articles />
                  </Col>
                </Row>
              </div>
            }
          />
        </Routes>
        <Navbar />
    </Router>
  );
}

export default App;
