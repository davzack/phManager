package com.phManager.controller;

import com.phManager.entity.Apartamento;
import com.phManager.service.ApartamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/apartamento")
public class ApartamentoController {
    private ApartamentoService apartamentoService;

    public ApartamentoController(ApartamentoService apartamentoService) {
        this.apartamentoService = apartamentoService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Apartamento>> allApartamentos(){
        return new ResponseEntity<>(apartamentoService.allApartamentos(), HttpStatus.OK);
    }
    @GetMapping("/search/{idApartamento}")
    public ResponseEntity<Apartamento> apartamentoById(@PathVariable Long idApartamento){
        if(apartamentoService.existsApartamento(idApartamento)){
            return new ResponseEntity<>(apartamentoService.apartamentoById(idApartamento), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/save")
    public ResponseEntity<Apartamento> saveApartamento(@RequestBody Apartamento apartamento){
        return new ResponseEntity<>(apartamentoService.addApartamento(apartamento), HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{idApartamento}")
    public ResponseEntity<Void> deleteApartamento(@PathVariable Long idApartamento){
        if(apartamentoService.existsApartamento(idApartamento)){
            apartamentoService.deleteApartamento(idApartamento);
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<Apartamento> updateApartamento(@RequestBody Apartamento apartamento){
        return new ResponseEntity<>(apartamentoService.addApartamento(apartamento), HttpStatus.CREATED);
    }
}
