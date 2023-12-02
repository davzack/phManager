package com.phManager.repository;

import com.phManager.entity.Residente;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResidenteCrudRepository extends CrudRepository<Residente, String> {

    Residente findByCorreo(String email);
    Boolean existsByCorreo(String email);
    @Modifying
    @Query("UPDATE Residente r SET r.telefono = :nuevoTelefono WHERE r.cedula = :cedula")
    void actualizarTelefono(@Param("cedula") String cedula, @Param("nuevoTelefono") String nuevoTelefono);

    @Query("SELECT r FROM Residente r WHERE r.apartamento.idApartamento = :apartamentoId")
    List<Residente> findByApartamentoId(@Param("apartamentoId") Long apartamentoId);
    @Query(value = "SELECT COUNT(*) FROM residentes", nativeQuery = true)
    int countResidentes();
}
