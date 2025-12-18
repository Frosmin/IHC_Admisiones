// App.tsx
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  Bell,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  Menu,
  Search,
  X,
} from 'lucide-react';

import { MaterialConsulta } from './components/admision/MaterialConsulta';
import { ProcesoAdmision } from './components/admision/ProcesoAdmision';
import { RecursosApoyo } from './components/admision/RecursosApoyo';
import {
  type Category,
  TablonAnuncios,
} from './components/admision/TablonAnuncios';
import { Tutoriales } from './components/admision/Tutoriales';
import { cn } from './components/ui/utils';

type Tab = "proceso" | "anuncios" | "material" | "apoyo" | "tutoriales" | "fcyt";

type SearchItem = {
  id: string;
  label: string;
  description: string;
  tab?: Tab;
  anchorId?: string;
  focusSelector?: string;
  tablonFilter?: Category;
  url?: string;
  keywords: string[];
  icon: React.ElementType;
};

type GlobalSearchProps = {
  className?: string;
  globalQuery: string;
  setGlobalQuery: (v: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (v: boolean) => void;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  results: SearchItem[];
  selectItem: (item: SearchItem) => void;
  searchWrapRef: React.RefObject<HTMLDivElement>;
};

function GlobalSearch({
  className,
  globalQuery,
  setGlobalQuery,
  isSearchOpen,
  setIsSearchOpen,
  highlightedIndex,
  setHighlightedIndex,
  results,
  selectItem,
  searchWrapRef,
}: GlobalSearchProps) {
  return (
    <div ref={searchWrapRef} className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

      <input
        value={globalQuery}
        onChange={(e) => {
          setGlobalQuery(e.target.value);
          setIsSearchOpen(true);
          setHighlightedIndex(0);
        }}
        onFocus={() => setIsSearchOpen(true)}
        onKeyDown={(e) => {
          if (!isSearchOpen) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.max(i - 1, 0));
          }
          if (e.key === "Enter") {
            e.preventDefault();
            const item = results[highlightedIndex];
            if (item) selectItem(item);
          }
          if (e.key === "Escape") {
            setIsSearchOpen(false);
          }
        }}
        placeholder="Buscar"
        className="w-full pl-9 pr-3 py-2 rounded-xl text-sm border border-slate-200 bg-white shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {isSearchOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
          {results.map((item, idx) => (
            <button
              key={item.id}
              onMouseDown={(e) => e.preventDefault()} // mantiene el foco en el input
              onClick={() => selectItem(item)}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors",
                idx === highlightedIndex && "bg-blue-50"
              )}
            >
              <item.icon className="w-5 h-5 text-slate-500 mt-0.5" />
              <div className="min-w-0">
                <div className="font-semibold text-slate-900">{item.label}</div>
                <div className="text-sm text-slate-500 truncate">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>("proceso");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // (Opcional pero recomendado) filtro del tablón controlado desde App
  const [tablonFilter, setTablonFilter] = useState<Category>("all");

  // Global search state
  const [globalQuery, setGlobalQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  // Navegación “pendiente” para esperar a que renderice el tab antes de scrollear/enfocar
  const [pendingNav, setPendingNav] = useState<{
    tab: Tab;
    anchorId?: string;
    focusSelector?: string;
    tablonFilter?: Category;
    url?: string;
  } | null>(null);

  const tabs = [
    { id: "proceso", label: "Proceso de Admisión", icon: Calendar },
    { id: "anuncios", label: "Tablón de Anuncios", icon: Bell },
    { id: "material", label: "Material de Consulta", icon: BookOpen },
    { id: "apoyo", label: "Recursos de Apoyo", icon: HelpCircle },
    { id: "tutoriales", label: "Tutoriales", icon: GraduationCap },
    {
      id: "fcyt",
      label: "FCYT",
      icon: ExternalLink,
      url: "https://sagaa.fcyt.umss.edu.bo/admision/noticias.php",
    },
  ] as const;

  const SEARCH_ITEMS: SearchItem[] = [
    // PROCESO
    {
      id: "cronograma",
      label: "Cronograma oficial",
      description: "Fechas importantes",
      tab: "proceso",
      anchorId: "cronograma",
      keywords: ["cronograma", "calendario", "fechas", "aulas", "resultados"],
      icon: Calendar,
    },
    {
      id: "costos",
      label: "Costos de admisión",
      description: "Resumen de costos",
      tab: "proceso",
      anchorId: "costos",
      keywords: ["costos", "precio", "pago", "bs", "inscripción"],
      icon: BookOpen,
    },
    {
      id: "documentos",
      label: "Documentos requeridos",
      description: "Guía y ejemplos",
      tab: "proceso",
      anchorId: "documentos",
      keywords: ["documentos", "requisitos", "ci", "diploma", "nacimiento"],
      icon: HelpCircle,
    },
    {
      id: "checklist",
      label: "Checklist de documentos (PDF)",
      description: " ",
      tab: "proceso",
      anchorId: "checklist",
      keywords: ["checklist", "lista", "pdf", "descargar"],
      icon: Download,
    },

    {
      id: "convocatorias",
      label: "Convocatorias",
      description: " ",
      tab: "anuncios",
      tablonFilter: "convocatorias",
      keywords: ["convocatorias", "anuncios", "urgente", "abierto"],
      icon: Bell,
    },
    {
      id: "examenes",
      label: "Noticias de exámenes",
      description: " ",
      tab: "anuncios",
      tablonFilter: "examenes",
      keywords: ["examenes", "notas", "aulas", "resultados"],
      icon: BookOpen,
    },
    {
      id: "noticias",
      label: "Noticias generales",
      description: " ",
      tab: "anuncios",
      tablonFilter: "noticias",
      keywords: ["noticias", "comunicado", "aviso", "importante"],
      icon: Calendar,
    },

    {
      id: "material",
      label: "Material de estudio",
      description: " ",
      tab: "material",
      anchorId: "material-buscador",
      focusSelector: 'input[data-material-search="true"]',
      keywords: ["pdf", "material", "exámenes", "temario", "guías", "solucionario"],
      icon: BookOpen,
    },

    {
      id: "contactos",
      label: "Personal de contacto",
      description: "Teléfonos y correos",
      tab: "apoyo",
      anchorId: "personal-contacto",
      keywords: ["contacto", "personal", "teléfono", "correo", "coordinadora"],
      icon: HelpCircle,
    },
    {
      id: "redes",
      label: "Redes sociales oficiales",
      description: " ",
      tab: "apoyo",
      anchorId: "redes-sociales",
      keywords: ["redes", "telegram", "whatsapp", "facebook"],
      icon: ExternalLink,
    },
    {
      id: "formulario",
      label: "Enviar consulta",
      description: "Formulario",
      tab: "apoyo",
      anchorId: "formulario-contacto",
      keywords: ["formulario", "consulta", "mensaje", "ayuda"],
      icon: HelpCircle,
    },

    // TUTORIALES
    {
      id: "tutoriales-pasos",
      label: "Tutorial",
      description: "Guía paso a paso",
      tab: "tutoriales",
      anchorId: "tutoriales-pasos",
      keywords: ["tutorial", "pasos", "inscripción", "saga", "websis"],
      icon: GraduationCap,
    },
    {
      id: "manual",
      label: "Manual Registro al Sistema",
      description: " ",
      tab: "tutoriales",
      anchorId: "manual-descargable",
      keywords: ["manual", "pdf", "descargar", "guía"],
      icon: Download,
    },

    // EXTERNO
    {
      id: "fcyt",
      label: "Página Oficial FCYT",
      description: " ",
      url: "https://sagaa.fcyt.umss.edu.bo/admision/noticias.php",
      keywords: ["fcyt", "oficial", "web", "noticias"],
      icon: ExternalLink,
    },
  ];

  const results = useMemo(() => {
    const q = globalQuery.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS.slice(0, 8);

    return SEARCH_ITEMS.filter((item) => {
      const haystack = (
        item.label +
        " " +
        item.description +
        " " +
        item.keywords.join(" ")
      ).toLowerCase();
      return haystack.includes(q);
    }).slice(0, 8);
  }, [globalQuery]);

  useEffect(() => {
    setHighlightedIndex((i) => Math.min(i, Math.max(results.length - 1, 0)));
  }, [results.length]);

  const selectItem = (item: SearchItem) => {
    setIsSearchOpen(false);
    setGlobalQuery("");

    if (item.url) {
      window.open(item.url, "_blank");
      return;
    }

    if (item.tablonFilter) setTablonFilter(item.tablonFilter);

    if (item.tab) {
      setPendingNav({
        tab: item.tab,
        anchorId: item.anchorId,
        focusSelector: item.focusSelector,
        tablonFilter: item.tablonFilter,
      });
      setActiveTab(item.tab);
      setIsMobileMenuOpen(false);
    }
  };

  // Click afuera para cerrar sugerencias
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Cuando el tab ya renderizó, scrollea al anchor y/o enfoca input
  useEffect(() => {
    if (!pendingNav) return;
    if (pendingNav.tab !== activeTab) return;

    const t = window.setTimeout(() => {
      if (pendingNav.anchorId) {
        const el = document.getElementById(pendingNav.anchorId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      if (pendingNav.focusSelector) {
        const input = document.querySelector<HTMLInputElement>(pendingNav.focusSelector);
        input?.focus();
      }

      setPendingNav(null);
    }, 250);

    return () => window.clearTimeout(t);
  }, [activeTab, pendingNav]);

  const renderContent = () => {
    switch (activeTab) {
      case "proceso":
        return <ProcesoAdmision />;
      case "anuncios":
        return <TablonAnuncios initialFilter={tablonFilter} />;
      case "material":
        return <MaterialConsulta />;
      case "apoyo":
        return <RecursosApoyo />;
      case "tutoriales":
        return <Tutoriales />;
      default:
        return <ProcesoAdmision />;
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-20">
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 w-full">
              {/* Logo */}
              <a href="/" className="flex items-center gap-4 mr-2 shrink-0">
                <div className="w-14 h-14 bg-blue-900 flex items-center justify-center overflow-hidden">
                  <img src="/assets/fcyt.jpg" alt="FCYT" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 leading-none">
                    Admisión FCYT
                  </h1>
                  <span className="text-xs text-slate-500 font-medium tracking-wider">
                    UMSS 2024
                  </span>
                </div>
              </a>

              {/* Global Search (Desktop) */}
              <div className="w-[320px] xl:w-[310px] shrink-0">
                <GlobalSearch
                  globalQuery={globalQuery}
                  setGlobalQuery={setGlobalQuery}
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                  highlightedIndex={highlightedIndex}
                  setHighlightedIndex={setHighlightedIndex}
                  results={results}
                  selectItem={selectItem}
                  searchWrapRef={searchWrapRef}
                />

              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if ("url" in tab && tab.url) {
                        window.open(tab.url, "_blank");
                        return;
                      }
                      setActiveTab(tab.id as Tab);
                    }}
                    className={cn(
                      "relative h-14 px-4 rounded-md text-sm font-medium transition-colors flex items-center whitespace-nowrap gap-2",
                      activeTab === tab.id
                        ? "text-blue-800 bg-blue-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <tab.icon className={cn("w-5 h-5", activeTab === tab.id && "text-blue-600")} />
                    <span className="hidden xl:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile button (right) */}
            <button
              className="lg:hidden absolute right-0 p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-3">
                {/* Global Search (Mobile) */}
                <GlobalSearch
                  className="w-full"
                  globalQuery={globalQuery}
                  setGlobalQuery={setGlobalQuery}
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                  highlightedIndex={highlightedIndex}
                  setHighlightedIndex={setHighlightedIndex}
                  results={results}
                  selectItem={selectItem}
                  searchWrapRef={searchWrapRef}
                />

                {/* Tabs */}
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if ("url" in tab && tab.url) {
                          window.open(tab.url, "_blank");
                          setIsMobileMenuOpen(false);
                          return;
                        }
                        setActiveTab(tab.id as Tab);
                        setIsMobileMenuOpen(false);
                      }}

                      className={cn(
                        "w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center gap-3",
                        activeTab === tab.id
                          ? "text-blue-800 bg-blue-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}

                  <a
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 relative px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                    href="https://sagaa.fcyt.umss.edu.bo/admision/noticias.php"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    FCYT
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
