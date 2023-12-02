package com.phManager.repository;

import com.phManager.entity.ReservaZonaComun;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ReservaZonaComunCrudRepository extends CrudRepository<ReservaZonaComun, Long> {
    @Query(value = "SELECT COUNT(*) FROM reserva_zonas_comunes WHERE estado_reserva = 'En revision'", nativeQuery = true)
    int countReservasEnRevision();
    @Query(value = "SELECT COUNT(*) FROM reserva_zonas_comunes WHERE estado_reserva = 'Programada'", nativeQuery = true)
    int countReservasProgramadas();
}
