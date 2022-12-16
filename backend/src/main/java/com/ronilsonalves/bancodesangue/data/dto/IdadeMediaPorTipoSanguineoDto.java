package com.ronilsonalves.bancodesangue.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IdadeMediaPorTipoSanguineoDto {
    private String tipoSanguineo;
    private int idadeMedia;
}
