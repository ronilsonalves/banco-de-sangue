package com.ronilsonalves.bancodesangue.data.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class JsonLoaderResponse {
    private String nome;
    private String cpf;
    private String rg;
    @JsonProperty("data_nasc")
    private String dataNascimento;
    private String sexo;
    private String mae;
    private String pai;
    private String email;
    private String cep;
    private String endereco;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;
    @JsonProperty("telefone_fixo")
    private String telefone;
    private String celular;
    private String altura;
    private String peso;
    @JsonProperty("tipo_sanguineo")
    private String tipoSanguineo;
}
