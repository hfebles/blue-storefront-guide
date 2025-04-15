
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const PricingFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start mb-2">
    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
    <span className="text-sm text-gray-600">{children}</span>
  </li>
);

const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-directorio-700 mb-4">
          Planes y Precios
        </h1>
        <p className="text-xl text-gray-600">
          Elige el plan que mejor se adapte a tu negocio y comienza a promocionarlo en nuestra plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Plan Básico */}
        <Card className="border-directorio-100">
          <CardHeader className="pb-8 pt-6">
            <CardTitle className="text-xl text-directorio-700">Plan Básico</CardTitle>
            <div className="mt-4">
              <span className="text-3xl font-bold text-directorio-800">€29</span>
              <span className="text-gray-600 ml-1">/mes</span>
            </div>
            <CardDescription className="mt-2">
              Perfecto para pequeños negocios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-8">
              <PricingFeature>Listado básico en el directorio</PricingFeature>
              <PricingFeature>Logo de tu negocio</PricingFeature>
              <PricingFeature>Información de contacto</PricingFeature>
              <PricingFeature>Dirección con mapa</PricingFeature>
              <PricingFeature>Descripción de servicios</PricingFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-directorio-500 hover:bg-directorio-600">
              Elegir Plan Básico
            </Button>
          </CardFooter>
        </Card>

        {/* Plan Profesional */}
        <Card className="border-directorio-500 shadow-md relative">
          <div className="absolute top-0 w-full text-center transform -translate-y-1/2">
            <span className="bg-directorio-500 text-white text-xs px-3 py-1 rounded-full">
              Más popular
            </span>
          </div>
          <CardHeader className="pb-8 pt-6">
            <CardTitle className="text-xl text-directorio-700">Plan Profesional</CardTitle>
            <div className="mt-4">
              <span className="text-3xl font-bold text-directorio-800">€59</span>
              <span className="text-gray-600 ml-1">/mes</span>
            </div>
            <CardDescription className="mt-2">
              Ideal para negocios en crecimiento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-8">
              <PricingFeature>Todo lo del plan básico</PricingFeature>
              <PricingFeature>Posición destacada en el directorio</PricingFeature>
              <PricingFeature>Galería de imágenes (hasta 5)</PricingFeature>
              <PricingFeature>Horarios de apertura</PricingFeature>
              <PricingFeature>Enlaces a redes sociales</PricingFeature>
              <PricingFeature>Estadísticas de visitas</PricingFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-directorio-600 hover:bg-directorio-700">
              Elegir Plan Profesional
            </Button>
          </CardFooter>
        </Card>

        {/* Plan Premium */}
        <Card className="border-directorio-100">
          <CardHeader className="pb-8 pt-6">
            <CardTitle className="text-xl text-directorio-700">Plan Premium</CardTitle>
            <div className="mt-4">
              <span className="text-3xl font-bold text-directorio-800">€99</span>
              <span className="text-gray-600 ml-1">/mes</span>
            </div>
            <CardDescription className="mt-2">
              Para negocios que quieren destacar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-8">
              <PricingFeature>Todo lo del plan profesional</PricingFeature>
              <PricingFeature>Aparición en banner principal</PricingFeature>
              <PricingFeature>Galería de imágenes ilimitada</PricingFeature>
              <PricingFeature>Vídeo promocional</PricingFeature>
              <PricingFeature>Promociones y ofertas destacadas</PricingFeature>
              <PricingFeature>Soporte prioritario</PricingFeature>
              <PricingFeature>Reportes mensuales de rendimiento</PricingFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-directorio-500 hover:bg-directorio-600">
              Elegir Plan Premium
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center bg-directorio-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-directorio-700 mb-3">
          ¿Necesitas un plan personalizado?
        </h3>
        <p className="text-gray-600 mb-6">
          Contacta con nosotros para crear un plan adaptado a las necesidades específicas de tu negocio
        </p>
        <Button variant="outline" className="border-directorio-300 text-directorio-600 hover:bg-directorio-100">
          Contactar para plan personalizado
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
