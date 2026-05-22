🚀 Innovatech Chile

Innovatech Chile es una plataforma de microservicios para gestionar ventas, generar despachos y exponer un frontend React completo con proxy inverso Nginx y despliegue automatizado con GitHub Actions + AWS EC2.

---

## 📌 Arquitectura del Proyecto

- front_despacho
  - Frontend React + Vite
  - Empaquetado y servido por Nginx
  - Proxy inverso hacia los APIs

- Springboot-API-REST
  - API REST de Ventas
  - Expone `/api/v1/ventas`

- Springboot-API-REST-DESPACHO
  - API REST de Despachos
  - Expone `/api/v1/despachos`

- Base de datos MySQL
  - Persistencia de datos en volumen Docker
  - Configurada para producción y despliegue local

---

## 🧱 Flujo de Arquitectura

1. El usuario accede al Frontend en `http://<web-host>`.
2. Nginx sirve los archivos estáticos React.
3. Las llamadas a `/api/v1/ventas` se proxyean a `api-ventas:8080` o a la IP del backend en AWS.
4. Las llamadas a `/api/v1/despachos` se proxyean a `api-despachos:8081`.
5. Ambos backends consumen MySQL como fuente de datos centralizada.

---

## 🐳 Levantar localmente con Docker Compose

Desde la raíz del repositorio:

```bash
docker-compose up --build
```

O en segundo plano:

```bash
docker-compose up -d --build
```

### Ver estado de los contenedores

```bash
docker-compose ps
```

### Revisar logs

```bash
docker-compose logs -f db
docker-compose logs -f backend-ventas
docker-compose logs -f backend-despachos
docker-compose logs -f frontend
```

### Detener el stack

```bash
docker-compose down
```

---

## ⚙️ Componentes de contenedores

### Base de datos MySQL
- `mysql:8`
- Puerto `3306`
- Volumen Docker persistente: `mysql_data`
- Datos guardados en `/var/lib/mysql`

### Backend Ventas
- Expuesto en `8080`
- Lee variables de entorno:
  - `DB_ENDPOINT`
  - `DB_PORT`
  - `DB_NAME`
  - `DB_USERNAME`
  - `DB_PASSWORD`

### Backend Despachos
- Expuesto en `8081`
- Lee las mismas variables de entorno de DB

### Frontend
- Servido en `80`
- Usa Nginx como proxy inverso
- Consume rutas relativas `/api/v1/...`

---

## 🔧 Proxy Inverso Nginx

El frontend usa un `nginx.conf` que:
- Sirve archivos estáticos desde `/usr/share/nginx/html`
- Hace proxy a:
  - `/api/v1/ventas` → backend de ventas
  - `/api/v1/despachos` → backend de despachos

En AWS el proxy debe apuntar a la IP privada de la capa de aplicación que aloja los backends.

---

## ⚙️ CI/CD con GitHub Actions

El pipeline está configurado en deploy.yml y ejecuta:

1. Build de las imágenes Docker
2. Push a AWS ECR:
   - `innovatech-backend-ventas:latest`
   - `innovatech-backend-despachos:latest`
   - `innovatech-frontend:latest`

3. Despliegue SSH a EC2 mediante `appleboy/ssh-action`
   - EC2 Datos (MySQL)
   - EC2 App (Backends)
   - EC2 Web (Frontend)

### Ajustes clave del pipeline
- Trigger en la rama `deploy`
- Comandos `docker pull` agregados en los despliegues de backend y frontend
- El contenedor MySQL se ejecuta con volumen Docker persistente:
  - `-v mysql_data:/var/lib/mysql`

---

## ☁️ Despliegue en AWS EC2

### EC2 Datos
- Instancia privada
- Ejecuta MySQL con volumen persistente

### EC2 App
- Instancia privada
- Ejecuta los contenedores de backend
- Descarga imágenes actualizadas de ECR antes de arrancar

### EC2 Web
- Instancia pública
- Sirve Nginx + frontend
- Redirige tráfico `/api/v1/...` a los backends privados

---

## 🧪 Inyección de Datos de Prueba (PowerShell)

Ejecuta estos comandos en la terminal de VS Code:

### 1. Crear una Venta

```powershell
Invoke-RestMethod -Uri "http://44.217.102.23/api/v1/ventas" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"direccionCompra":"Av. Siempre Viva 123","valorCompra":150000,"fechaCompra":"2026-05-21","despachoGenerado":false}'
```

### 2. Crear un Despacho

```powershell
Invoke-RestMethod -Uri "http://44.217.102.23/api/v1/despachos" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"fechaDespacho":"2026-05-22","patenteCamion":"ABC1234","intento":0,"idCompra":1,"direccionCompra":"Av. Siempre Viva 123","valorCompra":150000,"despachado":false}'
```

---

## ✅ Buenas prácticas de commits

Usar prefijos claros en los mensajes:
- `cambio:`
- `fix:`
- `update:`
- `refactor:`
- `docs:`
- `test:`

Ejemplo:

```bash
git commit -m "fix: corregir proxy de Nginx para /api/v1/despachos"
```

---

## 📂 Estructura recomendada del repositorio

```text
proyecto-semestral/
├── .github/
│   └── workflows/deploy.yml
├── back-Ventas_SpringBoot/
│   └── Springboot-API-REST/
│       └── src/
├── back-Despachos_SpringBoot/
│   └── Springboot-API-REST-DESPACHO/
│       └── src/
├── front_despacho/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── src/
├── docker-compose.yml
└── README.md
```

---

