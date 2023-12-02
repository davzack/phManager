package com.phManager.repository;

import com.phManager.entity.Cuota;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CuotaCrudRepository extends CrudRepository<Cuota, Long> {
    @Query("SELECT c FROM Cuota c WHERE c.apartamento.idApartamento = :apartamentoId")
    List<Cuota> findByApartamentoId(@Param("apartamentoId") Long apartamentoId);
    @Query(value = "SELECT COUNT(*) FROM cuotas WHERE estado = 'Pendiente'", nativeQuery = true)
    int countCuotasPendientes();

}
