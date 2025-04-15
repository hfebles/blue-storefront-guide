
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, Phone, Info } from "lucide-react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí implementaremos la conexión con Supabase más adelante
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <Card className="border-directorio-100">
      <CardHeader className="bg-directorio-50 border-b border-directorio-100">
        <CardTitle className="flex items-center text-directorio-700">
          <Mail className="mr-2 h-5 w-5" /> Formulario de Contacto
        </CardTitle>
        <CardDescription>
          Completa el formulario y nos pondremos en contacto contigo lo antes posible.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {isSubmitted ? (
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Info className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">¡Mensaje enviado!</h3>
            <p className="text-gray-600">
              Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
            </p>
            <Button 
              className="mt-4 bg-directorio-500 hover:bg-directorio-600"
              onClick={() => setIsSubmitted(false)}
            >
              Enviar otro mensaje
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="border-directorio-200 focus-visible:ring-directorio-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="border-directorio-200 focus-visible:ring-directorio-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¿En qué podemos ayudarte?"
                required
                className="min-h-32 border-directorio-200 focus-visible:ring-directorio-400"
              />
            </div>
          </form>
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter className="border-t border-directorio-100 bg-directorio-50/30">
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-directorio-500 hover:bg-directorio-600 ml-auto"
          >
            {isSubmitting ? (
              <>Enviando...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Enviar Mensaje
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ContactForm;
