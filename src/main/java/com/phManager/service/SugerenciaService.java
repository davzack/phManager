package com.phManager.service;

import com.phManager.entity.Sugerencia;
import com.phManager.repository.ResidenteCrudRepository;
import com.phManager.repository.SugerenciaCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class SugerenciaService {
    private SugerenciaCrudRepository sugerenciaCrudRepository;
    private ResidenteCrudRepository residenteCrudRepository;
    @Autowired
    public SugerenciaService(SugerenciaCrudRepository sugerenciaCrudRepository, ResidenteCrudRepository residenteCrudRepository) {
        this.sugerenciaCrudRepository = sugerenciaCrudRepository;
        this.residenteCrudRepository = residenteCrudRepository;
    }

    public List<Sugerencia> allSugerencias(){
        return (List<Sugerencia>) sugerenciaCrudRepository.findAll();
    }
    public Sugerencia sugerenciaById(Long idSugerencia){
        return sugerenciaCrudRepository.findById(idSugerencia).get();
    }
    public Sugerencia saveSugerencia(Sugerencia sugerencia){
        sugerencia.setEstado("Nuevo");
        sugerencia.setFecha(LocalDate.now());
        sugerencia.setResidente(residenteCrudRepository.findById(sugerencia.getResidente().getCedula()).get());
        return sugerenciaCrudRepository.save(sugerencia);
    }
    public void deleteSugerencia(Long idSugerencia){
        sugerenciaCrudRepository.deleteById(idSugerencia);
    }
    public Sugerencia updateSugerencia(Sugerencia sugerencia){
        sugerencia.setResidente(residenteCrudRepository.findById(sugerencia.getResidente().getCedula()).get());
        return sugerenciaCrudRepository.save(sugerencia);
    }
    public boolean existsSugerencia(Long idSugerencia){
        return sugerenciaCrudRepository.existsById(idSugerencia);
    }
    public int countNuevas(){
        return sugerenciaCrudRepository.countSugerenciasNuevas();
    }
    public int countEnRevision(){
        return sugerenciaCrudRepository.countSugerenciasEnRevision();
    }
    public List<Sugerencia> findByCedulaResidente(String cedula){
        return sugerenciaCrudRepository.findByCedulaResidente(cedula);
    }
}
