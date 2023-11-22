package com.phManager.repository;

import com.phManager.entity.Parqueadero;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ParqueaderoCrudRepository extends CrudRepository<Parqueadero, Long> {
    @Query("SELECT p FROM Parqueadero p WHERE p.idParqueadero NOT IN (SELECT ap.parqueadero.idParqueadero FROM AsignacionParqueadero ap)")
    List<Parqueadero> encontrarParqueaderosNoAsignados();
}
