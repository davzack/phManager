package com.phManager.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "cuotas")
public class Cuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cuota")
    private Long idCuota;
    @Column(nullable = false)
    private BigDecimal monto;
    @Column(name = "tipo_cuota",nullable = false)
    private String tipoDeCuota;
    @Column(nullable = false)
    private String estado;
    @ManyToOne
    @JoinColumn(name = "apartamento_id", nullable = false, referencedColumnName = "id_apartamento")
    private Apartamento apartamento;
    @Column(name = "fecha_pago")
    private LocalDate fechaPago;
    @Column(name = "numero_transaccion")
    private String numeroTransaccion;

    public Cuota(BigDecimal monto, String tipoDeCuota, String estado, Apartamento apartamento, LocalDate fechaPago, String numeroTransaccion) {
        this.monto = monto;
        this.tipoDeCuota = tipoDeCuota;
        this.estado = estado;
        this.apartamento = apartamento;
        this.fechaPago = fechaPago;
        this.numeroTransaccion = numeroTransaccion;
    }

    public Cuota() {
    }

    public Long getIdCuota() {
        return idCuota;
    }

    public void setIdCuota(Long idCuota) {
        this.idCuota = idCuota;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public String getTipoDeCuota() {
        return tipoDeCuota;
    }

    public void setTipoDeCuota(String tipoDeCuota) {
        this.tipoDeCuota = tipoDeCuota;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Apartamento getApartamento() {
        return apartamento;
    }

    public void setApartamento(Apartamento apartamento) {
        this.apartamento = apartamento;
    }

    public LocalDate getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(LocalDate fechaPago) {
        this.fechaPago = fechaPago;
    }

    public String getNumeroTransaccion() {
        return numeroTransaccion;
    }

    public void setNumeroTransaccion(String numeroTransaccion) {
        this.numeroTransaccion = numeroTransaccion;
    }
}
