<script>
	// Datos de ejemplo - en un proyecto real estos vendrían de una API o BD
	const proceso = {
		proximoEvento: {
			nombre: "Inscripciones para PSA",
			fecha: "15 de octubre 2025",
			diasRestantes: 12,
			confirmado: true
		},
		
		timeline: [
			{ id: 1, nombre: "Inscripciones PSA", fecha: "15 Oct 2025", icono: "📝", estado: "confirmado" },
			{ id: 2, nombre: "Pruebas PSA", fecha: "22 Nov 2025", icono: "✏️", estado: "confirmado" },
			{ id: 3, nombre: "Resultados PSA", fecha: "10 Dic 2025", icono: "📊", estado: "tentativo" },
			{ id: 4, nombre: "Matrícula Regular", fecha: "15 Ene 2026", icono: "🎓", estado: "tentativo" }
		],
		
		opciones: {
			psa: {
				nombre: "Prueba de Suficiencia Académica (PSA)",
				descripcion: "Para postulantes con título de bachiller",
				costoTotal: "$150",
				detallesCosto: [
					{ concepto: "Inscripción", monto: "$50" },
					{ concepto: "Derecho de prueba", monto: "$100" }
				],
				ventajas: [
					"Puedes postular sin cursar CPU",
					"Resultados en 15 días",
					"Puedes rendir hasta 2 veces al año"
				],
				requisitos: ["Título de bachiller", "Cédula de identidad", "Foto tamaño carnet"]
			},
			cpu: {
				nombre: "Curso Preuniversitario (CPU)",
				descripcion: "Para estudiantes del último año de colegio",
				costoTotal: "$300",
				detallesCosto: [
					{ concepto: "Matrícula", monto: "$100" },
					{ concepto: "Mensualidad (4 meses)", monto: "$200" }
				],
				ventajas: [
					"Preparación completa para la PSA",
					"Material de estudio incluido",
					"Simulacros de prueba mensuales"
				],
				requisitos: ["Certificado de estudiante regular", "Cédula de identidad", "Foto tamaño carnet"]
			}
		},
		
		documentosComunes: [
			{ id: 1, nombre: "Cédula de identidad original y copia", requerido: true },
			{ id: 2, nombre: "Foto tamaño carnet (fondo azul)", requerido: true },
			{ id: 3, nombre: "Título de bachiller legalizado (solo PSA)", requerido: false },
			{ id: 4, nombre: "Certificado de notas del colegio", requerido: true },
			{ id: 5, nombre: "Formulario de inscripción completado", requerido: true }
		]
	};
	
	// Estado para el checklist
	let documentosMarcados = $state([]);
	
	function toggleDocumento(id) {
		if (documentosMarcados.includes(id)) {
			documentosMarcados = documentosMarcados.filter(docId => docId !== id);
		} else {
			documentosMarcados = [...documentosMarcados, id];
		}
	}
	
	function generarChecklist() {
		const pendientes = proceso.documentosComunes
			.filter(doc => !documentosMarcados.includes(doc.id) && doc.requerido)
			.map(doc => doc.nombre);
		
		alert(`Documentos pendientes:\n\n${pendientes.join('\n')}\n\nPuedes imprimir esta lista.`);
	}
</script>

<div class="proceso-admision">
	<!-- BLOQUE SUPERIOR: Llamada a acción -->
	<header class="header-principal">
		<h1>Proceso de Admisión FCYT 2025</h1>
		
		<div class="alerta-proximo">
			<div class="icono-alerta">⚠️</div>
			<div class="info-alerta">
				<h3>¡ATENCIÓN! Próximo hito:</h3>
				<p>
					<strong>{proceso.proximoEvento.nombre}</strong> en 
					<span class="dias-destacados">{proceso.proximoEvento.diasRestantes} días</span>. 
					Fecha: {proceso.proximoEvento.fecha}
				</p>
			</div>
			<div class="estado-alerta {proceso.proximoEvento.confirmado ? 'confirmado' : 'tentativo'}">
				{proceso.proximoEvento.confirmado ? '✅ Confirmado' : '⚠️ Tentativo'}
			</div>
		</div>
		
		<div class="opciones-rapidas">
			<a href="#psa" class="btn-opcion psa">
				<h3>Postulación PSA</h3>
				<p>Si ya tienes título de bachiller</p>
				<span class="badge">Más rápido</span>
			</a>
			<a href="#cpu" class="btn-opcion cpu">
				<h3>Postulación CPU</h3>
				<p>Si aún estás en el colegio</p>
				<span class="badge">Incluye preparación</span>
			</a>
		</div>
	</header>
	
	<!-- TIMELINE VISUAL -->
	<section class="seccion-timeline">
		<h2>Cronograma del Proceso</h2>
		<div class="timeline-horizontal">
			{#each proceso.timeline as etapa}
				<div class="etapa {etapa.estado}">
					<div class="icono-etapa">{etapa.icono}</div>
					<div class="info-etapa">
						<h4>{etapa.nombre}</h4>
						<p class="fecha-etapa">{etapa.fecha}</p>
						{#if etapa.estado === 'tentativo'}
							<span class="badge-tentativo">Tentativo</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		<p class="leyenda-timeline">
			<span class="confirmado-leyenda">🟢 Confirmado</span>
			<span class="tentativo-leyenda">🟡 Tentativo (sujeto a cambios)</span>
		</p>
	</section>
	
	<!-- COMPARADOR PSA vs CPU -->
	<section class="seccion-comparador" id="comparador">
		<h2>¿Qué opción es para ti?</h2>
		<div class="comparador-cards">
			<!-- Card PSA -->
			<div class="card-opcion" id="psa">
				<div class="card-header psa">
					<h3>PSA</h3>
					<p class="subtitulo">{proceso.opciones.psa.nombre}</p>
				</div>
				<div class="card-body">
					<p class="descripcion">{proceso.opciones.psa.descripcion}</p>
					
					<div class="costo-destacado">
						<span class="costo-total">{proceso.opciones.psa.costoTotal}</span>
						<span class="costo-label">Costo total</span>
					</div>
					
					<div class="detalles-costo">
						<h4>Desglose:</h4>
						{#each proceso.opciones.psa.detallesCosto as detalle}
							<div class="detalle-item">
								<span>{detalle.concepto}</span>
								<span>{detalle.monto}</span>
							</div>
						{/each}
					</div>
					
					<div class="ventajas">
						<h4>Ventajas:</h4>
						<ul>
							{#each proceso.opciones.psa.ventajas as ventaja}
								<li>✅ {ventaja}</li>
							{/each}
						</ul>
					</div>
					
					<button class="btn-elegir psa">Esta es mi opción</button>
				</div>
			</div>
			
			<!-- Card CPU -->
			<div class="card-opcion" id="cpu">
				<div class="card-header cpu">
					<h3>CPU</h3>
					<p class="subtitulo">{proceso.opciones.cpu.nombre}</p>
				</div>
				<div class="card-body">
					<p class="descripcion">{proceso.opciones.cpu.descripcion}</p>
					
					<div class="costo-destacado">
						<span class="costo-total">{proceso.opciones.cpu.costoTotal}</span>
						<span class="costo-label">Costo total</span>
					</div>
					
					<div class="detalles-costo">
						<h4>Desglose:</h4>
						{#each proceso.opciones.cpu.detallesCosto as detalle}
							<div class="detalle-item">
								<span>{detalle.concepto}</span>
								<span>{detalle.monto}</span>
							</div>
						{/each}
					</div>
					
					<div class="ventajas">
						<h4>Ventajas:</h4>
						<ul>
							{#each proceso.opciones.cpu.ventajas as ventaja}
								<li>✅ {ventaja}</li>
							{/each}
						</ul>
					</div>
					
					<button class="btn-elegir cpu">Esta es mi opción</button>
				</div>
			</div>
		</div>
	</section>
	
	<!-- CHECKLIST DE DOCUMENTOS -->
	<section class="seccion-checklist">
		<h2>Checklist de Documentos Requeridos</h2>
		<p class="subtitulo-seccion">Marca los documentos que ya tienes listos:</p>
		
		<div class="checklist-container">
			{#each proceso.documentosComunes as documento}
				<label class="checklist-item">
					<input 
						type="checkbox" 
						checked={documentosMarcados.includes(documento.id)}
						on:change={() => toggleDocumento(documento.id)}
					/>
					<span class="checkmark"></span>
					<span class="documento-nombre">{documento.nombre}</span>
					{#if !documento.requerido}
						<span class="badge-opcional">Opcional</span>
					{/if}
				</label>
			{/each}
		</div>
		
		<div class="checklist-acciones">
			<button on:click={generarChecklist} class="btn-generar">
				📋 Generar mi lista de pendientes
			</button>
			<p class="hint">Podrás imprimir o guardar tu lista personalizada</p>
		</div>
		
		<div class="progreso">
			<div class="progreso-bar" style={`width: ${(documentosMarcados.length / proceso.documentosComunes.filter(d => d.requerido).length) * 100}%`}></div>
			<p>
				Tienes {documentosMarcados.length} de {proceso.documentosComunes.filter(d => d.requerido).length} 
				documentos requeridos listos
			</p>
		</div>
	</section>
	
	<!-- SECCIÓN DE DETALLES Y FAQS -->
	<section class="seccion-detalles">
		<details class="detalle-acordeon">
			<summary>📅 Ver cronograma completo detallado</summary>
			<div class="contenido-acordeon">
				<table class="tabla-cronograma">
					<thead>
						<tr>
							<th>Etapa</th>
							<th>Fecha</th>
							<th>Estado</th>
							<th>Lugar</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Inscripciones PSA</td>
							<td>15 Octubre 2025</td>
							<td><span class="badge-confirmado">Confirmado</span></td>
							<td>Plataforma online</td>
						</tr>
						<tr>
							<td>Pruebas PSA</td>
							<td>22 Noviembre 2025</td>
							<td><span class="badge-confirmado">Confirmado</span></td>
							<td>Campus FCYT</td>
						</tr>
						<tr>
							<td>Resultados PSA</td>
							<td>10 Diciembre 2025</td>
							<td><span class="badge-tentativo">Tentativo</span></td>
							<td>Plataforma online</td>
						</tr>
						<tr>
							<td>Matrícula Regular</td>
							<td>15 Enero 2026</td>
							<td><span class="badge-tentativo">Tentativo</span></td>
							<td>Secretaría Académica</td>
						</tr>
					</tbody>
				</table>
			</div>
		</details>
		
		<details class="detalle-acordeon">
			<summary>❓ Preguntas frecuentes sobre el proceso</summary>
			<div class="contenido-acordeon">
				<div class="faq-item">
					<h4>¿Puedo postular por PSA y CPU al mismo tiempo?</h4>
					<p>No, son procesos separados. Debes elegir una opción según tu situación académica actual.</p>
				</div>
				<div class="faq-item">
					<h4>¿Los costos incluyen todo el material?</h4>
					<p>En CPU sí, todo el material está incluido. En PSA, solo incluye derechos de inscripción y prueba.</p>
				</div>
				<div class="faq-item">
					<h4>¿Qué pasa si no paso la PSA?</h4>
					<p>Puedes rendirla nuevamente en la siguiente convocatoria (máximo 2 veces al año).</p>
				</div>
			</div>
		</details>
	</section>
</div>

<style>
	/* Variables de colores (ajusta según tu paleta) */
	:global(:root) {
		--color-psa: #003366; /* Azul universitario */
		--color-cpu: #e67e22; /* Naranja */
		--color-confirmado: #2ecc71;
		--color-tentativo: #f39c12;
		--color-fondo: #f8f9fa;
		--color-borde: #e0e0e0;
		--color-texto: #333;
		--color-subtexto: #666;
	}
	
	.proceso-admision {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
		color: var(--color-texto);
	}
	
	/* HEADER PRINCIPAL */
	.header-principal h1 {
		color: var(--color-psa);
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2.5rem;
	}
	
	.alerta-proximo {
		background: linear-gradient(135deg, #fff9e6 0%, #fff3d9 100%);
		border-left: 5px solid var(--color-tentativo);
		padding: 1.5rem;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 4px 6px rgba(0,0,0,0.05);
	}
	
	.icono-alerta {
		font-size: 2rem;
	}
	
	.info-alerta h3 {
		margin: 0 0 0.5rem 0;
		color: var(--color-tentativo);
	}
	
	.dias-destacados {
		background: var(--color-tentativo);
		color: white;
		padding: 0.2rem 0.6rem;
		border-radius: 20px;
		font-weight: bold;
	}
	
	.estado-alerta {
		margin-left: auto;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-weight: bold;
		font-size: 0.9rem;
	}
	
	.estado-alerta.confirmado {
		background: var(--color-confirmado);
		color: white;
	}
	
	.estado-alerta.tentativo {
		background: var(--color-tentativo);
		color: white;
	}
	
	.opciones-rapidas {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}
	
	.btn-opcion {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: 2rem;
		border-radius: 12px;
		transition: transform 0.3s, box-shadow 0.3s;
		position: relative;
		overflow: hidden;
	}
	
	.btn-opcion:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0,0,0,0.1);
	}
	
	.btn-opcion.psa {
		background: linear-gradient(135deg, #e6f0ff 0%, #d4e4ff 100%);
		border: 2px solid var(--color-psa);
	}
	
	.btn-opcion.cpu {
		background: linear-gradient(135deg, #fff0e6 0%, #ffe4d4 100%);
		border: 2px solid var(--color-cpu);
	}
	
	.btn-opcion h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.8rem;
	}
	
	.btn-opcion p {
		margin: 0;
		color: var(--color-subtexto);
	}
	
	.btn-opcion .badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 0.3rem 0.8rem;
		border-radius: 15px;
		font-size: 0.8rem;
		font-weight: bold;
	}
	
	.psa .badge {
		background: var(--color-psa);
		color: white;
	}
	
	.cpu .badge {
		background: var(--color-cpu);
		color: white;
	}
	
	/* TIMELINE */
	.seccion-timeline {
		margin-bottom: 3rem;
	}
	
	.seccion-timeline h2 {
		color: var(--color-psa);
		margin-bottom: 1.5rem;
	}
	
	.timeline-horizontal {
		display: flex;
		justify-content: space-between;
		overflow-x: auto;
		padding: 1rem 0;
		gap: 1rem;
	}
	
	.etapa {
		flex: 1;
		min-width: 180px;
		padding: 1.5rem;
		border-radius: 10px;
		text-align: center;
		border: 2px solid var(--color-borde);
		transition: all 0.3s;
	}
	
	.etapa:hover {
		transform: scale(1.05);
	}
	
	.etapa.confirmado {
		border-color: var(--color-confirmado);
		background: rgba(46, 204, 113, 0.05);
	}
	
	.etapa.tentativo {
		border-color: var(--color-tentativo);
		background: rgba(243, 156, 18, 0.05);
	}
	
	.icono-etapa {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}
	
	.info-etapa h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
	}
	
	.fecha-etapa {
		font-weight: bold;
		color: var(--color-psa);
		margin: 0 0 0.5rem 0;
	}
	
	.badge-tentativo {
		display: inline-block;
		background: var(--color-tentativo);
		color: white;
		padding: 0.2rem 0.6rem;
		border-radius: 12px;
		font-size: 0.8rem;
	}
	
	.leyenda-timeline {
		text-align: center;
		margin-top: 1rem;
		color: var(--color-subtexto);
	}
	
	.leyenda-timeline span {
		margin: 0 1rem;
	}
	
	/* COMPARADOR */
	.seccion-comparador {
		margin-bottom: 3rem;
	}
	
	.seccion-comparador h2 {
		color: var(--color-psa);
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.comparador-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
	}
	
	.card-opcion {
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 5px 15px rgba(0,0,0,0.08);
		transition: transform 0.3s;
	}
	
	.card-opcion:hover {
		transform: translateY(-10px);
	}
	
	.card-header {
		padding: 1.5rem;
		color: white;
	}
	
	.card-header.psa {
		background: var(--color-psa);
	}
	
	.card-header.cpu {
		background: var(--color-cpu);
	}
	
	.card-header h3 {
		margin: 0;
		font-size: 2.5rem;
	}
	
	.subtitulo {
		margin: 0.5rem 0 0 0;
		font-size: 0.9rem;
		opacity: 0.9;
	}
	
	.card-body {
		padding: 2rem;
	}
	
	.descripcion {
		font-size: 1.1rem;
		margin-bottom: 1.5rem;
		color: var(--color-subtexto);
	}
	
	.costo-destacado {
		text-align: center;
		margin: 2rem 0;
		padding: 1.5rem;
		background: var(--color-fondo);
		border-radius: 8px;
	}
	
	.costo-total {
		display: block;
		font-size: 3rem;
		font-weight: bold;
		color: var(--color-psa);
	}
	
	.card-opcion.cpu .costo-total {
		color: var(--color-cpu);
	}
	
	.costo-label {
		font-size: 0.9rem;
		color: var(--color-subtexto);
	}
	
	.detalles-costo {
		margin-bottom: 1.5rem;
	}
	
	.detalles-costo h4 {
		margin-bottom: 0.8rem;
	}
	
	.detalle-item {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px dashed var(--color-borde);
	}
	
	.ventajas ul {
		list-style: none;
		padding: 0;
	}
	
	.ventajas li {
		padding: 0.5rem 0;
	}
	
	.btn-elegir {
		width: 100%;
		padding: 1rem;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: bold;
		cursor: pointer;
		transition: background 0.3s;
		margin-top: 1.5rem;
	}
	
	.btn-elegir.psa {
		background: var(--color-psa);
		color: white;
	}
	
	.btn-elegir.psa:hover {
		background: #002244;
	}
	
	.btn-elegir.cpu {
		background: var(--color-cpu);
		color: white;
	}
	
	.btn-elegir.cpu:hover {
		background: #d35400;
	}
	
	/* CHECKLIST */
	.seccion-checklist {
		background: var(--color-fondo);
		padding: 2rem;
		border-radius: 12px;
		margin-bottom: 3rem;
	}
	
	.seccion-checklist h2 {
		color: var(--color-psa);
		margin-bottom: 0.5rem;
	}
	
	.subtitulo-seccion {
		color: var(--color-subtexto);
		margin-bottom: 1.5rem;
	}
	
	.checklist-container {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 1.5rem;
	}
	
	.checklist-item {
		display: flex;
		align-items: center;
		padding: 1rem 0;
		border-bottom: 1px solid var(--color-borde);
		cursor: pointer;
	}
	
	.checklist-item:last-child {
		border-bottom: none;
	}
	
	.checklist-item input {
		margin-right: 1rem;
		transform: scale(1.3);
	}
	
	.documento-nombre {
		flex-grow: 1;
	}
	
	.badge-opcional {
		background: #95a5a6;
		color: white;
		padding: 0.2rem 0.6rem;
		border-radius: 12px;
		font-size: 0.8rem;
	}
	
	.checklist-acciones {
		text-align: center;
		margin-bottom: 1.5rem;
	}
	
	.btn-generar {
		background: var(--color-psa);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: background 0.3s;
	}
	
	.btn-generar:hover {
		background: #002244;
	}
	
	.hint {
		margin-top: 0.5rem;
		color: var(--color-subtexto);
		font-size: 0.9rem;
	}
	
	.progreso {
		background: white;
		padding: 1rem;
		border-radius: 8px;
	}
	
	.progreso-bar {
		height: 10px;
		background: var(--color-confirmado);
		border-radius: 5px;
		margin-bottom: 0.5rem;
		transition: width 0.5s;
	}
	
	/* DETALLES Y FAQS */
	.seccion-detalles {
		margin-bottom: 2rem;
	}
	
	.detalle-acordeon {
		background: white;
		border: 1px solid var(--color-borde);
		border-radius: 8px;
		margin-bottom: 1rem;
		overflow: hidden;
	}
	
	.detalle-acordeon summary {
		padding: 1.5rem;
		font-size: 1.1rem;
		font-weight: bold;
		cursor: pointer;
		list-style: none;
		display: flex;
		align-items: center;
	}
	
	.detalle-acordeon summary::before {
		content: "▶";
		margin-right: 0.5rem;
		font-size: 0.8rem;
		transition: transform 0.3s;
	}
	
	.detalle-acordeon[open] summary::before {
		transform: rotate(90deg);
	}
	
	.contenido-acordeon {
		padding: 0 1.5rem 1.5rem 1.5rem;
	}
	
	.tabla-cronograma {
		width: 100%;
		border-collapse: collapse;
	}
	
	.tabla-cronograma th,
	.tabla-cronograma td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid var(--color-borde);
	}
	
	.tabla-cronograma th {
		background: var(--color-fondo);
		color: var(--color-psa);
	}
	
	.badge-confirmado {
		background: var(--color-confirmado);
		color: white;
		padding: 0.3rem 0.8rem;
		border-radius: 15px;
		font-size: 0.8rem;
	}
	
	.faq-item {
		margin-bottom: 1.5rem;
	}
	
	.faq-item h4 {
		color: var(--color-psa);
		margin-bottom: 0.5rem;
	}
	
	.faq-item p {
		margin: 0;
		color: var(--color-subtexto);
	}
	
	/* Responsive */
	@media (max-width: 768px) {
		.opciones-rapidas {
			grid-template-columns: 1fr;
		}
		
		.comparador-cards {
			grid-template-columns: 1fr;
		}
		
		.timeline-horizontal {
			flex-direction: column;
		}
		
		.etapa {
			min-width: 100%;
		}
		
		.header-principal h1 {
			font-size: 2rem;
		}
		
		.alerta-proximo {
			flex-direction: column;
			text-align: center;
			gap: 1rem;
		}
		
		.estado-alerta {
			margin-left: 0;
		}
	}
</style>