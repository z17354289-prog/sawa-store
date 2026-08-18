@echo off
title DigitaL Store
cd /d "%~dp0"
where node >nul 2>nul
if %ERRORLEVEL%==0 (
  echo Starting DigitaL Store server...
  start "" http://localhost:5500/
  node server.js
  pause
  exit /b
)
echo Node.js is not installed.
echo Opening DigitaL Store in local mode instead...
start "" "%~dp0index.html"
echo.
echo You can open admin.html and use the same administrator login.
pause
