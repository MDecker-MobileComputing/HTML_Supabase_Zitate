# Zitate von Supabase #

<br>

Diese Repo enthält eine Webseite, die beim Aufruf ein zufälliges Zitat von einem
auf Supabase gehosteten Backend zurückliefert.

<br>

----

## Anlegen Datenbanktabelle ##

<br>

Tabelle anlegen:
```
CREATE TABLE zitate (
    id SERIAL PRIMARY KEY,
    zitat TEXT NOT NULL,
    autor TEXT NOT NULL
);    
```

<br>

Beispieldatensätze in Tabelle laden:
```
INSERT INTO "public"."zitate" ("id", "zitat", "autor") VALUES 
('1', 'The universe is a big place, perhaps the biggest.', 'Kurt Vonnegut'),
('2', 'Behind every great man is a woman rolling her eyes.', 'Jim Carrey'),
('3', 'Imagination is more important than knowledge.', 'Albert Einstein'),
('5', 'If it weren''t for electricity we''d all be watching television by candlelight.', 'George Gobel');
```

<br>

RPC-Funktion anlegen (weil `ORDER BY RANDOM()` nicht über JavaScript-API aufgerufen werden kann):

```
CREATE OR REPLACE FUNCTION get_zufaelliges_zitat()
RETURNS TABLE(zitat TEXT, autor TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT z.zitat, z.autor
  FROM zitate z
  ORDER BY RANDOM()
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;
```

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License) for the files in this repository.

<br>
