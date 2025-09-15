package com.klu.car.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klu.car.entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
}
