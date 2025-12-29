# Database Migrations

This project uses Supabase for the database. Migrations are stored in `supabase/migrations/`.

## Running Migrations

Migrations must be run manually in the Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the migration file from `supabase/migrations/`
4. Copy the SQL content and run it

## Migration Files

Migration files are numbered sequentially:
- `001_create_group_locations.sql` - Creates the group_locations table

## Creating New Migrations

When adding new database changes:

1. Create a new file in `supabase/migrations/` with the next number:
   ```
   002_your_migration_name.sql
   ```

2. Write your SQL with both the change and any necessary rollback comments:
   ```sql
   -- Migration: description of what this does

   CREATE TABLE ...

   -- Rollback (if needed):
   -- DROP TABLE ...
   ```

3. Run the migration in Supabase SQL Editor

4. Commit the migration file to version control

## Environment Variables

Required environment variables for Supabase:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
