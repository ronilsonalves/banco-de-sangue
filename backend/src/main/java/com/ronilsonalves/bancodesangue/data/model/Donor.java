package com.ronilsonalves.bancodesangue.data.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "donors")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Donor{

    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank(message = "Preencha o nome do(a) doador(a)")
    private String nome;

    @NotBlank(message = "Preencha o campo CPF do(a) doador(a)")
    @Column(unique = true)
    private String cpf;

    @Column(unique = true)
    @NotBlank(message = "Preencha o campo RG do(a) doador(a)")
    private String rg;

    @NotNull(message = "Preencha o campo data de nascimento do(a) doador(a)")
    @JsonProperty("data_nasc")
    private LocalDate dataNascimento;

    @NotBlank(message = "Preencha o campo sexo do(a) doador(a)")
    private String sexo;

    @NotBlank(message = "Preencha o campo mae do(a) doador(a)")
    private String mae;

    @NotBlank(message = "Preencha o campo pai do(a) doador(a)")
    private String pai;

    @NotBlank(message = "Preencha o campo email do(a) doador(a)")
    private String email;

    @NotBlank(message = "Preencha o campo CEP do(a) doador(a)")
    private String cep;

    @NotBlank(message = "Preencha o campo endereço do(a) doador(a)")
    private String endereco;

    @NotNull(message = "Preencha o campo número do endereço do(a) doador(a)")
    private int numero;

    @NotBlank(message = "Preencha o campo bairro do(a) doador(a)")
    private String bairro;

    @NotBlank(message = "Preencha o campo cidade do(a) doador(a)")
    private String cidade;

    @NotBlank(message = "O campo estado é obrigatório")
    private String estado;

    @NotBlank(message = "Preencha o número de telefone do(a) doador(a)")
    @Column(name = "telefone_fixo")
    @JsonProperty("telefone_fixo")
    private String telefoneFixo;

    @NotBlank(message = "Preencha o número de celular do(a) doador(a)")
    private String celular;

    @NotNull(message = "Informe a altura do(a) doador(a)")
    private float altura;

    @NotNull(message = "Informe o peso do(a) doador(a)")
    private float peso;

    @NotNull(message = "Selecione o tipo sanguíneo do(a) doador(a)")
    @Column(name = "tipo_sanguineo")
    @JsonProperty("tipo_sanguineo")
    private String tipoSanguineo;

    public int getIdade() {
        return LocalDate.now().minusYears(dataNascimento.getYear()).getYear();
    }

    public boolean canDonate() {
        return getIdade() >= 16 && getIdade() <= 69 && peso >= 50;
    }
}
