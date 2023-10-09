package com.phManager.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "sugerencias")
public class Sugerencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long idSugerencia;
    @Column(nullable = false)
    private LocalDate fecha;
    @Column(nullable = false)
    private String asunto;
    @Column(nullable = false ,columnDefinition = "TEXT")
    private String descripcion;
    @Column(nullable = false)
    private String estado;
    @Column(name = "accion_tomada")
    private String accionTomada;
    @ManyToOne
    @JoinColumn(name = "residente_cedula", referencedColumnName = "cedula", nullable = false)
    private Residente residente;

    public Sugerencia(LocalDate fecha, String asunto, String descripcion, String estado, String accionTomada, Residente residente) {
        this.fecha = fecha;
        this.asunto = asunto;
        this.descripcion = descripcion;
        this.estado = estado;
        this.accionTomada = accionTomada;
        this.residente = residente;
    }

    public Sugerencia() {
    }

    public Long getIdSugerencia() {
        return idSugerencia;
    }

    public void setIdSugerencia(Long idSugerencia) {
        this.idSugerencia = idSugerencia;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getAccionTomada() {
        return accionTomada;
    }

    public void setAccionTomada(String accionTomada) {
        this.accionTomada = accionTomada;
    }

    public Residente getResidente() {
        return residente;
    }

    public void setResidente(Residente residente) {
        this.residente = residente;
    }
}
