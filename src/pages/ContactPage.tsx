
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Globe, Clock } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond shortly.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - HindPrabhari</title>
        <meta 
          name="description" 
          content="Get in touch with the HindPrabhari team. Send us your feedback, queries, or report issues."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or a story tip? We'd love to hear from you. 
              Reach out to our team using the form below or through our contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-xl border p-6 md-elevation-1">
                <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-xl border p-6 md-elevation-1 mb-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        123 Media Street<br />
                        New Delhi, 110001<br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">
                        +91 98765-43210<br />
                        +91 11 2345-6789
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">
                        contact@hindprabhari.in<br />
                        news@hindprabhari.in
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <Globe className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <p className="text-muted-foreground">
                        www.hindprabhari.in
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <Clock className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border p-6 md-elevation-1">
                <h2 className="text-xl font-semibold mb-4">For Press Inquiries</h2>
                <p className="text-muted-foreground mb-4">
                  For press releases, interview requests, or media inquiries, please contact our press team.
                </p>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  <a href="mailto:press@hindprabhari.in" className="text-primary hover:underline">
                    press@hindprabhari.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <div className="bg-card rounded-xl border p-6 md-elevation-1">
              <h2 className="text-xl font-semibold mb-6">Find Us</h2>
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                {/* This would be a Google Maps iframe or similar in a real app */}
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Map Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
