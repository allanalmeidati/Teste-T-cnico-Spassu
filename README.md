# Teste-T-cnico-Spassu


Para subir o projeto siga as orientações abaixo:

Caso nao deseje utilizar o docker

Frontend (React):

Navegue até a pasta frontend
Execute npm install para instalar as dependências.
Execute npm run dev para iniciar o servidor de desenvolvimento do React. O frontend será acessível em http://localhost:3000.
Backend (Laravel):

Navegue até a pasta backend).
Execute composer install para instalar as dependências.
Execute php artisan serve --port=80 para iniciar o servidor de desenvolvimento do Laravel na porta 80. O backend será acessível em http://localhost.

Para a base de dados deverá criado uma base chamada book e executado os cript localizado na pasta database/scritps (caso nao use o docker)


Usando Docker:


Certifique-se de ter o Docker instalado.

Execute o comando docker-compose up -d para iniciar os containers.

O frontend pode ser acessado no navegador usando http://localhost:3000.
O backend pode ser acessado no navegador usando http://localhost.

Certifique-se de que as portas locais não estejam sendo utilizadas por outros serviços. Se o usuário preferir usar o Docker, basta executar docker-compose up -d. 
