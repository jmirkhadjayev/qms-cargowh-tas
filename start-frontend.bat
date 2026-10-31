@echo off
chcp 65001 >nul
title TAS Cargo - React Frontend (Vite)
cd /d "%~dp0frontend"
echo =========================================================================
echo   TOSHKENT XALQARO AEROPORTI - YUK TERMINALI (TAS CARGO)
echo   Zamonaviy Frontend Dev Server (React 18 + Vite + Tailwind CSS)
echo =========================================================================
echo.
echo Dev Server ishga tushmoqda: http://localhost:5173
echo Backend API proxy: http://localhost:8085
echo.
call npm run dev
pause

