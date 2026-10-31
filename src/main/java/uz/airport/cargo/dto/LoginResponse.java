package uz.airport.cargo.dto;

public class LoginResponse {
    private boolean success;
    private String token;
    private String message;
    private UserDto user;

    public LoginResponse() {}

    public LoginResponse(boolean success, String token, String message, UserDto user) {
        this.success = success;
        this.token = token;
        this.message = message;
        this.user = user;
    }

    public static LoginResponse failure(String message) {
        return new LoginResponse(false, null, message, null);
    }

    public static LoginResponse success(String token, UserDto user) {
        return new LoginResponse(true, token, "Tizimga muvaffaqiyatli kirildi", user);
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
}

