$directoryPath = "./Scripts"
$beginsWithISO = "^\[\d{4}-\d{2}-\d{2}T\d{2}.\d{2}.\d{2}.\d{3}Z]"

foreach ($file in (Get-ChildItem -Path $directoryPath)) {
    $fileName = $file.Name

    $fileName = $file.Name
    $regex = [regex]::new($beginsWithISO)
    $matches = $regex.Matches($fileName)

    if ($matches.Groups.Length -eq 0) {
        $createdOnUTC = $file.CreationTime.ToUniversalTime()
        $createdOnISO = $createdOnUTC.ToString("yyyy-MM-ddTHH.mm.ss.fffK")

        $newFileName = "[$createdOnISO] $fileName"

        Rename-Item -Path $file.FullName -NewName $newFileName
    }
}
