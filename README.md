Aplikasi No-Code untuk membuat server API. Aplikasi Backend yang menangani
setiap request dan mengolah data yang menggunakan ExpressJs dan NodeJS.
Untuk Frontend dibuat menggunakan Svelte dan TailwindCss.

## Table Command

### Create

```json
{
  "command": "table:add",
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

````json
{
    "command": "table:del",
    "options": {
      "name": "users"
    }
}

### Update
```json
{
    "command": "table:update",
    "options": {
      "target": "users",
      "fields": []
    }
}
````
