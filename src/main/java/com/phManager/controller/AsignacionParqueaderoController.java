package com.phManager.controller;

import com.phManager.entity.AsignacionParqueadero;
import com.phManager.service.AsignacionParqueaderoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/asignacionparqueadero")
public class AsignacionParqueaderoController {
    private AsignacionParqueaderoService asignacionParqueaderoService;

    public AsignacionParqueaderoController(AsignacionParqueaderoService asignacionParqueaderoService) {
        this.asignacionParqueaderoService = asignacionParqueaderoService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<AsignacionParqueadero>> allAsignacionesParqueaderos() {
        return new ResponseEntity<>(asignacionParqueaderoService.allAsignacionesParqueaderos(), HttpStatus.OK);
    }

    @GetMapping("/search/{idAsignacion}")
    public ResponseEntity<AsignacionParqueadero> asignacionParqueaderoById(@PathVariable Long idAsignacion) {
        if (asignacionParqueaderoService.existsAsignacionParqueadero(idAsignacion)) {
            return new ResponseEntity<>(asignacionParqueaderoService.AsiganacionParqueaderoById(idAsignacion), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<AsignacionParqueadero> saveAsignacionParqueadero(@RequestBody AsignacionParqueadero asignacionParqueadero) {
        return new ResponseEntity<>(asignacionParqueaderoService.saveAsignacionParqueadero(asignacionParqueadero), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idAsignacion}")
    public ResponseEntity<Void> deleteAsignacionParqueadero(@PathVariable Long idAsignacion) {
        if (asignacionParqueaderoService.existsAsignacionParqueadero(idAsignacion)) {
            asignacionParqueaderoService.deleteAsignacionParqueadero(idAsignacion);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<AsignacionParqueadero> updateAsignacionParqueadero(@RequestBody AsignacionParqueadero asignacionParqueadero) {
        return new ResponseEntity<>(asignacionParqueaderoService.updateAsignacionParqueadero(asignacionParqueadero), HttpStatus.OK);
    }
}