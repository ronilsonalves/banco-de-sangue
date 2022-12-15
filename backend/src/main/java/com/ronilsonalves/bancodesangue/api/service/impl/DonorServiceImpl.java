package com.ronilsonalves.bancodesangue.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ronilsonalves.bancodesangue.api.client.JsonLoaderClient;
import com.ronilsonalves.bancodesangue.api.service.DonorService;
import com.ronilsonalves.bancodesangue.data.dto.CountEstadoDto;
import com.ronilsonalves.bancodesangue.data.dto.IMCMedioPorFaixaEtariaDto;
import com.ronilsonalves.bancodesangue.data.dto.IdadeMediaPorTipoSanguineoDto;
import com.ronilsonalves.bancodesangue.data.dto.PercentilObesidadeDto;
import com.ronilsonalves.bancodesangue.data.enums.Estado;
import com.ronilsonalves.bancodesangue.data.enums.TipoSanguineo;
import com.ronilsonalves.bancodesangue.data.model.Donor;
import com.ronilsonalves.bancodesangue.data.model.JsonLoaderResponse;
import com.ronilsonalves.bancodesangue.data.repository.DonorRepository;
import com.ronilsonalves.bancodesangue.utils.IMC;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Float.parseFloat;
import static java.lang.Integer.numberOfTrailingZeros;
import static java.lang.Integer.parseInt;

@Service
public class DonorServiceImpl implements DonorService {

    private final DonorRepository repository;
    private final JsonLoaderClient client;

    public DonorServiceImpl(DonorRepository repository, JsonLoaderClient client) {
        this.repository = repository;
        this.client = client;
    }

    /**
     * Salva uma lista de candidatos no banco de dados providos pelo JsonLoaderClient
     *
     * @return List<Donor>
     */
    public List<?> loadJsonFile() {
        List<JsonLoaderResponse> candidatosLoader;
        List<Donor> donors = new ArrayList<>();
        candidatosLoader = client.loadJsonData();
        try {
            //TODO: Inserir com o SaveAll demorou cerca de 18.75s - um a um com save demorou 1m12.78s.
            candidatosLoader.forEach(candidatoLoader -> {
                Donor donor = new Donor();
                BeanUtils.copyProperties(candidatoLoader, donor);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                donor.setDataNascimento(LocalDate.parse(candidatoLoader.getDataNascimento(), formatter));
                donor.setNumero(parseInt(candidatoLoader.getNumero()));
                donor.setTelefoneFixo(candidatoLoader.getTelefone());
                donor.setAltura(parseFloat(candidatoLoader.getAltura()));
                donor.setPeso(parseFloat(candidatoLoader.getPeso()));
                donors.add(donor);
            });
            repository.saveAll(donors);
            return donors;
        } catch (Exception e) {
            e.printStackTrace();
            return donors;
        }
    }

    /**
     * Retorna uma lista de doadores, sem filtros. Vazia, em caso de não houver doadores cadastrados.
     *
     * @return
     */
    @Override
    public List<Donor> listAll() {
        return repository.findAll();
    }

    /**
     * Busca um doador por Id.
     *
     * @return Donor
     */
    @Override
    public Donor get(UUID id) {
        if (repository.findById(String.valueOf(id)).isPresent()) {
            return repository.findById(String.valueOf(id)).get();
        }
        //TODO: Criar uma exception para quando não encontrar o candidato.
        return null;
    }

    /**
     * Salva um Doador.
     *
     * @return Donor
     */
    @Override
    public Donor save(Donor entity) {
        return repository.save(entity);
    }

    /**
     * Deleta um Doador.
     */
    @Override
    public void delete(UUID id) {
        repository.deleteById(String.valueOf(id));
    }

    /**
     * Conta a quantidade de candidatos por estado.
     *
     * @return List<CountEstadoDto>
     */
    @Override
    public List<?> countByState() {
        List<CountEstadoDto> counts = new ArrayList<>();
        Arrays.stream(Estado.values()).map(estado -> {
            CountEstadoDto countObject = new CountEstadoDto();
            countObject.setEstado(estado.name());
            countObject.setCount(repository.countByEstado(estado.name()));
            return countObject;
        }).forEach(counts::add);
        return counts;
    }

    /**
     * Calcula a média de IMC por faixa etária.
     *
     * @return List<IMCMedioPorFaixaEtariaDto>
     */
    @Override
    public List<?> byFaixaEtaria() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<IMCMedioPorFaixaEtariaDto> imcMedioPorFaixaList = new ArrayList<>();
        List<String> faixas = faixaEtaria();
        for(int index = 0; index < faixas.size(); index += 2) {
            IMC imc = new IMC();
            float imcMedioFaixa;
            ArrayList<Float> imcResults = new ArrayList<>();
            List<Donor> donors = repository.findAllByDataNascimentoBetween(LocalDate.parse(faixas.get(index+1),formatter), LocalDate.parse(faixas.get(index),formatter));
            donors.forEach(donor -> {
                imc.setAltura(donor.getAltura());
                imc.setPeso(donor.getPeso());
                imcResults.add(imc.calcularIMC());
            });
            imcMedioFaixa = imcResults.stream().reduce(0f, Float::sum) / imcResults.size();
            if (Float.isNaN(imcMedioFaixa)) {
                imcMedioFaixa = 0f;
            }

            //TODO: Tratar a exibição do ICM médio para exibir apenas 2 casas decimais.
            String faixaEtaria = LocalDate.now().getYear()-LocalDate.parse(faixas.get(index),formatter).getYear() + " " +
                    "ano(s) - " + (LocalDate.now().getYear()-LocalDate.parse(faixas.get(index + 1),formatter).getYear()) +" ano(s)";
            imcMedioPorFaixaList.add(new IMCMedioPorFaixaEtariaDto(faixaEtaria, imcMedioFaixa));
        }
        return imcMedioPorFaixaList;
    }

    /**
     * Retorna o percentil de obesidade por sexo
     *
     * @return List<PercentilObesidadePorSexoDto>
     */
    public List<?> percentilBySexo() {
        IMC imc = new IMC();
        float percentilFem,percentilMasc;
        ArrayList<Float> imcResultsObFem = new ArrayList<>();
        ArrayList<Float> imcResultsObMasc = new ArrayList<>();
        List<PercentilObesidadeDto> percentilDtoList = new ArrayList<>();
        List<Donor> donors = repository.findAll();
        List<Donor> donorsFeminino = donors.stream().filter(donor -> donor.getSexo().equals("Feminino")).collect(Collectors.toList());
        List<Donor> donorsMasculino = donors.stream().filter(donor -> donor.getSexo().equals("Masculino")).collect(Collectors.toList());
        donorsFeminino.forEach(donor -> {
            imc.setAltura(donor.getAltura());
            imc.setPeso(donor.getPeso());
            if (imc.isObeso()) {
                imcResultsObFem.add(imc.calcularIMC());
            }
        });
        donorsMasculino.forEach(donor -> {
            imc.setAltura(donor.getAltura());
            imc.setPeso(donor.getPeso());
            if (imc.isObeso()) {
                imcResultsObMasc.add(imc.calcularIMC());
            }
        });
        percentilFem = (float) imcResultsObFem.size() / donorsFeminino.size() * 100;
        percentilMasc = (float) imcResultsObMasc.size() / donorsMasculino.size() * 100;
        percentilDtoList.add(new PercentilObesidadeDto("Feminino", percentilFem));
        percentilDtoList.add(new PercentilObesidadeDto("Masculino", percentilMasc));
        return percentilDtoList;
    }

    /**
     * Retorna a idade média dos candidados de cada tipo sanguíneo.
     *
     * @return List<IdadeMediaPorTipoSanguineoDto>
     */
    public List<?> idadeMediaPorTipoSanguineo() {
        List<IdadeMediaPorTipoSanguineoDto> idadeMediaPorTipoSanguineoDtoList = new ArrayList<>();
        List<String> tiposSanguineos = Arrays.stream(TipoSanguineo.values()).map(Enum::toString).collect(Collectors.toList());
        tiposSanguineos.forEach(tipoSanguineo -> {
            int idadeMedia = 0;
            System.out.println(tipoSanguineo);
            List<Donor> donors = repository.findAllByTipoSanguineo(tipoSanguineo);
            if (donors.size() != 0) {
                idadeMedia = donors.stream().mapToInt(Donor::getIdade).average().isPresent() ? (int) donors.stream().mapToInt(Donor::getIdade).average().getAsDouble() : 0;
            }
            idadeMediaPorTipoSanguineoDtoList.add(new IdadeMediaPorTipoSanguineoDto(tipoSanguineo, idadeMedia));
        });
        return idadeMediaPorTipoSanguineoDtoList;
    }

    //Auxiliar para o método byFaixaEtaria()
    @NotNull
    private List<String> faixaEtaria() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        ArrayList<String> faixas = new ArrayList<>();
        faixas.add(LocalDate.now().minusYears(0).format(formatter));
        faixas.add(LocalDate.now().minusYears(10).format(formatter));
        faixas.add(LocalDate.now().minusYears(11).format(formatter));
        faixas.add(LocalDate.now().minusYears(20).format(formatter));
        faixas.add(LocalDate.now().minusYears(21).format(formatter));
        faixas.add(LocalDate.now().minusYears(30).format(formatter));
        faixas.add(LocalDate.now().minusYears(31).format(formatter));
        faixas.add(LocalDate.now().minusYears(40).format(formatter));
        faixas.add(LocalDate.now().minusYears(41).format(formatter));
        faixas.add(LocalDate.now().minusYears(50).format(formatter));
        faixas.add(LocalDate.now().minusYears(51).format(formatter));
        faixas.add(LocalDate.now().minusYears(60).format(formatter));
        faixas.add(LocalDate.now().minusYears(61).format(formatter));
        faixas.add(LocalDate.now().minusYears(70).format(formatter));
        faixas.add(LocalDate.now().minusYears(71).format(formatter));
        faixas.add(LocalDate.now().minusYears(80).format(formatter));
        faixas.add(LocalDate.now().minusYears(81).format(formatter));
        faixas.add(LocalDate.now().minusYears(90).format(formatter));
        faixas.add(LocalDate.now().minusYears(91).format(formatter));
        faixas.add(LocalDate.now().minusYears(100).format(formatter));
//        faixas.add(LocalDate.now().minusYears(10));
//        faixas.add(LocalDate.now().minusYears(11));
//        faixas.add(LocalDate.now().minusYears(20));
//        faixas.add(LocalDate.now().minusYears(21));
//        faixas.add(LocalDate.now().minusYears(30));
//        faixas.add(LocalDate.now().minusYears(31));
//        faixas.add(LocalDate.now().minusYears(40));
//        faixas.add(LocalDate.now().minusYears(41));
//        faixas.add(LocalDate.now().minusYears(50));
//        faixas.add(LocalDate.now().minusYears(51));
//        faixas.add(LocalDate.now().minusYears(60));
//        faixas.add(LocalDate.now().minusYears(61));
//        faixas.add(LocalDate.now().minusYears(70));
//        faixas.add(LocalDate.now().minusYears(71));
//        faixas.add(LocalDate.now().minusYears(80));
//        faixas.add(LocalDate.now().minusYears(81));
//        faixas.add(LocalDate.now().minusYears(90));
//        faixas.add(LocalDate.now().minusYears(91));
//        faixas.add(LocalDate.now().minusYears(100));
        return faixas;
    }
}
