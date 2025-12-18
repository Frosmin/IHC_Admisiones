import {
  useEffect,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Calendar,
  Clock,
  FileText,
  Filter,
  Star,
} from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../ui/utils';

export type Category = "all" | "convocatorias" | "examenes" | "noticias";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  status: string;
  deadline?: string;
  urgent: boolean;
  image: string;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Convocatoria Examen de Admisión II/2025",
    excerpt:
      "Se convoca a todos los bachilleres interesados en postular a las carreras de la FCYT para la gestión 2025 presentarse para el examen de admisión en las fechas previstas.",
    date: "Hace 2 días",
    category: "convocatorias",
    status: "abierto",
    deadline: "Faltan 5 días",
    urgent: true,
    image:
      "https://www.soycest.mx/hs-fs/hubfs/cest/blog/2018/08/CEST_13-consejos-para-que-apruebes-el-examen-de-admision-para-universidad.jpg?width=744&name=CEST_13-consejos-para-que-apruebes-el-examen-de-admision-para-universidad.jpg",
  },
  {
    id: 2,
    title: "Publicación de Resultados Curso Pre-Universitario - 3er Parcial",
    excerpt:
      "Ya se encuentran disponibles las notas del tercer parcial del Curso Pre-Universitario.",
    date: "Hace 5 horas",
    category: "examenes",
    status: "nuevo",
    urgent: false,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Ampliación de inscripciones Prueba de Suficiencia Académica",
    excerpt:
      "Por determinaciones superiores se amplía el plazo de inscripciones para la Prueba de Suficiencia Académica hasta el 5 de febrero. Por determinaciones superiores se amplía el plazo de inscripciones para la Prueba de Suficiencia Académica hasta el 5 de febrero.",
    date: "Hace 1 semana",
    category: "noticias",
    status: "importante",
    urgent: false,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Cronograma de asignación de aulas",
    excerpt:
      "Consulta tu aula y horario para el examen de admisión del domingo 20 de febrero.",
    date: "Hace 3 días",
    category: "examenes",
    status: "proximamente",
    deadline: "Faltan 10 días",
    urgent: false,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Suspensión de actividades administrativas",
    excerpt:
      "Por motivos de mantenimiento, no habrá atención en ventanillas el día viernes.",
    date: "Hace 2 semanas",
    category: "noticias",
    status: "cerrado",
    urgent: false,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Nueva carrera de Ingeniería de Datos",
    excerpt:
      "La facultad abre una nueva carrera a partir de esta gestión. Conoce el plan de estudios.",
    date: "Hace 3 semanas",
    category: "noticias",
    status: "nuevo",
    urgent: false,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
];

export function TablonAnuncios({
  initialFilter = "all",
}: {
  initialFilter?: Category;
}) {
  const [activeFilter, setActiveFilter] = useState<Category>(initialFilter);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const filteredNews =
    activeFilter === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === activeFilter);

  const urgentItem = newsItems.find((item) => item.urgent);

  // This week's highlights
  const thisWeekHighlights = newsItems
    .filter(
      (item) =>
        item.date.includes("horas") ||
        item.date.includes("días") ||
        item.date === "Hace 1 semana"
    )
    .slice(0, 3);

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (item: NewsItem) => {
    setSelectedNews(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {/* Urgent Banner */}
        {urgentItem && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-900 rounded-xl overflow-hidden shadow-lg border border-blue-800"
          >
            <div className="flex flex-col md:flex-row">
              <div className="bg-red-600 px-6 py-4 flex items-center justify-center md:w-48 shrink-0">
                <div className="text-center">
                  <AlertTriangle className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="block text-white font-bold uppercase tracking-wider text-sm">
                    Urgente
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {urgentItem.title}
                  </h3>
                  <p className="text-blue-100 mb-3">{urgentItem.excerpt}</p>
                  <div className="flex items-center gap-4">
                    {urgentItem.deadline && (
                      <Badge className="bg-red-500/20 text-red-200 border-red-500/30">
                        {urgentItem.deadline}
                      </Badge>
                    )}
                    <span className="text-sm text-blue-300">
                      {urgentItem.date}
                    </span>
                  </div>
                </div>

                <Button
                  className="bg-white text-blue-900 hover:bg-blue-50 shrink-0"
                  onClick={() => openModal(urgentItem)}
                >
                  Ver Detalles <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Últimas Actualizaciones
            </h2>
            <p className="text-slate-500">
              Mantente informado sobre convocatorias y noticias
            </p>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-100 p-1 rounded-lg">
            {[
              { id: "all", label: "Todas", icon: Filter },
              { id: "convocatorias", label: "Convocatorias", icon: Bell },
              { id: "examenes", label: "Exámenes", icon: FileText },
              { id: "noticias", label: "Noticias", icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as Category)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeFilter === tab.id
                    ? "bg-white text-blue-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span
                  className={cn(
                    "ml-1 px-1.5 py-0.5 rounded-full text-[10px]",
                    activeFilter === tab.id
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-200 text-slate-600"
                  )}
                >
                  {tab.id === "all"
                    ? newsItems.length
                    : newsItems.filter((i) => i.category === tab.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <Card
                key={item.id}
                hoverEffect
                className="flex flex-col h-full group"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.status === "nuevo" && (
                      <Badge variant="danger" filled>
                        NUEVO
                      </Badge>
                    )}
                    {item.status === "abierto" && (
                      <Badge variant="success" filled>
                        ABIERTO
                      </Badge>
                    )}
                    {item.status === "cerrado" && (
                      <Badge variant="neutral" filled>
                        CERRADO
                      </Badge>
                    )}
                    {item.status === "proximamente" && (
                      <Badge variant="warning" filled>
                        PRÓXIMAMENTE
                      </Badge>
                    )}
                    {item.status === "importante" && (
                      <Badge variant="default" filled>
                        IMPORTANTE
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>

                    {item.deadline && (
                      <span className="ml-auto text-red-600 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.deadline}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1 overflow-ellipsis">
                    {item.excerpt}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-blue-50 group-hover:text-blue-800 group-hover:border-blue-200"
                    onClick={() => openModal(item)}
                  >
                    Leer más
                  </Button>
                </div>
              </Card>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        {isOpen && selectedNews && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
            style={{ marginTop: 0 }}
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl max-w-2xl w-full mx-4 overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen */}
              <div className="relative md:h-56 h-40">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-sm font-semibold hover:bg-white"
                >
                  ✕
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2">{selectedNews.title}</h2>

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedNews.date}</span>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">
                  {selectedNews.excerpt}
                </p>

                {selectedNews.deadline && (
                  <p className="text-red-600 font-medium">
                    ⏰ {selectedNews.deadline}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar - This Week's Highlights */}
      <aside className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="sticky top-4">
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900">Lo Más Importante</h3>
            </div>

            <p className="text-sm text-slate-600 mb-4">Esta semana</p>

            <div className="space-y-3">
              {thisWeekHighlights.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => openModal(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4" size="sm">
              Ver todas las noticias
            </Button>
          </Card>

          {/* Mini Calendar */}
          <Card className="p-6 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900">Noviembre 2025</h3>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-slate-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2;
                const hasEvent = [5, 10, 15, 20, 25].includes(day);

                return (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square flex items-center justify-center text-sm rounded-md transition-colors",
                      day < 1 || day > 31
                        ? "text-slate-300"
                        : "text-slate-700 hover:bg-slate-100",
                      hasEvent &&
                        "bg-blue-100 text-blue-800 font-bold hover:bg-blue-200"
                    )}
                  >
                    {day > 0 && day <= 31 ? day : ""}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
              <div className="w-3 h-3 rounded bg-blue-100"></div>
              <span>Fechas importantes</span>
            </div>
          </Card>
        </div>
      </aside>
    </div>
  );
}
