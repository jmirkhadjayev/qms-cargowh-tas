package uz.airport.cargo.dto;

import uz.airport.cargo.model.UserRole;
import java.util.List;

public class UpdatePermissionsRequest {
    private List<String> allowedPages;
    private String targetUrl;
    private UserRole role;
    private Boolean active;

    public UpdatePermissionsRequest() {}

    public UpdatePermissionsRequest(List<String> allowedPages, String targetUrl, UserRole role, Boolean active) {
        this.allowedPages = allowedPages;
        this.targetUrl = targetUrl;
        this.role = role;
        this.active = active;
    }

    public List<String> getAllowedPages() {
        return allowedPages;
    }

    public void setAllowedPages(List<String> allowedPages) {
        this.allowedPages = allowedPages;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
