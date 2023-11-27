package com.phManager.service;

import com.phManager.entity.Propietario;
import com.phManager.entity.Residente;
import com.phManager.repository.ApartamentoCrudRepository;
import com.phManager.repository.PropietarioCrudRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PropietarioService {
    private PropietarioCrudRepository propietarioCrudRepository;
    private ApartamentoCrudRepository apartamentoCrudRepository;

    public PropietarioService(PropietarioCrudRepository propietarioCrudRepository, ApartamentoCrudRepository apartamentoCrudRepository) {
        this.propietarioCrudRepository = propietarioCrudRepository;
        this.apartamentoCrudRepository = apartamentoCrudRepository;
    }
    public List<Propietario> allPropietarios(){
        return (List<Propietario>) propietarioCrudRepository.findAll();
    }
    public Propietario propietarioById(String cedula){
        return propietarioCrudRepository.findById(cedula).get();
    }
    public Propietario savePropietario(Propietario propietario){
        propietario.setApartamento(apartamentoCrudRepository.findById(propietario.getApartamento().getIdApartamento()).get());
        return propietarioCrudRepository.save(propietario);
    }
    public void deletePropietarios(String cedula){
        propietarioCrudRepository.deleteById(cedula);
    }
    public Propietario updatePropietario(Propietario propietario){
        propietario.setApartamento(apartamentoCrudRepository.findById(propietario.getApartamento().getIdApartamento()).get());
        return propietarioCrudRepository.save(propietario);
    }
    public Propietario propietarioByCorreo(String correo){
        return propietarioCrudRepository.findByCorreo(correo);
    }
    public boolean existsPropietario(String cedula){
        return propietarioCrudRepository.existsById(cedula);
    }
    @Modifying
    @Transactional
    public void actualizarTelefono(String cedula, String nuevoTelefono) {
        propietarioCrudRepository.actualizarTelefono(cedula, nuevoTelefono);
    }

}
