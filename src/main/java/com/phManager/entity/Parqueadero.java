package com.phManager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "parqueaderos")
public class Parqueadero {
    @Id
    @Column(name = "id_parqueadero")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idParqueadero;
    @Column(name = "numero_parqueadero", nullable = false)
    private Integer numeroParqueadero;
    @Column(name = "tipo_parqueadero", nullable = false)
    private String tipoDeParqueadero;

    public Parqueadero(Integer numeroParqueadero, String tipoDeParqueadero) {
        this.numeroParqueadero = numeroParqueadero;
        this.tipoDeParqueadero = tipoDeParqueadero;
    }

    public Parqueadero() {
    }

    public Long getIdParqueadero() {
        return idParqueadero;
    }

    public void setIdParqueadero(Long idParqueadero) {
        this.idParqueadero = idParqueadero;
    }

    public Integer getNumeroParqueadero() {
        return numeroParqueadero;
    }

    public void setNumeroParqueadero(Integer numeroParqueadero) {
        this.numeroParqueadero = numeroParqueadero;
    }

    public String getTipoDeParqueadero() {
        return tipoDeParqueadero;
    }

    public void setTipoDeParqueadero(String tipoDeParqueadero) {
        this.tipoDeParqueadero = tipoDeParqueadero;
    }
}

