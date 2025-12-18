<script>
	const sections = [
		{ title: "Proceso de Admisión", link: "/admision/proceso", icon: "/icons/proceso.png", color: "#023875" },
		{ title: "Tablón de Anuncios", link: "/admision/tablones", icon: "/icons/tablones.png", color: "#0069b4" },
		{ title: "Material de Consulta", link: "/admision/material", icon: "/icons/material.png", color: "#1e90ff" },
		{ title: "Recursos de Apoyo", link: "/admision/recursos", icon: "/icons/recursos.png", color: "#4682b4" },
		{ title: "Guías y Tutoriales", link: "/admision/tutoriales", icon: "/icons/guias.png", color: "#5f9fd9" }
	];
</script>

<div class="page">
	<div class="header">
		<div class="header-inner">
			<h1>Admisiones FCyT</h1>
		</div>
	</div>

	<div class="container">
		<div class="cards-wrapper">

			<div class="grid">
				<a class="card" href="/admision/proceso" style="--card-color:#023875">
					<div class="card-inner">
						<div class="icon">
							<img src="/icons/proceso.png" alt="Proceso de Admisión">
						</div>
						<h2>Proceso de Admisión</h2>
					</div>
				</a>

				<a class="card" href="/admision/tablones" style="--card-color:#0069b4">
					<div class="card-inner">
						<div class="icon">
							<img src="/icons/tablones.png" alt="Tablón de Anuncios">
						</div>
						<h2>Tablón de Anuncios</h2>
					</div>
				</a>

				<a class="card" href="/admision/material" style="--card-color:#1e90ff">
					<div class="card-inner">
						<div class="icon">
							<img src="/icons/material.png" alt="Material de Consulta">
						</div>
						<h2>Material de Consulta</h2>
					</div>
				</a>
			</div>

			<div class="grid-bottom">

				<a class="card" href="/admision/recursos" style="--card-color:#4682b4">
					<div class="card-inner">
						<div class="icon">
							<img src="/icons/recursos.png" alt="Recursos de Apoyo">
						</div>
						<h2>Recursos de Apoyo</h2>
					</div>
				</a>

				<a class="card" href="/admision/tutoriales" style="--card-color:#5f9fd9">
					<div class="card-inner">
						<div class="icon">
							<img src="/icons/guias.png" alt="Guías y Tutoriales">
						</div>
						<h2>Guías y Tutoriales</h2>
					</div>
				</a>

			</div>

		</div>
	</div>
</div>

<style>
/* 🔹 MOBILE FIRST - Estilos base para móviles */

.page {
	background: white;
	overflow-x: hidden;
	flex: 1;
}

.header {
	background: white;
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	padding: 0;
}

.header-inner {
	width: 100%;
	background: linear-gradient(135deg, #023875 0%, #0069b4 100%);
	padding: 0.9rem 0; /* 🔹 Padding móvil */
	text-align: center;
}

.header-content {
	max-width: 900px;
	margin: 0 auto;
	text-align: center;
}

h1 {
	color: white;
	font-size: 1.2rem; /* 🔹 Tamaño móvil */
	font-weight: 700;
	margin: 0;
	text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.container {
	max-width: 900px;
	margin: 0 auto;
	padding: 1rem 1rem 1rem 1rem;
	flex: 1;
}

.cards-wrapper {
	background: #0069b4;
	padding: 0.8rem;
	border-radius: 16px;
	margin-bottom: 0;
}

.grid {
	display: grid;
	grid-template-columns: 1fr; /* 🔹 MÓVIL: 1 columna */
	gap: 0.8rem;
	margin-bottom: 0.8rem;
}

.grid-bottom {
	display: grid;
	grid-template-columns: 1fr; /* 🔹 MÓVIL: 1 columna */
	gap: 0.8rem;
}

.grid-bottom .card {
	width: 100%; /* 🔹 MÓVIL: ancho completo */
}

.card {
	background: white;
	border-radius: 14px; /* 🔹 Border radius móvil */
	text-decoration: none;
	color: inherit;
	transition: all 0.3s ease;
	box-shadow: 0 4px 12px rgba(0,0,0,0.15);
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	padding: 1rem; /* 🔹 Padding móvil */
	position: relative;
	min-height: 130px; /* 🔹 Altura móvil */
}

.card::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 4px; /* 🔹 Línea móvil */
	background: var(--card-color);
	border-radius: 14px 14px 0 0;
}

.card:hover {
	transform: translateY(-3px) scale(1.01);
	box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.card-inner {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	text-align: center;
	flex-grow: 1;
}

.icon img {
	width: 75px; /* 🔹 Iconos móvil */
	height: auto;
	display: block;
	filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
	margin-bottom: -2.2rem; /* 🔹 Superposición móvil */
	max-height: 70px;
	object-fit: contain;
}

h2 {
	color: var(--card-color);
	font-size: 0.88rem; /* 🔹 Texto móvil */
	font-weight: 700;
	margin: 0;
	line-height: 1.2;
	margin-top: 3.8rem; /* 🔹 Margen móvil */
}

/* 🔹 TABLETS: 640px+ */
@media (min-width: 640px) {
	.grid {
		grid-template-columns: repeat(2, 1fr); /* 🔹 TABLET: 2 columnas */
	}
	
	.grid-bottom {
		grid-template-columns: repeat(2, 1fr); /* 🔹 TABLET: 2 columnas */
	}

	.icon img {
		width: 80px;
		max-height: 75px;
		margin-bottom: -2.4rem;
	}

	h2 {
		font-size: 0.9rem;
		margin-top: 4rem;
	}

	.card {
		min-height: 135px;
		padding: 1.1rem;
	}
}

/* 🔹 DESKTOP PEQUEÑO: 768px+ */
@media (min-width: 768px) {
	h1 {
		font-size: 1.25rem;
	}

	.container {
		padding: 1.2rem 1.5rem 0 1.5rem;
	}

	.cards-wrapper {
		padding: 0.9rem;
	}

	.grid {
		grid-template-columns: repeat(3, 1fr); /* 🔹 DESKTOP: 3 columnas */
	}

	.grid-bottom {
		display: flex; /* 🔹 DESKTOP: flex para centrar las 2 cards */
		justify-content: center;
	}

	.grid-bottom .card {
		width: calc(33.333% - 0.53rem); /* 🔹 DESKTOP: ancho de 1/3 */
	}

	.icon img {
		width: 85px;
		max-height: 80px;
		margin-bottom: -2.6rem;
	}

	h2 {
		font-size: 0.91rem;
		margin-top: 4.2rem;
	}

	.card {
		min-height: 140px;
		padding: 1.15rem;
	}
}

/* 🔹 DESKTOP MEDIANO: 1024px+ */
@media (min-width: 1024px) {
	h1 {
		font-size: 1.3rem;
	}

	.header-inner {
		padding: 1rem 0;
	}

	.container {
		padding: 1rem 1.5rem 0 1.5rem;
	}

	.cards-wrapper {
		padding: 1rem;
	}

	.icon img {
		width: 90px; /* 🔹 Iconos desktop */
		max-height: 85px;
		margin-bottom: -2.8rem;
	}

	h2 {
		font-size: 0.92rem;
		margin-top: 4.5rem;
	}

	.card {
		min-height: 145px;
		padding: 1.2rem;
		border-radius: 16px;
	}

	.card::before {
		height: 5px;
		border-radius: 16px 16px 0 0;
	}
}

/* 🔹 DESKTOP GRANDE: 1200px+ */
@media (min-width: 1200px) {
	.icon img {
		width: 95px;
		max-height: 90px;
	}

	.card {
		min-height: 150px;
	}
}
</style>