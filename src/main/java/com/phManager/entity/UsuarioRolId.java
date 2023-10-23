package com.phManager.entity;

import java.io.Serializable;
import java.util.Objects;

public class UsuarioRolId implements Serializable {
    private String username;
    private String role;

    public UsuarioRolId(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public UsuarioRolId() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioRolId that = (UsuarioRolId) o;
        return username.equals(that.username) && role.equals(that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, role);
    }
}
