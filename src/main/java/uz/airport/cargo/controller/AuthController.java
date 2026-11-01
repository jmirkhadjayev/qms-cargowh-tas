package uz.airport.cargo.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.airport.cargo.dto.LoginRequest;
import uz.airport.cargo.dto.LoginResponse;
import uz.airport.cargo.dto.UserDto;
import uz.airport.cargo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final uz.airport.cargo.service.ActivityLogService activityLogService;

    public AuthController(UserService userService, uz.airport.cargo.service.ActivityLogService activityLogService) {
        this.userService = userService;
        this.activityLogService = activityLogService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request, jakarta.servlet.http.HttpServletRequest req) {
        LoginResponse response = userService.authenticate(request);
        String clientIp = uz.airport.cargo.service.ActivityLogService.extractClientIp(req);
        if (response.isSuccess()) {
            activityLogService.logAction(
                    response.getUser() != null ? response.getUser().getFullName() : "Foydalanuvchi",
                    response.getUser() != null ? response.getUser().getEmail() : request.getEmail(),
                    "Kirish", "Avtorizatsiya",
                    response.getUser() != null ? String.valueOf(response.getUser().getId()) : "—",
                    "session, role, token", clientIp,
                    "Tizimga muvaffaqiyatli kirildi [" + (response.getUser() != null ? response.getUser().getRole() : "") + "]"
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestParam(required = false) String email) {
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body("Email ko'rsatilmagan");
        }
        return userService.findByEmail(email)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Foydalanuvchi topilmadi"));
    }

    @PutMapping("/users/{id}/permissions")
    public ResponseEntity<?> updatePermissions(@PathVariable Long id,
                                               @RequestBody uz.airport.cargo.dto.UpdatePermissionsRequest request,
                                               jakarta.servlet.http.HttpServletRequest req) {
        try {
            UserDto updated = userService.updatePermissions(id, request);
            String clientIp = uz.airport.cargo.service.ActivityLogService.extractClientIp(req);
            activityLogService.logAction(
                    "Bosh Tizim Administratori", "supperadmin@uzairports.com",
                    "O'zgartirish", "Xodim Ruxsatnomalari", String.valueOf(id),
                    "allowedPages, targetUrl, role, active", clientIp,
                    updated.getFullName() + " uchun ruxsatlar yangilandi: " + updated.getAllowedPages()
            );
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody uz.airport.cargo.dto.CreateUserRequest request,
                                        jakarta.servlet.http.HttpServletRequest req) {
        try {
            UserDto created = userService.createUser(request);
            String clientIp = uz.airport.cargo.service.ActivityLogService.extractClientIp(req);
            activityLogService.logAction(
                    "Bosh Tizim Administratori", "supperadmin@uzairports.com",
                    "Yaratish", "Foydalanuvchi (User)", String.valueOf(created.getId()),
                    "email, fullName, role, allowedPages", clientIp,
                    "Yangi xodim yaratildi: " + created.getEmail() + " (" + created.getRole() + ")"
            );
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, jakarta.servlet.http.HttpServletRequest req) {
        try {
            userService.deleteUser(id);
            String clientIp = uz.airport.cargo.service.ActivityLogService.extractClientIp(req);
            activityLogService.logAction(
                    "Bosh Tizim Administratori", "supperadmin@uzairports.com",
                    "O'chirish", "Foydalanuvchi (User)", String.valueOf(id),
                    "active, deletedAt", clientIp,
                    "Xodim hisobi o'chirildi (ID: " + id + ")"
            );
            return ResponseEntity.ok(java.util.Map.of("success", true, "message", "Foydalanuvchi muvaffaqiyatli o'chirildi"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        }
    }
}

