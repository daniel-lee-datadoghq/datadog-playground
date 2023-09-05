# start by pulling the python image
FROM python:3.9-slim

# copy the requirements file into the image
COPY ./requirements.txt /src/requirements.txt

# switch working directory
WORKDIR /src

# install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt

# copy every content from the local file to the image
COPY ./app.py /src/app.py

# configure the container to run in an executed manner
ENTRYPOINT [ "python" ]

CMD [ "app.py" ]