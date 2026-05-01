# Use Java 21 (stable runtime)
FROM eclipse-temurin:21-jdk-jammy

# App directory
WORKDIR /app

# Copy built jar
COPY target/*.jar app.jar

# Run app
ENTRYPOINT ["java","-jar","app.jar"]