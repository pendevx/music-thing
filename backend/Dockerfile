FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /backend

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /backend
COPY --from=build-env /backend/out .
ENTRYPOINT ["dotnet", "backend.dll"]

# Share Docker images without using a registry: https://stackoverflow.com/a/50827357
