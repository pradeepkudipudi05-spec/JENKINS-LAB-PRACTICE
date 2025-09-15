package com.klu.car.service;

import java.util.List;
import com.klu.car.entity.Car;

public interface CarService {
    Car addCar(Car car);
    List<Car> getAllCars();
    Car getCarById(int id);
    Car updateCar(Car car);
    void deleteCarById(int id);
}
