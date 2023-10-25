package com.phManager.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "userdb")
public class Usuario {
    @Id
    @Column(nullable = false, length = 15)
    private String username;
    @Column(nullable = false, length = 200)
    private String password;
    @Column(nullable = false, length = 50, unique = true)
    private String email;
    @Column(nullable = false, columnDefinition = "SMALLINT")
    private Boolean locked;
    @Column(nullable = false, columnDefinition = "SMALLINT")
    private Boolean disabled;
    @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER)
    private List<UsuarioRol> roles;

    public Usuario(String username, String password, String email, Boolean locked, Boolean disabled, List<UsuarioRol> roles) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.locked = locked;
        this.disabled = disabled;
        this.roles = roles;
    }

    public List<UsuarioRol> getRoles() {
        return roles;
    }

    public void setRoles(List<UsuarioRol> roles) {
        this.roles = roles;
    }

    public Usuario() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public Boolean getDisabled() {
        return disabled;
    }

    public void setDisabled(Boolean disabled) {
        this.disabled = disabled;
    }
}
