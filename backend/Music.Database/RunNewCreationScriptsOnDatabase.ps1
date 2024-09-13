$directoryPath = "./Scripts"
$beginsWithISO = "^\[\d{4}-\d{2}-\d{2}T\d{2}.\d{2}.\d{2}.\d{3}Z]"
$csprojPath = "./Music.Database.csproj"

$csproj = Get-Content -Path $csprojPath -Raw

foreach ($file in (Get-ChildItem -Path $directoryPath -Recurse -File)) {
    $fileName = $file.Name

    $fileName = $file.Name
    $regex = [regex]::new($beginsWithISO)
    $matches = $regex.Matches($fileName)

    if ($matches.Groups.Length -eq 0) {
        $createdOnUTC = $file.CreationTime.ToUniversalTime()
        $createdOnISO = $createdOnUTC.ToString("yyyy-MM-ddTHH.mm.ss.fffK")

        $newFileName = "[$createdOnISO] $fileName"

        Rename-Item -Path $file.FullName -NewName $newFileName

#        $csproj = Get-Content -Path $csprojPath -Raw
        $csproj = $csproj -replace [regex]::Escape($fileName), $newFileName

#        $csproj = $csproj.Trim()

#        Set-Content -Path $csprojPath -Value $replaced
    }
}

$csproj = $csproj.Trim()
Set-Content -Path $csprojPath -Value $csproj
