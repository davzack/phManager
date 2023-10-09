package com.phManager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "apartamentos")
public class Apartamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_apartamento")
    private Long idApartamento;
    @Column(name = "numero_apartamento", nullable = false)
    private Integer numeroApartamento;
    @Column(nullable = false)
    private Integer torre;

    public Apartamento(Integer numeroApartamento, Integer torre) {
        this.numeroApartamento = numeroApartamento;
        this.torre = torre;
    }

    public Apartamento() {
    }

    public Long getIdApartamento() {
        return idApartamento;
    }

    public void setIdApartamento(Long idApartamento) {
        this.idApartamento = idApartamento;
    }

    public Integer getNumeroApartamento() {
        return numeroApartamento;
    }

    public void setNumeroApartamento(Integer numeroApartamento) {
        this.numeroApartamento = numeroApartamento;
    }

    public Integer getTorre() {
        return torre;
    }

    public void setTorre(Integer torre) {
        this.torre = torre;
    }
}
