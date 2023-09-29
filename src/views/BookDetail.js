import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

function BookDetail({ cars, userRole }) {
  const { carModel } = useParams();
  const selectedCar = cars.find((car) => car.carModel === carModel);

  const [carDetails, setCarDetails] = useState(selectedCar);

  return (
    <div className="car-details">
      <h2>Detalles del Carro</h2>
      <Card>
        <Card.Img variant="top" src={carDetails.image} alt={carDetails.partName} />
        {userRole ? (
          <Card.Body>
            <Card.Title>{carDetails.partName}</Card.Title>
            <Card.Text>
              Hecho por:
              <input
                type="text"
                value={carDetails.carMaker}
                onChange={(e) => setCarDetails({ ...carDetails, carMaker: e.target.value })}
              />
            </Card.Text>
            <Card.Text>
              Modelo:
              <input
                type="text"
                value={carDetails.carModel}
                onChange={(e) => setCarDetails({ ...carDetails, carModel: e.target.value })}
              />
            </Card.Text>
            <Card.Text>
              Año:
              <input
                type="text"
                value={carDetails.carYear}
                onChange={(e) => setCarDetails({ ...carDetails, carYear: e.target.value })}
              />
            </Card.Text>
            <Card.Text>
              Disponible:
              <input
                type="text"
                value={carDetails.avalaible}
                onChange={(e) => setCarDetails({ ...carDetails, avalaible: e.target.value })}
              />
            </Card.Text>
            <Card.Text>
              Descripción:
              <input
                type="text"
                value={carDetails.description}
                onChange={(e) => setCarDetails({ ...carDetails, description: e.target.value })}
              />
            </Card.Text>
            <Card.Text>
              Precio:
              <input
                type="text"
                value={carDetails.price}
                onChange={(e) => setCarDetails({ ...carDetails, price: e.target.value })}
              />
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title>{carDetails.partName}</Card.Title>
            <Card.Text>Hecho por: {carDetails.carMaker}</Card.Text>
            <Card.Text>Modelo: {carDetails.carModel}</Card.Text>
            <Card.Text>Año: {carDetails.carYear}</Card.Text>
            <Card.Text>Disponible: {carDetails.avalaible ? "Sí" : "No"}</Card.Text>
            <Card.Text>Descripción: {carDetails.description}</Card.Text>
            <Card.Text>Precio: {carDetails.price}</Card.Text>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}

export default BookDetail;