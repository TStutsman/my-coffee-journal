FROM python:3.15.0a3-alpine3.23

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

EXPOSE 8000

RUN flask db migrate
RUN flask db upgrade

CMD gunicorn app:app