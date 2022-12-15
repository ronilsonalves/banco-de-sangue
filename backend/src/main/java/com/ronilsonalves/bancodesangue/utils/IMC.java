package com.ronilsonalves.bancodesangue.utils;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@RequiredArgsConstructor
public class IMC {
    private float peso;
    private float altura;

    public float calcularIMC() {
        return peso / (altura * altura);
    }

    public boolean isObeso() {
        return calcularIMC() > 30;
    }
}
