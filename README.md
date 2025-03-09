# Proyecto TFG - Backend

Este proyecto es el backend para una aplicación de gestión de canciones y usuarios. Proporciona una API RESTful para registrar usuarios, iniciar sesión, gestionar canciones y obtener información sobre usuarios y canciones.

Endpoints
Usuarios
Registrar Usuario

URL: /api/users/register
Método: POST
{
  "username": "exampleUser",
  "password": "examplePass"
}
Iniciar Sesión

URL: /api/users/login
Método: POST
Cuerpo:
{
  "username": "exampleUser",
  "password": "examplePass"
}
Obtener Todos los Usuarios

URL: /api/users
Método: GET
Encabezado:
Authorization: Bearer <Token>
Canciones
Obtener Todas las Canciones

URL: /api/songs
Método: GET
Encabezado:
Authorization: Bearer <Token>
Crear Canción

URL: /api/songs
Método: POST
Encabezado:
Authorization: Bearer <Token>
{
  "cover": "/path/to/cover.jpg",
  "title": "Test Song",
  "artist": "Test Artist",
  "genre": "Test Genre",
  "duration": "3:30",
  "year": 2021,
  "type": "Single",
  "popularity": 10,
  "plays": 100,
  "ratings": 5,
  "date": "2021-01-01",
  "listen": "http://example.com"
}
