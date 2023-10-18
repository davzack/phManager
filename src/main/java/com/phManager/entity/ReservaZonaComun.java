package com.phManager.entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name = "reserva_zonas_comunes")
public class ReservaZonaComun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva")
    private Long idReserva;
    @Column(name = "fecha_inicio", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime fechaInicio;
    @Column(name = "fecha_fin", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime fechaFin;
    @Column(name = "estado_reserva", nullable = false)
    private String estadoReserva;
    @Column(columnDefinition = "TEXT")
    private String notas;
    @ManyToOne
    @JoinColumn(name = "residente_cedula", referencedColumnName = "cedula", nullable = false)
    private Residente residente;
    @ManyToOne
    @JoinColumn(name = "zona_comun_id", referencedColumnName = "id_zona_comun", nullable = false)
    private ZonaComun zonaComun;

    public ReservaZonaComun(LocalDateTime fechaInicio, LocalDateTime fechaFin, String estadoReserva, String notas, Residente residente, ZonaComun zonaComun) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estadoReserva = estadoReserva;
        this.notas = notas;
        this.residente = residente;
        this.zonaComun = zonaComun;
    }

    public ReservaZonaComun() {
    }

    public Long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getEstadoReserva() {
        return estadoReserva;
    }

    public void setEstadoReserva(String estadoReserva) {
        this.estadoReserva = estadoReserva;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public Residente getResidente() {
        return residente;
    }

    public void setResidente(Residente residente) {
        this.residente = residente;
    }

    public ZonaComun getZonaComun() {
        return zonaComun;
    }

    public void setZonaComun(ZonaComun zonaComun) {
        this.zonaComun = zonaComun;
    }
}
