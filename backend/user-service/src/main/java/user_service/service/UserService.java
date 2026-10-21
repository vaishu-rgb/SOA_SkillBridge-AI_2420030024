package user_service.service;

import user_service.dto.UserRequest;
import user_service.dto.UserResponse;
import user_service.entity.User;
import user_service.exception.UserNotFoundException;
import user_service.repository.UserRepository;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================================
    // CREATE USER
    // =========================================
    public UserResponse createUser(UserRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(request.getRole());
        user.setCareerGoal(request.getCareerGoal());

        User savedUser = userRepository.save(user);

        return convertToResponse(savedUser);
    }


    // =========================================
    // GET USER BY ID
    // =========================================
    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Get currently authenticated user from JWT
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String loggedInEmail = authentication.getName();

        // Check whether logged-in user is ADMIN
        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_ADMIN")
                );

        // Check whether requested profile belongs
        // to the currently logged-in user
        boolean isOwnProfile =
                user.getEmail().equals(loggedInEmail);

        // Allow only ADMIN or the owner of the profile
        if (!isAdmin && !isOwnProfile) {

            throw new AccessDeniedException(
                    "You can only view your own profile"
            );
        }

        return convertToResponse(user);
    }


    // =========================================
    // GET ALL USERS
    // =========================================
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // =========================================
    // UPDATE USER
    // =========================================
    public UserResponse updateUser(
            Long id,
            UserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt new password before saving
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(request.getRole());
        user.setCareerGoal(request.getCareerGoal());

        User updatedUser = userRepository.save(user);

        return convertToResponse(updatedUser);
    }


    // =========================================
    // DELETE USER
    // =========================================
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        userRepository.delete(user);
    }


    // =========================================
    // CONVERT ENTITY TO RESPONSE DTO
    // =========================================
    private UserResponse convertToResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCareerGoal()
        );
    }
}