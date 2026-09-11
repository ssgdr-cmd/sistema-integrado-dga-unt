(() => {
  const D = window.DGA_DEMO_DATA;
  const app = document.getElementById('appContent');
  const roleSelect = document.getElementById('roleSelect');
  const modalRoot = document.getElementById('modalRoot');
  const toastEl = document.getElementById('toast');
  const assistantDrawer = document.getElementById('assistantDrawer');
  const assistantBody = document.getElementById('assistantBody');
  const assistantInput = document.getElementById('assistantInput');

  const state = {
    view: 'dashboard',
    module: null,
    role: 'director',
    peopleFilter: '',
    faculty: 'all'
  };

  const access = {
    director: ['dashboard','org','projects','dga','rh','abastecimiento','tesoreria','contabilidad','inversiones','servicios','people','academic','attendance','norms','documents','reports'],
    rh: ['dashboard','rh','people','academic','attendance','projects','norms','documents','reports'],
    abastecimiento: ['dashboard','abastecimiento','projects','norms','documents','reports'],
    tesoreria: ['dashboard','tesoreria','projects','norms','documents','reports'],
    contabilidad: ['dashboard','contabilidad','projects','norms','documents','reports'],
    inversiones: ['dashboard','inversiones','projects','norms','documents','reports'],
    servicios: ['dashboard','servicios','people','projects','norms','documents','reports'],
    servidor: ['people','documents','norms','reports']
  };

  const colors = {
    navy:'#0f2e4e', blue:'#41699f', teal:'#0f9276', red:'#e44345', amber:'#e8a91e', indigo:'#5467a8', cyan:'#0f7487', gray:'#dbe4eb'
  };

  const moduleColor = key => ({dga:colors.navy,rh:colors.teal,abastecimiento:colors.amber,tesoreria:colors.blue,contabilidad:colors.indigo,inversiones:colors.cyan,servicios:colors.red}[key] || colors.navy);

  const esc = (v='') => String(v).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const initials = name => name.split(/\s+/).slice(0,2).map(x => x[0]).join('').toUpperCase();
  const statusClass = s => {
    s = (s || '').toLowerCase();
    if (s.includes('concl') || s.includes('resuelto') || s.includes('operativo')) return 'done';
    if (s.includes('riesgo') || s.includes('crít') || s.includes('venc')) return 'risk';
    if (s.includes('pend') || s.includes('por ')) return 'pending';
    return 'progress';
  };

  function showToast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  function setActiveNav(){
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const hitView = btn.dataset.view && btn.dataset.view === state.view;
      const hitModule = btn.dataset.module && state.view === 'module' && btn.dataset.module === state.module;
      btn.classList.toggle('active', !!(hitView || hitModule));
    });
  }

  function updateNavAccess(){
    const allowed = access[state.role] || access.director;
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const key = btn.dataset.module || btn.dataset.view;
      btn.classList.toggle('hidden', !allowed.includes(key));
    });
  }

  function navigate(view, module=null){
    if (view === 'module' && module) {
      if (!(access[state.role] || []).includes(module)) {
        showToast('Ese módulo no está habilitado para el perfil simulado actual.');
        return;
      }
    } else if (!(access[state.role] || []).includes(view)) {
      if (state.role !== 'director') {
        showToast('Vista restringida para el perfil simulado actual.');
        return;
      }
    }
    state.view = view;
    state.module = module;
    setActiveNav();
    render();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function hero(title, subtitle, actions=''){
    return `<div class="hero"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="hero-actions">${actions}</div></div>`;
  }

  function kpis(items){
    return `<div class="grid kpis">${items.map(([label,value,note]) => `<div class="kpi"><div class="kpi-label">${esc(label)}</div><div class="kpi-value">${esc(value)}</div><div class="kpi-note">${esc(note)}</div></div>`).join('')}</div>`;
  }

  function progress(value){
    const v = Math.max(0,Math.min(100,Number(value)||0));
    return `<div class="progress"><span style="width:${v}%"></span></div>`;
  }

  function barChart(labels, series, opts={}){
    const width=760, height=260, left=42, top=18, bottom=36, right=18;
    const plotW=width-left-right, plotH=height-top-bottom;
    const all = series.flatMap(s => s.values);
    const max = opts.max || Math.max(...all,1) * 1.12;
    const groupW = plotW / labels.length;
    const barW = Math.max(8, Math.min(28, (groupW*0.66)/series.length));
    let svg = `<svg class="svg-chart" viewBox="0 0 ${width} ${height}" role="img">`;
    [0,.25,.5,.75,1].forEach(t => {
      const y=top+plotH-(plotH*t);
      svg += `<line x1="${left}" x2="${width-right}" y1="${y}" y2="${y}" stroke="#e7edf2" stroke-width="1"/>`;
      svg += `<text x="${left-8}" y="${y+4}" text-anchor="end" font-size="9" fill="#8292a1">${opts.money?'S/ ':''}${(max*t).toFixed(opts.decimals??1)}</text>`;
    });
    labels.forEach((lab,i)=>{
      const gx=left+i*groupW+groupW/2;
      series.forEach((s,j)=>{
        const val=s.values[i]||0;
        const h=(val/max)*plotH;
        const x=gx-(series.length*barW)/2+j*barW+2;
        const y=top+plotH-h;
        svg += `<rect x="${x}" y="${y}" width="${barW-4}" height="${h}" rx="5" fill="${s.color}" opacity=".92"><title>${esc(lab)}: ${val}</title></rect>`;
      });
      svg += `<text x="${gx}" y="${height-12}" text-anchor="middle" font-size="9" fill="#728396">${esc(lab)}</text>`;
    });
    svg += `</svg>`;
    return `<div class="chart-wrap">${svg}</div><div class="chart-legend">${series.map(s=>`<span class="legend-item"><i class="legend-swatch" style="background:${s.color}"></i>${esc(s.name)}</span>`).join('')}</div>`;
  }

  function donutChart(items){
    const total = items.reduce((a,b)=>a+b.value,0) || 1;
    const radius=62, cx=90, cy=88, circ=2*Math.PI*radius;
    let offset=0;
    const segs = items.map(i=>{
      const len=circ*(i.value/total);
      const out=`<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${i.color}" stroke-width="22" stroke-dasharray="${len} ${circ-len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"/>`;
      offset += len;
      return out;
    }).join('');
    return `<div style="display:grid;grid-template-columns:180px 1fr;gap:14px;align-items:center">
      <svg viewBox="0 0 180 176" class="svg-chart"><circle cx="90" cy="88" r="62" fill="none" stroke="#edf2f5" stroke-width="22"/>${segs}<text x="90" y="83" text-anchor="middle" font-size="22" font-weight="900" fill="#0f2e4e">${total}</text><text x="90" y="101" text-anchor="middle" font-size="9" fill="#6d7f90">REGISTROS</text></svg>
      <div>${items.map(i=>`<div class="list-row"><div class="list-main"><strong>${esc(i.label)}</strong><span>${i.value} · ${Math.round(i.value/total*100)}%</span></div><i class="legend-swatch" style="width:12px;height:12px;background:${i.color}"></i></div>`).join('')}</div>
    </div>`;
  }

  function horizontalBars(items, max=null){
    max = max || Math.max(...items.map(x=>x.value),1);
    return items.map(x=>`<div class="metric-bar"><label title="${esc(x.label)}">${esc(x.label)}</label><div class="progress"><span style="width:${Math.round(x.value/max*100)}%;background:${x.color||colors.blue}"></span></div><b>${esc(x.display ?? x.value)}</b></div>`).join('');
  }

  function normCards(scope){
    const norms = D.norms.filter(n => n.scope.includes(scope) || n.id === 'rof' || n.id === 'lpag');
    return `<div class="panel norm-panel"><div class="panel-title-row"><div><h3>Marco normativo del módulo</h3><div class="panel-sub">Referencia contextual, no bloque de pantalla principal</div></div></div>
      ${norms.map(n=>`<div class="norm-card"><strong>${esc(n.title)}</strong><small>${esc(n.code)} · ${esc(n.status)}</small><p>${esc(n.summary)}</p><a class="norm-link" href="${esc(n.url)}" target="_blank" rel="noopener">Abrir fuente oficial ↗</a></div>`).join('')}
      <div class="norm-card" style="background:#fff9e9;border-color:#f1dfad"><strong>Alerta normativa asistida</strong><small>Diseño de futuro</small><p>En la versión real, el asistente podría advertir cambios normativos vinculados al módulo, siempre con verificación humana y fuente oficial.</p></div>
    </div>`;
  }

  function dashboardDataForRole(){
    if (state.role === 'director') return null;
    if (D.modules[state.role]) return D.modules[state.role];
    return null;
  }

  function renderDashboard(){
    const scoped = dashboardDataForRole();
    if (state.role === 'servidor') return renderPeople(true);
    if (scoped) return renderScopedDashboard(state.role);

    const workload = [
      {label:'Recursos Humanos',value:86,color:moduleColor('rh')},
      {label:'Abastecimiento',value:74,color:moduleColor('abastecimiento')},
      {label:'Tesorería',value:68,color:moduleColor('tesoreria')},
      {label:'Contabilidad',value:79,color:moduleColor('contabilidad')},
      {label:'Inversiones',value:61,color:moduleColor('inversiones')},
      {label:'Servicios Generales',value:91,color:moduleColor('servicios')}
    ];
    const alerts = D.normativeAlerts.slice(0,3);
    app.innerHTML = hero('Panel ejecutivo de la DGA', 'Una vista de supervisión integral para saber qué está ocurriendo hoy, dónde existen retrasos, qué unidades concentran carga y qué decisiones requieren atención.', `<button class="btn primary" data-open-assistant>Consultar al asistente</button><button class="btn" data-export="executive">Descargar resumen Excel</button>`)
      + kpis([
        ['Servidores DGA demo','327','visión consolidada'],['Tareas activas','486','58 vencen esta semana'],['Proyectos en riesgo','3','de 6 prioritarios'],['Saldo Tesorería','S/ 6.42 M','dato simulado']
      ])
      + `<div class="grid dashboard-row">
          <div class="panel"><div class="panel-title-row"><div><h2>Ingresos y egresos mensuales</h2><div class="panel-sub">Millones de soles · datos ficticios</div></div><button class="btn" data-module-jump="tesoreria">Ir a Tesorería</button></div>
            ${barChart(D.finance.months,[{name:'Ingresos',values:D.finance.income,color:colors.teal},{name:'Egresos',values:D.finance.expense,color:colors.blue}],{money:false,decimals:1})}
          </div>
          <div class="panel"><div class="panel-title-row"><div><h2>Estado de tareas</h2><div class="panel-sub">Universo demo del día</div></div></div>
            ${donutChart([{label:'Concluidas',value:182,color:colors.teal},{label:'En curso',value:231,color:colors.blue},{label:'Pendientes',value:58,color:colors.amber},{label:'Críticas',value:15,color:colors.red}])}
          </div>
        </div>`
      + `<div class="grid two-col">
          <div class="panel"><div class="panel-title-row"><div><h2>Carga operativa por unidad</h2><div class="panel-sub">Índice sintético de demanda de trabajo</div></div><button class="btn" data-view-jump="org">Ver estructura</button></div>${horizontalBars(workload,100)}</div>
          <div class="panel"><div class="panel-title-row"><div><h2>Radar ejecutivo</h2><div class="panel-sub">Alertas que merecen atención del Director</div></div></div>
            <div class="alert-list">
              <div class="alert-item high"><div class="alert-top"><span class="alert-title">Mantenimiento de flota</span><span class="alert-date">46%</span></div><div class="alert-detail">Tres vehículos esperan repuesto. La orden de servicio está en atención parcial.</div></div>
              <div class="alert-item high"><div class="alert-top"><span class="alert-title">Cierre contable agosto</span><span class="alert-date">78%</span></div><div class="alert-detail">Faltan dos conciliaciones y una validación interdependiente con Tesorería.</div></div>
              <div class="alert-item medium"><div class="alert-top"><span class="alert-title">Contratación de mantenimiento</span><span class="alert-date">61%</span></div><div class="alert-detail">El área usuaria aún no absuelve una observación técnica del requerimiento.</div></div>
            </div>
          </div>
        </div>`
      + `<div class="grid two-col" style="margin-top:16px">
          <div class="panel"><div class="panel-title-row"><div><h2>Actividad de hoy</h2><div class="panel-sub">Muestra de acciones terminadas recientemente</div></div><button class="btn" data-view-jump="people">Ver servidores</button></div>
            <div class="list-compact">${D.people.slice(0,8).map(p=>`<div class="list-row"><div class="list-main"><strong>${esc(p.name)}</strong><span>${esc(p.lastActivity)} · ${esc(p.area)}</span></div><button class="btn" data-person="${p.id}">Ver</button></div>`).join('')}</div>
          </div>
          <div class="panel"><div class="panel-title-row"><div><h2>Alertas normativas</h2><div class="panel-sub">Fuentes oficiales enlazadas en el módulo normativo</div></div><button class="btn" data-view-jump="norms">Ver normativa</button></div>
            <div class="alert-list">${alerts.map(a=>`<div class="alert-item ${a.level==='alta'?'high':a.level==='media'?'medium':'low'}"><div class="alert-top"><span class="alert-title">${esc(a.title)}</span><span class="alert-date">${esc(a.date)}</span></div><div class="alert-detail">${esc(a.detail)}</div></div>`).join('')}</div>
          </div>
        </div>`;
  }

  function renderScopedDashboard(moduleKey){
    const m = D.modules[moduleKey];
    const people = D.people.filter(p=>p.unit===moduleKey);
    const activeTasks = people.flatMap(p=>p.tasks.map(t=>({person:p.name,task:t[0],progress:t[1],status:t[2],due:t[3]}))).slice(0,10);
    app.innerHTML = hero(`Panel de ${m.short}`, `Perfil simulado con acceso limitado a ${m.name}. La jefatura visualiza sus indicadores, personal, pendientes y normativa del ámbito.`, `<button class="btn primary" data-module-jump="${moduleKey}">Abrir módulo completo</button><button class="btn" data-open-assistant>Consultar IA</button>`)
      + kpis(m.kpis)
      + `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Pendientes del equipo</h2><div class="panel-sub">Tareas asociadas al ámbito del perfil</div></div></div>
          <div class="table-wrap"><table><thead><tr><th>Servidor</th><th>Tarea</th><th>Avance</th><th>Estado</th><th>Plazo</th></tr></thead><tbody>${activeTasks.map(t=>`<tr><td>${esc(t.person)}</td><td>${esc(t.task)}</td><td>${progress(t.progress)}</td><td><span class="status ${statusClass(t.status)}">${esc(t.status)}</span></td><td>${esc(t.due)}</td></tr>`).join('')}</tbody></table></div>
        </div>${normCards(moduleKey)}</div>`;
  }

  function renderOrg(){
    const order=['rh','abastecimiento','tesoreria','contabilidad','inversiones','servicios'];
    app.innerHTML = hero('Estructura operativa de la DGA', 'La estructura se presenta como un mapa navegable. El ROF queda como sustento normativo consultable, mientras el espacio principal se utiliza para indicadores, trabajo y alertas.', `<button class="btn" data-export="org">Exportar estructura</button>`)
      + `<div class="panel" style="margin-bottom:16px"><div class="panel-title-row"><div><h2>Dirección General de Administración</h2><div class="panel-sub">Órgano de apoyo · supervisión ejecutiva transversal</div></div><button class="btn" data-module-jump="dga">Abrir DGA</button></div>
        <div class="grid kpis" style="margin-bottom:0">${[['Unidades orgánicas','6','según ROF'],['Áreas/subáreas modeladas','20+','según formatos GDR y requerimiento'],['Servidores demo DGA','327','simulado'],['Alertas abiertas','9','simulado']].map(([a,b,c])=>`<div class="kpi"><div class="kpi-label">${a}</div><div class="kpi-value">${b}</div><div class="kpi-note">${c}</div></div>`).join('')}</div>
      </div>
      <div class="unit-grid">${order.map(k=>{const m=D.modules[k]; const people=D.people.filter(p=>p.unit===k).length; return `<article class="unit-card"><div class="unit-accent" style="background:${moduleColor(k)}"></div><h3>${esc(m.name)}</h3><p>${esc(m.description)}</p><div class="unit-stats"><span><strong>${m.subareas.length}</strong> componentes</span><span><strong>${people}</strong> personas demo visibles</span></div><div class="subarea-chips">${m.subareas.slice(0,4).map(s=>`<span class="chip">${esc(s)}</span>`).join('')}${m.subareas.length>4?`<span class="chip">+${m.subareas.length-4}</span>`:''}</div><div style="margin-top:13px"><button class="btn primary" data-module-jump="${k}">Ingresar</button></div></article>`}).join('')}</div>`;
  }

  function renderModule(key){
    const m=D.modules[key];
    if (!m) return renderDashboard();
    const people=D.people.filter(p=>p.unit===key);
    const project=D.projects.filter(p=>p.module===key);
    const tasks=people.flatMap(p=>p.tasks.map(t=>({person:p.name,area:p.area,task:t[0],progress:t[1],status:t[2],due:t[3],id:p.id}))).slice(0,12);
    let special = '';
    if (key==='rh') special=renderRHSpecial();
    if (key==='abastecimiento') special=renderProcurementSpecial();
    if (key==='tesoreria') special=renderTreasurySpecial();
    if (key==='contabilidad') special=renderAccountingSpecial();
    if (key==='inversiones') special=renderInvestmentsSpecial();
    if (key==='servicios') special=renderServicesSpecial();
    if (key==='dga') special=renderDGASpecial();

    app.innerHTML = hero(m.name, m.description, `<button class="btn primary" data-open-assistant>Preguntar al asistente</button><button class="btn" data-export-module="${key}">Descargar Excel</button>`)
      + kpis(m.kpis)
      + `<div class="module-layout"><div>
          <div class="panel" style="margin-bottom:16px"><div class="panel-title-row"><div><h2>Componentes del módulo</h2><div class="panel-sub">Navegación orientada al trabajo real, no a un bloque normativo sobredimensionado</div></div></div><div class="subarea-chips">${m.subareas.map(s=>`<button class="chip" data-subarea="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>
          ${special}
          <div class="panel" style="margin-top:16px"><div class="panel-title-row"><div><h2>Tareas y responsables</h2><div class="panel-sub">Muestra de trabajo ficticio alineado a los formatos GDR entregados</div></div><button class="btn" data-view-jump="people">Buscar persona</button></div>
            ${tasks.length?`<div class="table-wrap"><table><thead><tr><th>Responsable</th><th>Área</th><th>Tarea / producto</th><th>Avance</th><th>Estado</th><th>Plazo</th></tr></thead><tbody>${tasks.map(t=>`<tr><td><button class="btn" data-person="${t.id}">${esc(t.person)}</button></td><td>${esc(t.area)}</td><td>${esc(t.task)}</td><td>${progress(t.progress)}</td><td><span class="status ${statusClass(t.status)}">${esc(t.status)}</span></td><td>${esc(t.due)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">No hay personas demo asignadas a este módulo.</div>`}
          </div>
          <div class="panel" style="margin-top:16px"><div class="panel-title-row"><div><h2>Proyectos / asuntos priorizados</h2><div class="panel-sub">Seguimiento visual de plazos, bloqueos e interdependencias</div></div><button class="btn" data-view-jump="projects">Abrir Gantt</button></div>
            ${project.length?project.map(p=>`<div class="list-row"><div class="list-main"><strong>${esc(p.name)}</strong><span>${esc(p.blocker)}</span></div><div style="min-width:140px">${progress(p.progress)}<div style="font-size:9px;color:#6f8192;margin-top:4px">${p.progress}% · ${esc(p.status)}</div></div></div>`).join(''):`<div class="empty">Sin proyectos de prioridad alta cargados en esta demo.</div>`}
          </div>
        </div>${normCards(key)}</div>`;
  }

  function renderDGASpecial(){
    return `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Bandeja del Director</h2><div class="panel-sub">Decisiones, firmas y encargos que requieren intervención</div></div></div>
      <div class="alert-list"><div class="alert-item high"><div class="alert-top"><span class="alert-title">Informe de cierre contable</span><span class="alert-date">Vence 15/09</span></div><div class="alert-detail">Pendiente de conciliación Tesorería–Contabilidad.</div></div><div class="alert-item medium"><div class="alert-top"><span class="alert-title">Contratación de mantenimiento</span><span class="alert-date">Área usuaria</span></div><div class="alert-detail">Falta absolver observación técnica para continuar.</div></div><div class="alert-item low"><div class="alert-top"><span class="alert-title">Actualización GDR</span><span class="alert-date">69.9%</span></div><div class="alert-detail">Cobertura de evidencias en etapa de seguimiento.</div></div></div>
      </div><div class="panel"><div class="panel-title-row"><div><h2>Interdependencias</h2><div class="panel-sub">Cuellos de botella identificados por la maqueta</div></div></div>${horizontalBars([{label:'Contabilidad ↔ Tesorería',value:76,display:'2 alertas',color:colors.red},{label:'Abastecimiento ↔ Área usuaria',value:68,display:'1 alerta',color:colors.amber},{label:'UEI ↔ Abastecimiento',value:44,display:'normal',color:colors.cyan},{label:'URH ↔ Facultades',value:59,display:'3 pendientes',color:colors.teal}],100)}</div></div>`;
  }

  function renderRHSpecial(){
    const a=D.attendance.today;
    const sagrh = `<div class="panel" style="margin-bottom:16px"><div class="panel-title-row"><div><h2>Mapa SAGRH: 7 subsistemas y 23 procesos</h2><div class="panel-sub">La maqueta conserva las áreas operativas de la UNT y, a la vez, permite leer su trabajo dentro del marco funcional de SERVIR.</div></div><span class="status progress">Marco transversal</span></div><div class="report-grid">${D.sagrhSubsystems.map((ss,i)=>`<article class="report-card"><div class="kpi-label">SUBSISTEMA ${i+1}</div><h3>${esc(ss.name.replace(/^Ss\d+\.\s*/,''))}</h3><p><b>${ss.processes.length} proceso${ss.processes.length===1?'':'s'}:</b> ${esc(ss.processes.join(' · '))}</p><p style="margin-top:8px"><b>Ámbitos UNT relacionados:</b> ${esc(ss.unt)}</p></article>`).join('')}</div></div>`;
    return sagrh + `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Control de asistencia de hoy</h2><div class="panel-sub">Lectura ejecutiva de asistencia y permanencia</div></div><button class="btn" data-view-jump="attendance">Abrir control</button></div>${donutChart([{label:'Puntuales',value:a.onTime,color:colors.teal},{label:'Tardanzas',value:a.late,color:colors.amber},{label:'Inasistencias',value:a.absent,color:colors.red},{label:'Licencias',value:a.leave,color:colors.blue}])}</div>
      <div class="panel"><div class="panel-title-row"><div><h2>Gestión del Rendimiento</h2><div class="panel-sub">Seguimiento del ciclo 2026</div></div></div>${horizontalBars([{label:'Cobertura',value:D.gdr.coverage,display:D.gdr.coverage+'%',color:colors.teal},{label:'Evidencias presentadas',value:D.gdr.evidenceSubmitted/D.gdr.scope*100,display:D.gdr.evidenceSubmitted,color:colors.blue},{label:'Validadas',value:D.gdr.validated/D.gdr.scope*100,display:D.gdr.validated,color:colors.indigo},{label:'Retroalimentación pendiente',value:D.gdr.pendingFeedback/D.gdr.scope*100,display:D.gdr.pendingFeedback,color:colors.amber}],100)}<div style="margin-top:12px"><button class="btn" data-export="gdr">Exportar seguimiento GDR</button></div></div></div>
      <div class="grid two-col" style="margin-top:16px"><div class="panel"><div class="panel-title-row"><div><h2>Planillas y remuneraciones</h2><div class="panel-sub">Estado simulado del procesamiento mensual</div></div></div>${horizontalBars([{label:'CAS',value:92,display:'92%'},{label:'D. Leg. 276',value:96,display:'96%'},{label:'Pensiones',value:88,display:'88%'},{label:'Complementarias',value:71,display:'71%'}],100)}</div><div class="panel"><div class="panel-title-row"><div><h2>Capacitación</h2><div class="panel-sub">PDP y acciones institucionales</div></div></div><div class="list-compact">${D.training.map(t=>`<div class="list-row"><div class="list-main"><strong>${esc(t[0])}</strong><span>${t[1]} participantes · ${esc(t[2])}</span></div><span class="status ${statusClass(t[3])}">${esc(t[3])}</span></div>`).join('')}</div></div></div>`;
  }

  function renderProcurementSpecial(){
    return `<div class="panel"><div class="panel-title-row"><div><h2>Contrataciones y órdenes</h2><div class="panel-sub">Seguimiento de requerimiento → orden → ejecución, sin depender de integración directa en esta maqueta</div></div><button class="btn" data-export="procurement">Excel de órdenes</button></div><div class="table-wrap"><table><thead><tr><th>Orden</th><th>Objeto</th><th>Monto</th><th>Estado</th><th>Fecha objetivo</th><th>Avance</th></tr></thead><tbody>${D.procurement.map(r=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td><span class="status ${statusClass(r[3])}">${esc(r[3])}</span></td><td>${esc(r[4])}</td><td>${progress(r[5])}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="grid two-col" style="margin-top:16px"><div class="panel"><div class="panel-title-row"><div><h2>Patrimonio</h2><div class="panel-sub">Cantidad y condición de bienes · demo</div></div></div>${horizontalBars(D.assets.map(a=>({label:a[0],value:a[1],display:a[1].toLocaleString('es-PE'),color:colors.amber})))}</div><div class="panel"><div class="panel-title-row"><div><h2>Acciones rápidas</h2><div class="panel-sub">Carga de insumos y actualización de seguimiento</div></div></div>${uploadBox('abastecimiento')}<div style="margin-top:12px" class="subarea-chips"><span class="chip">CMN / SIGA</span><span class="chip">Órdenes</span><span class="chip">PECOSAS</span><span class="chip">Patrimonio</span><span class="chip">Expedientes</span></div></div></div>`;
  }

  function renderTreasurySpecial(){
    return `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Posición de caja</h2><div class="panel-sub">Saldos ficticios por fuente</div></div><button class="btn" data-export="cash">Excel de saldos</button></div>${horizontalBars(D.finance.cashBySource.map(x=>({label:x[0],value:x[1],display:'S/ '+x[1].toFixed(2)+' M',color:colors.blue})))}</div><div class="panel"><div class="panel-title-row"><div><h2>Rendiciones y pagos</h2><div class="panel-sub">Alertas operativas</div></div></div><div class="alert-list"><div class="alert-item high"><div class="alert-top"><span class="alert-title">7 rendiciones fuera de plazo</span><span class="alert-date">Prioridad alta</span></div><div class="alert-detail">Requieren comunicación y seguimiento para cierre.</div></div><div class="alert-item medium"><div class="alert-top"><span class="alert-title">4 cartas fianza próximas a vencimiento</span><span class="alert-date">≤ 15 días</span></div><div class="alert-detail">Programar validación y acción preventiva.</div></div><div class="alert-item low"><div class="alert-top"><span class="alert-title">Conciliación de ingresos diaria</span><span class="alert-date">Cerrada</span></div><div class="alert-detail">Sin diferencia relevante en la demo.</div></div></div></div></div>`;
  }

  function renderAccountingSpecial(){
    return `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Cierre contable</h2><div class="panel-sub">Avance por componente</div></div></div>${horizontalBars([{label:'Devengado',value:92,display:'92%'},{label:'Conciliaciones',value:85,display:'85%'},{label:'Integración',value:74,display:'74%'},{label:'Revisión final',value:48,display:'48%'}],100)}</div><div class="panel"><div class="panel-title-row"><div><h2>Observaciones</h2><div class="panel-sub">Expedientes con necesidad de regularización</div></div></div>${donutChart([{label:'Sin observación',value:124,color:colors.teal},{label:'Subsanable',value:12,color:colors.amber},{label:'Crítica',value:6,color:colors.red}])}</div></div>`;
  }

  function renderInvestmentsSpecial(){
    const projects=D.projects.filter(p=>p.module==='inversiones');
    return `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Cartera priorizada</h2><div class="panel-sub">Fase de ejecución · datos simulados</div></div><button class="btn" data-view-jump="projects">Gantt completo</button></div>${projects.map(p=>`<div class="list-row"><div class="list-main"><strong>${esc(p.name)}</strong><span>${esc(p.start)} → ${esc(p.end)} · ${esc(p.blocker)}</span></div><div style="min-width:150px">${progress(p.progress)}<div style="font-size:9px;color:#6f8192;margin-top:4px">${p.progress}%</div></div></div>`).join('')}</div><div class="panel"><div class="panel-title-row"><div><h2>Semáforo de cartera</h2><div class="panel-sub">14 inversiones activas demo</div></div></div>${donutChart([{label:'En curso normal',value:8,color:colors.teal},{label:'Con alerta',value:3,color:colors.amber},{label:'Críticas',value:2,color:colors.red},{label:'Por cerrar',value:1,color:colors.blue}])}</div></div>`;
  }

  function renderServicesSpecial(){
    return `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Órdenes de trabajo</h2><div class="panel-sub">Limpieza, áreas verdes, talleres, transportes y mantenimiento</div></div></div>${horizontalBars([{label:'Limpieza',value:94,display:'94%'},{label:'Áreas verdes',value:89,display:'89%'},{label:'Talleres',value:86,display:'86%'},{label:'Transportes',value:83,display:'83%'},{label:'Mantenimiento',value:91,display:'91%'}],100)}</div><div class="panel"><div class="panel-title-row"><div><h2>Flota institucional</h2><div class="panel-sub">Estado demo de 21 vehículos</div></div></div>${donutChart([{label:'Operativos',value:18,color:colors.teal},{label:'Mantenimiento',value:2,color:colors.amber},{label:'Inoperativo',value:1,color:colors.red}])}</div></div>`;
  }

  function uploadBox(module){
    return `<div class="dropzone"><strong>Cargar insumo al módulo</strong><p>Simula la recepción de Excel, PDF o reporte exportado de un aplicativo oficial.</p><input type="file" data-upload-module="${module}" accept=".xlsx,.xls,.csv,.pdf,.doc,.docx" /></div>`;
  }

  function renderPeople(myWork=false){
    let people=D.people;
    if (state.role !== 'director' && state.role !== 'servidor' && D.modules[state.role]) people=people.filter(p=>p.unit===state.role);
    if (state.role === 'servidor') people=people.filter(p=>p.id==='S010');
    const title=state.role==='servidor'||myWork?'Mi trabajo y mis pendientes':'Servidores, funciones y tareas';
    const subtitle=state.role==='servidor'?'Perfil personal simulado: tareas del día, productos, avance y documentos rápidos.':'El Director puede bajar desde el nivel de unidad hasta la persona, revisar qué tiene asignado, qué hizo recientemente, qué está atrasado y su referencia de GDR.';
    app.innerHTML = hero(title, subtitle, `<button class="btn" data-export="people">Exportar vista</button><button class="btn primary" data-open-assistant>Preguntar por una persona</button>`)
      + `<div class="panel"><div class="filters"><input id="peopleSearch" class="filter-input" placeholder="Buscar por nombre, área, puesto o régimen..." value="${esc(state.peopleFilter)}"><select id="peopleUnit" class="filter-select"><option value="all">Todas las unidades</option>${Object.entries(D.modules).filter(([k])=>k!=='dga').map(([k,m])=>`<option value="${k}">${esc(m.short)}</option>`).join('')}</select></div><div id="peopleCards" class="people-grid">${peopleCards(people)}</div></div>`;
  }

  function peopleCards(people){
    return people.map(p=>`<article class="person-card" data-person-card="${p.id}" data-search="${esc((p.name+' '+p.area+' '+p.role+' '+p.regime).toLowerCase())}" data-unit="${p.unit}"><div class="person-head"><div class="avatar">${initials(p.name)}</div><div><strong>${esc(p.name)}</strong><span>${esc(p.role)}</span></div></div><div class="person-meta"><div><b>${esc(p.area)}</b><br>Ubicación</div><div><b>${p.gdr}/100</b><br>GDR previo demo</div><div><b>${esc(p.regime)}</b><br>Régimen</div><div><b>${p.tasks.filter(t=>t[2]!=='Concluido').length}</b><br>Pendientes</div></div><div class="list-main"><span>Última actividad: ${esc(p.lastActivity)}</span></div><div style="display:flex;gap:7px;margin-top:12px"><button class="btn primary" data-person="${p.id}">Abrir ficha</button><button class="btn" data-export-person="${p.id}">Excel</button></div></article>`).join('');
  }

  function renderAcademic(){
    const faculties=['all',...D.faculties];
    app.innerHTML = hero('Personal académico y carga docente', 'Vista demostrativa integrada al módulo de Personal Académico. Permite revisar carga lectiva/no lectiva, cursos, asistencia, función administrativa temporal y referencia de investigación, siempre con datos ficticios en esta maqueta.', `<button class="btn" data-export="teachers">Exportar docentes demo</button><button class="btn primary" data-open-assistant>Consultar docente</button>`)
      + `<div class="panel"><div class="filters"><select id="facultySelect" class="filter-select">${faculties.map(f=>`<option value="${esc(f)}" ${state.faculty===f?'selected':''}>${f==='all'?'Todas las facultades':esc(f)}</option>`).join('')}</select><input id="teacherSearch" class="filter-input" placeholder="Buscar docente, departamento, curso..."></div><div id="teacherCards" class="teacher-grid">${teacherCards(D.teachers)}</div></div>`;
  }

  function teacherCards(teachers){
    return teachers.map(t=>`<article class="teacher-card" data-faculty="${esc(t.faculty)}" data-teacher-search="${esc((t.name+' '+t.faculty+' '+t.department+' '+t.courses.join(' ')).toLowerCase())}"><div class="person-head"><div class="avatar">${initials(t.name)}</div><div><h3>${esc(t.name)}</h3><span>${esc(t.faculty)}</span></div></div><p>${esc(t.department)} · ${esc(t.category)}<br>Cursos: ${esc(t.courses.join(', '))}<br>Función administrativa: ${esc(t.adminRole)} · Investigación: ${esc(t.renacyt)}</p><div class="teacher-metrics"><div class="mini-stat"><b>${t.lective}h</b><span>Carga lectiva</span></div><div class="mini-stat"><b>${t.nonLective}h</b><span>No lectiva</span></div><div class="mini-stat"><b>${t.attendance}%</b><span>Asistencia</span></div><div class="mini-stat"><b>${t.evaluation}</b><span>Eval. docente</span></div></div><div style="margin-top:11px"><button class="btn" data-teacher="${t.id}">Ver detalle</button></div></article>`).join('');
  }

  function renderAttendance(){
    const a=D.attendance.today;
    app.innerHTML = hero('Asistencia y permanencia', 'Tablero para control administrativo y docente: puntualidad, tardanzas, inasistencias y tendencias. La versión real podría alimentarse de los mecanismos institucionales de control autorizados.', `<button class="btn" data-export="attendance">Descargar Excel</button>`)
      + kpis([['Puntuales hoy',String(a.onTime),'87.5%'],['Tardanzas',String(a.late),'7.0%'],['Inasistencias',String(a.absent),'2.8%'],['Licencias / permisos',String(a.leave),'2.8%']])
      + `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Tardanzas por corte reciente</h2><div class="panel-sub">Cantidad de incidencias por día hábil · demo</div></div></div>${barChart(D.attendance.monthlyLate.map((_,i)=>String(i+1)),[{name:'Tardanzas',values:D.attendance.monthlyLate,color:colors.amber}],{decimals:0,max:35})}</div><div class="panel"><div class="panel-title-row"><div><h2>Incidencias de hoy</h2><div class="panel-sub">Muestra de registros ficticios</div></div></div><div class="table-wrap"><table><thead><tr><th>Servidor</th><th>Hora</th><th>Área</th></tr></thead><tbody>${D.attendance.latePeople.map(r=>`<tr><td>${esc(r[1])}</td><td><span class="status pending">${esc(r[2])}</span></td><td>${esc(r[3])}</td></tr>`).join('')}</tbody></table></div></div></div>`;
  }

  function renderProjects(){
    app.innerHTML = hero('Proyectos, asuntos y cronogramas', 'Gantt ejecutivo para seguir asuntos con fecha objetivo, dependencias, responsables y cuellos de botella. Aquí no se desarrolla el proyecto de gestión por procesos; se muestran únicamente asuntos operativos simulados.', `<button class="btn" data-export="projects">Exportar cartera</button><button class="btn primary" data-open-assistant>Preguntar por retrasos</button>`)
      + `<div class="grid kpis">${[['Proyectos priorizados','6','demo'],['En riesgo','3','requieren gestión'],['Promedio avance','65.7%','cartera priorizada'],['Dependencias abiertas','7','entre unidades']].map(x=>`<div class="kpi"><div class="kpi-label">${x[0]}</div><div class="kpi-value">${x[1]}</div><div class="kpi-note">${x[2]}</div></div>`).join('')}</div>`
      + `<div class="panel"><div class="panel-title-row"><div><h2>Gantt resumido</h2><div class="panel-sub">Ago · Set · Oct · Nov · Dic · Ene</div></div></div><div class="gantt"><div class="gantt-row gantt-head"><div class="gantt-cell">Proyecto</div><div class="gantt-cell">Estado</div><div class="gantt-cell">Cronograma</div></div>${D.projects.map((p,i)=>{const start=[1,1.8,.2,0,1.1,.9][i]; const width=[1.3,1.6,2.1,4.2,2.8,1.7][i]; return `<div class="gantt-row"><div class="gantt-cell"><b style="font-size:11px;color:#0f2e4e">${esc(p.name)}</b><div style="font-size:9px;color:#6f8192;margin-top:4px">${esc(p.owner)} · ${p.progress}%</div></div><div class="gantt-cell"><span class="status ${statusClass(p.status)}">${esc(p.status)}</span></div><div class="gantt-timeline"><button class="gantt-bar ${p.status==='En riesgo'?'risk':''}" data-project="${p.id}" style="grid-column:${Math.max(1,Math.round(start)+1)} / span ${Math.max(1,Math.round(width))};width:${Math.min(98,45+width*12)}%"><span>${p.progress}%</span></button></div></div>`}).join('')}</div></div>
      <div class="grid two-col" style="margin-top:16px"><div class="panel"><div class="panel-title-row"><div><h2>Cuellos de botella</h2><div class="panel-sub">Explicación sintética para la Dirección</div></div></div><div class="alert-list">${D.projects.filter(p=>p.status==='En riesgo').map(p=>`<div class="alert-item high"><div class="alert-top"><span class="alert-title">${esc(p.name)}</span><span class="alert-date">${p.progress}%</span></div><div class="alert-detail">${esc(p.blocker)}</div></div>`).join('')}</div></div><div class="panel"><div class="panel-title-row"><div><h2>Lectura del asistente</h2><div class="panel-sub">Ejemplo de recomendación ejecutiva</div></div></div><p style="font-size:11px;color:#506579;line-height:1.7;margin:0">Prioridad de intervención: 1) resolver la dependencia Tesorería–Contabilidad para el cierre; 2) requerir al área usuaria absolución de observación técnica en la contratación de mantenimiento; 3) acelerar disponibilidad de repuestos para la flota. En la versión real, cada recomendación debe mostrar la evidencia y el responsable de origen.</p></div></div>`;
  }

  function renderNorms(){
    app.innerHTML = hero('Normativa vigente por ámbito', 'Repositorio contextual para que cada unidad vea solo la normativa que le compete. La maqueta incluye enlaces a fuentes oficiales y alertas; en una solución real, la actualización debe validarse jurídicamente antes de afectar reglas de negocio.', `<button class="btn primary" data-open-assistant>Consultar una norma</button>`)
      + `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Repositorio normativo</h2><div class="panel-sub">Fuentes oficiales priorizadas</div></div></div><div class="list-compact">${D.norms.map(n=>`<div class="list-row"><div class="list-main"><strong>${esc(n.title)}</strong><span>${esc(n.code)} · ${esc(n.status)}</span></div><a class="btn" href="${esc(n.url)}" target="_blank" rel="noopener">Abrir ↗</a></div>`).join('')}</div></div><div class="panel"><div class="panel-title-row"><div><h2>Alertas de actualización</h2><div class="panel-sub">Ejemplos de vigilancia normativa</div></div></div><div class="alert-list">${D.normativeAlerts.map(a=>`<div class="alert-item ${a.level==='alta'?'high':a.level==='media'?'medium':'low'}"><div class="alert-top"><span class="alert-title">${esc(a.title)}</span><span class="alert-date">${esc(a.date)}</span></div><div class="alert-detail">${esc(a.detail)}</div></div>`).join('')}</div></div></div>`;
  }

  function renderDocuments(){
    const unitOptions=Object.entries(D.modules).map(([k,m])=>`<option value="${k}">${esc(m.name)}</option>`).join('');
    app.innerHTML = hero('Documentos y formatos rápidos', 'Espacio de trabajo para generar borradores simples a partir de la información ya registrada. En la demo se producen archivos .doc compatibles con Word y formatos de seguimiento sin necesidad de salir del sistema.', '')
      + `<div class="grid two-col"><div class="panel"><div class="panel-title-row"><div><h2>Generador de documento</h2><div class="panel-sub">Borrador demostrativo editable antes de descargar</div></div></div><div class="doc-form"><div class="field"><label>Tipo</label><select id="docType"><option>Informe breve</option><option>Proveído</option><option>Memorando</option><option>Oficio interno</option><option>Formato de seguimiento GDR</option></select></div><div class="field"><label>Unidad</label><select id="docUnit">${unitOptions}</select></div><div class="field"><label>Responsable</label><input id="docOwner" value="Responsable ficticio"></div><div class="field"><label>Asunto</label><input id="docSubject" value="Seguimiento de actividad administrativa"></div><div class="field full"><label>Contenido / indicación</label><textarea id="docBody">Se informa el estado de avance de la actividad asignada, los productos desarrollados, los pendientes identificados y las acciones previstas para su atención.</textarea></div><div class="field full"><button class="btn primary" id="generateDoc">Generar y descargar Word</button></div></div></div><div class="panel"><div class="panel-title-row"><div><h2>Formatos de trabajo</h2><div class="panel-sub">Accesos rápidos simulados</div></div></div><div class="report-grid" style="grid-template-columns:1fr"><div class="report-card"><h3>Presentación de evidencias GDR</h3><p>Formato simplificado para registrar indicador, avance, observaciones y evidencias.</p><button class="btn" data-doc-template="gdr">Descargar Word</button></div><div class="report-card"><h3>Reporte de pendientes del servidor</h3><p>Resumen de tareas, avance, plazo y observaciones a partir de la ficha personal.</p><button class="btn" data-doc-template="tasks">Descargar Word</button></div><div class="report-card"><h3>Proveído rápido</h3><p>Borrador breve con asunto, destino, indicación y fecha.</p><button class="btn" data-doc-template="proveido">Descargar Word</button></div></div></div></div>`;
  }

  function renderReports(){
    app.innerHTML = hero('Reportes y exportación', 'Centro de descarga para extraer información priorizada. La maqueta genera archivos .xls compatibles con Excel directamente en el navegador, sin servidor.', '')
      + `<div class="report-grid"><div class="report-card"><h3>Resumen ejecutivo DGA</h3><p>Indicadores, alertas y proyectos priorizados para la Dirección General.</p><button class="btn primary" data-export="executive">Descargar Excel</button></div><div class="report-card"><h3>Servidores y tareas</h3><p>Persona, unidad, área, régimen, GDR y pendientes.</p><button class="btn" data-export="people">Descargar Excel</button></div><div class="report-card"><h3>Asistencia</h3><p>Puntualidad, tardanzas, inasistencias y detalle demo de incidencias.</p><button class="btn" data-export="attendance">Descargar Excel</button></div><div class="report-card"><h3>Contrataciones</h3><p>Órdenes de compra/servicio, montos, estado y fecha objetivo.</p><button class="btn" data-export="procurement">Descargar Excel</button></div><div class="report-card"><h3>Cartera de proyectos</h3><p>Proyecto, responsable, avance, estado, fechas y bloqueo.</p><button class="btn" data-export="projects">Descargar Excel</button></div><div class="report-card"><h3>Docentes demo</h3><p>Facultad, departamento, carga lectiva/no lectiva, asistencia y evaluación.</p><button class="btn" data-export="teachers">Descargar Excel</button></div></div>
      <div class="panel" style="margin-top:16px"><div class="panel-title-row"><div><h2>Importación demostrativa</h2><div class="panel-sub">La solución real podría consumir APIs autorizadas o cargar reportes exportados de sistemas oficiales cuando no exista integración directa.</div></div></div>${uploadBox('general')}</div>`;
  }

  function render(){
    updateNavAccess();
    setActiveNav();
    switch(state.view){
      case 'dashboard': renderDashboard(); break;
      case 'org': renderOrg(); break;
      case 'module': renderModule(state.module); break;
      case 'people': renderPeople(); break;
      case 'academic': renderAcademic(); break;
      case 'attendance': renderAttendance(); break;
      case 'projects': renderProjects(); break;
      case 'norms': renderNorms(); break;
      case 'documents': renderDocuments(); break;
      case 'reports': renderReports(); break;
      default: renderDashboard();
    }
  }

  function openPerson(id){
    const p=D.people.find(x=>x.id===id); if(!p) return;
    modalRoot.innerHTML = `<div class="modal-backdrop" data-close-modal><div class="modal" onclick="event.stopPropagation()"><button class="icon-btn modal-close" data-close-modal>×</button><div class="profile-grid"><aside class="profile-aside"><div class="avatar" style="width:56px;height:56px;font-size:16px">${initials(p.name)}</div><h2>${esc(p.name)}</h2><p>${esc(p.role)}<br>${esc(p.area)}<br>${esc(D.modules[p.unit]?.name||p.unit)}</p><div class="profile-kv"><div><b>${esc(p.regime)}</b><span>Régimen</span></div><div><b>${esc(p.entry)}</b><span>Ingreso</span></div><div><b>${esc(p.salary)}</b><span>Remuneración demo</span></div><div><b>${p.gdr}/100</b><span>GDR demo</span></div></div><div style="margin-top:12px"><button class="btn" data-export-person="${p.id}">Descargar Excel</button></div></aside><section><div class="panel-title-row"><div><h2>Tareas y productos</h2><div class="panel-sub">Última actividad: ${esc(p.lastActivity)}</div></div></div><div class="table-wrap"><table><thead><tr><th>Tarea / producto</th><th>Avance</th><th>Estado</th><th>Plazo</th></tr></thead><tbody>${p.tasks.map(t=>`<tr><td>${esc(t[0])}</td><td>${progress(t[1])}<div style="font-size:9px;margin-top:4px">${t[1]}%</div></td><td><span class="status ${statusClass(t[2])}">${esc(t[2])}</span></td><td>${esc(t[3])}</td></tr>`).join('')}</tbody></table></div><div class="panel" style="margin-top:14px;box-shadow:none;background:#f8fafc"><h3>Lectura ejecutiva</h3><p style="font-size:11px;line-height:1.65;color:#586d80">El servidor mantiene ${p.tasks.filter(t=>t[2]!=='Concluido').length} tareas activas. La prioridad recomendada es atender la actividad con menor avance y plazo más próximo. Esta lectura es simulada; en la versión real se calcularía con reglas configurables y evidencias trazables.</p></div></section></div></div></div>`;
  }

  function openTeacher(id){
    const t=D.teachers.find(x=>x.id===id); if(!t) return;
    modalRoot.innerHTML=`<div class="modal-backdrop" data-close-modal><div class="modal" onclick="event.stopPropagation()"><button class="icon-btn modal-close" data-close-modal>×</button><div class="profile-grid"><aside class="profile-aside"><div class="avatar" style="width:56px;height:56px;font-size:16px">${initials(t.name)}</div><h2>${esc(t.name)}</h2><p>${esc(t.faculty)}<br>${esc(t.department)}<br>${esc(t.category)}</p><div class="profile-kv"><div><b>${t.lective} h</b><span>Lectiva</span></div><div><b>${t.nonLective} h</b><span>No lectiva</span></div><div><b>${t.attendance}%</b><span>Asistencia</span></div><div><b>${t.evaluation}</b><span>Evaluación</span></div></div></aside><section><h2 style="color:#0f2e4e">Información académica simulada</h2><div class="table-wrap"><table><tbody><tr><th>Cursos</th><td>${esc(t.courses.join(', '))}</td></tr><tr><th>Función administrativa</th><td>${esc(t.adminRole)}</td></tr><tr><th>Referencia CONCYTEC/RENACYT</th><td>${esc(t.renacyt)}</td></tr><tr><th>Control de asistencia</th><td>${t.attendance}% de registros conformes en el periodo demo</td></tr></tbody></table></div><div class="panel" style="margin-top:14px;box-shadow:none;background:#f8fafc"><h3>Uso esperado</h3><p style="font-size:11px;color:#596e80;line-height:1.6">La interfaz permitiría al Área de Personal Académico cargar o sincronizar información autorizada de carga docente y contrastarla con asistencia, acciones administrativas y expedientes de personal. Los conectores concretos se definirían recién en el proyecto real.</p></div></section></div></div></div>`;
  }

  function openProject(id){
    const p=D.projects.find(x=>x.id===id); if(!p) return;
    modalRoot.innerHTML=`<div class="modal-backdrop" data-close-modal><div class="modal" onclick="event.stopPropagation()"><button class="icon-btn modal-close" data-close-modal>×</button><h2 style="margin:0;color:#0f2e4e">${esc(p.name)}</h2><p style="font-size:11px;color:#66788a">${esc(p.owner)} · ${esc(p.start)} → ${esc(p.end)} · ${p.progress}%</p><div class="alert-item ${p.status==='En riesgo'?'high':'low'}" style="margin:14px 0"><div class="alert-top"><span class="alert-title">${esc(p.status)}</span><span class="alert-date">${p.progress}%</span></div><div class="alert-detail">${esc(p.blocker)}</div></div><div class="table-wrap"><table><thead><tr><th>Actividad</th><th>Avance</th><th>Responsable / dependencia</th></tr></thead><tbody>${p.tasks.map(t=>`<tr><td>${esc(t[0])}</td><td>${progress(t[1])}<div style="font-size:9px;margin-top:4px">${t[1]}%</div></td><td>${esc(t[2])}</td></tr>`).join('')}</tbody></table></div></div></div>`;
  }

  function assistantOpen(){assistantDrawer.classList.add('open'); assistantInput.focus();}
  function assistantClose(){assistantDrawer.classList.remove('open');}
  function addBubble(text,who='ai'){
    const d=document.createElement('div'); d.className=`bubble ${who}`; d.textContent=text; assistantBody.appendChild(d); assistantBody.scrollTop=assistantBody.scrollHeight;
  }

  function assistantReply(q){
    const s=q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const findPerson=D.people.find(p=>s.includes(p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(' ').slice(0,2).join(' '))) || D.people.find(p=>p.name.toLowerCase().split(' ').some(x=>x.length>5 && s.includes(x.toLowerCase())));
    const findTeacher=D.teachers.find(t=>t.name.toLowerCase().split(' ').some(x=>x.length>6 && s.includes(x.toLowerCase())));
    if(findPerson && (s.includes('tarea')||s.includes('pend')||s.includes('hizo')||s.includes('trabaj'))){
      const pending=findPerson.tasks.filter(t=>t[2]!=='Concluido');
      return `${findPerson.name} — ${findPerson.area}\nÚltima actividad: ${findPerson.lastActivity}.\nPendientes: ${pending.map(t=>`${t[0]} (${t[1]}%, plazo ${t[3]})`).join('; ')}.\nGDR demo previo: ${findPerson.gdr}/100.`;
    }
    if(findTeacher || s.includes('carga academica') || s.includes('docente')){
      const t=findTeacher || D.teachers[0];
      return `${t.name} (${t.faculty}) tiene una carga demo de ${t.lective} h lectivas y ${t.nonLective} h no lectivas. Cursos: ${t.courses.join(', ')}. Asistencia: ${t.attendance}%. Función administrativa: ${t.adminRole}. Referencia RENACYT: ${t.renacyt}.`;
    }
    if(s.includes('retras')||s.includes('riesgo')||s.includes('cronograma')||s.includes('proyecto')){
      const risk=D.projects.filter(p=>p.status==='En riesgo');
      return `Hay ${risk.length} asuntos en riesgo: ${risk.map(p=>`${p.name} (${p.progress}%): ${p.blocker}`).join(' | ')}`;
    }
    if(s.includes('tarde')||s.includes('tardanza')||s.includes('asistencia')){
      return `Hoy la demo registra ${D.attendance.today.onTime} puntuales, ${D.attendance.today.late} tardanzas, ${D.attendance.today.absent} inasistencias y ${D.attendance.today.leave} licencias/permisos. Ejemplos de tardanzas: ${D.attendance.latePeople.map(x=>`${x[1]} ${x[2]}`).join(', ')}.`;
    }
    if(s.includes('saldo')||s.includes('tesorer')||s.includes('caja')){
      return `Saldo operativo demo de Tesorería: S/ 6.42 millones. Ingresos de septiembre: S/ 2.36 M. Pagos programados próximos 7 días: S/ 1.18 M. Hay 27 rendiciones pendientes, 7 fuera de plazo.`;
    }
    if(s.includes('norma')||s.includes('normativ')||s.includes('actualiz')){
      return `Alertas normativas demo: 1) D.S. N.° 140-2026-EF, nuevo Reglamento de Invierte.pe; 2) actualización interpretativa OECE del 31/07/2026; 3) D.S. N.° 001-2026-EF sobre el Reglamento de la Ley N.° 32069. Abre “Normativa vigente” para ir a la fuente oficial.`;
    }
    if(s.includes('gdr')||s.includes('rendimiento')){
      return `Gestión del Rendimiento 2026 (demo): alcance 712 servidores; 498 evidencias presentadas; 421 validadas; 96 retroalimentaciones pendientes; cobertura mostrada 69.9%.`;
    }
    if(s.includes('pension')){
      return `Subárea de Pensiones (demo): ${D.pensions.total} pensionistas registrados, ${D.pensions.activeCases} trámites activos, ${D.pensions.resolvedMonth} resueltos en el mes y tiempo medio de ${D.pensions.avgDays} días.`;
    }
    if(s.includes('bien')||s.includes('patrimon')){
      const total=D.assets.reduce((a,b)=>a+b[1],0);
      return `Control patrimonial demo: ${total.toLocaleString('es-PE')} bienes en categorías principales. La vista de Abastecimiento permite revisar cantidades, condición, ubicación y acciones patrimoniales.`;
    }
    if(s.includes('orden')||s.includes('contrat')){
      const pending=D.procurement.filter(r=>r[3]!=='En ejecución').length;
      return `La demo tiene ${D.procurement.length} órdenes priorizadas visibles; ${pending} requieren actuación previa o atención parcial. La contratación de mantenimiento de laboratorios está en 61% y tiene una observación pendiente del área usuaria.`;
    }
    return `Puedo responder en esta maqueta sobre: tareas y pendientes de servidores demo, proyectos retrasados, asistencia, saldos de Tesorería, órdenes de Abastecimiento, Gestión del Rendimiento, patrimonio, pensiones, docentes demo y alertas normativas. Prueba, por ejemplo: “¿qué tareas tiene María Fernanda Torres Vega?”`;
  }

  function exportXls(filename, rows){
    if(!rows || !rows.length){showToast('No hay datos para exportar.'); return;}
    const headers=Object.keys(rows[0]);
    const xmlEsc=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const rowXml = arr => `<Row>${arr.map(v=>`<Cell><Data ss:Type="String">${xmlEsc(v)}</Data></Cell>`).join('')}</Row>`;
    const xml=`<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Font ss:Bold="1"/><Interior ss:Color="#DCE6F1" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="Reporte"><Table><Row>${headers.map(h=>`<Cell ss:StyleID="Header"><Data ss:Type="String">${xmlEsc(h)}</Data></Cell>`).join('')}</Row>${rows.map(r=>rowXml(headers.map(h=>r[h]))).join('')}</Table></Worksheet></Workbook>`;
    downloadBlob(filename.endsWith('.xls')?filename:filename+'.xls', new Blob([xml],{type:'application/vnd.ms-excel;charset=utf-8'}));
  }

  function downloadDoc(filename, title, bodyHtml){
    const html=`<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.5;color:#111}h1{font-size:16pt;text-align:center}h2{font-size:12pt}table{width:100%;border-collapse:collapse}td,th{border:1px solid #999;padding:6px}th{background:#eee}</style></head><body><h1>${esc(title)}</h1>${bodyHtml}</body></html>`;
    downloadBlob(filename.endsWith('.doc')?filename:filename+'.doc', new Blob([html],{type:'application/msword;charset=utf-8'}));
  }
  function downloadBlob(name, blob){const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},800); showToast(`Descarga generada: ${name}`);}

  function rowsForExport(type, moduleKey=null){
    if(type==='people') return D.people.map(p=>({ID:p.id,Servidor:p.name,Unidad:D.modules[p.unit]?.name||p.unit,Área:p.area,Puesto:p.role,Régimen:p.regime,Ingreso:p.entry,Remuneración_demo:p.salary,GDR_demo:p.gdr,Última_actividad:p.lastActivity,Pendientes:p.tasks.filter(t=>t[2]!=='Concluido').length}));
    if(type==='teachers') return D.teachers.map(t=>({ID:t.id,Docente:t.name,Facultad:t.faculty,Departamento:t.department,Categoría:t.category,Carga_lectiva:t.lective,Carga_no_lectiva:t.nonLective,Cursos:t.courses.join('; '),Asistencia:t.attendance,Función_administrativa:t.adminRole,RENACYT_demo:t.renacyt,Evaluación_docente_demo:t.evaluation}));
    if(type==='projects') return D.projects.map(p=>({ID:p.id,Proyecto:p.name,Módulo:D.modules[p.module]?.name||p.module,Responsable:p.owner,Inicio:p.start,Fin:p.end,Avance:p.progress,Estado:p.status,Bloqueo:p.blocker}));
    if(type==='attendance') return D.attendance.latePeople.map(x=>({ID:x[0],Servidor:x[1],Hora:x[2],Área:x[3],Incidencia:'Tardanza demo'}));
    if(type==='procurement') return D.procurement.map(r=>({Orden:r[0],Objeto:r[1],Monto:r[2],Estado:r[3],Fecha_objetivo:r[4],Avance:r[5]+'%'}));
    if(type==='cash') return D.finance.cashBySource.map(x=>({Fuente:x[0],Saldo_demo_millones:x[1]}));
    if(type==='gdr') return [{Indicador:'Alcance',Valor:D.gdr.scope},{Indicador:'Evidencias presentadas',Valor:D.gdr.evidenceSubmitted},{Indicador:'Evidencias validadas',Valor:D.gdr.validated},{Indicador:'Retroalimentación pendiente',Valor:D.gdr.pendingFeedback},{Indicador:'Cobertura demo',Valor:D.gdr.coverage+'%'}];
    if(type==='org') return Object.entries(D.modules).filter(([k])=>k!=='dga').map(([k,m])=>({Unidad:m.name,Componentes:m.subareas.join('; '),Personas_demo_visibles:D.people.filter(p=>p.unit===k).length}));
    if(type==='executive') return [{Indicador:'Servidores DGA demo',Valor:'327'},{Indicador:'Tareas activas',Valor:'486'},{Indicador:'Proyectos en riesgo',Valor:'3'},{Indicador:'Saldo Tesorería demo',Valor:'S/ 6.42 M'},{Indicador:'Cobertura GDR demo',Valor:D.gdr.coverage+'%'}];
    if(type==='module' && moduleKey){
      return D.people.filter(p=>p.unit===moduleKey).flatMap(p=>p.tasks.map(t=>({Servidor:p.name,Área:p.area,Tarea:t[0],Avance:t[1]+'%',Estado:t[2],Plazo:t[3]})));
    }
    return [];
  }

  function applyPeopleFilter(){
    const q=(document.getElementById('peopleSearch')?.value||'').toLowerCase();
    const unit=document.getElementById('peopleUnit')?.value||'all';
    document.querySelectorAll('[data-person-card]').forEach(card=>{
      const okQ=!q || card.dataset.search.includes(q);
      const okU=unit==='all' || card.dataset.unit===unit;
      card.classList.toggle('hidden', !(okQ&&okU));
    });
  }

  function applyTeacherFilter(){
    const q=(document.getElementById('teacherSearch')?.value||'').toLowerCase();
    const fac=document.getElementById('facultySelect')?.value||'all';
    document.querySelectorAll('[data-teacher-search]').forEach(card=>{
      const okQ=!q||card.dataset.teacherSearch.includes(q);
      const okF=fac==='all'||card.dataset.faculty===fac;
      card.classList.toggle('hidden',!(okQ&&okF));
    });
  }

  document.addEventListener('click', e=>{
    const nav=e.target.closest('.nav-btn');
    if(nav){if(nav.dataset.module) navigate('module',nav.dataset.module); else navigate(nav.dataset.view); return;}
    const moduleJump=e.target.closest('[data-module-jump]'); if(moduleJump){navigate('module',moduleJump.dataset.moduleJump);return;}
    const viewJump=e.target.closest('[data-view-jump]'); if(viewJump){navigate(viewJump.dataset.viewJump);return;}
    const person=e.target.closest('[data-person]'); if(person){openPerson(person.dataset.person);return;}
    const teacher=e.target.closest('[data-teacher]'); if(teacher){openTeacher(teacher.dataset.teacher);return;}
    const proj=e.target.closest('[data-project]'); if(proj){openProject(proj.dataset.project);return;}
    if(e.target.closest('[data-close-modal]')){modalRoot.innerHTML='';return;}
    if(e.target.closest('[data-open-assistant]')){assistantOpen();return;}
    const exp=e.target.closest('[data-export]'); if(exp){const t=exp.dataset.export;exportXls(`DGA_UNT_${t}_${D.meta.referenceDate.replaceAll('/','-')}`,rowsForExport(t));return;}
    const expM=e.target.closest('[data-export-module]'); if(expM){const k=expM.dataset.exportModule;exportXls(`DGA_UNT_${k}_tareas`,rowsForExport('module',k));return;}
    const expP=e.target.closest('[data-export-person]'); if(expP){const p=D.people.find(x=>x.id===expP.dataset.exportPerson); if(p) exportXls(`Ficha_${p.id}_${p.name.replaceAll(' ','_')}`,p.tasks.map(t=>({Servidor:p.name,Área:p.area,Tarea:t[0],Avance:t[1]+'%',Estado:t[2],Plazo:t[3],GDR_demo:p.gdr,Régimen:p.regime}))); return;}
    const dt=e.target.closest('[data-doc-template]'); if(dt){
      const type=dt.dataset.docTemplate;
      if(type==='gdr') downloadDoc('Formato_Seguimiento_GDR_Demo','FORMATO DE SEGUIMIENTO – GESTIÓN DEL RENDIMIENTO',`<p><b>Servidor:</b> _______________________________</p><p><b>Unidad/Área:</b> ____________________________</p><table><tr><th>Indicador / producto</th><th>Avance</th><th>Evidencia</th><th>Observaciones</th></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table><p>Es todo cuanto tengo que informar para los fines correspondientes.</p><p>Firma: _____________________</p>`);
      if(type==='tasks') downloadDoc('Reporte_Pendientes_Demo','REPORTE DE PENDIENTES DEL SERVIDOR',`<p><b>Fecha:</b> ${D.meta.referenceDate}</p><table><tr><th>Tarea</th><th>Avance</th><th>Plazo</th><th>Observación</th></tr><tr><td>Actividad asignada</td><td>60%</td><td>__/__/2026</td><td>En curso</td></tr></table><p>Es todo cuanto tengo que informar para los fines correspondientes.</p>`);
      if(type==='proveido') downloadDoc('Proveido_Demo','PROVEÍDO',`<p><b>Asunto:</b> Atención de documento administrativo</p><p>Pase a la unidad competente para su evaluación y atención conforme a sus atribuciones, debiendo informar el estado de lo actuado dentro del plazo correspondiente.</p><p>Trujillo, ${D.meta.referenceDate}</p>`);
      return;
    }
  });

  document.addEventListener('input', e=>{if(e.target.id==='peopleSearch') applyPeopleFilter(); if(e.target.id==='teacherSearch') applyTeacherFilter();});
  document.addEventListener('change', e=>{
    if(e.target.id==='peopleUnit') applyPeopleFilter();
    if(e.target.id==='facultySelect'){state.faculty=e.target.value;applyTeacherFilter();}
    if(e.target.matches('[data-upload-module]')){const f=e.target.files?.[0]; if(f) showToast(`Archivo “${f.name}” recibido en modo simulación.`);}
  });

  roleSelect.addEventListener('change',()=>{
    state.role=roleSelect.value;
    updateNavAccess();
    const allowed=access[state.role];
    if(state.view==='module' && !allowed.includes(state.module)) state.view='dashboard',state.module=null;
    else if(state.view!=='module' && !allowed.includes(state.view)) state.view=state.role==='servidor'?'people':'dashboard';
    render();
  });

  document.getElementById('assistantFab').addEventListener('click',assistantOpen);
  document.getElementById('openAssistantTop').addEventListener('click',assistantOpen);
  document.getElementById('closeAssistant').addEventListener('click',assistantClose);
  document.querySelectorAll('.assistant-chip').forEach(btn=>btn.addEventListener('click',()=>{assistantInput.value=btn.dataset.prompt; document.getElementById('assistantForm').requestSubmit();}));
  document.getElementById('assistantForm').addEventListener('submit',e=>{e.preventDefault();const q=assistantInput.value.trim();if(!q)return;addBubble(q,'user');assistantInput.value='';setTimeout(()=>addBubble(assistantReply(q),'ai'),180);});

  document.addEventListener('click', e=>{
    if(e.target.id==='generateDoc'){
      const type=document.getElementById('docType').value, unit=document.getElementById('docUnit').value, owner=document.getElementById('docOwner').value, subj=document.getElementById('docSubject').value, body=document.getElementById('docBody').value;
      downloadDoc(`${type.replaceAll(' ','_')}_Demo`,type.toUpperCase(),`<p><b>Unidad:</b> ${esc(D.modules[unit]?.name||unit)}</p><p><b>Responsable:</b> ${esc(owner)}</p><p><b>Asunto:</b> ${esc(subj)}</p><p>${esc(body).replaceAll('\n','<br>')}</p><p>Es todo cuanto tengo que informar para los fines correspondientes.</p><p>Trujillo, ${D.meta.referenceDate}</p>`);
    }
  });

  addBubble('Bienvenido. Soy el asistente de la maqueta del Sistema Integrado DGA UNT. Puedo responder sobre la información ficticia del tablero y ayudarte a mostrar al Director cómo funcionaría la experiencia futura.','ai');
  render();
})();
