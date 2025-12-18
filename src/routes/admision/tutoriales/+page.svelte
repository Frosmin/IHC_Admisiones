<script>
  let currentView = 'main';
  let currentType = '';
  let currentTutorial = '';
  let isAnimating = false;
  let lightboxImage = null;

  function showTutorials(type) {
    isAnimating = true;
    setTimeout(() => {
      currentType = type;
      currentView = type;
      isAnimating = false;
    }, 300);
  }

  function showMainButtons() {
    isAnimating = true;
    setTimeout(() => {
      currentView = 'main';
      isAnimating = false;
    }, 300);
  }

  function showTutorialDetail(type, tutorial) {
    isAnimating = true;
    setTimeout(() => {
      currentTutorial = tutorial;
      currentView = 'detail';
      isAnimating = false;
    }, 300);
  }

  function backToTutorials() {
    isAnimating = true;
    setTimeout(() => {
      currentView = currentType;
      isAnimating = false;
    }, 300);
  }

  function openLightbox(imageSrc) {
    lightboxImage = imageSrc;
  }

  function closeLightbox() {
    lightboxImage = null;
  }

  function getBreadcrumbs() {
    if (currentView === 'main') return ['Inicio', 'Tutoriales'];
    if (currentView === 'psa') return ['Inicio', 'Tutoriales', 'PSA'];
    if (currentView === 'pcu') return ['Inicio', 'Tutoriales', 'PCU'];
    if (currentView === 'detail') {
      const tutorialNames = {
        foto: 'Foto Digital',
        formulario: 'Formulario',
        pago: 'Métodos de Pago'
      };
      return ['Inicio', 'Tutoriales', currentType.toUpperCase(), tutorialNames[currentTutorial]];
    }
    return [];
  }

  $: breadcrumbs = getBreadcrumbs();
</script>

<!-- Lightbox para imágenes -->
{#if lightboxImage}
  <div class="lightbox" on:click={closeLightbox}>
    <div class="lightbox-content" on:click|stopPropagation>
      <button class="lightbox-close" on:click={closeLightbox}>✕</button>
      <img src={lightboxImage} alt="Vista ampliada" />
    </div>
  </div>
{/if}

<div class="page-container">
  <!-- Breadcrumbs -->
  <div class="breadcrumbs-wrapper">
    <div class="breadcrumbs">
      {#each breadcrumbs as crumb, index}
        <span class="breadcrumb-item" class:active={index === breadcrumbs.length - 1}>
          {crumb}
        </span>
        {#if index < breadcrumbs.length - 1}
          <span class="breadcrumb-separator">›</span>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Vista Principal -->
  {#if currentView === 'main'}
    <div class="main-content" class:animating={isAnimating}>
      <div class="header-section">
        <h1 class="main-title">Tutoriales</h1>
        <p class="subtitle">Videos explicativos, guías paso a paso e imágenes ilustrativas</p>
      </div>
      
      <div class="cards-container">
        <div class="tutorial-main-card psa" on:click={() => showTutorials('psa')} on:keydown={(e) => e.key === 'Enter' && showTutorials('psa')} role="button" tabindex="0">
          <div class="card-content">
            <div class="icon-wrapper psa-icon">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                <path d="M8 7h8"></path>
                <path d="M8 11h8"></path>
              </svg>
            </div>
            <h2 class="card-title">PSA</h2>
            <p class="card-description">Prueba de Suficiencia Académica</p>
          </div>
        </div>
        
        <div class="tutorial-main-card pcu" on:click={() => showTutorials('pcu')} on:keydown={(e) => e.key === 'Enter' && showTutorials('pcu')} role="button" tabindex="0">
          <div class="card-content">
            <div class="icon-wrapper pcu-icon">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h2 class="card-title">PCU</h2>
            <p class="card-description">Curso Pre Universitario</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Vista de Lista de Tutoriales -->
  {#if currentView === 'psa' || currentView === 'pcu'}
    <div class="tutorial-content" class:animating={isAnimating}>
      <div class="content-wrapper">
        <button class="btn-back" on:click={showMainButtons}>
          <svg class="icon-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver al inicio
        </button>
        
        <div class="header-section">
          <h1 class="section-title">
            Tutoriales {currentView === 'psa' ? 'PSA' : 'PCU'}
          </h1>
          <p class="section-subtitle">
            {currentView === 'psa' ? 'Prueba de Suficiencia Académica' : 'Curso Pre Universitario'}
          </p>
        </div>
        
        <div class="tutorial-items-grid">
          <div class="tutorial-item-card" on:click={() => showTutorialDetail(currentView, 'foto')} on:keydown={(e) => e.key === 'Enter' && showTutorialDetail(currentView, 'foto')} role="button" tabindex="0">
            <div class="item-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
            </div>
            <div class="item-content">
              <h3 class="item-title">Foto Digital</h3>
              <p class="item-description">Requisitos y cómo subir tu fotografía</p>
            </div>
          </div>
          
          <div class="tutorial-item-card" on:click={() => showTutorialDetail(currentView, 'formulario')} on:keydown={(e) => e.key === 'Enter' && showTutorialDetail(currentView, 'formulario')} role="button" tabindex="0">
            <div class="item-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path>
              </svg>
            </div>
            <div class="item-content">
              <h3 class="item-title">Formulario de Inscripción</h3>
              <p class="item-description">Paso a paso para completar tus datos</p>
            </div>
          </div>
          
          <div class="tutorial-item-card" on:click={() => showTutorialDetail(currentView, 'pago')} on:keydown={(e) => e.key === 'Enter' && showTutorialDetail(currentView, 'pago')} role="button" tabindex="0">
            <div class="item-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <path d="M1 10h22"></path>
              </svg>
            </div>
            <div class="item-content">
              <h3 class="item-title">Métodos de Pago</h3>
              <p class="item-description">Opciones disponibles para realizar el pago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Vista de Detalle -->
  {#if currentView === 'detail'}
    <div class="detail-content" class:animating={isAnimating}>
      <div class="content-wrapper">
        <button class="btn-back" on:click={backToTutorials}>
          <svg class="icon-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver a tutoriales
        </button>
        
        {#if currentTutorial === 'foto'}
          <div class="detail-header">
            <h2 class="detail-title">Guía para la Foto Digital</h2>
            <p class="detail-subtitle">Asegúrate de cumplir todos los requisitos</p>
          </div>
          
  <div class="images-grid">
  <div class="tutorial-image" on:click={() => openLightbox('/foto-guia-1.png')} on:keydown={(e) => e.key === 'Enter' && openLightbox('/foto-guia-1.png')} role="button" tabindex="0">
    <img src="/foto-guia-1.png" alt="Ejemplo correcto de foto digital" class="tutorial-img" />
  </div>
  <div class="tutorial-image" on:click={() => openLightbox('/foto-guia-2.png')} on:keydown={(e) => e.key === 'Enter' && openLightbox('/foto-guia-2.png')} role="button" tabindex="0">
    <img src="/foto-guia-2.png" alt="Requisitos de foto digital" class="tutorial-img" />
  </div>
</div>

          <div class="alert-box warning">
            <div class="alert-icon">⚠️</div>
            <div class="alert-content">
              <strong>IMPORTANTE:</strong>
              <p>La fotografía debe cumplir con los siguientes requisitos técnicos</p>
            </div>
          </div>
          
          <div class="requirements-card">
            <h3 class="requirements-title">Especificaciones Técnicas</h3>
            <div class="requirements-grid">
              <div class="requirement-item">
                <div class="req-icon">✓</div>
                <div class="req-content">
                  <strong>Fondo blanco</strong>
                  <p>Sin objetos en el fondo</p>
                </div>
              </div>
              
              <div class="requirement-item">
                <div class="req-icon">✓</div>
                <div class="req-content">
                  <strong>300 x 300 píxeles</strong>
                  <p>Dimensiones exactas</p>
                </div>
              </div>
              
              <div class="requirement-item">
                <div class="req-icon">✓</div>
                <div class="req-content">
                  <strong>Formato JPG</strong>
                  <p>Extensión .jpg o .jpeg</p>
                </div>
              </div>
              
              <div class="requirement-item">
                <div class="req-icon">✓</div>
                <div class="req-content">
                  <strong>Máximo 50 KB</strong>
                  <p>Tamaño de archivo</p>
                </div>
              </div>
            </div>
          </div>
          
        {:else if currentTutorial === 'formulario'}
  <div class="detail-header">
    <h2 class="detail-title">Formulario de Inscripción</h2>
    <p class="detail-subtitle">Completa correctamente cada campo</p>
  </div>
  
  {#if currentType === 'psa'}
    <!-- VIDEO PARA PSA -->
    <div class="video-container">
      <div class="video-wrapper">
        <video controls class="tutorial-video">
          <source src="/video-formulario-psa.mp4" type="video/mp4">
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
    
    <div class="alert-box warning">
      <div class="alert-icon">⚠️</div>
      <div class="alert-content">
        <strong>IMPORTANTE:</strong>
        <p>Todos los datos deben coincidir con tu Cédula de Identidad</p>
      </div>
    </div>
    
  {:else}
    <!-- IMÁGENES PARA PCU -->
    <div class="images-grid">
      <div class="tutorial-image" on:click={() => openLightbox('/formulario-pcu-1.png')} on:keydown={(e) => e.key === 'Enter' && openLightbox('/formulario-pcu-1.png')} role="button" tabindex="0">
        <img src="/formulario-pcu-1.png" alt="Guía de llenado de formulario PCU - Parte 1" class="tutorial-img" />
      </div>
      <div class="tutorial-image" on:click={() => openLightbox('/formulario-pcu-2.png')} on:keydown={(e) => e.key === 'Enter' && openLightbox('/formulario-pcu-2.png')} role="button" tabindex="0">
        <img src="/formulario-pcu-2.png" alt="Guía de llenado de formulario PCU - Parte 2" class="tutorial-img" />
      </div>
    </div>
    
    <div class="alert-box warning">
      <div class="alert-icon">⚠️</div>
      <div class="alert-content">
        <strong>IMPORTANTE:</strong>
        <p>Verifica que todos los datos coincidan con tu Cédula de Identidad</p>
      </div>
    </div>
  {/if}
  
  <!-- PASOS (SE MUESTRAN PARA AMBOS) -->
  <div class="steps-container">
    <h3 class="subsection-title">Pasos para completar:</h3>
    
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Datos Personales</h4>
        <p>Nombres completos, apellidos y fecha de nacimiento</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Documento de Identidad</h4>
        <p>Número de CI y lugar de expedición</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Dirección</h4>
        <p>Ciudad, zona, calle y número</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Contacto</h4>
        <p>Teléfono celular y correo electrónico</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>Datos Académicos</h4>
        <p>Colegio, ciudad y gestión de egreso</p>
      </div>
    </div>
  </div>
  
  <div class="alert-box info">
    <div class="alert-icon">💡</div>
    <div class="alert-content">
      <strong>Consejo:</strong>
      <p>Ten a mano tu CI y certificado de bachiller antes de comenzar</p>
    </div>
  </div>       
        {:else if currentTutorial === 'pago'}
  <div class="detail-header">
    <h2 class="detail-title">Métodos de Pago</h2>
    <p class="detail-subtitle">Elige la opción que prefieras</p>
  </div>
  
  <!-- IMÁGENES DE MÉTODOS DE PAGO -->
  <div class="payment-images-main">
    <h3 class="payment-images-title">Guías visuales de pago:</h3>
    <div class="images-grid">
      <div class="tutorial-image" on:click={() => openLightbox('/pago-qr.png')} on:keydown={(e) => e.key === 'Enter' && openLightbox('/pago-qr.png')} role="button" tabindex="0">
        <img src="/pago-qr.png" alt="Guía de pago electrónico con QR" class="tutorial-img" />
        <p class="image-caption">Pago Electrónico - QR</p>
      </div>
      <div class="tutorial-image" on:click={() => openLightbox('/pago-fisico.png')} on:keydown={(e) => e.key === 'Enter' && openLightbox('/pago-fisico.png')} role="button" tabindex="0">
        <img src="/pago-fisico.png" alt="Guía de pago en caja física" class="tutorial-img" />
        <p class="image-caption">Pago Físico - Caja Facultativa</p>
      </div>
    </div>
  </div>
  
  <div class="payment-methods">
    <div class="payment-card">
      <div class="payment-header">
        <div class="payment-icon building">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"></path>
          </svg>
        </div>
        <h3>Pago en Ventanilla</h3>
      </div>
      <div class="payment-body">
        <p>Realiza tu pago en nuestras oficinas:</p>
        <ul class="payment-list">
          <li>Campus Central - Caja Principal</li>
          <li>Lunes a Viernes: 8:00 - 12:00 y 14:30 - 18:00</li>
          <li>Lleva tu código de estudiante y CI</li>
        </ul>
      </div>
    </div>
    
    <div class="payment-card">
      <div class="payment-header">
        <div class="payment-icon qr">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </div>
        <h3>Código QR Simple</h3>
      </div>
      <div class="payment-body">
        <p>Escanea desde tu app de banco móvil</p>
        <ul class="payment-list">
          <li>Abre la app de tu banco</li>
          <li>Selecciona "Pagar con QR"</li>
          <li>Escanea el código proporcionado</li>
          <li>Confirma el monto y completa el pago</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="alert-box warning">
    <div class="alert-icon">⚠️</div>
    <div class="alert-content">
      <strong>NO OLVIDES:</strong>
      <p>Sube el comprobante en la sección "Documentos" de tu perfil</p>
    </div>
  </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  }

  .page-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }

  /* Breadcrumbs */
  .breadcrumbs-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .breadcrumbs {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .breadcrumb-item {
    font-size: 0.9rem;
    color: #64748b;
    transition: all 0.3s;
  }

  .breadcrumb-item.active {
    color: #dc2626;
    font-weight: 600;
  }

  .breadcrumb-separator {
    color: #cbd5e1;
  }

  /* Animaciones mejoradas */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .main-content, .tutorial-content, .detail-content {
    animation: fadeInUp 0.6s ease-out;
  }

  .animating {
    opacity: 0;
    transform: translateY(20px);
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Header Section */
  .header-section {
    margin-bottom: 3rem;
    text-align: center;
    animation: scaleIn 0.5s ease-out 0.2s both;
  }

  .main-title {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #1e40af 0%, #dc2626 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    animation: float 3s ease-in-out infinite;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #64748b;
  }

  .section-title {
    font-size: 2.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e40af 0%, #dc2626 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: #64748b;
  }

  /* Cards Container */
  .cards-container {
    display: flex;
    justify-content: center;
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
    flex-wrap: wrap;
  }

  /* Tutorial Main Cards */
  .tutorial-main-card {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 3px solid transparent;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 380px;
height: 380px;
display: flex;
align-items: center;
justify-content: center;
position: relative;
overflow: hidden;
}
.tutorial-main-card::before {
content: '';
position: absolute;
top: -2px;
left: -2px;
right: -2px;
bottom: -2px;
background: linear-gradient(135deg, #1e40af, #dc2626);
border-radius: 20px;
opacity: 0;
transition: opacity 0.4s;
z-index: -1;
}
.tutorial-main-card.psa::before {
background: linear-gradient(135deg, #1e40af, #3b82f6);
}
.tutorial-main-card.pcu::before {
background: linear-gradient(135deg, #dc2626, #ef4444);
}
.tutorial-main-card:hover {
transform: translateY(-12px) scale(1.02);
box-shadow: 0 20px 60px rgba(30, 64, 175, 0.3);
}
.tutorial-main-card:hover::before {
opacity: 1;
}
.card-content {
text-align: center;
width: 100%;
position: relative;
z-index: 1;
}
.icon-wrapper {
width: 160px;
height: 160px;
margin: 0 auto 2rem;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
.tutorial-main-card:hover .icon-wrapper {
transform: scale(1.15) rotate(5deg);
box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}
.psa-icon {
background: linear-gradient(135deg, #1e40af, #3b82f6);
}
.pcu-icon {
background: linear-gradient(135deg, #dc2626, #ef4444);
}
.card-icon {
width: 80px;
height: 80px;
color: white;
filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
.card-title {
font-size: 2.8rem;
font-weight: 800;
color: #1e3a8a;
margin-bottom: 0.75rem;
transition: all 0.3s;
}
.tutorial-main-card:hover .card-title {
color: #1e40af;
transform: scale(1.05);
}
.card-description {
font-size: 1.15rem;
color: #64748b;
line-height: 1.6;
font-weight: 500;
}
/* Back Button */
.btn-back {
display: inline-flex;
align-items: center;
gap: 0.75rem;
background: linear-gradient(135deg, #1e40af, #3b82f6);
color: white;
border: none;
padding: 1rem 2rem;
border-radius: 12px;
font-size: 1.05rem;
font-weight: 600;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
margin-bottom: 2.5rem;
box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}
.btn-back:hover {
background: linear-gradient(135deg, #1e3a8a, #2563eb);
transform: translateX(-8px);
box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4);
}
.icon-back {
width: 22px;
height: 22px;
transition: transform 0.3s;
}
.btn-back:hover .icon-back {
transform: translateX(-4px);
}
/* Tutorial Items Grid */
.tutorial-items-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2.5rem;
margin-top: 2rem;
justify-items: center;
}
.tutorial-item-card {
background: white;
border-radius: 16px;
padding: 2.5rem;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
cursor: pointer;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
border: 2px solid transparent;
text-align: center;
width: 100%;
max-width: 320px;
position: relative;
overflow: hidden;
}
.tutorial-item-card::before {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
height: 4px;
background: linear-gradient(90deg, #1e40af, #dc2626);
transform: scaleX(0);
transition: transform 0.4s;
}
.tutorial-item-card:hover {
transform: translateY(-10px) scale(1.02);
box-shadow: 0 15px 40px rgba(30, 64, 175, 0.2);
border-color: #1e40af;
}
.tutorial-item-card:hover::before {
transform: scaleX(1);
}
.item-icon {
width: 100px;
height: 100px;
border-radius: 16px;
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto 1.5rem;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}
.tutorial-item-card:hover .item-icon {
transform: scale(1.15) rotate(-5deg);
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}
.item-icon.purple {
background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}
.item-icon.blue {
background: linear-gradient(135deg, #1e40af, #3b82f6);
}
.item-icon.green {
background: linear-gradient(135deg, #059669, #10b981);
}
.item-icon svg {
width: 50px;
height: 50px;
color: white;
}
.item-content {
width: 100%;
}
.item-title {
font-size: 1.5rem;
font-weight: 700;
color: #1e40af;
margin-bottom: 0.75rem;
transition: color 0.3s;
}
.tutorial-item-card:hover .item-title {
color: #dc2626;
}
.item-description {
font-size: 1.05rem;
color: #64748b;
line-height: 1.6;
}
/* Detail Header */
.detail-header {
margin-bottom: 3rem;
text-align: center;
animation: scaleIn 0.5s ease-out 0.2s both;
}
.detail-title {
font-size: 2.8rem;
font-weight: 700;
background: linear-gradient(135deg, #1e40af 0%, #dc2626 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
margin-bottom: 0.75rem;
}
.detail-subtitle {
font-size: 1.2rem;
color: #64748b;
}
/* Images Grid */
.images-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2.5rem;
margin: 3rem auto;
max-width: 900px;
justify-items: center;
}
.tutorial-image {
border-radius: 16px;
overflow: hidden;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
background: white;
padding: 1.5rem;
cursor: pointer;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
border: 3px solid transparent;
width: 100%;
max-width: 400px;
}
.tutorial-image:hover {
transform: translateY(-8px) scale(1.03);
box-shadow: 0 15px 40px rgba(30, 64, 175, 0.25);
border-color: #1e40af;
}
.image-placeholder {
aspect-ratio: 16/9;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, #f8fafc, #e0e7ff);
border-radius: 12px;
color: #64748b;
transition: all 0.3s;
}
.tutorial-image:hover .image-placeholder {
background: linear-gradient(135deg, #e0e7ff, #dbeafe);
}
.image-placeholder svg {
width: 56px;
height: 56px;
margin-bottom: 1rem;
transition: transform 0.3s;
}
.tutorial-image:hover .image-placeholder svg {
transform: scale(1.2);
}
.image-placeholder p {
font-size: 1.05rem;
font-weight: 600;
}
/* Lightbox mejorado */
.lightbox {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.95);
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
animation: fadeIn 0.3s ease-out;
backdrop-filter: blur(10px);
}
@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}
.lightbox-content {
position: relative;
max-width: 90%;
max-height: 90%;
animation: scaleIn 0.3s ease-out;
}
.lightbox-content img {
max-width: 100%;
max-height: 90vh;
border-radius: 12px;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
.lightbox-close {
position: absolute;
top: -50px;
right: -10px;
background: white;
color: #dc2626;
border: none;
width: 44px;
height: 44px;
border-radius: 50%;
font-size: 1.8rem;
cursor: pointer;
transition: all 0.3s;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
display: flex;
align-items: center;
justify-content: center;
font-weight: 700;
}
.lightbox-close:hover {
background: #dc2626;
color: white;
transform: rotate(90deg) scale(1.1);
}
/* Alert Boxes */
.alert-box {
display: flex;
gap: 1.25rem;
padding: 1.75rem;
border-radius: 12px;
margin: 2.5rem auto;
border-left: 5px solid;
max-width: 900px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
transition: all 0.3s;
}
.alert-box:hover {
transform: translateX(5px);
box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}
.alert-box.warning {
background: linear-gradient(135deg, #fef3c7, #fde68a);
border-color: #f59e0b;
}
.alert-box.info {
background: linear-gradient(135deg, #dbeafe, #bfdbfe);
border-color: #1e40af;
}
.alert-icon {
font-size: 1.8rem;
flex-shrink: 0;
animation: float 2s ease-in-out infinite;
}
.alert-content {
flex: 1;
line-height: 1.7;
color: #1e3a8a;
}
.alert-content strong {
display: block;
font-weight: 700;
margin-bottom: 0.5rem;
color: #1e40af;
font-size: 1.1rem;
}
.alert-content p {
margin: 0;
font-size: 1.05rem;
}
/* Requirements Card */
.requirements-card {
background: white;
border-radius: 16px;
padding: 2.5rem;
margin: 3rem auto;
border: 3px solid #e5e7eb;
max-width: 1000px;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
transition: all 0.3s;
}
.requirements-card:hover {
border-color: #1e40af;
box-shadow: 0 12px 30px rgba(30, 64, 175, 0.15);
}
.requirements-title {
font-size: 1.8rem;
font-weight: 700;
background: linear-gradient(135deg, #1e40af, #dc2626);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
margin-bottom: 2rem;
text-align: center;
}
.requirements-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
gap: 1.75rem;
justify-items: center;
}
.requirement-item {
display: flex;
gap: 1.25rem;
align-items: flex-start;
padding: 1.5rem;
background: linear-gradient(135deg, #f8fafc, #ffffff);
border-radius: 12px;
border: 2px solid #e5e7eb;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
width: 100%;
max-width: 280px;
}
.requirement-item:hover {
border-color: #1e40af;
transform: translateY(-5px) scale(1.02);
box-shadow: 0 10px 25px rgba(30, 64, 175, 0.15);
}
.req-icon {
flex-shrink: 0;
width: 36px;
height: 36px;
background: linear-gradient(135deg, #059669, #10b981);
color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.3rem;
font-weight: 700;
box-shadow: 0 4px 10px rgba(5, 150, 105, 0.3);
transition: transform 0.3s;
}
.requirement-item:hover .req-icon {
transform: scale(1.15) rotate(360deg);
}
.req-content strong {
display: block;
font-size: 1.1rem;
color: #1e40af;
margin-bottom: 0.35rem;
font-weight: 700;
}
.req-content p {
font-size: 0.95rem;
color: #64748b;
margin: 0;
}
/* Video Container */
.video-container {
margin: 3rem auto;
max-width: 900px;
}
.video-wrapper {
position: relative;
padding-bottom: 56.25%;
height: 0;
overflow: hidden;
border-radius: 16px;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
background: linear-gradient(135deg, #1e293b, #334155);
transition: all 0.3s;
}
.video-wrapper:hover {
box-shadow: 0 15px 45px rgba(30, 64, 175, 0.3);
transform: scale(1.02);
}
.video-placeholder {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;
}
.video-placeholder svg {
width: 72px;
height: 72px;
margin-bottom: 1.25rem;
opacity: 0.9;
transition: all 0.3s;
}
.video-wrapper:hover .video-placeholder svg {
transform: scale(1.2);
opacity: 1;
}
.video-placeholder p {
font-size: 1.3rem;
font-weight: 600;
}
/* Steps Container */
.steps-container {
margin: 3rem auto;
max-width: 900px;
}
.subsection-title {
font-size: 2rem;
font-weight: 700;
background: linear-gradient(135deg, #1e40af, #dc2626);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
margin-bottom: 2rem;
text-align: center;
}
.step-card {
display: flex;
gap: 1.75rem;
align-items: flex-start;
background: white;
padding: 2rem;
border-radius: 12px;
margin-bottom: 1.5rem;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
border: 2px solid #e5e7eb;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.step-card:hover {
transform: translateX(10px) scale(1.02);
border-color: #1e40af;
box-shadow: 0 8px 25px rgba(30, 64, 175, 0.15);
}
.step-number {
flex-shrink: 0;
width: 50px;
height: 50px;
background: linear-gradient(135deg, #1e40af, #3b82f6);
color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
font-weight: 700;
box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
transition: transform 0.3s;
}
.step-card:hover .step-number {
transform: scale(1.15) rotate(360deg);
}
.step-content h4 {
font-size: 1.35rem;
color: #1e40af;
font-weight: 700;
margin-bottom: 0.5rem;
}
.step-content p {
font-size: 1.05rem;
color: #64748b;
line-height: 1.6;
margin: 0;
}
/* Payment Methods */
.payment-methods {
display: grid;
gap: 2.5rem;
margin: 3rem auto;
max-width: 1000px;
}
.payment-card {
background: white;
border-radius: 16px;
overflow: hidden;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
border: 2px solid #e5e7eb;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.payment-card:hover {
transform: translateY(-8px);
box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
border-color: #1e40af;
}
.payment-header {
background: linear-gradient(135deg, #f8fafc, #e0e7ff);
padding: 2rem;
display: flex;
align-items: center;
gap: 1.5rem;
border-bottom: 3px solid #e5e7eb;
}
.payment-icon {
flex-shrink: 0;
width: 70px;
height: 70px;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
transition: transform 0.3s;
}
.payment-card:hover .payment-icon {
transform: scale(1.1) rotate(-5deg);
}
.payment-icon.building {
background: linear-gradient(135deg, #1e40af, #3b82f6);
}
.payment-icon.bank {
background: linear-gradient(135deg, #059669, #10b981);
}
.payment-icon.qr {
background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}
.payment-icon svg {
width: 36px;
height: 36px;
color: white;
}
.payment-header h3 {
font-size: 1.8rem;
color: #1e40af;
font-weight: 700;
margin: 0;
}
.payment-body {
padding: 2.5rem;
}
.payment-body > p {
font-size: 1.1rem;
color: #475569;
margin-bottom: 1.5rem;
font-weight: 600;
}
.payment-list {
list-style: none;
padding: 0;
margin: 0;
}
.payment-list li {
padding: 1rem 1.25rem;
background: linear-gradient(135deg, #f8fafc, #ffffff);
border-radius: 8px;
margin-bottom: 0.875rem;
font-size: 1.05rem;
color: #475569;
border-left: 4px solid #1e40af;
transition: all 0.3s;
}
.payment-list li:hover {
transform: translateX(8px);
background: linear-gradient(135deg, #e0e7ff, #f8fafc);
}
/* Bank Details */
.bank-details {
background: linear-gradient(135deg, #f8fafc, #ffffff);
border-radius: 12px;
padding: 2rem;
border: 2px solid #e5e7eb;
margin-bottom: 2rem;
}
.bank-detail-item {
display: flex;
justify-content: space-between;
align-items: center;
padding: 1.25rem 0;
border-bottom: 2px solid #e5e7eb;
transition: all 0.3s;
}
.bank-detail-item:hover {
padding-left: 10px;
}
.bank-detail-item:last-child {
border-bottom: none;
}
.detail-label {
font-weight: 600;
color: #475569;
font-size: 1.05rem;
}
.detail-value {
font-weight: 700;
color: #1e40af;
font-size: 1.1rem;
}
/* Payment Images Section */
.payment-images-section {
margin-top: 2.5rem;
padding-top: 2rem;
border-top: 2px solid #e5e7eb;
}
.payment-images-title {
font-size: 1.3rem;
font-weight: 700;
color: #1e40af;
margin-bottom: 1.5rem;
text-align: center;
}
.payment-images-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 1.5rem;
justify-items: center;
}
.payment-image {
width: 100%;
max-width: 280px;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
background: white;
padding: 1rem;
cursor: pointer;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
border: 2px solid #e5e7eb;
}
.payment-image:hover {
transform: translateY(-6px) scale(1.03);
box-shadow: 0 12px 30px rgba(30, 64, 175, 0.2);
border-color: #1e40af;
}
.payment-image-placeholder {
aspect-ratio: 4/3;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, #f8fafc, #e0e7ff);
border-radius: 8px;
color: #64748b;
transition: all 0.3s;
}
.payment-image:hover .payment-image-placeholder {
background: linear-gradient(135deg, #e0e7ff, #dbeafe);
}
.payment-image-placeholder svg {
width: 48px;
height: 48px;
margin-bottom: 0.75rem;
transition: transform 0.3s;
}
.payment-image:hover .payment-image-placeholder svg {
transform: scale(1.2) rotate(5deg);
}
.payment-image-placeholder p {
font-size: 1rem;
font-weight: 600;
}
/* QR Placeholder */
.qr-placeholder {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 3rem;
background: linear-gradient(135deg, #f8fafc, #ffffff);
border-radius: 12px;
border: 3px dashed #cbd5e1;
margin-top: 1.5rem;
margin-bottom: 2rem;
transition: all 0.3s;
}
.qr-placeholder:hover {
border-color: #1e40af;
background: linear-gradient(135deg, #e0e7ff, #f8fafc);
}
.qr-placeholder svg {
width: 120px;
height: 120px;
color: #64748b;
margin-bottom: 1rem;
transition: transform 0.3s;
}
.qr-placeholder:hover svg {
transform: scale(1.1) rotate(5deg);
}
.qr-placeholder p {
font-size: 1.15rem;
color: #64748b;
font-weight: 600;
margin: 0;
}
/* Responsive */
@media (max-width: 768px) {
.page-container {
padding: 1rem;
}
.main-title {
  font-size: 2.5rem;
}

.section-title, .detail-title {
  font-size: 2rem;
}

.cards-container {
  flex-direction: column;
  align-items: center;
}

.tutorial-main-card {
  width: 100%;
  max-width: 400px;
  height: auto;
  aspect-ratio: 1;
}

.tutorial-items-grid {
  grid-template-columns: 1fr;
}

.requirements-grid {
  grid-template-columns: 1fr;
}

.step-card {
  flex-direction: row;
  text-align: left;
}

.bank-detail-item {
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  align-items: center;
}

.payment-images-grid {
  grid-template-columns: 1fr;
}

.icon-wrapper {
  width: 120px;
  height: 120px;
}

.card-icon {
  width: 60px;
  height: 60px;
}
}
/* Estilos para las imágenes reales */
.tutorial-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  background: white;
  max-height: 400px;
}
/* Estilos para las imágenes reales */
.tutorial-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  background: white;
  max-height: 500px;
}

/* Sección principal de imágenes de pago */
.payment-images-main {
  margin: 3rem auto;
  max-width: 1100px;
}

.payment-images-main .payment-images-title {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1e40af, #dc2626);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  text-align: center;
}

/* Caption debajo de imágenes */
.image-caption {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e40af;
  text-align: center;
}

/* Ajustes para las imágenes de métodos de pago */
.payment-images-main .images-grid {
  max-width: 1000px;
  margin: 0 auto;
}

.payment-images-main .tutorial-image {
  max-width: 450px;
}
</style>

