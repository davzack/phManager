package com.phManager.service;

import com.phManager.entity.Apartamento;
import com.phManager.repository.ApartamentoCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ApartamentoService {
    private ApartamentoCrudRepository apartamentoCrudRepository;
    @Autowired
    public ApartamentoService(ApartamentoCrudRepository apartamentoCrudRepository) {
        this.apartamentoCrudRepository = apartamentoCrudRepository;
    }

    public List<Apartamento> allApartamentos(){
        return (List<Apartamento>) apartamentoCrudRepository.findAll();
    }
    public Apartamento apartamentoById(Long idApto){
        return apartamentoCrudRepository.findById(idApto).get();
    }
    public Apartamento addApartamento(Apartamento apartamento){
        return apartamentoCrudRepository.save(apartamento);
    }
    public void deleteApartamento(Long idAptop){
        apartamentoCrudRepository.deleteById(idAptop);
    }
    public Apartamento updateApartamento(Apartamento apartamento){
        return apartamentoCrudRepository.save(apartamento);
    }
    public boolean existsApartamento(Long id){
        return apartamentoCrudRepository.existsById(id);
    }
}
