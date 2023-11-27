package com.phManager.controller;

import com.phManager.entity.ZonaComun;
import com.phManager.service.ZonaComunService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.*;
import java.util.List;
@RestController
@RequestMapping("api/zonacomun")
public class ZonaComunController {
    private ZonaComunService zonaComunService;

    public ZonaComunController(ZonaComunService zonaComunService) {
        this.zonaComunService = zonaComunService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ZonaComun>> allZonasComunes() {
        return new ResponseEntity<>(zonaComunService.allZonasComunes(), HttpStatus.OK);
    }

    @GetMapping("/search/{idZonaComun}")
    public ResponseEntity<ZonaComun> zonaComunById(@PathVariable Long idZonaComun) {
        if (zonaComunService.existsZonaComun(idZonaComun)) {
            return new ResponseEntity<>(zonaComunService.zonaComunById(idZonaComun), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<ZonaComun> saveZonaComun(@RequestBody ZonaComun zonaComun) {
        return new ResponseEntity<>(zonaComunService.saveZonaComun(zonaComun), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idZonaComun}")
    public ResponseEntity<Void> deleteZonaComun(@PathVariable Long idZonaComun) {
        if (zonaComunService.existsZonaComun(idZonaComun)) {
            zonaComunService.deleteZonaComun(idZonaComun);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/upload/{id}")
    public String upload(@PathVariable Long id, @RequestPart("imagen") MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String path = System.getProperty("user.dir") + "/src/main/resources/static/css/assets/img/" + fileName;
        String guardarPath="../css/assets/img/"+ fileName;
        try (BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(path))) {
            outputStream.write(file.getBytes());
        }
        ZonaComun zonaComun=zonaComunService.zonaComunById(id);
        zonaComun.setFotos(guardarPath);
        zonaComunService.updateZonaComun(zonaComun);
        return "Imagen subida correctamente";
    }

    @PutMapping("/update")
    public ResponseEntity<ZonaComun> updateZonaComun(@RequestBody ZonaComun zonaComun) {
        return new ResponseEntity<>(zonaComunService.updateZonaComun(zonaComun), HttpStatus.OK);
    }
}
