$imageName = "music-backend-image"
$containerName = "music-backend"

docker build -t $imageName -f Dockerfile .
docker run -d -p 8080:8080 -v $PSScriptRoot/assets:/backend/assets --name $containerName $imageName
