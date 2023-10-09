package com.phManager.service;

import com.phManager.entity.RegistroVisita;
import com.phManager.repository.RegistroVisitaCrudRepository;
import com.phManager.repository.ResidenteCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class RegistroVisitaService {
    private RegistroVisitaCrudRepository registroVisitaCrudRepository;
    private ResidenteCrudRepository residenteCrudRepository;
    @Autowired
    public RegistroVisitaService(RegistroVisitaCrudRepository registroVisitaCrudRepository, ResidenteCrudRepository residenteCrudRepository) {
        this.registroVisitaCrudRepository = registroVisitaCrudRepository;
        this.residenteCrudRepository = residenteCrudRepository;
    }
    public List<RegistroVisita> allRegistrosVisitas(){
        return (List<RegistroVisita>) registroVisitaCrudRepository.findAll();
    }
    public RegistroVisita registroVisitaById(Long idRegistro){
        return registroVisitaCrudRepository.findById(idRegistro).get();
    }
    public RegistroVisita saveRegistroVisita(RegistroVisita registroVisita){
        registroVisita.setFechaVisita(LocalDateTime.now());
        registroVisita.setResidente(residenteCrudRepository.findById(registroVisita.getResidente().getCedula()).get());
        return registroVisitaCrudRepository.save(registroVisita);
    }
    public void deleteRegistroVisita(Long idRegistro){
        registroVisitaCrudRepository.deleteById(idRegistro);
    }
    public RegistroVisita updateRegistroVisita(RegistroVisita registroVisita){
        registroVisita.setResidente(residenteCrudRepository.findById(registroVisita.getResidente().getCedula()).get());
        return registroVisitaCrudRepository.save(registroVisita);
    }
    public boolean existsRegistroVisita(Long id){
        return registroVisitaCrudRepository.existsById(id);
    }

}
