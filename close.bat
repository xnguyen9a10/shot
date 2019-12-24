@echo off 
 
for /f "tokens=1 delims=" %%# in ('qprocess^|find /i /c /n "MicrosoftEdg"') do ( 
    set count=%%# 
) 
 
taskkill /F /IM MicrosoftEdge.exe /T 
 
echo Number of Microsoft Edge processes removed: %count% 
pause