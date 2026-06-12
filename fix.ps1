$file = "src/components/CheckoutModal.vue"
$content = Get-Content $file -Raw -Encoding UTF8
$content = $content -replace '(<div v-for="item in itens" :key="item\._id\|\|item\.id" class="co-item">)\s*<div class="co-item">', '$1'
$content = $content -replace 'ColeÃ§Ã£o', 'Coleção'
$content = $content -replace 'CÃ³digo de cupom', 'Código de cupom'
$content = $content -replace 'VALIDAÃ‡ÃƒO', 'VALIDAÇÃO'
$content = $content -replace 'VerificaÃ§Ã£o', 'Verificação'
$content = $content -replace 'seguranÃ§a', 'segurança'
$content = $content -replace 'Â·', '·'
$content = $content -replace 'âˆ'', '−'
$content = $content -replace 'ETAPA 2: IDENTIDADE / VALIDAÃ‡ÃƒO CPF', 'ETAPA 2: IDENTIDADE / VALIDAÇÃO CPF'
[System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "Corrigido!" -ForegroundColor Green
