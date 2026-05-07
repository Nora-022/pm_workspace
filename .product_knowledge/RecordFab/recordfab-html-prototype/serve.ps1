$ErrorActionPreference = "Stop"

$root = "C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\RecordFab\recordfab-html-prototype"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://127.0.0.1:8765/")
$listener.Start()

$contentTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg" = "image/svg+xml"
  ".json" = "application/json; charset=utf-8"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $requestPath = $context.Request.Url.AbsolutePath.TrimStart("/")
  if ([string]::IsNullOrWhiteSpace($requestPath)) {
    $requestPath = "index.html"
  }

  $safePath = $requestPath.Replace("/", "\")
  $fullPath = Join-Path $root $safePath

  if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
    $context.Response.StatusCode = 404
    $buffer = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
    $context.Response.OutputStream.Write($buffer, 0, $buffer.Length)
    $context.Response.Close()
    continue
  }

  $extension = [System.IO.Path]::GetExtension($fullPath).ToLowerInvariant()
  $context.Response.ContentType = $contentTypes[$extension]
  if (-not $context.Response.ContentType) {
    $context.Response.ContentType = "application/octet-stream"
  }

  $bytes = [System.IO.File]::ReadAllBytes($fullPath)
  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.OutputStream.Close()
}
