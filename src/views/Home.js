import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import imagenLogIn from "./cafe.png";

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const { state: { userRole } } = useLocation();

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

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (id) {
        console.log("Fetching book details for book with id:", id);
        try {
          const response = await fetch(`http://localhost:3001/cafes/${id}`);
          console.log(response) 
          if (!response.ok) {
            throw new Error("Error al obtener los detalles del libro");
          }
          const data = await response.json();
          setSelectedBook(data);
          console.log("Book details:", data);
        } catch (error) {
          setError(error.message);
        }
      }
    };
  
    fetchBookDetails();
  }, [id]); // Asegúrate de que este useEffect se ejecute cuando 'id' cambie.

  const renderEditableField = (label, value) => {
    return (
      <div>
        <label>{label}:</label>
        <p>{value}</p>
      </div>
    );
  };

  return (
    <Container className="home-container">
      <Row>
        <Col md={6}>
        <h1>El aroma magico</h1>
        {/* <div className="col-md-6"> */}
          <img
            src={imagenLogIn}
            alt="Imagen de inicio de sesión"
            className="img-fluid"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className={selectedBook && selectedBook.id === book.id ? "selected" : ""}
                >
                  <td>{book.id}</td>
                  <td>{book.nombre}</td>
                  <td>{book.tipo}</td>
                  <td>{book.region}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          {selectedBook && (
            <div className="book-details">
              
              <div>
                {renderEditableField('nombre: Café Especial para tí', selectedBook.nombre)}
                {renderEditableField('fecha cultivo: 2023-01-18', selectedBook.fecha_cultivo)}
                {renderEditableField('imagen: https://github.com/Uniandes-isis2603/recursos-isis2603/blob/master/images/202310/p2_v1/cafe-especial-para-ti-cafe-colombiano_720x.png?raw=true', selectedBook.imagen)}
                {renderEditableField('notas: Panela, Durazno, Caramelo', selectedBook.notas)}
                {renderEditableField('cultivado a una altura de: 1920 msnm ', selectedBook.altura)}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
