FROM php:8.1-fpm-alpine

RUN apk update \
    && apk add git \
        curl \
        nano \
        wget \
        bash \
        zlib \
        zlib-dev \
        patch \
        libzip-dev \ 
        icu-dev \
        linux-headers \
        libxml2-dev \
        oniguruma-dev \
        libpng-dev \
        libxslt-dev

# install php dependencies
RUN apk add --no-cache $PHPIZE_DEPS \
    && pecl install -f xdebug \
    && docker-php-ext-install intl opcache bcmath sockets \
    && docker-php-ext-enable xdebug intl opcache bcmath sockets \
    && rm -rf /var/lib/apt/lists/*

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer selfupdate

# Set timezone
ENV TIMEZONE=Etc/UCT
RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && echo ${TIMEZONE} > /etc/timezone \
    && printf '[PHP]\ndate.timezone = "%s"\n', ${TIMEZONE} > /usr/local/etc/php/conf.d/tzone.ini \
    && "date"

RUN docker-php-ext-install pdo pdo_mysql opcache intl zip calendar dom mbstring gd xsl

CMD ["php-fpm", "-F"]

COPY . /var/www/api
WORKDIR /var/www/api

EXPOSE 9000