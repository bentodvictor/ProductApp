# ProductApp

A Aplicação tem como principal objetivo a manipulação (CRUD) de produtos variados.

## Back-end
Para o back-end foi utilizado .NET 6, tentando seguir práticas de Clean Architecture e DDD que estou estudando atualmente, e SQL Server para o banco de dados.

## Front-end
Para o front-end foram utilizado React, Bootstrap para estilização e componentes, e toastify para notificações.

## Execução
Para a execução do projeto é necessário:

### Alterar string de conexão com o banco

ProductApp.Api > appsettings.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_STRING_HERE"
  }
}
```

### Executar back-end

Da raiz do projeto execute o comando abaixo:

```bash
dotnet run --project .\ProductApp.Api\
```

O projeto ira executar na porta 7128 (https) e 5162 (http), podendo ser utilizado o swagger, como por exemplo `https://localhost:7128/swagger/index.html`

### Executar front-end

Da raiz do projeto, vá até o diretorio productapp.client

```bash
cd .\productapp.client\
```

Restaure os pacotes e em seguida execute a aplicação

```node
npm install
npm run start
```

A aplicação ira executar na porta `3000`