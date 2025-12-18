import React, { useState } from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { jsPDF } from 'jspdf';
import {
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from 'lucide-react';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../ui/utils';

export function RecursosApoyo() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const faqs = [{
    question: '¿Cuándo abren las inscripciones?',
    answer: 'Las inscripciones abren el 15 de enero y cierran el 1 de febrero para Prueba de Suficiencia Académica. Para Curso Pre-Universitario, consulta el cronograma específico.'
  }, {
    question: '¿Puedo cambiar de carrera después de inscribirme?',
    answer: 'No, una vez confirmado el pago no es posible cambiar de carrera. Verifica bien tu elección antes de pagar.'
  }, {
    question: '¿Qué documentos necesito para inscribirme?',
    answer: 'Necesitas: CI vigente, Diploma de Bachiller legalizado, Certificado de Nacimiento original, fotografías 4x4 fondo rojo, y comprobante de pago.'
  }, {
    question: '¿Hay cupos limitados?',
    answer: 'Sí, cada carrera tiene un número limitado de cupos. Se asignan según el puntaje obtenido en el examen de admisión.'
  }];
  const staffContacts = [{
    name: 'Lic. María Rodríguez',
    position: 'Coordinadora de Admisiones',
    phone: '4 454-2563',
    email: 'mrodriguez@fcyt.umss.edu.bo'
  }, {
    name: 'Ing. Carlos Mendoza',
    position: 'Responsable Prueba Suficiencia Académica',
    phone: '4 454-2564',
    email: 'cmendoza@fcyt.umss.edu.bo'
  }, {
    name: 'Lic. Ana Flores',
    position: 'Responsable Curso Pre-Universitario',
    phone: '4 454-2565',
    email: 'aflores@fcyt.umss.edu.bo'
  }];
  const isOfficeOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day === 0) return false; // Domingo cerrado
    if (day === 6) return hour >= 9 && hour < 12; // Sábado 9-12
    return hour >= 8 && hour < 17; // Lunes-Viernes 8-17
  };

  const socialLinks = [
    {
      name: "Telegram",
      color: "bg-[#229ED9]",
      label: "Canal Oficial de Noticias",
      purpose: "Noticias y convocatorias",
      href: "https://t.me/fcyt_umss",
      qrSrc: "/assets/qr-telegram.png",
    },
    {
      name: "WhatsApp",
      color: "bg-[#25D366]",
      label: "Grupos de Ayuda",
      purpose: "Consultas rápidas",
      href: "https://whatsapp.com/channel/0029Vae7Oov0wajtTjMSnj1v",
      qrSrc: "/assets/qr-whatsapp.png",
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2]",
      label: "Página de la Facultad",
      purpose: "Eventos y galería",
      href: "https://www.facebook.com/share/16YMhCTSmc/",
      qrSrc: "/assets/qr-facebook.png",
    },
  ];

  const MAPS_LINK = "https://maps.app.goo.gl/rC9v54w7L2hF6pLQ9";
  const MAPS_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.37331257622!2d-66.14561619999999!3d-17.393863300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373fef33857cf%3A0x676cd0a74a6599f2!2sFacultad%20de%20Ciencias%20y%20Tecnolog%C3%ADa!5e0!3m2!1ses!2sbo!4v1765918526136!5m2!1ses!2sbo";

  const fetchAsDataURL = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`No se pudo cargar: ${url}`);
    const blob = await res.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleDownloadPosterQR = async () => {
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 48;

      // Título
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Póster de Códigos QR – Admisión FCyT UMSS", margin, 60);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text("Escanea el QR para unirte a los canales oficiales:", margin, 82);

      // Layout (3 columnas)
      const gap = 18;
      const qrSize = 140; // tamaño del QR en el PDF
      const startY = 120;

      const usableW = pageWidth - margin * 2;
      const cellW = (usableW - gap * 2) / 3;

      for (let i = 0; i < socialLinks.length; i++) {
        const s = socialLinks[i];

        const x = margin + i * (cellW + gap);
        const y = startY;

        // cargar imagen QR y meterla al PDF
        const dataUrl = await fetchAsDataURL(s.qrSrc);

        // QR
        doc.addImage(dataUrl, "PNG", x + (cellW - qrSize) / 2, y, qrSize, qrSize);

        // Etiqueta
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(s.name, x + cellW / 2, y + qrSize + 22, { align: "center" });

        // Link (pequeño)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(s.href, x + cellW / 2, y + qrSize + 40, {
          align: "center",
          maxWidth: cellW,
        });
      }

      // Nombre del archivo
      doc.save("Poster_QR_FCYT_UMSS.pdf");
    } catch (err) {
      console.error(err);
      alert("No se pudo generar el PDF. Revisa que los QRs existan en /public/assets/");
    }
  };


  return <div className="space-y-12 pb-20">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          ¿Necesitas Ayuda?
        </h2>
        <p className="text-lg text-slate-600">
          Estamos aquí para orientarte en cada paso de tu proceso de admisión.
          Contáctanos por cualquiera de nuestros canales oficiales.
        </p>
      </div>

      {/* Office Status Banner */}
      <Card className={cn('p-4 border-2', isOfficeOpen() ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200')}>
        <div className="flex items-center justify-center gap-3">
          <div className={cn('w-3 h-3 rounded-full animate-pulse', isOfficeOpen() ? 'bg-emerald-500' : 'bg-slate-400')} />
          <span className="font-semibold text-slate-900">
            {isOfficeOpen() ? '🟢 Oficinas Abiertas Ahora' : '🔴 Oficinas Cerradas'}
          </span>
          <span className="text-slate-600">
            {isOfficeOpen() ? 'Lun-Vie: 08:30-16:30 | Sáb: 09:00-12:00' : 'Vuelve en horario de atención'}
          </span>
        </div>
      </Card>

      {/* Main Contact Card */}
      <Card className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-8">
            <div>
              <h3 className="text-blue-200 font-medium mb-2 uppercase tracking-wider text-sm">
                Llámanos
              </h3>
              <a href="tel:+59144542563" className="text-4xl md:text-5xl font-bold hover:text-blue-200 transition-colors flex items-center gap-4">
                <Phone className="w-8 h-8 md:w-10 md:h-10" />4 454-2563
              </a>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Correo Electrónico</h4>
                  <a href="mailto:admision@fcyt.umss.edu.bo" className="text-blue-200 hover:text-white transition-colors">
                    admision@fcyt.umss.edu.bo
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-300 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Horario de Atención</h4>
                  <p className="text-blue-200">
                    Lunes a Viernes: 08:30 - 16:30
                    <br />
                    Sábados: 09:00 - 12:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-300 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Ubicación</h4>
                <p className="text-blue-200 mb-4">
                  Edificio de la Facultad de Ciencias y Tecnología
                  <br />
                  Campus Universitario, Calle Sucre frente al Parque La Torre
                  <br />
                  Cochabamba, Bolivia
                </p>
                <a href={MAPS_LINK} target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white"
                    type="button"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver en Google Maps
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <section id="personal-contacto" className="scroll-mt-40">
        {/* Staff Contact Cards */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Personal de Contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staffContacts.map((staff, idx) => <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-1">
                      {staff.name}
                    </h4>
                    <p className="text-sm text-blue-600 mb-3">{staff.position}</p>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${staff.phone.replace(/\s/g, '')}`} className="hover:text-blue-600">
                          {staff.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${staff.email}`} className="hover:text-blue-600 text-xs">
                          {staff.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>)}
          </div>
        </section>
      </section>

      <section id="redes-sociales" className="scroll-mt-40">
        {/* Redes Sociales y QRs */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Síguenos en Redes Sociales
            </h3>
            <Button
              variant="outline"
              className="hidden md:flex"
              onClick={handleDownloadPosterQR}
              type="button"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar Póster QR
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social) => (<Card key={social.name} className="p-8 flex flex-col items-center text-center hover:shadow-lg transition-all group">
                <div className={`w-16 h-16 rounded-2xl ${social.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="font-bold text-2xl">{social.name[0]}</span>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  {social.name}
                </h4>
                <p className="text-slate-500 mb-2 text-sm">{social.label}</p>
                <p className="text-xs text-slate-400 mb-6">
                  Úsalo para: {social.purpose}
                </p>

                <div className="bg-slate-100 p-4 rounded-xl mb-6">
                  <img
                    src={social.qrSrc}
                    alt={`QR ${social.name}`}
                    className="w-32 h-32 rounded-lg object-contain bg-white"
                  />
                </div>

                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <Button className="w-full" variant="outline">
                    Unirse ahora
                  </Button>
                </a>
              </Card>))}
          </div>
        </section>
      </section>

      {/* FAQ Section */}
      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Preguntas Frecuentes
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => <Card key={idx} className="overflow-hidden">
              <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={cn('w-5 h-5 text-slate-400 transition-transform shrink-0', expandedFaq === idx && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {expandedFaq === idx && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} className="overflow-hidden">
                    <div className="px-5 pb-5 pl-14">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </Card>)}
        </div>
      </section>

      <section id="formulario-contacto" className="scroll-mt-40">
        {/* Contact Form */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Envíanos tu Consulta
          </h3>
          <Card className="p-8">
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre Completo
                  </label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Juan Pérez" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="juan@ejemplo.com" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mensaje
                </label>
                <textarea className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="Escribe tu consulta aquí..." value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Enviar Consulta
              </Button>
            </form>
          </Card>
        </section>
      </section>

      <section id="mapa" className="scroll-mt-40">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Mapa interactivo
        </h3>

        <Card className="p-0 overflow-hidden border border-slate-200">
          <div className="w-full h-80">
            <iframe
              src={MAPS_EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Ubicación FCyT UMSS"
            />
          </div>
        </Card>

        <div className="mt-3 flex justify-end">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en Google Maps
          </a>
        </div>
      </section>


      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/59160396079" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40 group">
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="absolute right-20 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chatea con nosotros
        </span>
      </a>
    </div>;
}