@echo off
chcp 65001 >nul
title Toshkent Xalqaro Aeroporti - Yuk Terminali Elektron Navbat Tizimi
cd /d "%~dp0"

set "JAVA_HOME=C:\Users\admin\.tools\jdk-21"
set "M2_HOME=C:\Users\admin\.tools\apache-maven-3.9.9"
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

echo [2/2] Spring Boot tizimi ishga tushmoqda (Port: 8085)...
echo Boshqaruv markazi: http://localhost:8085
echo.

start "" http://localhost:8085

call "%M2_HOME%\bin\mvn.cmd" spring-boot:run

pause
