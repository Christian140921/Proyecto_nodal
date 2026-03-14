# 🚀 Proyecto CQRS - Strapi v5 + NestJS

Proyecto base para la arquitectura CQRS paso a paso.

## 🐳 Levantar Base de Datos y CMS (Docker)

Los archivos principales de Docker ahora están organizados en `docker/`.

```bash
cd docker
docker-compose up -d --build
```

Servicios disponibles:
| Servicio | URL |
|---|---|
| Strapi Admin | http://localhost:1337/admin |
| MongoDB Noticias | localhost:27017 |
| MongoDB Eventos | localhost:27018 |

(Los microservicios y el frontend se irán construyendo paso a paso)
