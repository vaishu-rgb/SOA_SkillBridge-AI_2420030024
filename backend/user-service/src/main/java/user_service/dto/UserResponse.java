package user_service.dto;

import user_service.entity.Role;

public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private String careerGoal;

    public UserResponse() {
    }

    public UserResponse(Long id, String name, String email,
                        Role role, String careerGoal) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.careerGoal = careerGoal;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public String getCareerGoal() {
        return careerGoal;
    }
}