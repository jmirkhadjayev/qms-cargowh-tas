package uz.airport.cargo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(nullable = false)
    private String targetUrl;

    @Column(name = "allowed_pages", length = 1000)
    private String allowedPages;

    private String avatar;

    private boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String email, String password, String fullName, UserRole role, String targetUrl, String avatar) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.targetUrl = targetUrl;
        this.avatar = avatar;
        this.active = true;
        this.createdAt = LocalDateTime.now();
        this.setAllowedPageList(getDefaultPagesForRole(role));
    }

    public User(String email, String password, String fullName, UserRole role, String targetUrl, String avatar, String allowedPages) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.targetUrl = targetUrl;
        this.avatar = avatar;
        this.allowedPages = allowedPages;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public java.util.List<String> getAllowedPageList() {
        if (allowedPages == null || allowedPages.isBlank()) {
            return getDefaultPagesForRole(this.role);
        }
        return java.util.Arrays.stream(allowedPages.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(java.util.stream.Collectors.toList());
    }

    public void setAllowedPageList(java.util.List<String> pages) {
        if (pages == null || pages.isEmpty()) {
            this.allowedPages = null;
        } else {
            this.allowedPages = String.join(",", pages);
        }
    }

    public static java.util.List<String> getDefaultPagesForRole(UserRole role) {
        if (role == null) return java.util.List.of("login.html");
        return switch (role) {
            case SUPER_ADMIN -> java.util.List.of("index.html", "dispatcher.html", "registration.html", "warehouse.html", "dock.html", "kpp.html", "led-board.html", "awery-sim.html", "activity-log.html");
            case ADMIN -> java.util.List.of("dispatcher.html", "dock.html", "led-board.html");
            case OPERATOR_REGISTRATION -> java.util.List.of("registration.html");
            case OPERATOR_WAREHOUSE -> java.util.List.of("warehouse.html");
            case OPERATOR_DOCK -> java.util.List.of("dock.html");
            case OPERATOR_KPP -> java.util.List.of("kpp.html");
        };
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getTargetUrl() { return targetUrl; }
    public void setTargetUrl(String targetUrl) { this.targetUrl = targetUrl; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public String getAllowedPages() { return allowedPages; }
    public void setAllowedPages(String allowedPages) { this.allowedPages = allowedPages; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

