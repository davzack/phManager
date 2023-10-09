package com.phManager.controller;

import com.phManager.entity.Cuota;
import com.phManager.service.CuotaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/cuota")
public class CuotaController {
    private CuotaService cuotaService;

    public CuotaController(CuotaService cuotaService) {
        this.cuotaService = cuotaService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cuota>> allCuotas() {
        return new ResponseEntity<>(cuotaService.allCuotas(), HttpStatus.OK);
    }

    @GetMapping("/search/{idCuota}")
    public ResponseEntity<Cuota> cuotaById(@PathVariable Long idCuota) {
        if (cuotaService.existsCuota(idCuota)) {
            return new ResponseEntity<>(cuotaService.cuotaById(idCuota), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Cuota> saveCuota(@RequestBody Cuota cuota) {
        return new ResponseEntity<>(cuotaService.saveCuota(cuota), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idCuota}")
    public ResponseEntity<Void> deleteCuota(@PathVariable Long idCuota) {
        if (cuotaService.existsCuota(idCuota)) {
            cuotaService.deleteCuota(idCuota);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Cuota> updateCuota(@RequestBody Cuota cuota) {
        return new ResponseEntity<>(cuotaService.updateCuota(cuota), HttpStatus.OK);
    }
}
