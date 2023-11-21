package com.phManager.service;

import com.phManager.entity.AsignacionParqueadero;
import com.phManager.repository.AsignacionParqueaderoCrudRepository;
import com.phManager.repository.ParqueaderoCrudRepository;
import com.phManager.repository.ResidenteCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class AsignacionParqueaderoService {
    private AsignacionParqueaderoCrudRepository asignacionParqueaderoCrudRepository;
    private ParqueaderoCrudRepository parqueaderoCrudRepository;
    private ResidenteCrudRepository residenteCrudRepository;
    @Autowired
    public AsignacionParqueaderoService(AsignacionParqueaderoCrudRepository asignacionParqueaderoCrudRepository, ParqueaderoCrudRepository parqueaderoCrudRepository, ResidenteCrudRepository residenteCrudRepository) {
        this.asignacionParqueaderoCrudRepository = asignacionParqueaderoCrudRepository;
        this.parqueaderoCrudRepository = parqueaderoCrudRepository;
        this.residenteCrudRepository = residenteCrudRepository;
    }

    public List<AsignacionParqueadero> allAsignacionesParqueaderos(){
        return (List<AsignacionParqueadero>) asignacionParqueaderoCrudRepository.findAll();
    }
    public AsignacionParqueadero AsiganacionParqueaderoById(Long idAsignacion){
        return asignacionParqueaderoCrudRepository.findById(idAsignacion).get();
    }
    public AsignacionParqueadero saveAsignacionParqueadero(AsignacionParqueadero asignacionParqueadero){
        asignacionParqueadero.setEstadoAsignacion("En revision");
        asignacionParqueadero.setFechaAsignacion(LocalDate.now());
        asignacionParqueadero.setParqueadero(parqueaderoCrudRepository.findById(asignacionParqueadero.getParqueadero().getIdParqueadero()).get());
        asignacionParqueadero.setResidente(residenteCrudRepository.findById(asignacionParqueadero.getResidente().getCedula()).get());
        return asignacionParqueaderoCrudRepository.save(asignacionParqueadero);
    }
    public void deleteAsignacionParqueadero(Long idAsignacion){
        asignacionParqueaderoCrudRepository.deleteById(idAsignacion);
    }
    public AsignacionParqueadero updateAsignacionParqueadero(AsignacionParqueadero asignacionParqueadero){
        asignacionParqueadero.setFechaAsignacion(LocalDate.now());
        asignacionParqueadero.setParqueadero(parqueaderoCrudRepository.findById(asignacionParqueadero.getParqueadero().getIdParqueadero()).get());
        asignacionParqueadero.setResidente(residenteCrudRepository.findById(asignacionParqueadero.getResidente().getCedula()).get());
        return asignacionParqueaderoCrudRepository.save(asignacionParqueadero);
    }
    public boolean existsAsignacionParqueadero(Long id){
        return asignacionParqueaderoCrudRepository.existsById(id);
    }
}
