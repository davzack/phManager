package com.phManager.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name = "residentes")
public class Residente {
    @Id
    private String cedula;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String apellido;
    @Column(nullable = false)
    private String telefono;
    @Column(nullable = false)
    private String correo;
    @Column(name = "fecha_nacimiento",nullable = false)
    private LocalDate fechaNacimiento;
    @Column(name = "tipo_residente",nullable = false)
    private String tipoResidente;
    @ManyToOne
    @JoinColumn(name = "apartamento_id", referencedColumnName = "id_apartamento", nullable = false)
    private Apartamento apartamento;

    public Residente(String cedula, String nombre, String apellido, String telefono, String correo, LocalDate fechaNacimiento, String tipoResidente, Apartamento apartamento) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.fechaNacimiento = fechaNacimiento;
        this.tipoResidente = tipoResidente;
        this.apartamento = apartamento;
    }

    public Residente() {
    }

    public Residente(String cedula) {
        this.cedula = cedula;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getTipoResidente() {
        return tipoResidente;
    }

    public void setTipoResidente(String tipoResidente) {
        this.tipoResidente = tipoResidente;
    }

    public Apartamento getApartamento() {
        return apartamento;
    }

    public void setApartamento(Apartamento apartamento) {
        this.apartamento = apartamento;
    }
}
