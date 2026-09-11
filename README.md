# Sistema Integrado de la Dirección General de Administración UNT — Maqueta funcional

Maqueta navegable, íntegramente demostrativa, concebida para mostrar cómo podría verse y funcionar un futuro **Sistema Integrado de la Dirección General de Administración de la Universidad Nacional de Trujillo**.

> **Importante:** todos los nombres de personas, cifras, estados, montos, tareas, proyectos, cargas docentes, asistencias y resultados mostrados en esta versión son **ficticios**. La maqueta no consulta bases institucionales ni aplicativos oficiales.

## Qué permite mostrar esta versión

- Tablero ejecutivo de la DGA con indicadores y gráficos.
- Navegación por las seis unidades consideradas en el ROF de referencia del proyecto: Recursos Humanos, Abastecimiento, Tesorería, Contabilidad, Unidad Ejecutora de Inversiones y Servicios Generales.
- Desagregación demostrativa por áreas y subáreas identificadas en los formatos de Gestión del Rendimiento entregados para el proyecto.
- Fichas de servidores con pendientes, productos concluidos, prioridad y avance.
- Panel de Personal Académico con facultades, carga lectiva/no lectiva, cursos, asistencia, cargo administrativo y condición RENACYT simulada.
- Asistencia y permanencia con indicadores diarios y mensuales.
- Tesorería: ingresos, egresos, saldos y rendiciones simuladas.
- Contabilidad: avance de devengado, conciliaciones y cierre.
- Abastecimiento: requerimientos, órdenes de compra/servicio, almacén y control patrimonial.
- Unidad Ejecutora de Inversiones: cartera, hitos, desviaciones y responsables.
- Servicios Generales: limpieza, áreas verdes, talleres, transportes y mantenimiento como frentes de trabajo.
- Gantt interactivo, responsables, dependencias y cuellos de botella.
- Repositorio normativo contextual por módulo.
- Asistente DGA demostrativo para consultas sobre la data ficticia.
- Generación demostrativa de documentos rápidos.
- Exportación de reportes en formato compatible con Excel.
- Selector de perfiles para simular visibilidad por rol.

## Lo que deliberadamente NO incluye

Esta maqueta **no incorpora el trabajo de Gestión por Procesos** que se viene desarrollando por separado. Tampoco pretende reemplazar, en esta etapa, a SIAF, SIGA, SGD, SGA ni otros aplicativos oficiales. La versión definitiva deberá decidir, caso por caso, qué información consumir mediante integración, qué información recibir mediante carga controlada y qué funcionalidades conviene desarrollar de manera nativa.

## Cómo abrirla sin instalar nada

Abra `index.html` con un navegador moderno. Como no usa dependencias externas, también funciona de forma local.

Para una presentación todavía más rápida puede abrir el archivo independiente `Sistema_Integrado_DGA_UNT_DEMO.html`, que contiene CSS, datos simulados y JavaScript en un solo archivo.

## Cómo publicarla en GitHub Pages

1. Cree un repositorio nuevo en GitHub, por ejemplo `sistema-integrado-dga-unt-demo`.
2. Suba el contenido de esta carpeta a la raíz del repositorio.
3. En GitHub vaya a **Settings → Pages**.
4. En **Build and deployment**, seleccione **Deploy from a branch**.
5. Seleccione la rama `main` y la carpeta `/ (root)`.
6. Guarde. GitHub generará un enlace público para la demostración.

No requiere servidor, API key ni base de datos para esta versión.

## Estructura

```text
/
├── index.html
├── styles.css
├── data.js
├── app.js
├── .nojekyll
├── assets/
│   └── dga-unt-mark.svg
└── docs/
    └── BASE_FUNCIONAL_Y_NORMATIVA.md
```

## Arquitectura sugerida para convertir la maqueta en sistema real

La maqueta está hecha como una SPA estática para acelerar la validación con la Dirección General. Una versión institucional real debería separar, como mínimo:

1. **Frontend web**: experiencia por roles, tableros, trabajo operativo y consulta.
2. **API institucional**: servicios de negocio, permisos, auditoría y reglas.
3. **Base de datos transaccional**: por ejemplo PostgreSQL, con catálogos maestros y trazabilidad.
4. **Gestión documental/objetos**: evidencias, informes, formatos y archivos con metadatos.
5. **Identidad y RBAC**: Director DGA, jefaturas, responsables, evaluadores y servidores.
6. **Capa de integración**: conectores o cargas controladas desde SIAF, SIGA, SGD, SGA y otras fuentes autorizadas, sin asumir que todas ofrecen APIs disponibles.
7. **Asistente con recuperación documental**: respuestas sustentadas en información institucional autorizada y normativa versionada, con control de acceso por rol.
8. **Auditoría y seguridad**: bitácora de accesos/cambios, segregación de funciones, cifrado, respaldos y políticas de retención.

## Criterio de diseño

El Director General necesita una vista transversal; cada jefatura, en cambio, debe ver y operar principalmente sobre la información de su ámbito. Por eso el prototipo prioriza **resumen ejecutivo + profundidad progresiva**: primero situación general y alertas; luego unidad, área, persona, tarea, documento o proyecto.

La normativa no ocupa un gran bloque fijo de pantalla. Se muestra de manera contextual dentro de cada módulo y existe un repositorio general para actualización posterior.
