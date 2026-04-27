//Columnas del dataset (índice 0)
const COL = {
  NOM_ESTAB  : 1,
  NOMBRE_ACT : 4,
  TIPO_VIAL  : 6,
  NOM_VIAL   : 7,
  TELEFONO   : 29,
  CORREO     : 30,
  WWW        : 31,
  LATITUD    : 33,
  LONGITUD   : 34,
};

//Funciones base dadas en clase
function leerCelda(celda) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getRange(celda).getValue();
}

function leerCeldas(rango) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getRange(rango).getValues();
}

function setCelda(celda, valor) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(celda).setValue(valor);
}

// FUNCIÓN 1 — ls(arg)
function ls(arg) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const datos = sheet.getDataRange().getValues();
  const resultado = [];

  for (let i = 1; i < datos.length; i++) {
    const fila  = datos[i];
    const tel   = String(fila[COL.TELEFONO] || "").trim();
    const mail  = String(fila[COL.CORREO]   || "").trim();
    const web   = String(fila[COL.WWW]      || "").trim();

    const tieneTel  = tel  !== "" && tel  !== "0";
    const tieneMail = mail !== "" && mail !== "0";
    const tieneWeb  = web  !== "" && web  !== "0";

    let cumple = false;
    if      (arg === "t") cumple = tieneTel;
    else if (arg === "w") cumple = tieneWeb;
    else if (arg === "c") cumple = tieneMail;
    else if (arg === "a") cumple = tieneTel && tieneMail && tieneWeb;

    if (cumple) resultado.push(fila[COL.NOM_ESTAB] + " | Tel: " + tel + " | Web: " + web + " | Mail: " + mail);
  }

  Logger.log("Resultados ls('" + arg + "'): " + resultado.length);
  resultado.forEach(function(r) { Logger.log(r); });
}

// FUNCIÓN 2 — lsV(tipoVialidad, nombreVialidad)
function lsV(tipoVialidad, nombreVialidad) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const datos = sheet.getDataRange().getValues();
  const tipo   = tipoVialidad.toUpperCase().trim();
  const nombre = nombreVialidad.toUpperCase().trim();
  const resultado = [];

  for (let i = 1; i < datos.length; i++) {
    const fila  = datos[i];
    const filaT = String(fila[COL.TIPO_VIAL] || "").toUpperCase().trim();
    const filaN = String(fila[COL.NOM_VIAL]  || "").toUpperCase().trim();

    if (filaT === tipo && filaN === nombre) {
      resultado.push(fila[COL.NOM_ESTAB] + " | " + fila[COL.NOMBRE_ACT]);
    }
  }

  Logger.log("lsV('" + tipoVialidad + "', '" + nombreVialidad + "'): " + resultado.length + " negocios");
  resultado.forEach(function(r) { Logger.log(r); });
}


// FUNCIÓN 3 — lsGPS(latitud, longitud)
function haversine(lat1, lon1, lat2, lon2) {
  const R  = 6371;
  const dL = (lat2 - lat1) * Math.PI / 180;
  const dO = (lon2 - lon1) * Math.PI / 180;
  const a  = Math.sin(dL/2) * Math.sin(dL/2)
           + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180)
           * Math.sin(dO/2) * Math.sin(dO/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function lsGPS(latitud, longitud) {
  const sheet  = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const datos  = sheet.getDataRange().getValues();
  const latRef = parseFloat(latitud);
  const lonRef = parseFloat(longitud);
  const cercanos = [];

  for (let i = 1; i < datos.length; i++) {
    const fila   = datos[i];
    const latRaw = parseFloat(fila[COL.LATITUD]);
    const lonRaw = parseFloat(fila[COL.LONGITUD]);

    if (isNaN(latRaw) || isNaN(lonRaw)) continue;

    const lat = latRaw / 1e8;
    const lon = lonRaw / 1e8;

    if (lat < 14 || lat > 33 || lon < -118 || lon > -86) continue;

    const dist = haversine(latRef, lonRef, lat, lon);
    if (dist <= 3) cercanos.push({ nombre: fila[COL.NOM_ESTAB], dist: dist });
  }

  cercanos.sort(function(a, b) { return a.dist - b.dist; });

  Logger.log("lsGPS(" + latRef + ", " + lonRef + "): " + cercanos.length + " negocios en 3km");
  cercanos.slice(0, 5).forEach(function(n) {
    Logger.log(n.dist.toFixed(3) + " km — " + n.nombre);
  });
}

// ── Para probar, cambia los argumentos y ejecuta esta función ─
function probar() {
  ls("a");
  lsV("CALLE", "DELANTE");
  lsGPS(21.88, -102.28);
}