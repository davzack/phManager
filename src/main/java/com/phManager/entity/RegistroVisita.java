package com.phManager.entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "registro_visita")
public class RegistroVisita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_visita")
    private Long idVisita;
    @Column(name = "nombre_visitante", nullable = false)
    private String nombreVisitante;
    @Column(name = "identifacion_visitante", nullable = false)
    private String identificacionVisitante;
    @Column(name = "fecha_visita", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime fechaVisita;
    @ManyToOne
    @JoinColumn(name = "residente_cedula", referencedColumnName ="cedula" , nullable = false)
    private Residente residente;

    public RegistroVisita(String nombreVisitante, LocalDateTime fechaVisita, String identificacionVisitante, Residente residente) {
        this.nombreVisitante = nombreVisitante;
        this.fechaVisita = fechaVisita;
        this.identificacionVisitante = identificacionVisitante;
        this.residente = residente;
    }

    public RegistroVisita() {
    }

    public Long getIdVisita() {
        return idVisita;
    }

    public void setIdVisita(Long idVisita) {
        this.idVisita = idVisita;
    }

    public String getNombreVisitante() {
        return nombreVisitante;
    }

    public void setNombreVisitante(String nombreVisitante) {
        this.nombreVisitante = nombreVisitante;
    }

    public LocalDateTime getFechaVisita() {
        return fechaVisita;
    }

    public void setFechaVisita(LocalDateTime fechaVisita) {
        this.fechaVisita = fechaVisita;
    }

    public String getIdentificacionVisitante() {
        return identificacionVisitante;
    }

    public void setIdentificacionVisitante(String identificacionVisitante) {
        this.identificacionVisitante = identificacionVisitante;
    }

    public Residente getResidente() {
        return residente;
    }

    public void setResidente(Residente residente) {
        this.residente = residente;
    }
}
