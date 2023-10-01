import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import imagenLogIn from "./cafe.png";
import { FormattedMessage, useIntl } from "react-intl";


function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const intl = useIntl();
  // const { state: { userRole } } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/cafes");
        if (!response.ok) {
          throw new Error("Error al obtener los libros");
        }
        const data = await response.json();
        setBooks(data);
        console.log("Books:", data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const [selectedBookImage, setSelectedBookImage] = useState(null);

  const fetchBookDetails = async (id) => {
    console.log(id);
    if (id) {
      console.log("Fetching book details for book with id:", id);
      try {
        const peticion = "http://localhost:3001/cafes/" + id;
        console.log(peticion);
        const response = await fetch(peticion);
        console.log(response) 
        if (!response.ok) {
          throw new Error("Error al obtener los detalles del libro");
        }
        const data = await response.json();
        setSelectedBook(data);
        setSelectedBookImage(data.imagen);
        console.log("Book details:", data);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const renderEditableField = (label, value) => {
    if (label === "nombre") {
      const formattedValue = value.toUpperCase(); // Aplicar cambios solo al nombre
      return (
        <div>
          <p><strong>{formattedValue}</strong></p>
        </div>
      );
    } 
    
    else if (label === "Cultivado a una altura de") { // Aplicar cambios solo al nombre
      return (
        <div>
          <p><strong>{intl.formatMessage({ id: "Cultivado a una altura de" })}<br></br>{value} {intl.formatMessage({ id: "msnm" })}</strong></p>
        </div>
      );
    } 
    else if (label === "Notas") { // Aplicar cambios solo al nombre
      return (
        <div>
          <p>{intl.formatMessage({ id: "Notas" })} <br></br> {value}</p>
        </div>
      );
    }
    else {
      return (
        <div>
          <p>{value}</p>
        </div>
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1>El aroma mágico</h1>
        <div className="linea"></div>
        <img
          src={imagenLogIn}
          alt="Imagen de inicio de sesión"
          className="img-fluid"
        />
        <div className="linea"></div>
    
      <Container className="home-container">
      <Row>
        <Col md={8}>
          
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{intl.formatMessage({ id: "Nombre" })}</th>
                <th>{intl.formatMessage({ id: "Tipo" })}</th>
                <th>{intl.formatMessage({ id: "Región" })}</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  onClick={() => fetchBookDetails(book.id)} 
                  className={selectedBook && selectedBook.id === book.id ? "selected" : ""}
                >
                  <td className="id">{book.id}</td>
                  <td>{book.nombre}</td>
                  <td>{book.tipo}</td>
                  <td>{book.region}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          {selectedBook && (
            <Card className= "card-detalle">

            <Card.Body className= "card-detalle">
              {renderEditableField('nombre', selectedBook.nombre)}
              {renderEditableField('Fecha de cultivo', selectedBook.fecha_cultivo)}
              {selectedBookImage && (
                <div>
                  <img
                    src={selectedBookImage}
                    alt={selectedBook.nombre}
                    className="img-fluid small-image"
                  />
                </div>
              )}
              {renderEditableField('Notas', selectedBook.notas)}
              {renderEditableField('Cultivado a una altura de', selectedBook.altura)}
            </Card.Body>
          </Card>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Home;