# Zitate von Supabase #

<br>

Diese Repo enthält eine Webseite, die beim Aufruf ein zufälliges Zitat von einem
auf [Supabase](https://supabase.com/) gehosteten Backend zurückliefert.

<br>

Web-App via *GitHub Pages*: 
[hier](https://mdecker-mobilecomputing.github.io/HTML_Supabase_Zitate/)

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

Beispieldatensätze in Tabelle laden: siehe [insert.sql](insert.sql).

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
