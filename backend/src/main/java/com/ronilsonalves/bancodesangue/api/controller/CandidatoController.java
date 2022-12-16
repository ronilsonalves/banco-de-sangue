package com.ronilsonalves.bancodesangue.api.controller;

import com.ronilsonalves.bancodesangue.api.service.impl.DonorServiceImpl;
import com.ronilsonalves.bancodesangue.data.dto.CountPossivelDoadorReceptorDto;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/candidatos")
@Tag(name = "Donors")
@RequiredArgsConstructor
public class CandidatoController {

    private final DonorServiceImpl service;

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Returns a list of all donors loaded into db.", content = {
                    @Content(mediaType = "application/json")
            })
    })
    @PostMapping("/load-json")
    public ResponseEntity<?> loadJsonFile() {
        return ResponseEntity.ok().body(service.loadJsonFile());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a list of all donors.", content = {
                    @Content(mediaType = "application/json")
            })
    })
    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok().body(service.listAll());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a list with count by donors per Brazillian's states.", content = {
                    @Content(mediaType = "application/json")
            })
    })
    @GetMapping("/data/estado")
    public ResponseEntity<?> countByEstado() {
        return ResponseEntity.ok().body(service.countByState());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a list with average BMI by age group.", content = {
                    @Content(mediaType = "application/json")
            })
    })
    @GetMapping("/data/imc-medio-faixa-etaria")
    public ResponseEntity<?> imcMedioFaixaEtaria() {
        return ResponseEntity.ok().body(service.byFaixaEtaria());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a list with count of percentil between mens and womens.", content = {
                    @Content(mediaType = "application/json")
            })
    })
    @GetMapping("/data/obesidade-sexo")
    public ResponseEntity<?> percentilObesidade() {
        return ResponseEntity.ok().body(service.percentilBySexo());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns the average age by candidate's blood type.", content = {
                    @Content(mediaType = "application/json")
            })
    })
    @GetMapping("/data/idade-media")
    public ResponseEntity<?> idadeMediaTipoSanguineo() {
        return ResponseEntity.ok().body(service.idadeMediaPorTipoSanguineo());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Returns a list with count by the number of pontential donors for each recipient blood type.", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = CountPossivelDoadorReceptorDto.class))
            })
    })
    @GetMapping("/data/aptos")
    public ResponseEntity<?> aptosDoacao() {
        return ResponseEntity.ok().body(service.countPossiveisDoadores());
    }
}
