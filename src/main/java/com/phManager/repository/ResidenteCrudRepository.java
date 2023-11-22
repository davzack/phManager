package com.phManager.repository;

import com.phManager.entity.Residente;
import com.phManager.entity.Usuario;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ResidenteCrudRepository extends CrudRepository<Residente, String> {

    Residente findByCorreo(String email);
    Boolean existsByCorreo(String email);
    @Modifying
    @Query("UPDATE Residente r SET r.telefono = :nuevoTelefono WHERE r.cedula = :cedula")
    void actualizarTelefono(@Param("cedula") String cedula, @Param("nuevoTelefono") String nuevoTelefono);
}
