@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [خطأ] Node.js غير مثبت على هذا الجهاز.
  echo يجب تثبيت Node.js LTS مرة واحدة فقط، ثم تشغيل هذا الملف من جديد.
  echo.
  pause
  exit /b 1
)
start "" "http://localhost:5500/"
node server.js
pause
