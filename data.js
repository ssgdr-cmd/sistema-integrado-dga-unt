window.DGA_DEMO_DATA = {
  meta: {
    title: "Sistema Integrado de la Dirección General de Administración UNT",
    shortTitle: "Sistema Integrado DGA UNT",
    version: "Maqueta funcional v0.1",
    disclaimer: "Todos los nombres, cifras, estados, fechas operativas y montos de esta maqueta son ficticios y se muestran únicamente con fines de demostración.",
    referenceDate: "11/09/2026"
  },
  modules: {
    dga: {
      name: "Dirección General de Administración",
      short: "DGA",
      accent: "navy",
      description: "Vista ejecutiva transversal de la gestión administrativa, seguimiento de encargos, documentos, comités, alertas y decisiones.",
      subareas: ["Despacho DGA", "Gestión documentaria", "Asesoría técnica", "Comités y encargos"],
      kpis: [
        ["Expedientes activos", "184", "+12 esta semana"],
        ["Encargos directivos", "37", "6 críticos"],
        ["Documentos por firmar", "14", "5 vencen hoy"],
        ["Alertas transversales", "9", "3 alta prioridad"]
      ],
      taskTemplates: [
        "Revisar expediente administrativo y validar sustento normativo",
        "Elaborar informe situacional para decisión de la Dirección General",
        "Proyectar documento administrativo y gestionar su trazabilidad",
        "Dar seguimiento a acuerdo de comité o encargo institucional"
      ]
    },
    rh: {
      name: "Unidad de Recursos Humanos",
      short: "Recursos Humanos",
      accent: "teal",
      description: "Gestión integral del SAGRH: empleo, compensación, rendimiento, capacitación, relaciones humanas, SST, escalafón y control de asistencia.",
      subareas: [
        "Área de Escalafón", "Área de Personal Académico", "Área de Personal Administrativo",
        "Área de Remuneraciones y Pensiones", "Subárea de Pensiones",
        "Área de Capacitación y Gestión del Talento Humano", "Área de Seguridad y Salud en el Trabajo",
        "Subárea de Control Administrativo", "Subárea de Control Docente",
        "Secretaría Técnica de Procedimientos Administrativos Disciplinarios", "Gestión del Rendimiento"
      ],
      kpis: [
        ["Servidores UNT", "1,864", "demo institucional"],
        ["Planillas del mes", "8/9", "88.9% procesado"],
        ["GDR en seguimiento", "712", "ciclo 2026"],
        ["Legajos actualizados", "91.4%", "+2.7 pp"]
      ],
      taskTemplates: [
        "Actualizar legajo y registro escalafonario con documentación validada",
        "Revisar acción de personal y elaborar proyecto de informe o resolución",
        "Procesar incidencia de asistencia y permanencia del personal",
        "Actualizar avance de meta y evidencia del ciclo de Gestión del Rendimiento",
        "Verificar cálculo o incidencia para planilla y aplicativos correspondientes"
      ]
    },
    abastecimiento: {
      name: "Unidad de Abastecimiento",
      short: "Abastecimiento",
      accent: "amber",
      description: "Programación, contratación, órdenes, almacén, patrimonio y seguimiento de la cadena de abastecimiento público.",
      subareas: ["Programación y contrataciones", "Área de Almacén General", "Área de Control Patrimonial"],
      kpis: [
        ["Requerimientos activos", "126", "23 por priorizar"],
        ["Órdenes de servicio", "84", "76 notificadas"],
        ["Órdenes de compra", "41", "35 en ejecución"],
        ["Bienes patrimoniales", "28,460", "94.7% conciliado"]
      ],
      taskTemplates: [
        "Revisar requerimiento, TDR/especificaciones y disponibilidad para contratación",
        "Emitir y notificar orden de servicio con condiciones verificadas",
        "Actualizar Cuadro Multianual de Necesidades y catálogo SIGA",
        "Registrar recepción, distribución y movimiento de bienes en almacén",
        "Actualizar estado, ubicación y acto patrimonial de bienes institucionales"
      ]
    },
    tesoreria: {
      name: "Unidad de Tesorería",
      short: "Tesorería",
      accent: "blue",
      description: "Control de ingresos, pagos, giros, rendiciones, garantías, conciliaciones y posición de caja institucional.",
      subareas: ["Área de Gestión de Ingresos", "Área de Gestión de Egresos"],
      kpis: [
        ["Saldo operativo demo", "S/ 6.42 M", "al 11/09"],
        ["Pagos programados", "S/ 1.18 M", "próximos 7 días"],
        ["Ingresos del mes", "S/ 2.36 M", "+8.2% vs ago."],
        ["Rendiciones pendientes", "27", "7 fuera de plazo"]
      ],
      taskTemplates: [
        "Registrar y conciliar captación de ingresos con SIAF y reportes internos",
        "Revisar expediente de pago y validar retenciones, detracciones o garantías",
        "Registrar y verificar giro conforme al cronograma institucional",
        "Controlar encargos, viáticos y rendiciones pendientes",
        "Actualizar reporte de caja, ingresos, pagos y saldos"
      ]
    },
    contabilidad: {
      name: "Unidad de Contabilidad",
      short: "Contabilidad",
      accent: "indigo",
      description: "Registro, control, devengado, conciliación, integración contable y preparación de estados financieros y presupuestales.",
      subareas: ["Área de Control y Devengado", "Área de Integración Contable"],
      kpis: [
        ["Devengados del mes", "S/ 4.87 M", "92.3% revisado"],
        ["Conciliaciones", "17/20", "85% cerradas"],
        ["Expedientes observados", "18", "6 críticos"],
        ["Cierre contable", "78%", "meta 15/09"]
      ],
      taskTemplates: [
        "Revisar expediente de gasto y formalizar devengado con sustento completo",
        "Conciliar cuenta contable y regularizar diferencias identificadas",
        "Preparar reporte de ingresos y gastos por centro de costo",
        "Integrar información contable para estados financieros y presupuestales"
      ]
    },
    inversiones: {
      name: "Unidad Ejecutora de Inversiones",
      short: "Inversiones",
      accent: "cyan",
      description: "Seguimiento de la fase de ejecución de inversiones, expedientes técnicos, ejecución física-financiera, modificaciones y alertas de plazo.",
      subareas: ["Cartera de inversiones", "Expedientes técnicos", "Ejecución física y financiera", "Asuntos legales UEI"],
      kpis: [
        ["Inversiones activas", "14", "3 con alerta"],
        ["Monto actualizado", "S/ 48.6 M", "cartera demo"],
        ["Avance físico", "67.8%", "+4.1 pp mes"],
        ["Avance financiero", "63.2%", "brecha 4.6 pp"]
      ],
      taskTemplates: [
        "Revisar expediente técnico o documento equivalente de inversión",
        "Actualizar avance físico y financiero de inversión",
        "Emitir informe técnico o legal sobre modificación durante ejecución",
        "Atender observación de control y actualizar documentación de la inversión"
      ]
    },
    servicios: {
      name: "Unidad de Servicios Generales",
      short: "Servicios Generales",
      accent: "red",
      description: "Operación, mantenimiento y soporte físico institucional: limpieza, áreas verdes, talleres, transportes y requerimientos técnicos.",
      subareas: ["Área de Limpieza", "Áreas Verdes", "Área de Talleres", "Área de Transportes", "Mantenimiento transversal"],
      kpis: [
        ["Órdenes de trabajo", "93", "81 atendidas"],
        ["Vehículos operativos", "18/21", "85.7%"],
        ["Incidencias críticas", "5", "2 sin asignar"],
        ["Cumplimiento semanal", "91.8%", "+3.2 pp"]
      ],
      taskTemplates: [
        "Atender orden de trabajo de mantenimiento y registrar materiales utilizados",
        "Ejecutar ruta o comisión de servicio y registrar recorrido e incidencias",
        "Verificar limpieza, orden y condiciones del ambiente asignado",
        "Ejecutar actividad programada de jardinería y comunicar incidencias",
        "Realizar inspección técnica y emitir reporte de condición de infraestructura"
      ]
    }
  },
  sagrhSubsystems: [
    {
      name: "Ss1. Planificación de políticas de recursos humanos",
      processes: ["Estrategia, políticas y procedimientos", "Planificación de recursos humanos"],
      unt: "URH / jefatura y soporte técnico"
    },
    {
      name: "Ss2. Organización del trabajo y su distribución",
      processes: ["Diseño de puestos", "Administración de puestos"],
      unt: "Personal Administrativo, Personal Académico y Escalafón"
    },
    {
      name: "Ss3. Gestión del empleo",
      processes: ["Selección", "Vinculación", "Inducción", "Periodo de prueba", "Administración de legajos", "Control de asistencia", "Desplazamiento", "Procedimientos disciplinarios", "Desvinculación"],
      unt: "Personal Administrativo, Personal Académico, Escalafón, Control Administrativo/Docente y STPAD"
    },
    {
      name: "Ss4. Gestión del rendimiento",
      processes: ["Gestión del rendimiento"],
      unt: "Gestión del Rendimiento / URH"
    },
    {
      name: "Ss5. Gestión de la compensación",
      processes: ["Administración de compensaciones", "Administración de pensiones"],
      unt: "Remuneraciones y Pensiones / Subárea de Pensiones"
    },
    {
      name: "Ss6. Gestión del desarrollo y la capacitación",
      processes: ["Capacitación", "Progresión en la carrera"],
      unt: "Capacitación y Gestión del Talento Humano, con áreas de personal según corresponda"
    },
    {
      name: "Ss7. Gestión de relaciones humanas y sociales",
      processes: ["Relaciones laborales individuales y colectivas", "Seguridad y salud en el trabajo", "Bienestar social", "Cultura y clima organizacional", "Comunicación interna"],
      unt: "SST y funciones de relaciones humanas/sociales de la URH"
    }
  ],
  norms: [
    {
      id: "rof",
      scope: ["dga","rh","abastecimiento","tesoreria","contabilidad","inversiones","servicios"],
      title: "ROF de la Universidad Nacional de Trujillo",
      code: "R.R. N.° 1173-2022/UNT",
      status: "Base organizacional",
      summary: "Formaliza la estructura orgánica de la UNT y ubica a la DGA con las unidades de Recursos Humanos, Abastecimiento, Tesorería, Contabilidad, Unidad Ejecutora de Inversiones y Servicios Generales.",
      url: "https://transparencia.unitru.edu.pe/ROF%20UNT%20/02%20%20ROF%20UNT%20RR%201173-2022.pdf"
    },
    {
      id: "sagrh",
      scope: ["rh"],
      title: "Sistema Administrativo de Gestión de Recursos Humanos",
      code: "Ley N.° 30057 + normativa SERVIR",
      status: "Vigente / compendio SERVIR",
      summary: "Marco del servicio civil y de los 7 subsistemas y 23 procesos del SAGRH. La maqueta distribuye la información de RR. HH. por las áreas existentes en la UNT, sin reemplazar su estructura interna.",
      url: "https://www.gob.pe/institucion/servir/colecciones/9688-procesos-del-sistema-administrativo-de-gestion-de-recursos-humanos-sagrh"
    },
    {
      id: "sst",
      scope: ["rh"],
      title: "Ley de Seguridad y Salud en el Trabajo",
      code: "Ley N.° 29783",
      status: "Vigente",
      summary: "Marco general para la gestión preventiva de seguridad y salud en el trabajo, capacitación, investigación de incidentes y obligaciones de prevención.",
      url: "https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/462576-29783"
    },
    {
      id: "sna",
      scope: ["abastecimiento"],
      title: "Sistema Nacional de Abastecimiento",
      code: "D. Leg. N.° 1439 + D.S. N.° 217-2019-EF",
      status: "Vigente",
      summary: "Regula la Cadena de Abastecimiento Público: programación multianual, gestión de adquisiciones y administración de bienes.",
      url: "https://www.gob.pe/8362-ministerio-de-economia-y-finanzas-sistema-nacional-de-abastecimiento-sna"
    },
    {
      id: "contrataciones",
      scope: ["abastecimiento"],
      title: "Ley General de Contrataciones Públicas",
      code: "Ley N.° 32069 + D.S. N.° 009-2025-EF",
      status: "Vigente desde 22/04/2025",
      summary: "Marco actual de contratación pública. Incluye modificaciones reglamentarias de 2026 y normativa complementaria del OECE.",
      url: "https://www.gob.pe/institucion/oece/informes-publicaciones/6444155-ley-n-32069-ley-general-de-contrataciones-publicas-y-modificatorias"
    },
    {
      id: "tesoreria",
      scope: ["tesoreria"],
      title: "Sistema Nacional de Tesorería",
      code: "D. Leg. N.° 1441",
      status: "Vigente",
      summary: "Marco para la gestión de fondos públicos, percepción, administración y pago de obligaciones del Sector Público.",
      url: "https://www.gob.pe/institucion/mef/normas-legales/201361-1441"
    },
    {
      id: "contabilidad",
      scope: ["contabilidad"],
      title: "Sistema Nacional de Contabilidad",
      code: "TUO D. Leg. N.° 1438 – D.S. N.° 057-2022-EF",
      status: "Vigente",
      summary: "Regula el registro y evaluación contable de hechos económicos, financieros y patrimoniales del Sector Público y la rendición de cuentas.",
      url: "https://www.mef.gob.pe/es/sistema-nacional-de-contabilidad"
    },
    {
      id: "invierte",
      scope: ["inversiones"],
      title: "Sistema Nacional de Programación Multianual y Gestión de Inversiones",
      code: "D. Leg. N.° 1252 + D.S. N.° 140-2026-EF",
      status: "Reglamento 2026",
      summary: "Marco de Invierte.pe para programación, formulación, evaluación y ejecución de inversiones públicas; la maqueta prioriza el seguimiento de la fase de ejecución de la UEI.",
      url: "https://www.gob.pe/institucion/mef/normas-legales/8402978-140-2026-ef"
    },
    {
      id: "lpag",
      scope: ["dga","rh","abastecimiento","tesoreria","contabilidad","inversiones","servicios"],
      title: "TUO de la Ley del Procedimiento Administrativo General",
      code: "Ley N.° 27444 – D.S. N.° 004-2019-JUS",
      status: "Marco transversal",
      summary: "Base transversal para actuaciones administrativas, plazos, notificaciones, validez de actos y debido procedimiento.",
      url: "https://www.gob.pe/institucion/minjus/normas-legales/279563-004-2019-jus"
    }
  ],
  normativeAlerts: [
    {date:"18/07/2026", level:"alta", module:"inversiones", title:"Nuevo Reglamento del D. Leg. N.° 1252", detail:"D.S. N.° 140-2026-EF. Revisar matrices y controles del módulo UEI."},
    {date:"31/07/2026", level:"media", module:"abastecimiento", title:"Actualización de herramienta interpretativa OECE", detail:"Buscador de interpretación normativa actualizado para Ley N.° 32069 y su Reglamento."},
    {date:"14/01/2026", level:"media", module:"abastecimiento", title:"Modificación reglamentaria de contrataciones", detail:"D.S. N.° 001-2026-EF modifica el Reglamento de la Ley N.° 32069."},
    {date:"22/09/2025", level:"baja", module:"rh", title:"Compendio normativo actualizado del SAGRH", detail:"SERVIR consolida Ley N.° 30057, reglamentos, 7 subsistemas y 23 procesos."}
  ],
  people: [
    {id:"S001",name:"María Fernanda Torres Vega",unit:"rh",area:"Área de Escalafón",role:"Técnico en Escalafón",regime:"D. Leg. 276",entry:"12/03/2017",salary:"S/ 3,420",gdr:92,status:"Activo",lastActivity:"Actualizó 18 legajos administrativos",tasks:[
      ["Actualizar legajos administrativos asignados",84,"En curso","13/09/2026"],
      ["Emitir reportes escalafonarios solicitados",100,"Concluido","11/09/2026"],
      ["Depurar registros de licencias y movimientos",58,"En curso","18/09/2026"]]},
    {id:"S002",name:"Luis Alberto Mendoza Ruiz",unit:"rh",area:"Área de Personal Académico",role:"Analista de personal docente",regime:"CAS",entry:"08/08/2021",salary:"S/ 4,300",gdr:88,status:"Activo",lastActivity:"Validó 34 declaraciones de carga académica",tasks:[
      ["Validar declaraciones de carga académica",73,"En curso","15/09/2026"],
      ["Revisar incompatibilidades de carga docente",45,"En curso","17/09/2026"],
      ["Preparar informe de proceso de contratación docente",100,"Concluido","10/09/2026"]]},
    {id:"S003",name:"Carla Milagros Paredes León",unit:"rh",area:"Área de Personal Administrativo",role:"Asistente de RR. HH.",regime:"CAS",entry:"04/01/2024",salary:"S/ 3,800",gdr:94,status:"Activo",lastActivity:"Registró 7 contratos en matriz de control",tasks:[
      ["Revisar expedientes de contratación administrativa",80,"En curso","13/09/2026"],
      ["Actualizar altas y bajas del personal",66,"En curso","14/09/2026"],
      ["Consolidar incidencias para informe mensual",30,"Pendiente","20/09/2026"]]},
    {id:"S004",name:"Jorge Eduardo Salazar Nieto",unit:"rh",area:"Área de Remuneraciones y Pensiones",role:"Especialista en planillas",regime:"D. Leg. 276",entry:"17/05/2011",salary:"S/ 5,160",gdr:90,status:"Activo",lastActivity:"Cuadró planilla CAS septiembre",tasks:[
      ["Procesar planilla CAS septiembre",92,"En curso","12/09/2026"],
      ["Validar retenciones y aportes",77,"En curso","12/09/2026"],
      ["Presentar declaración PLAME",20,"Pendiente","18/09/2026"]]},
    {id:"S005",name:"Rosa Elena Valdivia Castañeda",unit:"rh",area:"Subárea de Pensiones",role:"Técnico administrativo",regime:"D. Leg. 276",entry:"22/10/2014",salary:"S/ 3,590",gdr:89,status:"Activo",lastActivity:"Atendió 6 expedientes de pensionistas",tasks:[
      ["Actualizar padrón de pensionistas",71,"En curso","19/09/2026"],
      ["Revisar expedientes de reconocimiento pensionario",50,"En curso","20/09/2026"],
      ["Preparar reporte de trámites pendientes",100,"Concluido","11/09/2026"]]},
    {id:"S006",name:"Andrea Lucía Zamora Reyes",unit:"rh",area:"Área de Capacitación y Gestión del Talento Humano",role:"Analista de capacitación",regime:"CAS",entry:"10/02/2023",salary:"S/ 4,100",gdr:95,status:"Activo",lastActivity:"Cerró evaluación de reacción de curso SST",tasks:[
      ["Actualizar seguimiento del PDP 2026",81,"En curso","14/09/2026"],
      ["Consolidar evaluación de acciones de capacitación",63,"En curso","16/09/2026"],
      ["Programar asistencia técnica de octubre",25,"Pendiente","23/09/2026"]]},
    {id:"S007",name:"Diego Alonso Cabrera Montalvo",unit:"rh",area:"Área de Seguridad y Salud en el Trabajo",role:"Asistente SST",regime:"CAS",entry:"01/06/2022",salary:"S/ 4,250",gdr:93,status:"Activo",lastActivity:"Registró inspección de laboratorio",tasks:[
      ["Actualizar matriz IPERC de laboratorios",62,"En curso","22/09/2026"],
      ["Investigar incidente reportado",70,"En curso","13/09/2026"],
      ["Ejecutar capacitación preventiva",100,"Concluido","09/09/2026"]]},
    {id:"S008",name:"Paola Jimena Castillo Rojas",unit:"rh",area:"Subárea de Control Administrativo",role:"Técnico de control",regime:"D. Leg. 276",entry:"15/09/2018",salary:"S/ 3,380",gdr:91,status:"Activo",lastActivity:"Procesó incidencias de 9 dependencias",tasks:[
      ["Procesar incidencias de asistencia 276",88,"En curso","12/09/2026"],
      ["Supervisar permanencia en dependencias asignadas",60,"En curso","13/09/2026"],
      ["Actualizar base SACA",76,"En curso","13/09/2026"]]},
    {id:"S009",name:"Martín Sebastián Rivas Luna",unit:"rh",area:"Subárea de Control Docente",role:"Asistente de control y permanencia",regime:"CAS",entry:"03/03/2025",salary:"S/ 3,550",gdr:87,status:"Activo",lastActivity:"Consolidó marcaciones de 4 facultades",tasks:[
      ["Consolidar asistencia docente semanal",79,"En curso","12/09/2026"],
      ["Emitir reporte de inasistencias",52,"En curso","13/09/2026"],
      ["Verificar horarios observados",35,"Pendiente","16/09/2026"]]},
    {id:"S010",name:"Elena Patricia Chávez Prado",unit:"rh",area:"Gestión del Rendimiento",role:"Asistente de Gestión del Rendimiento",regime:"CAS",entry:"09/01/2026",salary:"S/ 3,600",gdr:96,status:"Activo",lastActivity:"Validó 21 evidencias de seguimiento",tasks:[
      ["Revisar evidencias de seguimiento ciclo 2026",74,"En curso","18/09/2026"],
      ["Actualizar tablero de cobertura GDR",86,"En curso","12/09/2026"],
      ["Preparar asistencia técnica para evaluadores",40,"Pendiente","16/09/2026"]]},

    {id:"S011",name:"Renato Javier Vásquez Flores",unit:"abastecimiento",area:"Programación y contrataciones",role:"Especialista en logística",regime:"D. Leg. 276",entry:"11/11/2015",salary:"S/ 5,020",gdr:91,status:"Activo",lastActivity:"Actualizó 11 ítems del CMN",tasks:[
      ["Actualizar modificaciones del CMN",81,"En curso","13/09/2026"],
      ["Revisar requerimientos priorizados",68,"En curso","14/09/2026"],
      ["Emitir órdenes de servicio",55,"En curso","12/09/2026"]]},
    {id:"S012",name:"Ana Paula Medina Salas",unit:"abastecimiento",area:"Programación y contrataciones",role:"Asistente en logística",regime:"CAS",entry:"05/07/2022",salary:"S/ 4,000",gdr:94,status:"Activo",lastActivity:"Coordinó certificación de 6 requerimientos",tasks:[
      ["Coordinar certificaciones y PCA",90,"En curso","12/09/2026"],
      ["Registrar rebajas y ampliaciones",62,"En curso","15/09/2026"],
      ["Controlar expedientes para devengado",35,"Pendiente","18/09/2026"]]},
    {id:"S013",name:"Óscar Daniel Herrera Ponce",unit:"abastecimiento",area:"Área de Almacén General",role:"Técnico de almacén",regime:"D. Leg. 276",entry:"16/04/2016",salary:"S/ 3,430",gdr:89,status:"Activo",lastActivity:"Despachó 19 PECOSAS",tasks:[
      ["Registrar ingresos y salidas de bienes",87,"En curso","12/09/2026"],
      ["Conciliar kardex con inventario físico",60,"En curso","16/09/2026"],
      ["Preparar despacho de requerimientos",100,"Concluido","11/09/2026"]]},
    {id:"S014",name:"Mónica Isabel Torres Linares",unit:"abastecimiento",area:"Área de Control Patrimonial",role:"Especialista patrimonial",regime:"D. Leg. 276",entry:"27/08/2013",salary:"S/ 4,880",gdr:92,status:"Activo",lastActivity:"Regularizó ubicación de 27 bienes",tasks:[
      ["Actualizar ubicación de bienes muebles",78,"En curso","19/09/2026"],
      ["Preparar expediente de baja patrimonial",50,"En curso","18/09/2026"],
      ["Conciliar margesí con contabilidad",42,"Pendiente","25/09/2026"]]},

    {id:"S015",name:"Carlos Iván Vega Bustamante",unit:"tesoreria",area:"Área de Gestión de Ingresos",role:"Analista de ingresos",regime:"D. Leg. 276",entry:"18/06/2012",salary:"S/ 4,760",gdr:90,status:"Activo",lastActivity:"Conciliación diaria de ingresos cerrada",tasks:[
      ["Conciliar ingresos con SIAF",100,"Concluido","11/09/2026"],
      ["Revisar solicitudes de devolución",64,"En curso","14/09/2026"],
      ["Actualizar proyección mensual de ingresos",45,"En curso","16/09/2026"]]},
    {id:"S016",name:"Gabriela Sofía Núñez Correa",unit:"tesoreria",area:"Área de Gestión de Egresos",role:"Técnico de egresos",regime:"CAS",entry:"02/02/2024",salary:"S/ 3,950",gdr:93,status:"Activo",lastActivity:"Validó 23 expedientes de pago",tasks:[
      ["Revisar expedientes SIAF previos al pago",83,"En curso","12/09/2026"],
      ["Calcular detracciones y retenciones",75,"En curso","12/09/2026"],
      ["Controlar rendiciones de viáticos",58,"En curso","17/09/2026"]]},
    {id:"S017",name:"Víctor Manuel Alcántara Silva",unit:"tesoreria",area:"Área de Gestión de Egresos",role:"Responsable de giros",regime:"D. Leg. 276",entry:"19/01/2010",salary:"S/ 4,990",gdr:88,status:"Activo",lastActivity:"Registró lote de giros del día",tasks:[
      ["Registrar giros según cronograma",91,"En curso","12/09/2026"],
      ["Monitorear cartas fianza",70,"En curso","15/09/2026"],
      ["Atender requerimientos de auditoría",30,"Pendiente","20/09/2026"]]},

    {id:"S018",name:"Lucía Beatriz Villanueva Castro",unit:"contabilidad",area:"Área de Control y Devengado",role:"Analista de devengado",regime:"CAS",entry:"21/03/2022",salary:"S/ 4,200",gdr:94,status:"Activo",lastActivity:"Devengó 17 expedientes sin observación",tasks:[
      ["Revisar expedientes para devengado",85,"En curso","12/09/2026"],
      ["Levantar observaciones de gasto",56,"En curso","14/09/2026"],
      ["Actualizar control de expedientes",93,"En curso","12/09/2026"]]},
    {id:"S019",name:"Héctor Raúl Espinoza Gálvez",unit:"contabilidad",area:"Área de Integración Contable",role:"Contador",regime:"D. Leg. 276",entry:"14/04/2009",salary:"S/ 5,420",gdr:92,status:"Activo",lastActivity:"Cerró conciliación de 3 cuentas",tasks:[
      ["Conciliar cuentas contables asignadas",76,"En curso","14/09/2026"],
      ["Preparar notas contables de regularización",62,"En curso","15/09/2026"],
      ["Integrar reporte para estados financieros",44,"Pendiente","17/09/2026"]]},
    {id:"S020",name:"Sonia Maribel Cárdenas Ríos",unit:"contabilidad",area:"Unidad de Contabilidad",role:"Técnico contable",regime:"D. Leg. 276",entry:"30/07/2014",salary:"S/ 3,980",gdr:89,status:"Activo",lastActivity:"Emitió informe de centro de costo",tasks:[
      ["Elaborar informes de ingresos y gastos",70,"En curso","16/09/2026"],
      ["Conciliar ingresos RDR",88,"En curso","12/09/2026"],
      ["Actualizar hoja de costos",40,"Pendiente","21/09/2026"]]},

    {id:"S021",name:"Patricia del Rosario León Ramos",unit:"inversiones",area:"Cartera de inversiones",role:"Especialista de inversiones",regime:"CAS",entry:"13/09/2020",salary:"S/ 6,100",gdr:91,status:"Activo",lastActivity:"Actualizó avance de IOARR Biblioteca",tasks:[
      ["Actualizar avance físico y financiero",72,"En curso","13/09/2026"],
      ["Revisar modificación de expediente técnico",54,"En curso","18/09/2026"],
      ["Preparar informe de riesgo de plazo",90,"En curso","12/09/2026"]]},
    {id:"S022",name:"Miguel Ángel Peña Aguilar",unit:"inversiones",area:"Asuntos legales UEI",role:"Abogado",regime:"CAS",entry:"05/05/2023",salary:"S/ 5,300",gdr:93,status:"Activo",lastActivity:"Emitió opinión legal de modificación",tasks:[
      ["Emitir informe legal de ejecución",100,"Concluido","11/09/2026"],
      ["Preparar proyecto de resolución",60,"En curso","15/09/2026"],
      ["Atender observación OCI",45,"En curso","18/09/2026"]]},

    {id:"S023",name:"Roberto Enrique Quiroz Vega",unit:"servicios",area:"Área de Talleres",role:"Técnico de mantenimiento",regime:"D. Leg. 276",entry:"09/09/2011",salary:"S/ 3,520",gdr:88,status:"Activo",lastActivity:"Cerró OT de reparación eléctrica",tasks:[
      ["Atender órdenes de mantenimiento eléctrico",78,"En curso","13/09/2026"],
      ["Registrar materiales y herramientas",96,"En curso","12/09/2026"],
      ["Reportar incidencias técnicas",100,"Concluido","11/09/2026"]]},
    {id:"S024",name:"Natalia Alejandra Cruz Campos",unit:"servicios",area:"Área de Transportes",role:"Asistente administrativa",regime:"CAS",entry:"10/01/2025",salary:"S/ 3,450",gdr:95,status:"Activo",lastActivity:"Actualizó vencimientos de SOAT y revisiones",tasks:[
      ["Actualizar documentación vehicular",90,"En curso","12/09/2026"],
      ["Monitorear rutas y comisiones",68,"En curso","13/09/2026"],
      ["Actualizar control de combustible",55,"En curso","16/09/2026"]]},
    {id:"S025",name:"Edgar Antonio Morales Zegarra",unit:"servicios",area:"Área de Transportes",role:"Chofer",regime:"D. Leg. 276",entry:"06/03/2013",salary:"S/ 3,260",gdr:90,status:"Activo",lastActivity:"Finalizó comisión Trujillo–Huamachuco",tasks:[
      ["Ejecutar comisión de servicio programada",100,"Concluido","11/09/2026"],
      ["Registrar recorrido y consumo",100,"Concluido","11/09/2026"],
      ["Verificar operatividad del vehículo",80,"En curso","12/09/2026"]]},
    {id:"S026",name:"Teresa del Pilar Gómez Ríos",unit:"servicios",area:"Área de Limpieza",role:"Personal de limpieza",regime:"D. Leg. 276",entry:"22/02/2016",salary:"S/ 2,780",gdr:93,status:"Activo",lastActivity:"Cierre de ruta Facultad de Ciencias Económicas",tasks:[
      ["Cumplir ruta de limpieza de ambientes",86,"En curso","12/09/2026"],
      ["Reportar incidencias de mantenimiento",100,"Concluido","11/09/2026"],
      ["Controlar insumos asignados",75,"En curso","13/09/2026"]]},
    {id:"S027",name:"Daniel Augusto Valera Flores",unit:"servicios",area:"Áreas Verdes",role:"Técnico agropecuario",regime:"D. Leg. 276",entry:"04/10/2010",salary:"S/ 3,240",gdr:89,status:"Activo",lastActivity:"Atendió sector Jardín Botánico",tasks:[
      ["Ejecutar mantenimiento de áreas verdes",82,"En curso","13/09/2026"],
      ["Verificar herramientas e insumos",90,"En curso","12/09/2026"],
      ["Reportar necesidad de poda especializada",40,"Pendiente","17/09/2026"]]},

    {id:"S028",name:"Claudia Mercedes Arroyo Silva",unit:"dga",area:"Despacho DGA",role:"Asistente administrativa",regime:"CAS",entry:"15/01/2026",salary:"S/ 3,900",gdr:95,status:"Activo",lastActivity:"Derivó expediente con prioridad alta",tasks:[
      ["Gestionar documentación del despacho DGA",88,"En curso","12/09/2026"],
      ["Preparar informe situacional de inventario",60,"En curso","16/09/2026"],
      ["Actualizar seguimiento de encargos",74,"En curso","13/09/2026"]]},
    {id:"S029",name:"Fernando José Roldán Tapia",unit:"dga",area:"Asesoría técnica",role:"Especialista de control interno",regime:"D. Leg. 276",entry:"19/08/2015",salary:"S/ 5,600",gdr:92,status:"Activo",lastActivity:"Validó sustento de expediente directivo",tasks:[
      ["Revisar expedientes administrativos",76,"En curso","14/09/2026"],
      ["Emitir informe de asesoría técnica",63,"En curso","15/09/2026"],
      ["Revisar matriz de riesgos operativos",40,"Pendiente","20/09/2026"]]}
  ],
  attendance: {
    today: {onTime: 286, late: 23, absent: 9, leave: 9},
    monthlyLate: [18,21,16,24,20,17,29,23,19,26,23],
    latePeople: [
      ["S023","Roberto Enrique Quiroz Vega","08:11","Área de Talleres"],
      ["S017","Víctor Manuel Alcántara Silva","08:08","Gestión de Egresos"],
      ["S009","Martín Sebastián Rivas Luna","08:14","Control Docente"],
      ["S013","Óscar Daniel Herrera Ponce","08:09","Almacén General"]
    ]
  },
  finance: {
    months:["Abr","May","Jun","Jul","Ago","Set"],
    income:[1.72,1.88,1.94,2.10,2.18,2.36],
    expense:[1.43,1.65,1.71,1.92,2.06,1.84],
    cashBySource:[
      ["Recursos directamente recaudados",3.18],
      ["Recursos ordinarios",2.31],
      ["Donaciones y transferencias",0.56],
      ["Otros",0.37]
    ]
  },
  procurement: [
    ["OS-2026-0841","Servicio de mantenimiento de equipos de laboratorio","S/ 48,600","En ejecución","18/09/2026",72],
    ["OS-2026-0854","Mantenimiento preventivo de buses institucionales","S/ 31,200","Notificada","25/09/2026",35],
    ["OC-2026-0412","Materiales eléctricos para talleres","S/ 22,480","Atención parcial","16/09/2026",66],
    ["OS-2026-0862","Servicio de calibración de instrumentos","S/ 18,900","Por notificar","20/09/2026",18],
    ["OC-2026-0421","Equipos de protección personal SST","S/ 36,750","En ejecución","22/09/2026",54]
  ],
  assets: [
    ["Computadoras",6240,5940,210,90],
    ["Mobiliario",10820,9870,710,240],
    ["Equipos de laboratorio",4870,4280,410,180],
    ["Vehículos",43,31,9,3],
    ["Otros bienes",6487,5940,390,157]
  ],
  pensions: {total:312,activeCases:26,resolvedMonth:41,avgDays:12.4},
  training: [
    ["Gestión del Rendimiento – Seguimiento",128,"11/09/2026","Concluida",4.7],
    ["SST: prevención de riesgos",86,"09/09/2026","Concluida",4.6],
    ["Ley N.° 32069 para áreas usuarias",64,"18/09/2026","Programada",null],
    ["Excel para gestión administrativa",45,"25/09/2026","Programada",null]
  ],
  gdr: {scope:712,evidenceSubmitted:498,validated:421,pendingFeedback:96,coverage:69.9},
  projects: [
    {id:"P01",name:"Cierre contable agosto 2026",module:"contabilidad",owner:"Héctor Raúl Espinoza Gálvez",start:"02/09",end:"15/09",progress:78,status:"En riesgo",blocker:"Faltan conciliaciones de dos cuentas y respuesta de Tesorería.",tasks:[
      ["Conciliación de ingresos",100,"Contabilidad"],["Conciliación de saldos",70,"Contabilidad"],["Validación de Tesorería",45,"Tesorería"],["Integración y reporte",62,"Contabilidad"]]},
    {id:"P02",name:"Planilla institucional septiembre",module:"rh",owner:"Jorge Eduardo Salazar Nieto",start:"05/09",end:"18/09",progress:88,status:"En curso",blocker:"Dos incidencias pendientes de regularización.",tasks:[
      ["Cierre de incidencias",95,"Control Administrativo"],["Cálculo de planilla",92,"Remuneraciones"],["Validación",82,"URH"],["Registro y declaración",70,"Remuneraciones"]]},
    {id:"P03",name:"Contratación mantenimiento laboratorios",module:"abastecimiento",owner:"Renato Javier Vásquez Flores",start:"22/08",end:"24/09",progress:61,status:"En riesgo",blocker:"Área usuaria no ha absuelto una observación técnica del requerimiento.",tasks:[
      ["Requerimiento validado",100,"Área usuaria"],["Disponibilidad",100,"Abastecimiento"],["Actuaciones preparatorias",72,"Abastecimiento"],["Formalización",22,"Abastecimiento"]]},
    {id:"P04",name:"IOARR renovación de equipamiento Biblioteca",module:"inversiones",owner:"Patricia del Rosario León Ramos",start:"01/07",end:"30/11",progress:64,status:"En curso",blocker:"Sin bloqueo crítico; seguimiento a entrega de componente 2.",tasks:[
      ["Expediente técnico",100,"UEI"],["Adquisición componente 1",85,"Abastecimiento"],["Adquisición componente 2",48,"Abastecimiento"],["Cierre físico",20,"UEI"]]},
    {id:"P05",name:"Actualización masiva de legajos",module:"rh",owner:"María Fernanda Torres Vega",start:"15/08",end:"30/10",progress:57,status:"En curso",blocker:"Documentos pendientes de 3 dependencias.",tasks:[
      ["Inventario",100,"Escalafón"],["Digitalización",63,"Escalafón"],["Validación",48,"Escalafón"],["Carga SGA",32,"Escalafón"]]},
    {id:"P06",name:"Mantenimiento preventivo de flota",module:"servicios",owner:"Natalia Alejandra Cruz Campos",start:"01/09",end:"28/09",progress:46,status:"En riesgo",blocker:"Tres vehículos esperan repuesto; OS en atención parcial.",tasks:[
      ["Diagnóstico",100,"Transportes"],["Programación",80,"Transportes"],["Mantenimiento",42,"Proveedor"],["Pruebas y liberación",18,"Transportes"]]}
  ],
  faculties: [
    "Facultad de Ciencias Agropecuarias","Facultad de Ciencias Biológicas","Facultad de Ciencias Económicas",
    "Facultad de Ciencias Físicas y Matemáticas","Facultad de Ciencias Sociales","Facultad de Derecho y Ciencias Políticas",
    "Facultad de Educación y Ciencias de la Comunicación","Facultad de Enfermería","Facultad de Estomatología",
    "Facultad de Farmacia y Bioquímica","Facultad de Ingeniería","Facultad de Ingeniería Química","Facultad de Medicina"
  ],
  teachers: [
    {id:"D001",name:"Alejandro Martín Rojas Peña",faculty:"Facultad de Ciencias Económicas",department:"Departamento Académico de Economía",category:"Asociado TC",lective:12,nonLective:28,courses:["Econometría I","Política Económica"],attendance:96.4,adminRole:"Ninguno",renacyt:"Nivel VII (simulado)",evaluation:4.6},
    {id:"D002",name:"Verónica Isabel Ponce Salazar",faculty:"Facultad de Ciencias Económicas",department:"Departamento Académico de Administración",category:"Principal DE",lective:10,nonLective:30,courses:["Gestión Estratégica","Seminario de Tesis"],attendance:98.1,adminRole:"Coordinadora de programa (demo)",renacyt:"No registrado (simulado)",evaluation:4.8},
    {id:"D003",name:"Raúl Fernando Zegarra Torres",faculty:"Facultad de Ingeniería",department:"Departamento Académico de Ingeniería de Sistemas",category:"Asociado TC",lective:14,nonLective:26,courses:["Base de Datos","Ingeniería de Software"],attendance:93.7,adminRole:"Ninguno",renacyt:"Nivel VI (simulado)",evaluation:4.4},
    {id:"D004",name:"María Elena Uceda Campos",faculty:"Facultad de Medicina",department:"Departamento Académico de Medicina",category:"Principal DE",lective:8,nonLective:32,courses:["Medicina Interna","Seminario Clínico"],attendance:97.2,adminRole:"Jefatura de departamento (demo)",renacyt:"Nivel IV (simulado)",evaluation:4.7},
    {id:"D005",name:"Sergio Iván López Miranda",faculty:"Facultad de Derecho y Ciencias Políticas",department:"Departamento Académico de Ciencias Jurídicas Públicas y Políticas",category:"Asociado TC",lective:12,nonLective:28,courses:["Derecho Administrativo","Contratación Pública"],attendance:95.0,adminRole:"Ninguno",renacyt:"No registrado (simulado)",evaluation:4.5},
    {id:"D006",name:"Patricia Yolanda García Núñez",faculty:"Facultad de Educación y Ciencias de la Comunicación",department:"Departamento Académico de Ciencias de la Educación",category:"Principal DE",lective:10,nonLective:30,courses:["Didáctica Universitaria","Evaluación del Aprendizaje"],attendance:98.8,adminRole:"Directora de unidad (demo)",renacyt:"Nivel VII (simulado)",evaluation:4.9},
    {id:"D007",name:"Enrique Daniel Romero Díaz",faculty:"Facultad de Ingeniería Química",department:"Departamento Académico de Ingeniería Química",category:"Asociado TC",lective:14,nonLective:26,courses:["Operaciones Unitarias","Diseño de Procesos"],attendance:94.5,adminRole:"Ninguno",renacyt:"Nivel V (simulado)",evaluation:4.3},
    {id:"D008",name:"Claudia Andrea Morales Paredes",faculty:"Facultad de Ciencias Biológicas",department:"Departamento Académico de Microbiología y Parasitología",category:"Auxiliar TC",lective:16,nonLective:24,courses:["Microbiología General","Laboratorio II"],attendance:99.0,adminRole:"Ninguno",renacyt:"Nivel VII (simulado)",evaluation:4.8},
    {id:"D009",name:"Julio César Mendoza Ávila",faculty:"Facultad de Ciencias Agropecuarias",department:"Departamento Académico de Agronomía y Zootecnia",category:"Asociado TC",lective:12,nonLective:28,courses:["Producción Animal","Gestión Agropecuaria"],attendance:96.9,adminRole:"Ninguno",renacyt:"Nivel VI (simulado)",evaluation:4.6},
    {id:"D010",name:"Ana Lucía Castro Benites",faculty:"Facultad de Ciencias Físicas y Matemáticas",department:"Departamento Académico de Estadística",category:"Principal DE",lective:10,nonLective:30,courses:["Muestreo","Modelos Estadísticos"],attendance:97.7,adminRole:"Ninguno",renacyt:"Nivel V (simulado)",evaluation:4.7},
    {id:"D011",name:"Luis Enrique Arce Vega",faculty:"Facultad de Ciencias Sociales",department:"Departamento Académico de Ciencias Sociales",category:"Asociado TC",lective:12,nonLective:28,courses:["Sociología Organizacional","Metodología"],attendance:92.8,adminRole:"Ninguno",renacyt:"No registrado (simulado)",evaluation:4.2},
    {id:"D012",name:"Mónica Pilar Silva Rojas",faculty:"Facultad de Enfermería",department:"Departamento Académico de Salud del Adulto",category:"Principal DE",lective:10,nonLective:30,courses:["Enfermería del Adulto","Gestión del Cuidado"],attendance:98.4,adminRole:"Coordinadora (demo)",renacyt:"Nivel VI (simulado)",evaluation:4.8},
    {id:"D013",name:"Ricardo Alonso Carrasco Núñez",faculty:"Facultad de Estomatología",department:"Departamento Académico de Estomatología",category:"Asociado TC",lective:14,nonLective:26,courses:["Clínica Integral","Periodoncia"],attendance:95.8,adminRole:"Ninguno",renacyt:"Nivel VII (simulado)",evaluation:4.5},
    {id:"D014",name:"Teresa Milagros Ruiz Saldaña",faculty:"Facultad de Farmacia y Bioquímica",department:"Departamento Académico de Farmacología",category:"Principal DE",lective:10,nonLective:30,courses:["Farmacología II","Toxicología"],attendance:97.5,adminRole:"Ninguno",renacyt:"Nivel V (simulado)",evaluation:4.7}
  ]
};
