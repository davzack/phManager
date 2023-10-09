package com.phManager.controller;

import com.phManager.entity.Sugerencia;
import com.phManager.service.SugerenciaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/sugerencia")
public class SugerenciaController {
    private SugerenciaService sugerenciaService;

    public SugerenciaController(SugerenciaService sugerenciaService) {
        this.sugerenciaService = sugerenciaService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Sugerencia>> allSugerencias() {
        return new ResponseEntity<>(sugerenciaService.allSugerencias(), HttpStatus.OK);
    }

    @GetMapping("/search/{idSugerencia}")
    public ResponseEntity<Sugerencia> sugerenciaById(@PathVariable Long idSugerencia) {
        if (sugerenciaService.existsSugerencia(idSugerencia)) {
            return new ResponseEntity<>(sugerenciaService.sugerenciaById(idSugerencia), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Sugerencia> saveSugerencia(@RequestBody Sugerencia sugerencia) {
        return new ResponseEntity<>(sugerenciaService.saveSugerencia(sugerencia), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idSugerencia}")
    public ResponseEntity<Void> deleteSugerencia(@PathVariable Long idSugerencia) {
        if (sugerenciaService.existsSugerencia(idSugerencia)) {
            sugerenciaService.deleteSugerencia(idSugerencia);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Sugerencia> updateSugerencia(@RequestBody Sugerencia sugerencia) {
        return new ResponseEntity<>(sugerenciaService.updateSugerencia(sugerencia), HttpStatus.OK);
    }
}
