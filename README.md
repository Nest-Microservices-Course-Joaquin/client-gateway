## Dev

1. Clonar repositorio
2. Instalar dependencias con `pnpm install`
3. Crear un archivo `.env` basado en el `.env.template`
4. Levantar el servidor de Nats

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

5. Tener levantado los microservicios que se van a consumir
6. Levantar el proyecto con `pnpm run start:dev`
