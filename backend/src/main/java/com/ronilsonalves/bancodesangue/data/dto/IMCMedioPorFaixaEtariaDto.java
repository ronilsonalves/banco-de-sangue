package com.ronilsonalves.bancodesangue.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class IMCMedioPorFaixaEtariaDto {
    private String faixaEtaria;
    private double imcMedio;
}
