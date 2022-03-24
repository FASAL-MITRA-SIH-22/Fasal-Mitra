FROM python:3.8.10
RUN mkdir /mainweb
COPY . /mainweb
WORKDIR /mainweb
RUN pip install -r requirements1.txt
EXPOSE 5000
CMD ["python3","/mainweb/run.py"]