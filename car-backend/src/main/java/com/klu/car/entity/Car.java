package com.klu.car.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "car_table")
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates ID
    @Column(name = "car_id")
    private int id;

    @Column(name = "car_brand", nullable = false, length = 50)
    private String brand;

    @Column(name = "car_model", nullable = false, length = 50)
    private String model;

    @Column(name = "car_year", nullable = false)
    private int year;

    @Column(name = "car_color", nullable = false, length = 20)
    private String color;

    @Column(name = "car_price", nullable = false)
    private double price;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    @Override
    public String toString() {
        return "Car [id=" + id + ", brand=" + brand + ", model=" + model + 
               ", year=" + year + ", color=" + color + ", price=" + price + "]";
    }
}
