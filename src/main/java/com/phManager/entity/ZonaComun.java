package com.phManager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "zonas_comunes")
public class ZonaComun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_zona_comun")
    private Long idZonaComun;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private Integer capacidad;
    @Column(nullable = false)
    private String descripcion;
    @Column(name = "tarifa_por_hora", nullable = false)
    private Double tarifaPorHora;
    @Column(columnDefinition = "TEXT")
    private String fotos;

    public ZonaComun(String nombre, Integer capacidad, Double tarifaPorHora, String descripcion, String fotos) {
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.tarifaPorHora = tarifaPorHora;
        this.descripcion = descripcion;
        this.fotos = fotos;
    }

    public ZonaComun() {
    }

    public Long getIdZonaComun() {
        return idZonaComun;
    }

    public void setIdZonaComun(Long idZonaComun) {
        this.idZonaComun = idZonaComun;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public Double getTarifaPorHora() {
        return tarifaPorHora;
    }

    public void setTarifaPorHora(Double tarifaPorHora) {
        this.tarifaPorHora = tarifaPorHora;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFotos() {
        return fotos;
    }

    public void setFotos(String fotos) {
        this.fotos = fotos;
    }
}
