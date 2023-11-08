package com.phManager.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usuarios")
public class Usuario {
    @Id
    private String email;

    @Column(name="auth_id", unique = true)
    private String auth_id;
    @Column(name="identificacion", unique = true)
    private String identificacion;
    @Column(name="nombres")
    private String nombre;
    @Column(name="apellido")
    private String apellido;

    @Column(name="rol")
    private String rol;

    public Usuario() {
    }

    public Usuario(String email, String auth_id, String identificacion, String nombre, String apellido, String rol) {
        this.email = email;
        this.auth_id = auth_id;
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.apellido = apellido;
        this.rol = rol;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuth_id() {
        return auth_id;
    }

    public void setAuth_id(String auth_id) {
        this.auth_id = auth_id;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
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

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}