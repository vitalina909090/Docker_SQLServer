FROM mcr.microsoft.com/mssql-tools

WORKDIR /init
COPY init.sql .

CMD ["bash", "-c", "\
  until /opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P $SA_PASSWORD -Q 'SELECT 1'; do \
    echo 'Waiting for SQL Server...'; \
    sleep 5; \
  done; \
  echo 'SQL Server is ready. Running init.sql...'; \
  /opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P $SA_PASSWORD -i init.sql \
"]
