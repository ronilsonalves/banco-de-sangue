package com.ronilsonalves.bancodesangue.api.controller;

import com.ronilsonalves.bancodesangue.api.service.impl.DonorServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/candidatos")
@RequiredArgsConstructor
public class CandidatoController {

    private final DonorServiceImpl service;

    @PostMapping("/load-json")
    public ResponseEntity<?> loadJsonFile() {
        //service.loadJsonFile();
        return ResponseEntity.ok().body(service.loadJsonFile());
        //return ResponseEntity.ok().body("Carregou o arquivo");
    }

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(service.listAll());
    }

    @GetMapping("/por-estado")
    public ResponseEntity<?> countByEstado() {
        return ResponseEntity.ok().body(service.countByState());
    }

    @GetMapping("/imc-medio-faixa-etaria")
    public ResponseEntity<?> imcMedioFaixaEtaria() {
        return ResponseEntity.ok().body(service.byFaixaEtaria());
    }

    @GetMapping("/obesidade-sexo")
    public ResponseEntity<?> percentilObesidade() {
        return ResponseEntity.ok().body(service.percentilBySexo());
    }

    @GetMapping("/idade-media-tipo-sanguineo")
    public ResponseEntity<?> idadeMediaTipoSanguineo() {
        return ResponseEntity.ok().body(service.idadeMediaPorTipoSanguineo());
    }
}
