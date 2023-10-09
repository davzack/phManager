package com.phManager.repository;

import com.phManager.entity.Residente;
import org.springframework.data.repository.CrudRepository;

public interface ResidenteCrudRepository extends CrudRepository<Residente, String> {
}
