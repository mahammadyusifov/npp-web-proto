@echo off

start cmd /k "npm run dev"

timeout /t 5

start chrome http://localhost:3000

:CHECK_CHROME
timeout /t 2
tasklist | find /i "chrome.exe" > nul
if errorlevel 1 goto KILL_NEXT
goto CHECK_CHROME

:KILL_NEXT
taskkill /f /im node.exe
exit
