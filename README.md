# Sistema Integrado de la Dirección General de Administración UNT — Maqueta v2

Maqueta funcional y demostrativa diseñada para GitHub Pages. No es un sistema institucional de producción ni reemplaza SGDUNT, SIGA MEF, SIAF-SP, SGA/SUV, Invierte.pe ni otros aplicativos oficiales.

## Qué contiene

- Navegación jerárquica: DGA → módulo → área/componente → servidor.
- 222 servidores identificados en los formatos GDR 2026 entregados para estructurar la maqueta.
- Metas/indicadores GDR tomados de esos formatos y convertidos en ejemplos de tareas, productos y seguimiento.
- Registro mensual de asistencia sintético para cada servidor.
- Gantt por área y cartera de inversiones demostrativa.
- Módulos específicos para RR. HH., Abastecimiento, Tesorería, Contabilidad, Inversiones y Servicios Generales.
- Inventario/patrimonio sintético con código, ubicación, asignación y estado.
- Personal académico ficticio distribuido entre las 13 facultades de la UNT.
- Asistente DGA local de demostración, capaz de consultar personas, tareas, GDR, asistencia, patrimonio, proyectos, tesorería, docentes, documentos y normativa.
- Editor documental con registro SGDUNT, flujo de visación, firma digital simulada, correo simulado y descarga compatible con Word.
- Carga local de evidencias y generación de informe fotográfico.
- Exportaciones compatibles con Excel.
- Vistas por rol: Director, jefaturas y servidores de ejemplo.

## Importante sobre los datos

Los nombres y puestos proceden de los archivos GDR suministrados por el usuario. Los estados operativos, tareas diarias, asistencia, regímenes, fechas de ingreso, puntajes, inventario, montos, proyectos, docentes y demás datos no extraídos expresamente de los formatos son sintéticos y solo sirven para demostrar el futuro funcionamiento.

No se incluyen DNI, correos personales ni otros identificadores directos adicionales.

## Publicación en GitHub Pages

1. Abra el repositorio `sistema-integrado-dga-unt`.
2. `Add file` → `Upload files`.
3. Arrastre **el contenido** de esta carpeta, no la carpeta contenedora.
4. Confirme `Commit changes`.
5. Si GitHub Pages ya estaba configurado en `main / (root)`, se reconstruirá automáticamente.
6. Si no lo estaba: `Settings` → `Pages` → `Deploy from a branch` → `main` → `/(root)` → `Save`.

## Para reemplazar la versión anterior sin cambiar el enlace

Suba estos archivos al mismo repositorio existente y confirme el commit. GitHub reemplazará los archivos de igual nombre y conservará la misma URL pública.

## Estructura

- `index.html`: interfaz.
- `styles.css`: diseño responsive.
- `data.js`: base demostrativa local.
- `app.js`: navegación, gráficos, asistente, documentos, reportes y simulaciones.
- `assets/unt-logo.png`: imagen incluida en los propios formatos GDR suministrados.
- `.nojekyll`: evita procesamiento Jekyll en GitHub Pages.
- `Sistema_Integrado_DGA_UNT_v2_DEMO.html`: versión autocontenida para abrir con doble clic, sin servidor.

## Advertencia para publicación pública

GitHub Pages de un repositorio público hace visible el contenido en Internet. Como esta maqueta usa nombres y puestos provenientes de los formatos GDR, confirme internamente que cuenta con autorización para publicarlos. Para una demostración reservada, use el HTML autocontenido de manera local o sustituya los nombres antes de publicar.
