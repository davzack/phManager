package com.phManager.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "asignacion_parqueaderos")
public class AsignacionParqueadero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asignacion")
    private Long idAsignacion;
    @Column(name = "placa_vehiculo", nullable = false)
    private String placaVehiculo;
    @Column(name = "estado_asignacion", nullable = false)
    private String estadoAsignacion;
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;
    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;
    @Column(name = "fecha_asignacion", nullable = false)
    private LocalDate fechaAsignacion;
    @ManyToOne
    @JoinColumn(name = "residente_cedula", referencedColumnName = "cedula", nullable = false)
    private Residente residente;
    @ManyToOne
    @JoinColumn(name = "parqueadero_id", referencedColumnName = "id_parqueadero", nullable = false)
    private Parqueadero parqueadero;

    public AsignacionParqueadero(String placaVehiculo, String estadoAsignacion, LocalDate fechaInicio, LocalDate fechaFin, LocalDate fechaAsignacion, Residente residente, Parqueadero parqueadero) {
        this.placaVehiculo = placaVehiculo;
        this.estadoAsignacion = estadoAsignacion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaAsignacion = fechaAsignacion;
        this.residente = residente;
        this.parqueadero = parqueadero;
    }

    public AsignacionParqueadero() {
    }

    public Long getIdAsignacion() {
        return idAsignacion;
    }

    public void setIdAsignacion(Long idAsignacion) {
        this.idAsignacion = idAsignacion;
    }

    public String getPlacaVehiculo() {
        return placaVehiculo;
    }

    public void setPlacaVehiculo(String placaVehiculo) {
        this.placaVehiculo = placaVehiculo;
    }

    public String getEstadoAsignacion() {
        return estadoAsignacion;
    }

    public void setEstadoAsignacion(String estadoAsignacion) {
        this.estadoAsignacion = estadoAsignacion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public LocalDate getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(LocalDate fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }

    public Residente getResidente() {
        return residente;
    }

    public void setResidente(Residente residente) {
        this.residente = residente;
    }

    public Parqueadero getParqueadero() {
        return parqueadero;
    }

    public void setParqueadero(Parqueadero parqueadero) {
        this.parqueadero = parqueadero;
    }
}