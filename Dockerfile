FROM adoptopenjdk/openjdk11:latest
VOLUME /tmp
COPY  target/codeFrontation-1.0-SNAPSHOT.jar codeFrontation.jar
WORKDIR /cf
COPY . /cf
ENTRYPOINT ["java", "-jar", "/codeFrontation.jar"]