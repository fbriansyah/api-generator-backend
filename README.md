Aplikasi No-Code untuk membuat server API. Aplikasi Backend yang menangani
setiap request dan mengolah data yang menggunakan ExpressJs dan NodeJS.
Untuk Frontend dibuat menggunakan Svelte dan TailwindCss.

## Table Command

### Create

Creating new table

```json
{
  "cmd": "t:add",
  "options": {
    "name": "users",
    "fields": ["name|varchar-60;nn;d='test'", "tanggal|datetime"],
    "default": ["id", "created", "edit"]
  }
}
```

Keterangan fields:

- 'nn': NOT NULL
- 'u': UNSIGNED
- 'ai': AUTO_INCREMENT
- 'pk': PRIMARY KEY
- 'd=$': DEFAULT $

Keterangan default:

- id: 'id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY'
- created: 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
- edited: 'edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'

### Delete

Delete table

```json
{
  "cmd": "t:del",
  "target": "table name"
}
```

### Update

Update table with alter.

```json
{
  "cmd": "t:update",
  "target": "users",
  "options": {
    "fields": []
  }
}
```

### List

List all table in database;

```json
{
  "cmd": "t:list"
}
```

### Describe

Describe database detail.

```json
{
  "cmd": "t:describe",
  "target": "users"
}
```

## Data Commands

Command untuk memanipulasi data dari sebuah table.

### Select Data

```json
{
  "cmd": "d:list",
  "target": "users",
  "dry": false,
  "where": {
    "id": "= 2"
  }
}
```

### Insert Data

```json
{
  "cmd": "d:add",
  "target": "users",
  "dry": false,
  "options": {
    "tanggal": "date_now",
    "name": "dummy"
  }
}
```

### Update Data

```json
{
  "cmd": "d:update",
  "target": "users",
  "where": {
    "id": "= 1"
  },
  "options": {
    "tanggal": "date_now"
  }
}
```

### Delete Data

```json
{
  "cmd": "d:update",
  "target": "users",
  "where": {
    "id": "= 1"
  }
}
```
