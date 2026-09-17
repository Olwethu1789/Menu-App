@echo off
cd /d "%~dp0"
call npx.cmd expo start --web --clear
pause