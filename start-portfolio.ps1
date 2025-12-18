# Portfolio Startup Script

Write-Host "🚀 Starting Vishal K's Portfolio..." -ForegroundColor Cyan
Write-Host ""

# Check if running from correct directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the portfolio root directory" -ForegroundColor Red
    exit 1
}

# Start Frontend
Write-Host "📦 Starting React Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"

# Wait a bit before starting backend
Start-Sleep -Seconds 2

# Start Backend
Write-Host "🔧 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; npm start"

Write-Host ""
Write-Host "✅ Portfolio is starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔌 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Make sure to setup .env file in server folder for contact form!" -ForegroundColor Yellow
Write-Host "📖 Read SETUP_GUIDE.md for complete instructions" -ForegroundColor Magenta
Write-Host ""
