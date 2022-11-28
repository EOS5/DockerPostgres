FROM local_pgdb

COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
RUN bash -x /load_dumps.sh