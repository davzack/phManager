package com.phManager.repository;

import com.phManager.entity.Residente;
import com.phManager.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface ResidenteCrudRepository extends CrudRepository<Residente, String> {

    Residente findByCorreo(String email);
    Boolean existsByCorreo(String email);
}
