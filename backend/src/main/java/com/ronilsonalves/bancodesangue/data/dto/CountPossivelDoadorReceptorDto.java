package com.ronilsonalves.bancodesangue.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CountPossivelDoadorReceptorDto {
    private String tipoSanguineoReceptor;
    private int count;
}
