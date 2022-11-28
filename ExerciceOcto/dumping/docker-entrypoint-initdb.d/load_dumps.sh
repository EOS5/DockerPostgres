#!/bin/bash -x
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE bio_icare_drone;
    GRANT ALL PRIVILEGES ON DATABASE bio_icare_drone TO admin;
EOSQL
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "bio_icare_drone" < /docker-entrypoint-initdb.d/"bio_icare_drone".sql.dump;
done
