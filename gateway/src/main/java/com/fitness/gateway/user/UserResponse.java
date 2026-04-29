package com.fitness.gateway.user;

import lombok.Data;

@Data
public class UserResponse {

	private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
