@echo off
chcp 65001 >nul
title Toshkent Xalqaro Aeroporti - Yuk Terminali Elektron Navbat Tizimi
cd /d "%~dp0"

if exist "%USERPROFILE%\.tools\jdk-21\bin\java.exe" (
    set "JAVA_HOME=%USERPROFILE%\.tools\jdk-21"
) else if exist "C:\Users\admin\.tools\jdk-21\bin\java.exe" (
    set "JAVA_HOME=C:\Users\admin\.tools\jdk-21"
)

if exist "%USERPROFILE%\.tools\apache-maven-3.9.9\bin\mvn.cmd" (
    set "M2_HOME=%USERPROFILE%\.tools\apache-maven-3.9.9"
) else if exist "C:\Users\admin\.tools\apache-maven-3.9.9\bin\mvn.cmd" (
    set "M2_HOME=C:\Users\admin\.tools\apache-maven-3.9.9"
)
set "PATH=%JAVA_HOME%\bin;%M2_HOME%\bin;%PATH%"

echo =========================================================================
echo   TOSHKENT XALQARO AEROPORTI - YUK TERMINALI (TAS CARGO)
echo   Avtomatlashtirilgan Elektron Navbat va Dispetcherlik Tizimi
echo =========================================================================
echo.

if not exist "%JAVA_HOME%\bin\java.exe" (
    echo [!] Java 21 topilmadi. Iltimos o'rnatish yakunlanishini kuting...
    pause
    exit /b 1
)

echo [1/2] Java talqini tekshirilmoqda...
"%JAVA_HOME%\bin\java.exe" -version
echo.

echo [2/2] Spring Boot tizimi ishga tushmoqda (Port: 5555)...
echo Boshqaruv markazi: http://localhost:5555
echo.

start "" http://localhost:5555

call "%M2_HOME%\bin\mvn.cmd" spring-boot:run

pause
