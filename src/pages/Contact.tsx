
import ContactForm from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactInfo = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="bg-directorio-50 p-3 rounded-lg mr-4">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
      <div className="text-gray-600 text-sm">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-directorio-700 mb-4">Contacto</h1>
        <p className="text-xl text-gray-600">
          Estamos aquí para ayudarte. Contacta con nosotros para cualquier consulta o información adicional.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 border-directorio-100">
            <h2 className="font-bold text-xl text-directorio-700 mb-6">Información de contacto</h2>
            
            <div className="space-y-6">
              <ContactInfo icon={<Mail className="h-5 w-5 text-directorio-500" />} title="Email">
                <a href="mailto:info@mizonacomercial.com" className="hover:text-directorio-500 transition-colors">
                  info@mizonacomercial.com
                </a>
              </ContactInfo>
              
              <ContactInfo icon={<Phone className="h-5 w-5 text-directorio-500" />} title="Teléfono">
                <a href="tel:+34123456789" className="hover:text-directorio-500 transition-colors">
                  +34 123 456 789
                </a>
              </ContactInfo>
              
              <ContactInfo icon={<MapPin className="h-5 w-5 text-directorio-500" />} title="Dirección">
                <p>Calle Principal 123</p>
                <p>28001 Madrid, España</p>
              </ContactInfo>
              
              <ContactInfo icon={<Clock className="h-5 w-5 text-directorio-500" />} title="Horario">
                <p>Lunes - Viernes: 9:00 - 18:00</p>
                <p>Sábado - Domingo: Cerrado</p>
              </ContactInfo>
            </div>
          </Card>
          
          <Card className="p-6 border-directorio-100">
            <h2 className="font-bold text-xl text-directorio-700 mb-4">¿Eres un comercio local?</h2>
            <p className="text-gray-600 mb-4">
              Descubre cómo promocionar tu negocio en nuestra plataforma y llegar a más clientes potenciales.
            </p>
            <a href="/precios" className="text-directorio-600 hover:text-directorio-700 font-medium">
              Ver planes de publicidad →
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
