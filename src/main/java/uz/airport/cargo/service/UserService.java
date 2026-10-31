package uz.airport.cargo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.airport.cargo.dto.LoginRequest;
import uz.airport.cargo.dto.LoginResponse;
import uz.airport.cargo.dto.UserDto;
import uz.airport.cargo.model.User;
import uz.airport.cargo.model.UserRole;
import uz.airport.cargo.repository.UserRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public LoginResponse authenticate(LoginRequest request) {
        if (request == null || request.getEmail() == null || request.getPassword() == null) {
            return LoginResponse.failure("Email va parol kiritilishi shart");
        }

        String input = request.getEmail().trim().toLowerCase();
        String password = request.getPassword().trim();

        // Normalise common alias usernames
        String resolvedEmail = resolveEmailAlias(input);

        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(resolvedEmail);
        if (userOpt.isEmpty()) {
            // Also try exact input if alias not matched
            userOpt = userRepository.findByEmailIgnoreCase(input);
        }

        if (userOpt.isEmpty()) {
            return LoginResponse.failure("Bunday foydalanuvchi hisobi topilmadi: " + input);
        }

        User user = userOpt.get();

        if (!user.isActive()) {
            return LoginResponse.failure("Ushbu hisob tizimda faol emas");
        }

        if (!user.getPassword().equals(password)) {
            return LoginResponse.failure("Parol noto'g'ri kiritildi");
        }

        String token = "TAS-TOKEN-" + UUID.randomUUID().toString();
        log.info("Foydalanuvchi tizimga kirdi: {} [{}]", user.getEmail(), user.getRole());

        return LoginResponse.success(token, new UserDto(user));
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAllByOrderByRoleAscFullNameAsc()
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    public Optional<UserDto> findByEmail(String email) {
        if (email == null) return Optional.empty();
        return userRepository.findByEmailIgnoreCase(email.trim())
                .map(UserDto::new);
    }

    private String resolveEmailAlias(String alias) {
        return switch (alias) {
            case "supperadmin", "superadmin", "supperadmin@uzairports.com" -> "supperadmin@uzairports.com";
            case "admin", "admin@uzairports.com" -> "admin@uzairports.com";
            case "registration", "agent", "agent@uzairports.com", "registration@uzairports.com" -> "registration@uzairports.com";
            case "warehouse", "sklad", "sklad@uzairports.com", "warehouse@uzairports.com" -> "warehouse@uzairports.com";
            case "dock", "dock@uzairports.com" -> "dock@uzairports.com";
            case "kpp", "kpp@uzairports.com" -> "kpp@uzairports.com";
            default -> alias;
        };
    }
}

