package uz.airport.cargo.dto;

import uz.airport.cargo.model.User;
import uz.airport.cargo.model.UserRole;

public class UserDto {
    private Long id;
    private String email;
    private String fullName;
    private UserRole role;
    private String roleTitle;
    private String targetUrl;
    private String avatar;
    private java.util.List<String> allowedPages;
    private boolean active;

    public UserDto() {}

    public UserDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.role = user.getRole();
        this.roleTitle = user.getRole() != null ? user.getRole().getTitle() : "";
        this.targetUrl = user.getTargetUrl();
        this.avatar = user.getAvatar();
        this.allowedPages = user.getAllowedPageList();
        this.active = user.isActive();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getRoleTitle() { return roleTitle; }
    public void setRoleTitle(String roleTitle) { this.roleTitle = roleTitle; }

    public String getTargetUrl() { return targetUrl; }
    public void setTargetUrl(String targetUrl) { this.targetUrl = targetUrl; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public java.util.List<String> getAllowedPages() { return allowedPages; }
    public void setAllowedPages(java.util.List<String> allowedPages) { this.allowedPages = allowedPages; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}

