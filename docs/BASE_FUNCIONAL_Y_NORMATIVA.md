# Base funcional y normativa de la maqueta

## 1. Propósito

El prototipo representa, de forma superficial pero navegable, un futuro **Sistema Integrado de la Dirección General de Administración UNT**. Su finalidad es validar con la Dirección General una visión de producto antes de diseñar arquitectura, datos, integraciones y reglas definitivas.

No constituye un sistema oficial, no reemplaza los aplicativos vigentes y no utiliza datos reales.

## 2. Insumos revisados

Para estructurar la maqueta se revisó el paquete de formatos de Gestión del Rendimiento proporcionado para las unidades, áreas y subáreas vinculadas al alcance del proyecto. El conjunto contiene formatos correspondientes, entre otros, a:

- Dirección General de Administración.
- Unidad de Recursos Humanos y sus frentes de Personal Académico, Personal Administrativo, Escalafón, Remuneraciones y Pensiones, Pensiones, Capacitación y Gestión del Talento Humano, Seguridad y Salud en el Trabajo, Control Administrativo, Control Docente y Secretaría Técnica de PAD.
- Unidad de Abastecimiento, Almacén General y Control Patrimonial.
- Unidad de Tesorería: Gestión de Ingresos y Gestión de Egresos.
- Unidad de Contabilidad: Control y Devengado e Integración Contable.
- Unidad Ejecutora de Inversiones.
- Unidad de Servicios Generales: Limpieza, Áreas Verdes, Talleres y Transportes.

Las denominaciones de áreas y subáreas provenientes de los formatos se usan como **componentes funcionales de navegación**. La maqueta no pretende convertirlas automáticamente en unidades orgánicas ni resolver su jerarquía formal; esa correspondencia deberá validarse contra el instrumento organizacional vigente antes del desarrollo productivo.

Los formatos evidencian dos patrones que se reflejan en la maqueta:

**Trabajo altamente recurrente.** Limpieza, áreas verdes, talleres, transportes y controles de asistencia/permanencia se prestan a tableros por turnos, ocurrencias, cobertura, órdenes y cumplimiento periódico.

**Trabajo técnico/documental variable.** DGA, Recursos Humanos, Abastecimiento, Tesorería, Contabilidad y UEI requieren seguimiento por expedientes, productos, hitos, documentos, decisiones, normativa, importes, estados y dependencias; por ello no se modelan como una simple lista de tareas repetitivas.

## 3. Estructura funcional simulada

### Dirección General de Administración

Vista transversal con alertas, compromisos, documentos, proyectos, dependencias entre unidades y capacidad de profundizar hasta la persona o producto responsable.

### Recursos Humanos

Se organiza en paneles que permiten representar progresivamente los procesos del Sistema Administrativo de Gestión de Recursos Humanos y, al mismo tiempo, respetar la organización operativa vigente de la UNT por áreas/subáreas.

La maqueta incorpora:

- dotación y legajo/escalafón;
- personal académico y administrativo;
- remuneraciones y pensiones;
- capacitación;
- seguridad y salud en el trabajo;
- asistencia y permanencia;
- Gestión del Rendimiento;
- PAD como frente especializado;
- tareas y productos por servidor.

### Abastecimiento

Muestra programación/contratación, requerimientos, órdenes, almacén, bienes y control patrimonial. En una versión real, las fases deberán mapearse a la normativa vigente de contratación pública y abastecimiento y a las fuentes oficiales que la UNT determine.

### Tesorería

Muestra ingresos, egresos, saldos, giros/pagos y rendiciones. La vista ejecutiva evita presentar datos contables como si fueran equivalentes a disponibilidad financiera; en la solución real las definiciones deben formalizarse con Tesorería y Contabilidad.

### Contabilidad

Seguimiento de devengado, integración, conciliaciones, cierres y estados de documentación. Los indicadores definitivos deben acordarse con la unidad responsable.

### Unidad Ejecutora de Inversiones

Cartera demostrativa con estado, avance, hitos, riesgos, dependencias y cuello de botella. Esta representación busca que la DGA pueda pasar del semáforo global al proyecto y de allí al hito/responsable.

### Servicios Generales

Frentes operativos para limpieza, áreas verdes, talleres, transportes y mantenimiento transversal; permite visualizar cobertura, ocurrencias, órdenes, vehículos/equipos y responsables.

## 4. Personal académico

La maqueta usa las 13 facultades publicadas por la UNT únicamente como catálogo institucional de demostración. Los docentes y todos sus datos son ficticios.

La vista ejemplifica cómo, si la institución autoriza y dispone las fuentes necesarias, podrían consultarse:

- carga lectiva y no lectiva;
- cursos;
- asistencia;
- cargo administrativo temporal;
- información de investigación que provenga de una fuente válida;
- indicadores de evaluación o historial que la normativa y los permisos permitan visualizar.

## 5. Normativa de referencia incorporada al prototipo

La aplicación enlaza una selección de normas para demostrar cómo funcionaría un repositorio normativo contextual. Antes de una puesta en producción debe existir un responsable funcional de la actualización, validación de vigencia y versionado.

### Organización UNT

- Reglamento de Organización y Funciones de la UNT aprobado mediante R.R. N.° 1173-2022/UNT, utilizado como referencia organizacional del proyecto.

### Recursos Humanos

- Ley N.° 30057, Ley del Servicio Civil.
- D.S. N.° 040-2014-PCM, Reglamento General de la Ley del Servicio Civil.
- Normativa SERVIR aplicable al Sistema Administrativo de Gestión de Recursos Humanos y a sus subsistemas/procesos.
- Ley N.° 29783, Ley de Seguridad y Salud en el Trabajo, y su normativa complementaria.

### Abastecimiento y contratación pública

- D. Leg. N.° 1439, Decreto Legislativo del Sistema Nacional de Abastecimiento.
- Ley N.° 32069, Ley General de Contrataciones Públicas, y su reglamento vigente/modificatorias aplicables.

### Tesorería

- D. Leg. N.° 1441, Decreto Legislativo del Sistema Nacional de Tesorería.

### Contabilidad

- D. Leg. N.° 1438, Decreto Legislativo del Sistema Nacional de Contabilidad, y su TUO vigente.

### Inversiones

- D. Leg. N.° 1252, que crea el Sistema Nacional de Programación Multianual y Gestión de Inversiones.
- Reglamento vigente del D. Leg. N.° 1252 y disposiciones del MEF aplicables a Invierte.pe.

## 6. Roles demostrativos

- Director General de Administración: visión total.
- Jefatura de Recursos Humanos.
- Jefatura de Abastecimiento.
- Jefatura de Tesorería.
- Jefatura de Contabilidad.
- Jefatura de UEI.
- Jefatura de Servicios Generales.
- Servidor: vista personal reducida.

La versión real requerirá una matriz de permisos mucho más granular: ver, crear, editar, validar, aprobar, descargar, exportar, administrar catálogos, consultar información sensible y acceder al asistente sobre determinados dominios.

## 7. Asistente DGA

El asistente actual funciona con reglas locales sobre datos simulados; no es un modelo de IA conectado. Demuestra el tipo de interacción esperada:

- “¿Qué proyectos están retrasados?”
- “¿Qué tareas tiene pendiente este servidor?”
- “¿Quién llegó tarde hoy?”
- “¿Cuál es el saldo de Tesorería?”
- “¿Cómo va Gestión del Rendimiento?”
- “¿Qué alertas normativas existen?”

En una versión real, el asistente deberá respetar permisos, mostrar fuente y fecha de cada respuesta, diferenciar datos oficiales de inferencias, y nunca responder con información a la que el usuario no tenga acceso directo.

## 8. Integraciones futuras: principio propuesto

“Integrado” no significa sustituir indiscriminadamente todos los sistemas. La arquitectura final puede combinar:

- API cuando exista, esté autorizada y sea sostenible;
- sincronización programada;
- importación de Excel/CSV/PDF estructurado con validación;
- lectura de reportes oficiales generados por otros sistemas;
- enlaces profundos hacia aplicativos fuente;
- funcionalidades nativas cuando realmente simplifiquen el trabajo.

Cada integración debe definir **fuente maestra, frecuencia, responsable, reglas de conciliación, trazabilidad, permisos y tratamiento de errores**.

## 9. Límites de esta versión

- No incorpora Gestión por Procesos.
- No contiene información personal real.
- No valida reglas institucionales de cálculo.
- No firma ni tramita documentos oficialmente.
- No está conectada a bases, SIGA, SIAF, SGD, SGA, SERVIR ni CONCYTEC.
- No sustituye evaluación legal, contable, presupuestal, laboral o de contratación.
- El “Excel” exportado es un archivo compatible para demostración, no un reporte institucional certificado.

## 10. Siguiente paso recomendado después de la validación directiva

Si la Dirección General valida la visión, el paso siguiente no debería ser programar todo de inmediato. Conviene realizar un **diseño funcional detallado** por módulo: actores, decisiones, datos maestros, entradas/salidas, permisos, indicadores, documentos, reglas, integraciones, alertas, reportes y criterios de aceptación. Recién con ello se define la arquitectura técnica y un desarrollo incremental.
