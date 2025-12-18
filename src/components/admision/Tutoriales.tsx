import React, { useState } from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  HelpCircle,
  Video,
} from 'lucide-react';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../ui/utils';

const steps = [{
  id: 1,
  title: 'Registro en el Sistema SAGA',
  description: 'Crea tu cuenta de postulante en el sistema oficial.',
  content: 'Ingresa a websis.umss.edu.bo y selecciona la opción "Postulantes". Llena tus datos básicos: Nombre, CI y Correo electrónico válido.',
  warning: 'Usa un correo electrónico al que tengas acceso permanente. Ahí recibirás tu código de verificación.',
  image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800',
  videoUrl: '#',
  sagaExplanation: 'SAGA es el Sistema Académico de Gestión Administrativa de la UMSS. Es la plataforma oficial donde gestionarás todo tu proceso de inscripción.'
}, {
  id: 2,
  title: 'Completar Datos Personales',
  description: 'Llena el formulario con tu información detallada.',
  content: 'Completa todos los campos requeridos: Dirección, fecha de nacimiento, colegio de procedencia y números de contacto.',
  image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
  videoUrl: '#',
  example: 'María completó sus datos en 10 minutos. Tuvo su CI y certificado de bachiller a mano para copiar la información exacta.'
}, {
  id: 3,
  title: 'Selección de Modalidad y Carrera',
  description: 'Elige entre Prueba de Suficiencia Académica o Curso Pre-Universitario y tu carrera de preferencia.',
  content: 'Selecciona "Facultad de Ciencias y Tecnología" y luego elige la carrera a la que postulas. Finalmente marca la modalidad (Prueba de Suficiencia Académica o Curso Pre-Universitario).',
  warning: 'Verifica bien tu selección. Una vez confirmado el pago, no podrás cambiar de carrera ni modalidad.',
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  videoUrl: '#',
  example: 'Juan eligió Ingeniería de Sistemas y modalidad Prueba de Suficiencia Académica. Revisó tres veces antes de confirmar porque sabía que no podría cambiar después.'
}, {
  id: 4,
  title: 'Pago de Inscripción',
  description: 'Genera el código CPT y realiza el pago.',
  content: 'El sistema generará un código CPT. Con este código, dirígete a cualquier entidad financiera autorizada o paga mediante banca móvil.',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
  videoUrl: '#',
  example: 'Ana generó su código CPT y pagó desde su celular usando banca móvil. El proceso tomó 5 minutos y recibió confirmación inmediata.'
}, {
  id: 5,
  title: 'Confirmación y Comprobante',
  description: 'Descarga tu boleta de inscripción oficial.',
  content: '24 horas después del pago, reingresa al sistema para descargar e imprimir tu boleta de inscripción. Este documento es obligatorio para ingresar al examen.',
  image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800',
  videoUrl: '#',
  example: 'Carlos descargó su boleta e imprimió 2 copias: una para el día del examen y otra de respaldo. También guardó el PDF en su correo.'
}];
export function Tutoriales() {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [showHelpModal, setShowHelpModal] = useState<number | null>(null);
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      setExpandedStep(prev => prev ? prev + 1 : null);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setExpandedStep(prev => prev ? prev - 1 : null);
    }
  };
  return <div className="pb-20">
      {/* Sticky Progress Bar */}
      <div className="sticky top-4 z-30 bg-white/90 backdrop-blur-md shadow-lg border border-slate-200 rounded-2xl p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-blue-900">
            Progreso de Inscripción
          </span>
          <span className="text-sm font-medium text-slate-600">
            Paso {currentStep} de {steps.length}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-blue-600 rounded-full" initial={{
          width: 0
        }} animate={{
          width: `${currentStep / steps.length * 100}%`
        }} transition={{
          duration: 0.5
        }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pre-requisites */}
          <Card className="bg-blue-50 border-blue-100 p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Antes de comenzar, asegúrate de tener:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['CI vigente a la mano', 'Correo electrónico activo', 'Fotografía digital fondo rojo', 'Dinero para el pago (Bs. 200/350)'].map((req, i) => <div key={i} className="flex items-center gap-2 text-blue-800 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {req}
                </div>)}
            </div>
          </Card>

          {/* What is SAGA? */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-indigo-600" />
              ¿Qué es SAGA?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              SAGA (Sistema Académico de Gestión Administrativa) es la
              plataforma oficial de la UMSS donde realizarás todo tu proceso de
              inscripción. Es un sistema seguro y centralizado que gestiona la
              información de todos los postulantes.
            </p>
          </Card>

          {/* Accordion Steps */}
          <section id="tutoriales-pasos" className="scroll-mt-40">
            <div className="space-y-4">
              {steps.map(step => <Card key={step.id} className={cn('transition-all duration-300 border-2', expandedStep === step.id ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-slate-200')}>
                  <button onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)} className="w-full flex items-center gap-4 p-6 text-left">
                    <div className={cn('w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors shrink-0', expandedStep === step.id || currentStep > step.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500')}>
                      {step.id}
                    </div>
                    <div className="flex-1">
                      <h4 className={cn('font-bold text-lg', expandedStep === step.id ? 'text-blue-900' : 'text-slate-700')}>
                        {step.title}
                      </h4>
                      <p className="text-slate-500 text-sm">{step.description}</p>
                    </div>
                    <ChevronDown className={cn('w-5 h-5 text-slate-400 transition-transform', expandedStep === step.id && 'rotate-180')} />
                  </button>

                  <AnimatePresence>
                    {expandedStep === step.id && <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: 'auto',
                  opacity: 1
                }} exit={{
                  height: 0,
                  opacity: 0
                }} className="overflow-hidden">
                        <div className="p-6 pt-0 pl-[5.5rem]">
                          <p className="text-slate-700 mb-6 leading-relaxed">
                            {step.content}
                          </p>

                          {step.sagaExplanation && <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                              <p className="text-sm text-indigo-900 font-medium mb-1">
                                Ahora te encuentras en SAGA
                              </p>
                              <p className="text-sm text-indigo-800">
                                {step.sagaExplanation}
                              </p>
                            </div>}

                          {step.warning && <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
                              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                              <p className="text-sm text-amber-800">
                                {step.warning}
                              </p>
                            </div>}

                          {step.example && <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                              <p className="text-sm text-emerald-900 font-medium mb-1">
                                📖 Ejemplo Real
                              </p>
                              <p className="text-sm text-emerald-800">
                                {step.example}
                              </p>
                            </div>}

                          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group cursor-zoom-in mb-6">
                            <img src={step.image} alt={step.title} className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />

                            {/* Annotation Overlay Mockup */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              Click para ampliar
                            </div>
                          </div>

                          {/* Help Button */}
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm" onClick={() => setShowHelpModal(step.id)} className="flex-1">
                              <HelpCircle className="w-4 h-4 mr-2" />
                              ¿Necesitas ayuda con este paso?
                            </Button>
                            {step.videoUrl && <Button variant="outline" size="sm" className="flex-1">
                                <Video className="w-4 h-4 mr-2" />
                                Ver Video Tutorial
                              </Button>}
                          </div>
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </Card>)}
            </div>
          </section>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1} className="w-32">
              <ArrowLeft className="w-4 h-4 mr-2" /> Anterior
            </Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length} className="w-32">
              Siguiente <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Right Column: Help Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-32 space-y-6">
            <Card className="p-6 bg-slate-900 text-white">
              <h3 className="font-bold text-xl mb-4">
                ¿Problemas con el registro?
              </h3>
              <p className="text-slate-300 mb-6 text-sm">
                Si tienes dificultades técnicas o dudas sobre el llenado del
                formulario, contáctanos.
              </p>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 mb-3">
                <Video className="w-4 h-4 mr-2" />
                Ver Video Tutorial
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                Contactar Soporte
              </Button>
            </Card>
            
            <section id="manual-descargable" className="scroll-mt-40">
              {/* Download Manual */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <h3 className="font-bold text-slate-900 mb-3">
                  Manual Descargable
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Descarga la guía completa en PDF con capturas de pantalla de
                  cada paso.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Manual PDF
                </Button>
              </Card>
            </section>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHelpModal(null)}>
          <Card className="max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                ¿Necesitas ayuda con este paso?
              </h3>
              <p className="text-slate-600 mb-6">
                Nuestro equipo está disponible para ayudarte. Elige cómo
                prefieres contactarnos:
              </p>

              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Video className="w-5 h-5 mr-3" />
                  Ver video tutorial de este paso
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <HelpCircle className="w-5 h-5 mr-3" />
                  Leer preguntas frecuentes
                </Button>
                <Button className="w-full justify-start bg-[#25D366] text-white hover:bg-[#20BA5A]">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chatear por WhatsApp
                </Button>
              </div>

              <Button variant="ghost" className="w-full mt-4" onClick={() => setShowHelpModal(null)}>
                Cerrar
              </Button>
            </div>
          </Card>
        </div>}
    </div>;
}