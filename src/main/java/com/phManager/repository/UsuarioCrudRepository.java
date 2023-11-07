package com.phManager.repository;

import com.phManager.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioCrudRepository extends CrudRepository<Usuario, String> {
    Usuario findByEmail(String email);
}
