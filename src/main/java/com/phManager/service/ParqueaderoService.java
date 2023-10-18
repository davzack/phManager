package com.phManager.service;

import com.phManager.entity.Parqueadero;
import com.phManager.repository.ParqueaderoCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ParqueaderoService {
    private ParqueaderoCrudRepository parqueaderoCrudRepository;

    public ParqueaderoService(ParqueaderoCrudRepository parqueaderoCrudRepository) {
        this.parqueaderoCrudRepository = parqueaderoCrudRepository;
    }
    public List<Parqueadero> allParqueaderos(){
        return (List<Parqueadero>) parqueaderoCrudRepository.findAll();
    }
    public Parqueadero parqueaderoById(Long idParqueadero){
        return parqueaderoCrudRepository.findById(idParqueadero).get();
    }
    public Parqueadero saveParqueadero(Parqueadero parqueadero){
        return parqueaderoCrudRepository.save(parqueadero);
    }
    public void deleteParqueadero(Long idParqueadero){
        parqueaderoCrudRepository.deleteById(idParqueadero);
    }
    public Parqueadero updateParqueadero(Parqueadero parqueadero){
        return parqueaderoCrudRepository.save(parqueadero);
    }
    public boolean existsParqueadero(Long id){
        return parqueaderoCrudRepository.existsById(id);
    }

}
