package com.ronilsonalves.bancodesangue.data.repository;

import com.ronilsonalves.bancodesangue.data.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DonorRepository extends JpaRepository<Donor, String> {

    int countByEstado(String estado);
    int countByTipoSanguineo(String tipoSanguineo);
    List<Donor> findAllByDataNascimentoBetween(LocalDate dataInicial, LocalDate dataFinal);

    List<Donor> findAllByTipoSanguineo(String tipoSanguineo);
}