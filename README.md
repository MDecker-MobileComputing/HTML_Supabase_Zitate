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

Diese Funktion ist mit [PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html), der prozeduralen
Sprache der Postgres-Datenbank, geschrieben.

<br>

----

## REST-Endpunkt für Monitoring ##

<br>

In SQL-Konsole von Supabase-Projekt folgenden PL/pgSQL-Befehl ausführen, um einen REST-Endpunkt
für die Überwachung anzulegen:

```
CREATE OR REPLACE FUNCTION health_check()
RETURNS JSON AS $$
DECLARE
  anzahl_datensaetze INTEGER;
BEGIN

  SELECT COUNT(*) INTO anzahl_datensaetze FROM zitate;
  
  RETURN json_build_object(
    'zustand'         , 'okay',
    'zeitstempel'     , NOW(),
    'anzahl_zitate'   , anzahl_datensaetze
  );

END;
$$ LANGUAGE plpgsql;
```

<br>

Der hiermit definierte REST-Endpunkt mit `HTTP-GET` unter der folgenden URL aufgerufen werden:

  https://annymgkbnrknvkjnhdhy.supabase.co/rest/v1/rpc/health_check

Es sind dabei aber die beiden HTTP-Header-Felder `apikey` und `Authorization` zu setzen,
siehe auch den in [dieser Datei für den *Talend API Tester*](TalendApiTest-SupabaseZitate.json)
definierten Request "Health Check".

<br>

**Beispielantwort:**
```
{
  "zustand"      : "okay",
  "zeitstempel"  : "2025-07-13T09:50:57.613117+00:00",
  "anzahl_zitate": 12
}
```

<br>

Diese Check kann auch regelmäßig mit *GitHub Actions* ausgeführt werden, 
siehe [diese Workflow-Datei](.github/workflows/healthcheck.yml).
Hierfür muss aber in den Repo-Einstelllungen unter "Secrets and variables | Actions"
(siehe [hier](https://github.com/MDecker-MobileComputing/HTML_Supabase_Zitate/settings/secrets/actions))
eine Variable mit Namen `SUPABASE_API_KEY` angelegt werden, die den API-Key
des Supabase-Projekts enthält.

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License) for the files in this repository.

<br>
