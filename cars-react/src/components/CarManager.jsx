import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const CarManager = () => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    color: '',
    price: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedCar, setFetchedCar] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/carapi`;

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setCars(res.data);
    } catch (error) {
      setMessage('Failed to fetch cars.');
    }
  };

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in car) {
      if (!car[key] || car[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addCar = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, car);
      setMessage('Car added successfully.');
      fetchAllCars();
      resetForm();
    } catch (error) {
      setMessage('Error adding car.');
    }
  };

  const updateCar = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, car);
      setMessage('Car updated successfully.');
      fetchAllCars();
      resetForm();
    } catch (error) {
      setMessage('Error updating car.');
    }
  };

  const deleteCar = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllCars();
    } catch (error) {
      setMessage('Error deleting car.');
    }
  };

  const getCarById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedCar(res.data);
      setMessage('');
    } catch (error) {
      setFetchedCar(null);
      setMessage('Car not found.');
    }
  };

  const handleEdit = (selectedCar) => {
    setCar(selectedCar);
    setEditMode(true);
    setMessage(`Editing car: ${selectedCar.brand} ${selectedCar.model}`);
  };

  const resetForm = () => {
    setCar({
      brand: '',
      model: '',
      year: '',
      color: '',
      price: ''
    });
    setEditMode(false);
  };

  return (
    <div className="car-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Automobile Showroom Management</h2>

      <div>
        <h3>{editMode ? 'Edit Car' : 'Add Car'}</h3>
        <div className="form-grid">
          <input type="text" name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} />
          <input type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} />
          <input type="number" name="year" placeholder="Year" value={car.year} onChange={handleChange} />
          <input type="text" name="color" placeholder="Color" value={car.color} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={car.price} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addCar}>Add Car</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateCar}>Update Car</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Car By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Car ID"
        />
        <button className="btn-blue" onClick={getCarById}>Fetch</button>

        {fetchedCar && (
          <div>
            <h4>Car Found:</h4>
            <pre>{JSON.stringify(fetchedCar, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Cars</h3>
        {cars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.brand}</td>
                    <td>{c.model}</td>
                    <td>{c.year}</td>
                    <td>{c.color}</td>
                    <td>{c.price}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(c)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteCar(c.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default CarManager;
