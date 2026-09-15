# Levanta un servidor por cada presentación en dist/
# Cada una se abre en un puerto diferente (5173-5178)

$presentaciones = @(
    "ud01-psp-python-basico-entorno-documentacion",
    "ud01-psp-python-basico-tipos-colecciones",
    "ud01-psp-python-basico-flujo-funciones",
    "ud01-psp-python-basico-poo-modulos",
    "ud01-prg-pensament-computacional-bloc-01",
    "ud01-prg-pensament-computacional-bloc-02"
)

$puerto = 5173

Write-Host "Levantando servidores de presentaciones..." -ForegroundColor Cyan
Write-Host ""

foreach ($p in $presentaciones) {
    $carpeta = "dist/$p"
    if (Test-Path $carpeta) {
        Write-Host "  -> $p  http://localhost:$puerto" -ForegroundColor Green
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; serve dist/$p -l $puerto --no-clipboard"
        $puerto++
    } else {
        Write-Host "  X $p (no encontrado)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Todos los servidores arrancados. Cierra las ventanas de PowerShell para detenerlos." -ForegroundColor Yellow
