FROM python:3.8.10
RUN mkdir /mainweb
COPY . /mainweb
WORKDIR /mainweb
RUN pip install -r requirements.txt
CMD ["python","/mainweb/run.py"]
