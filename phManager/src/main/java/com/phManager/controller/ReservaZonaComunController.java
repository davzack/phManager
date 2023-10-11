package com.phManager.controller;

import com.phManager.entity.RegistroVisita;
import com.phManager.entity.ReservaZonaComun;
import com.phManager.service.ReservaZonaComunService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("api/reservazonacomun")
public class ReservaZonaComunController {
    private ReservaZonaComunService reservaZonaComunService;

    public ReservaZonaComunController(ReservaZonaComunService reservaZonaComunService) {
        this.reservaZonaComunService = reservaZonaComunService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReservaZonaComun>> allReservasZonasComunes() {
        return new ResponseEntity<>(reservaZonaComunService.allReservasZonasComunes(), HttpStatus.OK);
    }

    @GetMapping("/search/{idReservaZonaComun}")
    public ResponseEntity<ReservaZonaComun> reservaZonaComunById(@PathVariable Long idReservaZonaComun) {
        if (reservaZonaComunService.existsReservaZonaComun(idReservaZonaComun)) {
            return new ResponseEntity<>(reservaZonaComunService.reservaZonaComunById(idReservaZonaComun), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ReservaZonaComun> saveReservaZonaComun(@RequestBody ReservaZonaComun reservaZonaComun) {
        return new ResponseEntity<>(reservaZonaComunService.saveReservaZonaComun(reservaZonaComun), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idReservaZonaComun}")
    public ResponseEntity<Void> deleteReservaZonaComun(@PathVariable Long idReservaZonaComun) {
        if (reservaZonaComunService.existsReservaZonaComun(idReservaZonaComun)) {
            reservaZonaComunService.deleteReservaZonaComun(idReservaZonaComun);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<ReservaZonaComun> updateReservaZonaComun(@RequestBody ReservaZonaComun reservaZonaComun) {
        return new ResponseEntity<>(reservaZonaComunService.updateReservaZonaComun(reservaZonaComun), HttpStatus.CREATED);
    }
}
