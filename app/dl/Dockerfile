FROM python:3.8.10
COPY requirements.txt /opt/app/requirements.txt
WORKDIR /opt/app
RUN pip install -r requirements.txt
COPY . /opt/app
CMD ["gunicorn"  , "--bind", "0.0.0.0:8000", "run:app"]
