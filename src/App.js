import "./App.css";
import AddArticle from "./components/AddArticle/AddArticle";
import Articles from "./components/Articles/Articles";
import { Container, Col, Row } from "react-bootstrap";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import ArticleView from "./components/ArticleView/ArticleView";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<AddArticle />} />
          <Route path="/article/:id" element={<ArticleView/>}/>
          <Route
            path="/"
            element={
              <Row style={{marginTop:60}}>
                <Col md={8}>
                  <Articles />
                </Col>
                <Col md={4}>
                  <AddArticle />
                </Col>
              </Row>
            }
          />
        </Routes>
        <Navbar />
      </Container>
    </Router>
  );
}

export default App;
