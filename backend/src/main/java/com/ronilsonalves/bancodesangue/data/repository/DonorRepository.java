package com.ronilsonalves.bancodesangue.data.repository;

import com.ronilsonalves.bancodesangue.data.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {

    int countByEstado(String estado);

    int countByTipoSanguineo(String tipoSanguineo);

    List<Donor> findAllByDataNascimentoBetween(LocalDate dataInicial, LocalDate dataFinal);

    List<Donor> findAllByTipoSanguineo(String tipoSanguineo);

    List<Donor> findAllByEstado(String estado);

    List<Donor> findAllByEstadoAndTipoSanguineoAndSexo(String estado, String tipoSanguineo, String sexo);
}