# Zitate von Supabase #

<br>

Diese Repo enthält eine Webseite, die beim Aufruf ein zufälliges Zitat von einem
auf Supabase gehosteten Backend zurückliefert.

<br>

----

## Anlegen Datenbanktabelle ##

<br>

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
