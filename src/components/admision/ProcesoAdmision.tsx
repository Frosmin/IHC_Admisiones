import { useState } from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { jsPDF } from 'jspdf';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  DollarSign,
  Download,
  FileText,
  HelpCircle,
  Image as ImageIcon,
} from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../ui/utils';

type TimelineEvent = {
  date: string;
  title: string;
  status: string;
  type: string;
};

export function ProcesoAdmision() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const upcomingDates = [
    {
      date: "15 Ene",
      title: "Inicio Inscripciones",
      daysLeft: 5,
    },
    {
      date: "20 Feb",
      title: "Examen Primera Opción",
      daysLeft: 41,
    },
    {
      date: "05 Mar",
      title: "Publicación Resultados",
      daysLeft: 55,
    },
  ];
  const timelineEvents: Array<TimelineEvent> = [
    {
      date: "15 Ene 2025",
      title: "Apertura de Inscripciones",
      status: "confirmed",
      type: "milestone",
    },
    {
      date: "01 Feb 2025",
      title: "Cierre de Inscripciones para Prueba de Suficiencia Académica",
      status: "confirmed",
      type: "deadline",
    },
    {
      date: "10 Feb 2025",
      title: "Asignación de Aulas",
      status: "tentative",
      type: "info",
    },
    {
      date: "20 Feb 2025",
      title: "Examen de Admisión (Prueba de Suficiencia Académica)",
      status: "tentative",
      type: "exam",
    },
    {
      date: "05 Mar 2025",
      title: "Publicación de Notas",
      status: "tentative",
      type: "result",
    },
  ];
  const costBreakdown = [
    {
      item: "Inscripción Prueba de Suficiencia Académica",
      cost: 200,
      required: true,
    },
    {
      item: "Inscripción Curso Pre-Universitario",
      cost: 350,
      required: true,
    },
    {
      item: "Legalización de documentos",
      cost: 50,
      required: true,
    },
    {
      item: "Fotografías",
      cost: 15,
      required: true,
    },
    {
      item: "Material de estudio (opcional)",
      cost: 80,
      required: false,
    },
  ];
  const documentExamples = [
    {
      name: "Cédula de Identidad",
      description: "Fotocopia simple, vigente, ambos lados",
      example: "CI válida hasta 2025 o posterior",
      icon: "🪪",
    },
    {
      name: "Diploma de Bachiller",
      description: "Fotocopia legalizada por autoridad competente",
      example: "Sellado por Dirección Distrital de Educación",
      icon: "📜",
    },
    {
      name: "Certificado de Nacimiento",
      description: "Original reciente (no mayor a 3 meses)",
      example: "Emitido por SERECI",
      icon: "📄",
    },
    {
      name: "Fotografía 4x4",
      description: "2 unidades, fondo rojo, reciente",
      example: "Vestimenta formal, sin lentes oscuros",
      icon: "📸",
    },
  ];
  const faqs = [
    {
      question: "¿Puedo pagar en cuotas?",
      answer:
        "No, el pago debe realizarse en una sola cuota. Sin embargo, puedes elegir entre Prueba de Suficiencia Académica (Bs. 200) o Curso Pre-Universitario (Bs. 350) según tu presupuesto.",
    },
    {
      question: "¿Qué incluye el costo de inscripción?",
      answer:
        "El costo incluye: procesamiento de inscripción, derecho a rendir el examen, emisión de resultados y certificado de participación. Para Curso Pre-Universitario también incluye acceso a clases y plataforma virtual.",
    },
    {
      question: "¿Hay descuentos disponibles?",
      answer:
        "Sí, existe un 20% de descuento para estudiantes con excelencia académica (promedio mayor a 85) y para hijos de docentes UMSS. Consulta requisitos en ventanilla.",
    },
    {
      question: "¿Qué pasa si no apruebo? ¿Debo pagar de nuevo?",
      answer:
        "Sí, cada proceso de admisión requiere un nuevo pago de inscripción. Te recomendamos prepararte bien antes de inscribirte.",
    },
    {
      question: "¿Los costos de legalización están incluidos?",
      answer:
        "No, los costos de legalización de documentos (aprox. Bs. 50) son adicionales y deben gestionarse en las entidades correspondientes antes de inscribirte.",
    },
  ];

  const documents: string[] = [
    "Fotocopia de Cédula de Identidad vigente",
    "Diploma de Bachiller (fotocopia legalizada)",
    "Certificado de Nacimiento original",
    "Formulario de Pre-inscripción impreso",
    "Comprobante de Depósito Bancario original",
    "Fotografía 4x4 fondo rojo (2 unidades)",
  ];

  const TimelineCard = ({
    event,
    align,
  }: {
    event: TimelineEvent;
    align: string;
  }) => (
    <div
      className={`
      bg-white p-4 rounded-xl border border-slate-200 shadow-sm
      w-full max-w-none lg:max-w-xs
      ${align === "right" ? "text-right" : ""}
    `}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded">
          {event.date}
        </span>

        {event.status === "tentative" && (
          <Badge variant="warning">Tentativo</Badge>
        )}
        {event.status === "confirmed" && (
          <Badge variant="success">Confirmado</Badge>
        )}
      </div>

      <h5 className="font-semibold text-slate-900 mb-1">{event.title}</h5>
      <p className="text-xs text-slate-500">2025</p>
    </div>
  );

  const TimelineItem = ({
    event,
    idx,
  }: {
    event: TimelineEvent;
    idx: number;
  }) => {
    const isConfirmed = event.status === "confirmed";
    const isLeft = idx % 2 === 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]"
      >
        {/* Columna izquierda */}
        <div className="hidden lg:flex justify-end pr-8">
          {isLeft && <TimelineCard event={event} align="right" />}
        </div>

        {/* Punto */}
        <div className="relative flex justify-start lg:justify-center">
          <span
            className={`
            z-10 w-4 h-4 rounded-full border-2 mt-1
            ${
              isConfirmed
                ? "bg-emerald-500 border-emerald-200"
                : "bg-amber-400 border-amber-200"
            }
          `}
          />
        </div>

        {/* Columna derecha (mobile + desktop) */}
        <div className="flex pl-6 lg:pl-8">
          {!isLeft || (
            <div className="lg:hidden w-full">
              <TimelineCard event={event} align="rigth" />
            </div>
          )}
          {!isLeft && <TimelineCard event={event} align="left" />}
        </div>
      </motion.div>
    );
  };

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev: Record<string, boolean>) => ({
      ...prev,
      [doc]: !prev[doc],
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Checklist de Documentos", 14, 20);

    doc.setFontSize(11);

    let y = 35;

    documents.forEach((item: string) => {
      const isChecked = !!checkedDocs[item];

      const status: string = isChecked ? "[X]" : "[OK]";

      doc.text(`${status} ${item}`, 14, y);

      y += 8;
    });

    doc.save("checklist-documentos.pdf");
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Proceso de Admisión 2025
        </h2>
        <p className="text-lg text-slate-600">
          Todo lo que necesitas saber para postular a la FCYT-UMSS. Sigue el
          cronograma y prepárate para tu futuro.
        </p>
      </div>

      {/* Sticky Upcoming Dates */}
      <div className="z-30 sticky top-16 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200 rounded-2xl p-4 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-blue-800 font-semibold">
            <Clock className="w-5 h-5" />
            <span>Próximas Fechas</span>
          </div>
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingDates.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-lg border border-slate-100"
              >
                <div>
                  <span className="block text-xs text-slate-500 uppercase tracking-wider">
                    {item.date}
                  </span>
                  <span className="font-medium text-slate-900 text-sm">
                    {item.title}
                  </span>
                </div>
                <div className="text-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold min-w-[3rem]">
                  {item.daysLeft} días
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <section id="costos" className="scroll-mt-40">
      {/* Cost Summary Card */}
        <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Resumen de Costos
              </h3>
              <p className="text-slate-600">
                Planifica tu inversión en educación
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-emerald-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {costBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {item.required && (
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        item.required
                          ? "font-medium text-slate-900"
                          : "text-slate-600"
                      )}
                    >
                      {item.item}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">
                    Bs. {item.cost}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-center">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-600 mb-2">
                  Costo Total Estimado
                </p>
                <div className="text-4xl font-bold text-emerald-700 mb-1">
                  Bs. 265 - 415
                </div>
                <p className="text-xs text-slate-500">
                  Prueba de Suficiencia Académica: Bs. 265
                </p>
                <p className="text-xs text-slate-500">
                  Curso Pre-Universitario: Bs. 415
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-blue-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Los costos pueden variar. Consulta en ventanilla para
                  información actualizada.
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>
      
      {/* Prueba de Suficiencia Académica vs Curso Pre-Universitario Comparison */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-1 bg-blue-800 rounded-full"></div>
          <h3 className="text-2xl font-bold text-slate-900">
            ¿Prueba de Suficiencia Académica o Curso Pre-Universitario? Elige tu modalidad
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 border-t-4 border-t-blue-600 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div> 
                <h4 className=" mt-2 text-2xl font-bold text-slate-900">Prueba de Suficiencia Académica</h4>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-bold text-blue-800">
                  Bs. 200
                </span>
                <span className="text-xs text-slate-500">Pago único</span>
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex-1 flex items-center -mt-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Un solo examen general</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Temario completo de secundaria</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Resultados inmediatos</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
                <p className="font-semibold text-blue-900 text-sm mb-1">
                  Modalidad recomendada si...
                </p>
                <p className="text-blue-800 text-sm">
                  Tienes una base sólida y prefieres estudiar por tu cuenta a tu
                  propio ritmo.
                </p>
              </div>

              {/*<Button className="w-full">Ver Requisitos Prueba de Suficiencia Académica</Button>*/}
            </div>
          </Card>

          <Card className="p-8 border-t-4 border-t-emerald-600 hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="mt-2 text-2xl font-bold text-slate-900">Curso Pre-Universitario</h4>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-bold text-emerald-700">
                  Bs. 350
                </span>
                <span className="text-xs text-slate-500">Curso completo</span>
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex-1 flex items-center -mt-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Clases de nivelación (3 meses)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">3 exámenes parciales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Acceso a plataforma virtual
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mt-6">
                <p className="font-semibold text-emerald-900 text-sm mb-1">
                  Modalidad recomendada si...
                </p>
                <p className="text-emerald-800 text-sm">
                  Necesitas reforzar conocimientos y prefieres una evaluación
                  continua.
                </p>
              </div>

              {/*<Button variant="secondary" className="w-full">
                Ver Requisitos Curso Pre-Universitario
              </Button>*/}
            </div>
          </Card>
        </div>
      </section>

      <section id="cronograma" className="scroll-mt-40">
        {/* Timeline */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-1 bg-blue-800 rounded-full"></div>
            <h3 className="text-2xl font-bold text-slate-900">
              Cronograma Oficial
            </h3>
          </div>

          <div className="relative">
            {/* Línea vertical centrada (desktop) */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-200 hidden lg:block" />

            {/* Línea vertical izquierda (mobile) */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 lg:hidden" />

            <div className="flex flex-col gap-10">
              {timelineEvents.map((event, idx) => (
                <TimelineItem key={idx} event={event} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      </section>

      <section id="documentos" className="scroll-mt-40">
        {/* Document Examples */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-blue-800" />
            <h3 className="text-xl font-bold text-slate-900">
              Guía de Documentos Requeridos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentExamples.map((doc, i) => (
              <Card key={i} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{doc.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-2">{doc.name}</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {doc.description}
                    </p>
                    <div className="bg-blue-50 px-3 py-2 rounded-lg">
                      <p className="text-xs text-blue-800">
                        <strong>Ejemplo:</strong> {doc.example}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </section>

      <section id="checklist" className="scroll-mt-40">
        {/* Checklist */}
        <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-blue-800" />
            <h3 className="text-xl font-bold text-slate-900">
              Checklist de Documentos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200"
              >
                <input
                  className="accent-blue-600"
                  type="checkbox"
                  checked={!!checkedDocs[item]}
                  onChange={() => toggleDoc(item)}
                />
                <span className="text-slate-700">{item}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="primary" className="gap-2" onClick={generatePDF}>
              <Download className="w-4 h-4" />
              Descargar Checklist PDF
            </Button>
          </div>
        </section>
      </section>
      
      <section id="faq-costos" className="scroll-mt-40">
        {/* FAQ Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-blue-800 rounded-full"></div>
            <h3 className="text-2xl font-bold text-slate-900">
              Preguntas Frecuentes sobre Costos
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform shrink-0",
                      expandedFaq === idx && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-14">
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
