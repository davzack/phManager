package com.phManager.controller;

import com.phManager.entity.Parqueadero;
import com.phManager.service.ParqueaderoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/parqueadero")
public class ParqueaderoController {
    private ParqueaderoService parqueaderoService;

    public ParqueaderoController(ParqueaderoService parqueaderoService) {
        this.parqueaderoService = parqueaderoService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Parqueadero>> allParqueaderos() {
        return new ResponseEntity<>(parqueaderoService.allParqueaderos(), HttpStatus.OK);
    }

    @GetMapping("/search/{idParqueadero}")
    public ResponseEntity<Parqueadero> parqueaderoById(@PathVariable Long idParqueadero) {
        if (parqueaderoService.existsParqueadero(idParqueadero)) {
            return new ResponseEntity<>(parqueaderoService.parqueaderoById(idParqueadero), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Parqueadero> saveParqueadero(@RequestBody Parqueadero parqueadero) {
        return new ResponseEntity<>(parqueaderoService.saveParqueadero(parqueadero), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idParqueadero}")
    public ResponseEntity<Void> deleteParqueadero(@PathVariable Long idParqueadero) {
        if (parqueaderoService.existsParqueadero(idParqueadero)) {
            parqueaderoService.deleteParqueadero(idParqueadero);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Parqueadero> updateParqueadero(@RequestBody Parqueadero parqueadero) {
        return new ResponseEntity<>(parqueaderoService.updateParqueadero(parqueadero), HttpStatus.OK);
    }
}
