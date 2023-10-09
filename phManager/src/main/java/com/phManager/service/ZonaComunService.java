package com.phManager.service;

import com.phManager.entity.ZonaComun;
import com.phManager.repository.ZonaComunCrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ZonaComunService {
    private ZonaComunCrudRepository zonaComunCrudRepository;

    public ZonaComunService(ZonaComunCrudRepository zonaComunCrudRepository) {
        this.zonaComunCrudRepository = zonaComunCrudRepository;
    }
    public List<ZonaComun> allZonasComunes(){
        return (List<ZonaComun>) zonaComunCrudRepository.findAll();
    }
    public ZonaComun zonaComunById(Long idZonaComun){
        return zonaComunCrudRepository.findById(idZonaComun).get();
    }
    public ZonaComun saveZonaComun(ZonaComun zonaComun){
        return zonaComunCrudRepository.save(zonaComun);
    }
    public void  deleteZonaComun(Long idZonaComun){
        zonaComunCrudRepository.deleteById(idZonaComun);
    }
    public ZonaComun updateZonaComun(ZonaComun zonaComun){
        return zonaComunCrudRepository.save(zonaComun);
    }
    public boolean existsZonaComun(Long idZonaComun){
        return zonaComunCrudRepository.existsById(idZonaComun);
    }

}
