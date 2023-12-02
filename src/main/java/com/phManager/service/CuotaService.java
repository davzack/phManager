package com.phManager.service;

import com.phManager.entity.Cuota;
import com.phManager.repository.ApartamentoCrudRepository;
import com.phManager.repository.CuotaCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CuotaService {

    private CuotaCrudRepository cuotaCrudRepository;
    private ApartamentoCrudRepository apartamentoCrudRepository;
    @Autowired
    public CuotaService(CuotaCrudRepository cuotaCrudRepository, ApartamentoCrudRepository apartamentoCrudRepository) {
        this.cuotaCrudRepository = cuotaCrudRepository;
        this.apartamentoCrudRepository = apartamentoCrudRepository;
    }
    public List<Cuota> allCuotasById(Long apartamentoId){
        return (List<Cuota>) cuotaCrudRepository.findByApartamentoId(apartamentoId);
    }
    public List<Cuota> allCuotas(){
        return (List<Cuota>) cuotaCrudRepository.findAll();
    }
    public Cuota cuotaById(Long idCuota){
        return cuotaCrudRepository.findById(idCuota).get();
    }
    public Cuota saveCuota(Cuota cuota){
        cuota.setApartamento(apartamentoCrudRepository.findById(cuota.getApartamento().getIdApartamento()).get());
        return cuotaCrudRepository.save(cuota);
    }
    public void deleteCuota(Long idCuota){
        cuotaCrudRepository.deleteById(idCuota);
    }
    public Cuota updateCuota(Cuota cuota){
        cuota.setApartamento(apartamentoCrudRepository.findById(cuota.getApartamento().getIdApartamento()).get());
        return cuotaCrudRepository.save(cuota);
    }
    public boolean existsCuota(Long id){
        return cuotaCrudRepository.existsById(id);
    }
    public int countCuotasPendientes(){
        return cuotaCrudRepository.countCuotasPendientes();
    }
}
