"use strict";

let pZitat = null;
let pAutor = null;


window.addEventListener( "load", async function () {

    pZitat = document.getElementById( "zitatText"  );
    pAutor = document.getElementById( "zitatAutor" );

    await zitatLaden();

});


async function zitatLaden() {

    const supabaseClient = supabase.createClient(
            "https://annymgkbnrknvkjnhdhy.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubnltZ2tibnJrbnZram5oZGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDM4NzAsImV4cCI6MjA2NzgxOTg3MH0.tJTJmU_jrlEBHpFk3_TUWVLyvVDLoVPk64Dnq7hgf6U"
    );

    const { data, fehler } = await supabaseClient.from( "zitate" )
                                                 .select( "zitat,autor" )
                                                 //.order( "random()" )
                                                 .limit( 1 )
                                                 .single();
    if ( fehler ) {

        zeigeFehler( fehler );
        return;
    }

    if ( !data ) {

        zeigeFehler( "Leere Antwort von Server erhalten." );
        return;
    }

    pZitat.textContent = data.zitat;
    pAutor.textContent = data.autor;
}


function zeigeFehler( fehler ) {

    console.error( fehler );

    pZitat.textContent = "Fehler beim Laden des Zitats.";
    pAutor.textContent = "";
}
