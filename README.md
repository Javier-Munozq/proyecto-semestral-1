# 🚚 Innovatech Chile - Plataforma de Gestión de Ventas y Despachos

Solución integral de microservicios para la gestión de órdenes de compra, ventas y despachos en tiempo real.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Arquitectura de Microservicios](#arquitectura-de-microservicios)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Levantamiento Local](#instalación-y-levantamiento-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación de APIs](#documentación-de-apis)
- [Estándares de Commits](#estándares-de-commits)
- [Contribución](#contribución)

---

## 🎯 Descripción del Proyecto

**Innovatech Chile** es una plataforma cloud-native que facilita la gestión completa del ciclo de vida de ventas y despachos. El sistema permite:

- ✅ Registro y seguimiento de órdenes de compra
- ✅ Generación automática de órdenes de despacho
- ✅ Cierre y confirmación de entregas
- ✅ Integración con base de datos centralizada
- ✅ API REST escalable y documentada con OpenAPI (Swagger)

---

## 🏗️ Arquitectura de Microservicios
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (React + Vite) │
│ :80 (Nginx - Público) │
└────────────────────────┬────────────────────────────────────┘
│
┌───────────────┴───────────────┐
│ │
▼ ▼
┌──────────────────────┐ ┌──────────────────────┐
│ API Ventas (8080) │ │ API Despachos (8081) │
│ Spring Boot Java 17 │ │ Spring Boot Java 17 │
└──────────┬───────────┘ └──────────┬───────────┘
│ │
└───────────────┬───────────────┘
│
▼
┌──────────────────────────┐
│ MySQL 8 (3306) │
│ innovatech_db │
│ (Persistencia datos) │
└──────────────────────────┘

**Componentes:**
- **Frontend**: React + Vite compilado con Nginx
- **Backend Ventas**: API REST para gestión de órdenes de compra
- **Backend Despachos**: API REST para gestión de órdenes de despacho
- **Base de Datos**: MySQL 8 centralizada

---

## 📦 Requisitos Previos

- **Docker Desktop** (v20.10+)
- **Docker Compose** (v1.29+)
- **Git**
- **8 GB RAM mínimo** para la máquina local
- **Puertos disponibles**: 80, 8080, 8081, 3306

---

## 🚀 Instalación y Levantamiento Local

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/Skibidi-Mate/proyecto-semestral.git
cd proyecto-semestral


Paso 2: Levantar el stack completo con Docker Compose
# Compilar imágenes y levantar contenedores
docker-compose up --build

# Alternativamente, en modo background (recomendado)
docker-compose up -d --build


Paso 3: Verificar que todo está en línea
# Ver estado de los contenedores
docker-compose ps

# Revisar logs de un servicio específico
docker-compose logs -f db              # Base de datos
docker-compose logs -f backend-ventas  # Backend Ventas
docker-compose logs -f backend-despachos  # Backend Despachos
docker-compose logs -f frontend        # Frontend


Paso 4: Acceder a la aplicación
Frontend: http://localhost
API Ventas (Swagger): http://localhost:8080/swagger-ui.html
API Despachos (Swagger): http://localhost:8081/swagger-ui.html


Detener el stack
docker-compose down

# Si necesitas eliminar datos persisten también
docker-compose down -v

📂 Estructura del Proyecto
proyecto-semestral/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # Pipeline CI/CD GitHub Actions
├── back-Ventas_SpringBoot/
│   └── Springboot-API-REST/
│       ├── Dockerfile                 # Dockerfile del backend ventas
│       ├── pom.xml                    # Dependencias Maven
│       └── src/                       # Código fuente Java
├── back-Despachos_SpringBoot/
│   └── Springboot-API-REST-DESPACHO/
│       ├── Dockerfile                 # Dockerfile del backend despachos
│       ├── pom.xml                    # Dependencias Maven
│       └── src/                       # Código fuente Java
├── front_despacho/
│   ├── Dockerfile                     # Dockerfile frontend
│   ├── package.json                   # Dependencias Node/npm
│   ├── vite.config.js                 # Configuración Vite
│   └── src/                           # Código fuente React
├── docker-compose.yml                 # Orquestación de contenedores
└── README.md                          # Este archivo

📡 Documentación de APIs
Backend Ventas (Puerto 8080)
Endpoints disponibles:

GET /api/v1/ventas — Obtener todas las ventas
GET /api/v1/ventas/{idVenta} — Obtener venta por ID
POST /api/v1/ventas — Crear nueva venta
PUT /api/v1/ventas/{idVenta} — Actualizar venta
DELETE /api/v1/ventas/{idVenta} — Eliminar venta
Documentación interactiva: http://localhost:8080/swagger-ui.html

Backend Despachos (Puerto 8081)
Endpoints disponibles:

GET /api/v1/despachos — Obtener todos los despachos
GET /api/v1/despachos/{idDespacho} — Obtener despacho por ID
POST /api/v1/despachos — Crear nuevo despacho
PUT /api/v1/despachos/{idDespacho} — Actualizar despacho
DELETE /api/v1/despachos/{idDespacho} — Eliminar despacho
Documentación interactiva: http://localhost:8081/swagger-ui.html

📝 Estándares de Commits
Para mantener un histórico limpio y profesional, utiliza estos prefijos en tus commits:

Prefijo	            Descripción	                       Ejemplo
cambio:	Nuevas funcionalidades o cambios	      cambio: agregar filtro por estado en ventas
fix:	Corrección de bugs	                      fix: resolver error en cálculo de total
update:	Actualización de dependencias o documentación	update: actualizar Spring Boot a v3.4.5
refactor: Mejora de código sin cambiar funcionalidad	refactor: simplificar lógica de validación
docs:	Solo cambios en documentación	          docs: agregar instrucciones de deploy
test:	Agregar o modificar tests	              test: agregar pruebas unitarias para VentaService


Ejemplo de commit correcto:
git commit -m "cambio: implementar cierre de despacho con validación"

🤝 Contribución

1-Crea una rama desde main:
git checkout -b feature/mi-feature

2-Realiza cambios y commitea con prefijos:
git commit -m "cambio: descripción clara del cambio"

3-Pushea a la rama:
git push origin feature/mi-feature

4-Abre un Pull Request en GitHub

📄 Licencia
Este proyecto es propiedad de Innovatech Chile. Uso interno únicamente.

📞 Soporte
Para preguntas o problemas:

Abre un issue en GitHub
Contacta al equipo de DevOps

Última actualización: 20 de mayo de 2026