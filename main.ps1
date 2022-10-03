Set-Location $env:GITHUB_WORKSPACE
Get-Content ./package.json

Write-Output "::set-output name=rand::$(Get-Random)"
