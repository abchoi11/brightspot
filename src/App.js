import "./App.css";
import AddArticle from "./components/AddArticle/AddArticle";
import Articles from "./components/Articles/Articles";
import { Container, Col, Row } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <Articles />
        </Col>
        <Col md={4}>
          <AddArticle/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
