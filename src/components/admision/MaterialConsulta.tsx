import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import React, { useState } from 'react';

import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Search,
  TrendingUp,
  X,
} from 'lucide-react';

import {
  Viewer,
  Worker,
} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../ui/utils';

type Material = {
  id: number;
  title: string;
  type: string;
  year: string;
  subject: string;
  downloads: number;
  tags: string[];
  uploadDate: string;
  url: string;
};
const materials: Material[] = [
  {
    id: 1,
    title: "Examen de Ingreso I/2023 - Matemáticas",
    type: "examen",
    year: "2023",
    subject: "Matemáticas",
    downloads: 1250,
    tags: ["resuelto", "formato actual"],
    uploadDate: "2023-12-15",
    url: "assets/examen.pdf",
  },
  {
    id: 2,
    title: "Temario Oficial Física 2024",
    type: "temario",
    year: "2024",
    subject: "Física",
    downloads: 3400,
    tags: ["oficial", "nuevo"],
    uploadDate: "2024-01-10",
    url: "assets/examen.pdf",
  },
  {
    id: 3,
    title: "Banco de Preguntas Química",
    type: "guia",
    year: "2023",
    subject: "Química",
    downloads: 890,
    tags: ["práctica"],
    uploadDate: "2023-11-20",
    url: "assets/examen.pdf",
  },
  {
    id: 4,
    title: "Examen de Ingreso II/2022 - Lenguaje",
    type: "examen",
    year: "2022",
    subject: "Lenguaje",
    downloads: 560,
    tags: ["resuelto", "formato antiguo"],
    uploadDate: "2022-08-15",
    url: "assets/examen.pdf",
  },
  {
    id: 5,
    title: "Guía de Biología para Curso Pre-Universitario",
    type: "guia",
    year: "2024",
    subject: "Biología",
    downloads: 2100,
    tags: ["recomendado"],
    uploadDate: "2024-01-05",
    url: "assets/examen.pdf",
  },
  {
    id: 6,
    title: "Solucionario Examen Prueba de Suficiencia Académica I/2023",
    type: "solucionario",
    year: "2023",
    subject: "General",
    downloads: 4500,
    tags: ["popular"],
    uploadDate: "2023-12-20",
    url: "assets/examen.pdf",
  },
];
const recommendedBooks = [
  {
    title: "Álgebra de Baldor",
    subject: "Matemáticas",
    description: "Texto clásico para fundamentos algebraicos",
  },
  {
    title: "Física Conceptual - Paul Hewitt",
    subject: "Física",
    description: "Introducción clara a conceptos físicos",
  },
  {
    title: "Química - Raymond Chang",
    subject: "Química",
    description: "Química general universitaria",
  },
];

export function MaterialConsulta() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [previewModal, setPreviewModal] = useState<
    (typeof materials)[0] | null
  >(null);
  const filteredMaterials = materials
    .filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType.length === 0 || selectedType.includes(item.type);
      const matchesSubject =
        selectedSubject.length === 0 || selectedSubject.includes(item.subject);
      return matchesSearch && matchesType && matchesSubject;
    })
    .sort(
      (a, b) =>
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  const topDownloads = [...materials]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);
  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const downloadPdf = (url: string) => {
    const link = document.createElement("a");
    const name = url.split("/").at(-1) || "guia.pdf";
    link.href = url;
    link.download = name;
    link.click();
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="space-y-8 pb-20">
      {/* Top Downloads Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900">Más Descargados</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topDownloads.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Download className="w-3 h-3" />
                    <span>{item.downloads.toLocaleString()} descargas</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FilterIcon className="w-4 h-4" /> Filtros
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">
                  Tipo de Material
                </h4>
                <div className="space-y-2">
                  {["examen", "temario", "guia", "solucionario"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                          selectedType.includes(type)
                            ? "bg-blue-600 border-blue-600"
                            : "border-slate-300 group-hover:border-blue-400"
                        )}
                      >
                        {selectedType.includes(type) && (
                          <CheckIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedType.includes(type)}
                        onChange={() =>
                          toggleFilter(selectedType, setSelectedType, type)
                        }
                      />
                      <span className="text-sm text-slate-600 capitalize">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">
                  Materia
                </h4>
                <div className="space-y-2">
                  {[
                    "Matemáticas",
                    "Física",
                    "Química",
                    "Biología",
                    "Lenguaje",
                  ].map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                          selectedSubject.includes(subject)
                            ? "bg-blue-600 border-blue-600"
                            : "border-slate-300 group-hover:border-blue-400"
                        )}
                      >
                        {selectedSubject.includes(subject) && (
                          <CheckIcon className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedSubject.includes(subject)}
                        onChange={() =>
                          toggleFilter(
                            selectedSubject,
                            setSelectedSubject,
                            subject
                          )
                        }
                      />
                      <span className="text-sm text-slate-600">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Books */}
          <Card className="p-5 bg-emerald-50 border-emerald-200">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Libros Recomendados
              </h3>
            </div>
            <div className="space-y-3">
              {recommendedBooks.map((book, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3">
                  <h4 className="font-semibold text-slate-900 text-xs mb-1">
                    {book.title}
                  </h4>
                  <p className="text-[10px] text-emerald-700 font-medium mb-1">
                    {book.subject}
                  </p>
                  <p className="text-[10px] text-slate-600">
                    {book.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div id="material-buscador" className="scroll-mt-40 relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              data-material-search="true"
              type="text"
              placeholder="Buscar exámenes, temarios, guías..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>


          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 overflow-x-auto pb-2">
            <span className="whitespace-nowrap">Material de Consulta</span>
            {(selectedType.length > 0 || selectedSubject.length > 0) && (
              <ChevronRight className="w-4 h-4" />
            )}
            {selectedType.map((t) => (
              <Badge key={t} variant="neutral" className="capitalize">
                {t}
              </Badge>
            ))}
            {selectedSubject.map((s) => (
              <Badge key={s} variant="neutral">
                {s}
              </Badge>
            ))}
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-slate-600">
            Mostrando <strong>{filteredMaterials.length}</strong>{" "}
            {filteredMaterials.length === 1 ? "resultado" : "resultados"}
            <span className="text-slate-400 ml-2">
              • Ordenado por más reciente
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((item) => (
              <Card key={item.id} hoverEffect className="flex flex-col group">
                {/* Thumbnail */}
                <div className="h-40 bg-slate-100 relative flex items-center justify-center border-b border-slate-100 group-hover:bg-blue-50 transition-colors">
                  <FileText className="w-16 h-16 text-slate-300 group-hover:text-blue-300 transition-colors" />
                  <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                    {item.tags.includes("nuevo") && (
                      <Badge variant="danger">NUEVO</Badge>
                    )}
                    {item.tags.includes("recomendado") && (
                      <Badge variant="success">RECOMENDADO</Badge>
                    )}
                    {item.tags.includes("popular") && (
                      <Badge variant="warning">POPULAR</Badge>
                    )}
                    {item.tags.includes("formato actual") && (
                      <Badge variant="default">FORMATO ACTUAL</Badge>
                    )}
                    {item.tags.includes("formato antiguo") && (
                      <Badge variant="neutral">FORMATO ANTIGUO</Badge>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
                      {item.year}
                    </span>
                    <span>•</span>
                    <span>{item.subject}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{item.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{formatDate(item.uploadDate)}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-slate-600"
                      onClick={() => setPreviewModal(item)}
                    >
                      <Eye className="w-4 h-4 mr-2" /> Vista Previa
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3"
                      onClick={() => downloadPdf(item.url)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ margin: 0 }}
          onClick={() => setPreviewModal(null)}
        >
          <Card
            className="max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {previewModal.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="bg-slate-100 px-2 py-1 rounded">
                      {previewModal.year}
                    </span>
                    <span>{previewModal.subject}</span>
                    <span>•</span>
                    <span>{previewModal.downloads} descargas</span>
                    <span>•</span>
                    <span>{previewModal.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewModal(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-100 rounded-xl h-80 flex items-center justify-center mb-6">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={previewModal.url}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => downloadPdf(previewModal.url)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Documento
                </Button>
                <Button variant="outline" onClick={() => setPreviewModal(null)}>
                  Cerrar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
