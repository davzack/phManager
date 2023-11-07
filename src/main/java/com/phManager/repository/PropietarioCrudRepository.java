package com.phManager.repository;

import com.phManager.entity.Propietario;
import org.springframework.data.repository.CrudRepository;

public interface PropietarioCrudRepository extends CrudRepository<Propietario, String> {

    Propietario findByCorreo(String correo);
}
