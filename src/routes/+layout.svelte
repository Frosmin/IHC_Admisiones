<script>
  import "../lib/styles.css";
  import { onMount } from "svelte";
  let open = false;

  import { page } from '$app/stores';

$: breadcrumbItems = getBreadcrumbs($page.url.pathname);

function getBreadcrumbs(pathname) {
  const paths = pathname.split('/').filter(Boolean);
  const items = [];
  let currentPath = '';
  
  const labels = {
    'proceso': 'Proceso de Admisión',
    'tablones': 'Tablón de Anuncios',
    'material': 'Material de Consulta',
    'recursos': 'Recursos de Apoyo',
    'tutoriales': 'Guías y Tutoriales'
  };
  
  paths.forEach(path => {
    if (path === 'admision') return;
    
    currentPath += `/${path}`;
    items.push({
      label: labels[path] || path,
      href: `/admision${currentPath}`
    });
  });
  
  return items;
}

  const nav = [
    { title: "Proceso de Admisión", href: "/admision/proceso" },
    { title: "Tablón de Anuncios", href: "/admision/tablones" },
    { title: "Material de Consulta", href: "/admision/material" },
    { title: "Recursos de Apoyo", href: "/admision/recursos" },
    { title: "Guías y Tutoriales", href: "/admision/tutoriales" },
    { title: "FCyT", href: "https://fcyt.umss.edu.bo", external: true }
  ];

  onMount(() => {
    const hide = () => (open = false);
    window.addEventListener("hashchange", hide);
    return () => window.removeEventListener("hashchange", hide);
  });
</script>

<header class="topnav" role="banner">
  <div class="topnav-inner">
    <a class="brand" href="/">
      <img src="/logo-fcyt.jpg" alt="FCyT" class="logo" />
      <div>
        <div class="title">FACULTAD DE CIENCIAS Y TECNOLOGÍA</div>
        <div class="subtitle">Admisiones</div>
      </div>
    </a>

    <nav aria-label="Principal" class="navlinks">
      {#each nav as n}
        {#if n.external}
          <a href={n.href} rel="noopener" target="_blank">{n.title}</a>
        {:else}
          <a href={n.href}>{n.title}</a>
        {/if}
      {/each}
    </nav>

    <img src="/logo-UMSS.png" alt="UMSS" class="logo-right" />

    <button class="mobile-toggle" aria-expanded={open} aria-controls="mobile-menu" on:click={() => (open = !open)}>
      {#if open}✕{:else}☰{/if}
    </button>
  </div>

  {#if open}
    <div id="mobile-menu" class="mobile-menu">
      <div class="mobile-links">
        {#each nav as n}
          <a href={n.href}>{n.title}</a>
        {/each}
      </div>
    </div>
  {/if}
</header>

{#if $page.url.pathname !== '/'}
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Inicio</a></li>
      {#each breadcrumbItems as item, i}
        <li>
          <span class="separator">→</span>
          {#if i === breadcrumbItems.length - 1}
            <span class="current">{item.label}</span>
          {:else}
            <a href={item.href}>{item.label}</a>
          {/if}
        </li>
      {/each}
    </ol>
  
  </nav>
{/if}
<!-- CONTENIDO PRINCIPAL - Scroll natural del navegador -->
<main class="main-content">
  <slot />
</main>

<footer class="site-footer" role="contentinfo">
  <div class="footer-content">
    <div class="footer-section">
      <img src="/umss-blanco.jpg" alt="UMSS" class="footer-logo" />
      <p class="footer-copyright">DERECHOS RESERVADOS © 2025</p>
      <p class="footer-university">UNIVERSIDAD MAYOR DE SAN SIMÓN</p>
    </div>
    
    <div class="footer-section footer-center">
      <p class="footer-date">{new Date().toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p class="footer-founded">Fundado el 21 de septiembre de 1979</p>
    </div>
    
    <div class="footer-section footer-address">
      <p class="footer-title">Dirección</p>
      <p>Calle Sucre y parque la Torre</p>
      <p>Fono: 591-4-4231765</p>
      <p>Cochabamba – Bolivia</p>
    </div>
  </div>
</footer>

<style>
  :global(*) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:global(body) {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white;
}
  
  :global(html, body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

:global(body) {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
  background: white;
  
  
}

  /* 🔹 HEADER - Mobile First */
  
  :global(.topnav) {
  background: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
}

  :global(.topnav-inner) {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0.6rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  :global(.brand) {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    color: #023875 !important;
  }

  :global(.logo) {
    height: 40px;
    object-fit: contain;
  }

  :global(.brand .title) {
    color: #023875 !important;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.2;
  }

  :global(.brand .subtitle) {
    font-size: 0.65rem;
    opacity: 0.7;
    color: #023875;
  }

  :global(.navlinks) {
    display: none;
  }

  :global(.logo-right) {
    display: none;
  }

  :global(.mobile-toggle) {
    display: block;
    color: #023875 !important;
    background: transparent !important;
    border: 2px solid #023875 !important;
    font-size: 1.3rem;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  :global(.mobile-toggle:hover) {
    background: #f3f4f6 !important;
  }

  .mobile-menu {
    background: white;
    border-top: 1px solid #e5e7eb;
    padding: 1rem;
  }

  .mobile-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mobile-links a {
    color: #023875;
    text-decoration: none;
    padding: 0.7rem;
    border-radius: 8px;
    transition: background 0.2s;
    font-size: 0.9rem;
  }

  .mobile-links a:hover {
    background: #f3f4f6;
  }

  /* 🔹 FOOTER - Siempre al final */
  
  .site-footer {
    background: #003770;
	color: white;
	padding: 1.5rem 1rem;
	flex-shrink: 0;
	margin-top: 0;
  }

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
  }

  .footer-section {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: center;
  }

  .footer-section p {
    margin: 0;
    line-height: 1.4;
    font-size: 0.85rem;
  }

  .footer-logo {
    height: 55px;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  .footer-copyright {
    font-weight: 600;
    font-size: 0.8rem !important;
  }

  .footer-university {
    font-weight: 700;
    font-size: 0.9rem !important;
  }

  .footer-date {
    font-size: 0.85rem !important;
    margin-bottom: 0.3rem;
    font-weight: 500;
  }

  .footer-founded {
    font-style: italic;
    font-size: 0.8rem !important;
    opacity: 0.9;
  }

  .footer-title {
    font-weight: 700;
    font-size: 0.9rem !important;
    margin-bottom: 0.3rem !important;
  }

  /* 🔹 TABLETS: 640px+ */
  @media (min-width: 640px) {
    :global(.topnav-inner) {
      padding: 0.7rem 1.2rem;
      gap: 1.5rem;
    }

    :global(.logo) {
      height: 45px;
    }

    :global(.brand .title) {
      font-size: 0.85rem;
    }

    :global(.brand .subtitle) {
      font-size: 0.7rem;
    }

    .footer-content {
      flex-direction: row;
      justify-content: space-around;
      text-align: left;
    }

    .footer-section {
      align-items: flex-start;
    }

    .footer-center {
      text-align: center;
      align-items: center;
    }

    .footer-address {
      text-align: right;
      align-items: flex-end;
    }
  }

  /* 🔹 DESKTOP: 1100px+ */
  @media (min-width: 1100px) {
    /* 🔹 ESTRUCTURA BASE - Scroll natural del navegador */
    :global(html, body) {
      overflow-y: auto; /* Scroll natural */
    }

    /* 🔹 HEADER DESKTOP */
    :global(.topnav-inner) {
      padding: 0.8rem 1.5rem;
      gap: 2rem;
    }

    :global(.logo) {
      height: 50px;
    }

    :global(.brand) {
      gap: 0.8rem;
    }

    :global(.brand .title) {
      font-size: 0.95rem;
    }

    :global(.brand .subtitle) {
      font-size: 0.78rem;
    }

    :global(.navlinks) {
      flex: 1;
      display: flex;
      gap: 1.2rem;
      justify-content: center;
    }

    :global(.navlinks a) {
      color: #023875 !important;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.88rem;
      padding: 0.5rem 0.8rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    :global(.navlinks a:hover) {
      background: #f3f4f6;
      color: #0069b4 !important;
    }

    :global(.logo-right) {
      display: block;
      height: 50px;
      object-fit: contain;
    }

    :global(.mobile-toggle) {
      display: none;
    }

    /* 🔹 FOOTER DESKTOP - Compacto */
    .site-footer {
      padding: 1rem 1.5rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.5rem;
      align-items: start;
      text-align: left;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      align-items: flex-start;
    }

    .footer-section p {
      margin: 0;
      line-height: 1.3;
      font-size: 0.7rem;
    }

    .footer-logo {
      height: 45px;
      object-fit: contain;
      margin-bottom: 0.4rem;
      align-self: flex-start;
    }

    .footer-copyright {
      font-weight: 600;
      font-size: 0.65rem !important;
    }

    .footer-university {
      font-weight: 700;
      font-size: 0.75rem !important;
    }

    .footer-center {
      text-align: center;
      align-items: center;
    }

    .footer-date {
      font-size: 0.7rem !important;
      margin-bottom: 0.2rem;
    }

    .footer-founded {
      font-style: italic;
      font-size: 0.65rem !important;
      opacity: 0.9;
    }

    .footer-address {
      text-align: right;
      align-items: flex-end;
    }

    .footer-title {
      font-weight: 700;
      font-size: 0.75rem !important;
      margin-bottom: 0.2rem !important;
    }
  }
.breadcrumbs {
  background: white;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  position: sticky;
  top: 90px;
  z-index: 99;
}
.breadcrumbs ol {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  padding-left: 1.5rem;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.breadcrumbs a {
  color: #0069b4;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumbs a:hover {
  color: #023875;
  text-decoration: underline;
}

.separator {
  color: #6b7280;
  margin: 0 0.2rem;
}

.current {
  color: #374151;
  font-weight: 500;
}
</style>