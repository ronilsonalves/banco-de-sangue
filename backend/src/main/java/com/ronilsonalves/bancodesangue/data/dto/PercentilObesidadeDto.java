package com.ronilsonalves.bancodesangue.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class PercentilObesidadeDto {
    private String sexo;
    private double percentil;
}
