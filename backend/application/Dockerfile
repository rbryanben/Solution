FROM python:3.12.0b4-alpine
WORKDIR /app
COPY . . 
RUN pip3 install -r requirements.txt 
RUN manage.py makemigrations 
RUN manage.py migrate
RUN manage.py test
CMD manage.py runserver 0.0.0.0:80
