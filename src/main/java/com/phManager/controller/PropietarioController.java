package com.phManager.controller;

import com.phManager.entity.Propietario;
import com.phManager.entity.Residente;
import com.phManager.service.PropietarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/propietario")
public class PropietarioController {
    private PropietarioService propietarioService;

    public PropietarioController(PropietarioService propietarioService) {
        this.propietarioService = propietarioService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Propietario>> allPropietarios() {
        return new ResponseEntity<>(propietarioService.allPropietarios(), HttpStatus.OK);
    }

    @GetMapping("/search/{cedula}")
    public ResponseEntity<Propietario> propietarioById(@PathVariable String cedula) {
        if (propietarioService.existsPropietario(cedula)) {
            return new ResponseEntity<>(propietarioService.propietarioById(cedula), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Propietario> savePropietario(@RequestBody Propietario propietario) {
        return new ResponseEntity<>(propietarioService.savePropietario(propietario), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{cedula}")
    public ResponseEntity<Void> deletePropietario(@PathVariable String cedula) {
        if (propietarioService.existsPropietario(cedula)) {
            propietarioService.deletePropietarios(cedula);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Propietario> updatePropietario(@RequestBody Propietario propietario) {
        return new ResponseEntity<>(propietarioService.updatePropietario(propietario), HttpStatus.OK);
    }

    @PutMapping("/update/cellphone")
    public ResponseEntity<Void> updateCelular(@RequestBody Residente residente) {
        propietarioService.actualizarTelefono(residente.getCedula(), residente.getTelefono());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
