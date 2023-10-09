package com.phManager.controller;

import com.phManager.entity.RegistroVisita;
import com.phManager.service.RegistroVisitaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/registrovisita")
public class RegistroVisitaController {
    private RegistroVisitaService registroVisitaService;

    public RegistroVisitaController(RegistroVisitaService registroVisitaService) {
        this.registroVisitaService = registroVisitaService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<RegistroVisita>> allRegistrosVisitas() {
        return new ResponseEntity<>(registroVisitaService.allRegistrosVisitas(), HttpStatus.OK);
    }

    @GetMapping("/search/{idRegistro}")
    public ResponseEntity<RegistroVisita> registroVisitaById(@PathVariable Long idRegistro) {
        if (registroVisitaService.existsRegistroVisita(idRegistro)) {
            return new ResponseEntity<>(registroVisitaService.registroVisitaById(idRegistro), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<RegistroVisita> saveRegistroVisita(@RequestBody RegistroVisita registroVisita) {
        return new ResponseEntity<>(registroVisitaService.saveRegistroVisita(registroVisita), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idRegistro}")
    public ResponseEntity<Void> deleteRegistroVisita(@PathVariable Long idRegistro) {
        if (registroVisitaService.existsRegistroVisita(idRegistro)) {
            registroVisitaService.deleteRegistroVisita(idRegistro);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<RegistroVisita> updateRegistroVisita(@RequestBody RegistroVisita registroVisita) {
        return new ResponseEntity<>(registroVisitaService.updateRegistroVisita(registroVisita), HttpStatus.OK);
    }
}
