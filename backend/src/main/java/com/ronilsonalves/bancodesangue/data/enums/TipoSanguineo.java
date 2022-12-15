package com.ronilsonalves.bancodesangue.data.enums;

public enum TipoSanguineo {
    A_POSITIVO("A+"),
    A_NEGATIVO("A-"),
    B_POSITIVO("B+"),
    B_NEGATIVO("B-"),
    AB_POSITIVO("AB+"),
    AB_NEGATIVO("AB-"),
    O_POSITIVO("O+"),
    O_NEGATIVO("O-");

    private String name;

    TipoSanguineo(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
