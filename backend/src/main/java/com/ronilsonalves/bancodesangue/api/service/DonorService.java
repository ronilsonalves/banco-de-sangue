package com.ronilsonalves.bancodesangue.api.service;

import com.ronilsonalves.bancodesangue.data.dto.CountEstadoDto;
import com.ronilsonalves.bancodesangue.data.model.Donor;

import java.util.List;
import java.util.UUID;

public interface DonorService {
    Donor get(Long id);

    Donor save(Donor entity);

    List<?> listAll();

    void delete(Long id);

    List<?> countByState();

    List<?> byFaixaEtaria();
}
