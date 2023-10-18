FROM php:8-apache

WORKDIR /app

RUN apt-get update

RUN apt-get install -y wget

EXPOSE 80

RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php && php datadog-setup.php --php-bin=all --enable-profiling
