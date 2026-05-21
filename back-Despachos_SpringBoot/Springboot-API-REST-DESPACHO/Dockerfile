# ETAPA 1: Compilación (Maven + JDK)
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -q

# ETAPA 2: Ejecución (Imagen ligera)
FROM eclipse-temurin:17-jre-alpine

# Variables
ENV APP_USER=appuser
ENV APP_GROUP=appgroup

# Crear usuario no-root
RUN addgroup -S ${APP_GROUP} && \
    adduser -S ${APP_USER} -G ${APP_GROUP}

# Directorio de trabajo
WORKDIR /app

# Copiar JAR desde builder (sin permisos elevados)
COPY --from=builder --chown=${APP_USER}:${APP_GROUP} /app/target/*.jar app.jar

# Cambiar a usuario no-root
USER ${APP_USER}:${APP_GROUP}

# Exponer puerto
EXPOSE 8081

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]