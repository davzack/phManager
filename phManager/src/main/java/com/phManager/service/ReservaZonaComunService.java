package com.phManager.service;

import com.phManager.entity.ReservaZonaComun;
import com.phManager.repository.ReservaZonaComunCrudRepository;
import com.phManager.repository.ResidenteCrudRepository;
import com.phManager.repository.ZonaComunCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReservaZonaComunService {
    private ReservaZonaComunCrudRepository reservaZonaComunCrudRepository;
    private ResidenteCrudRepository residenteCrudRepository;
    private ZonaComunCrudRepository zonaComunCrudRepository;
    @Autowired
    public ReservaZonaComunService(ReservaZonaComunCrudRepository reservaZonaComunCrudRepository, ResidenteCrudRepository residenteCrudRepository, ZonaComunCrudRepository zonaComunCrudRepository) {
        this.reservaZonaComunCrudRepository = reservaZonaComunCrudRepository;
        this.residenteCrudRepository = residenteCrudRepository;
        this.zonaComunCrudRepository = zonaComunCrudRepository;
    }

    public List<ReservaZonaComun> allReservasZonasComunes(){
        return (List<ReservaZonaComun>) reservaZonaComunCrudRepository.findAll();
    }
    public ReservaZonaComun reservaZonaComunById(Long idReservaZonaComun){
        return reservaZonaComunCrudRepository.findById(idReservaZonaComun).get();
    }
    public ReservaZonaComun saveReservaZonaComun(ReservaZonaComun reservaZonaComun){
        reservaZonaComun.setResidente(residenteCrudRepository.findById(reservaZonaComun.getResidente().getCedula()).get());
        reservaZonaComun.setZonaComun(zonaComunCrudRepository.findById(reservaZonaComun.getZonaComun().getIdZonaComun()).get());
        return reservaZonaComunCrudRepository.save(reservaZonaComun);
    }
    public void deleteReservaZonaComun(Long idReservaZonaComun){
        reservaZonaComunCrudRepository.deleteById(idReservaZonaComun);
    }
    public boolean existsReservaZonaComun(Long idReservaZonaComun){
        return reservaZonaComunCrudRepository.existsById(idReservaZonaComun);
    }
    public ReservaZonaComun updateReservaZonaComun(ReservaZonaComun reservaZonaComun){
        reservaZonaComun.setResidente(residenteCrudRepository.findById(reservaZonaComun.getResidente().getCedula()).get());
        reservaZonaComun.setZonaComun(zonaComunCrudRepository.findById(reservaZonaComun.getZonaComun().getIdZonaComun()).get());
        return reservaZonaComunCrudRepository.save(reservaZonaComun);
    }
}
