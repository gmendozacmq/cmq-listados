# cmq-listados — Matriz de Listados · Acciones

Herramienta web de una sola página (un único archivo HTML, sin servidor ni
build) para gestionar **listados de clientes/PDV** asociados a acciones
comerciales y consolidarlos en una **matriz**.

## ¿Qué hace?

- **Importa Excel** (`.xlsx`/`.xls`) con listados de clientes. Cada valor
  distinto de la columna *Acción* se convierte en un listado.
- **Clasifica automáticamente** cada listado mediante un diccionario
  **Acción → Columna → Detalle**. Lo importado a mano no se sobreescribe.
- **Arma la matriz** de clientes (PDV) por columna, con conteos y búsqueda.
- **Persiste los proyectos** localmente en el navegador (IndexedDB). No se
  envía nada a ningún servidor.
- **Backup / portabilidad:** exporta e importa proyectos completos en `.json`
  para mover entre PCs.

## Uso

1. Abrí `matriz-listados.html` en cualquier navegador moderno (doble clic).
2. **Importar** → seleccioná el Excel y mapeá las columnas (Acción / Columna /
   Detalle) en el asistente.
3. Revisá la pestaña **Listados** y ajustá la clasificación si hace falta.
4. Mirá la consolidación en la pestaña **Matriz**.

> Tip: usá `ejemplo_listados.xlsx` como archivo de prueba para ver el flujo
> completo.

## Archivos

| Archivo | Descripción |
|---|---|
| `matriz-listados.html` | Aplicación principal (versión actual). |
| `matriz-listados-v1-backup.html` | Respaldo de una versión anterior. |
| `ejemplo_listados.xlsx` | Excel de ejemplo para probar la importación. |

## Tecnología

- HTML + CSS + JavaScript puro (sin dependencias de build).
- [SheetJS / xlsx](https://github.com/SheetJS/sheetjs) vía CDN para leer Excel.
- IndexedDB para almacenamiento local.

## Privacidad

Todo el procesamiento ocurre en el navegador del usuario. Los datos de los
listados no salen de la máquina.
