package com.phManager.service;

import com.phManager.entity.Residente;
import com.phManager.repository.ApartamentoCrudRepository;
import com.phManager.repository.ResidenteCrudRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ResidenteService {
    private ResidenteCrudRepository residenteCrudRepository;
    private ApartamentoCrudRepository apartamentoCrudRepository;
    @Autowired
    public ResidenteService(ResidenteCrudRepository residenteCrudRepository, ApartamentoCrudRepository apartamentoCrudRepository) {
        this.residenteCrudRepository = residenteCrudRepository;
        this.apartamentoCrudRepository = apartamentoCrudRepository;
    }

    public List<Residente> allResidentes(){
        return (List<Residente>) residenteCrudRepository.findAll();
    }

    public List<Residente> allResidentesByApto(Long idApto){
        return (List<Residente>) residenteCrudRepository.findByApartamentoId(idApto);
    }
    public Residente residenteById(String cedula){
        return residenteCrudRepository.findById(cedula).get();
    }
    public Residente saveResidente(Residente residente){
        residente.setApartamento(apartamentoCrudRepository.findById(residente.getApartamento().getIdApartamento()).get());
        return residenteCrudRepository.save(residente);
    }
    public void deleteResidente(String cedula){
        residenteCrudRepository.deleteById(cedula);
    }
    public Residente updateResidente(Residente residente){
        residente.setApartamento(apartamentoCrudRepository.findById(residente.getApartamento().getIdApartamento()).get());
        return residenteCrudRepository.save(residente);
    }
    public boolean existsResidente(String cedula){
        return residenteCrudRepository.existsById(cedula);
    }

    public Residente residenteByCorreo(String correo){
        return residenteCrudRepository.findByCorreo(correo);
    }
    @Modifying
    @Transactional
    public void actualizarTelefono(String cedula, String nuevoTelefono) {
        residenteCrudRepository.actualizarTelefono(cedula, nuevoTelefono);
    }

}
