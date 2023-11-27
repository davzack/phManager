package com.phManager.repository;

import com.phManager.entity.Propietario;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PropietarioCrudRepository extends CrudRepository<Propietario, String> {

    Propietario findByCorreo(String correo);
    Boolean existsByCorreo(String email);

    @Modifying
    @Query("UPDATE Propietario r SET r.telefono = :nuevoTelefono WHERE r.cedula = :cedula")
    void actualizarTelefono(@Param("cedula") String cedula, @Param("nuevoTelefono") String nuevoTelefono);
}
