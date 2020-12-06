web: java $JAVA_OPTS  -jar target/*.jar --spring.profiles.active=prod,heroku,no-liquibase --server.port=$PORT 
release: cp -R src/main/resources/config config && ./mvnw -ntp liquibase:update -Pprod,heroku
