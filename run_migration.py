import psycopg2
from pathlib import Path

db_config = {
    'dbname': 'your_db',
    'user': 'your_user',
    'password': 'your_password',
    'host': 'localhost',
    'port': '5432'
}

def run_sql_file(filename):
    with open(filename, 'r') as f:
        sql = f.read()

    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute(sql)

        conn.commit()
        print(f"Migracja {filename} wykonana pomyślnie!")
    except Exception as e:
        print(f"Błąd migracji: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    migrations_dir = Path('migrations')
    migration_files = migrations_dir.glob('*.sql')
    for migration_file in migration_files:
        migration_file = str(migration_file)

        run_sql_file(migration_file)
