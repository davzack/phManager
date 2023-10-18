package com.phManager.controller;

import com.phManager.entity.Residente;
import com.phManager.service.ResidenteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/residente")
public class ResidenteController {
    private ResidenteService residenteService;

    public ResidenteController(ResidenteService residenteService) {
        this.residenteService = residenteService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Residente>> allResidentes() {
        return new ResponseEntity<>(residenteService.allResidentes(), HttpStatus.OK);
    }

    @GetMapping("/search/{cedula}")
    public ResponseEntity<Residente> residenteById(@PathVariable String cedula) {
        if (residenteService.existsResidente(cedula)) {
            return new ResponseEntity<>(residenteService.residenteById(cedula), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Residente> saveResidente(@RequestBody Residente residente) {
        return new ResponseEntity<>(residenteService.saveResidente(residente), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{cedula}")
    public ResponseEntity<Void> deleteResidente(@PathVariable String cedula) {
        if (residenteService.existsResidente(cedula)) {
            residenteService.deleteResidente(cedula);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Residente> updateResidente(@RequestBody Residente residente) {
        return new ResponseEntity<>(residenteService.updateResidente(residente), HttpStatus.OK);
    }
}
