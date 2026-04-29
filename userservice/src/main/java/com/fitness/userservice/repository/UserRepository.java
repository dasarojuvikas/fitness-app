package com.fitness.userservice.repository;

import com.fitness.userservice.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	boolean existsByEmail(String email);

    Optional<User> findByEmail(String email); // better

    boolean existsById(String id);

}
