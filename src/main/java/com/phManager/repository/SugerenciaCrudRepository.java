package com.phManager.repository;

import com.phManager.entity.Residente;
import com.phManager.entity.Sugerencia;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SugerenciaCrudRepository extends CrudRepository<Sugerencia, Long> {
    @Query("SELECT s FROM Sugerencia s WHERE s.residente.cedula = :cedula")
    List<Sugerencia> findByCedulaResidente(@Param("cedula") String cedula);
    @Query(value = "SELECT COUNT(*) FROM sugerencias WHERE estado = 'En revision'", nativeQuery = true)
    int countSugerenciasEnRevision();
    @Query(value = "SELECT COUNT(*) FROM sugerencias WHERE estado = 'Nuevo'", nativeQuery = true)
    int countSugerenciasNuevas();
}
