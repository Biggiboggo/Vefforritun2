const SCHEMA_FILE = 'sql/schema.sql';
const INSERT_FILE = 'sql/insert.sql';
const DROP__FILE = '/sql/drop.sql';

export async function createSigning({id, name, comment, event, created}) {
  const q = `
    INSERT INTO
      signings(id, name, comment, event, created)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
  const values = [id, name, comment, event, created];

  const result = await query(q, values);

  return result !== null;
}

export async function listSignings() {
  const q = 'SELECT * FROM signings';

  const result = await query(q);

  if (result) {
    return result.rows;
  }

  return [];
}

export async function createEvent({ id, name, slug, description, created, updated }) {
  slug = slug.replace(/^\s+|\s+$/g, '');
  slug = slug.toLowerCase();
  slug = slug.replace(/[^a-z0-9 -]/g, '');
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/-+/g, '-');
  const q = `
    INSERT INTO
      comments(id, name, slug, description, created, updated)
    VALUES
      ($1, $2, $3, $4, #5, #6)
    RETURNING *`;
  const values = [id, name, slug, description, created, updated];

  const result = await query(q, values);

  return result !== null;
}

export async function listEvents() {
  const q = 'SELECT * FROM events';

  const result = await query(q);

  if (result) {
    return result.rows;
  }

  return [];
}
