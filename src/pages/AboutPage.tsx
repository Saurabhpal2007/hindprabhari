
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Rajiv Sharma",
      role: "Editor-in-Chief",
      bio: "With over 20 years of experience in journalism, Rajiv leads our editorial team with vision and integrity.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Priya Patel",
      role: "Senior Editor",
      bio: "Award-winning journalist with expertise in political reporting and investigative journalism.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Amit Singh",
      role: "Technology Editor",
      bio: "Former tech industry executive bringing deep insights into the evolving tech landscape.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Neha Gupta",
      role: "Creative Director",
      bio: "Visual storyteller with a background in digital media and multimedia journalism.",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">About HindPrabhari</h1>
          
          {/* Mission and Vision */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Mission</h2>
            <div className="max-w-3xl mx-auto text-lg">
              <p className="mb-6">
                Founded in 2023, HindPrabhari is dedicated to providing accurate, unbiased, and timely news to the people of Bharat. 
                Our name, which translates to "India's Guardian," reflects our commitment to safeguarding the truth and serving 
                as watchful protectors of democratic values.
              </p>
              <p className="mb-6">
                We believe that informed citizens are the foundation of a thriving democracy. Through our comprehensive coverage 
                of politics, technology, business, sports, entertainment, and more, we aim to empower our readers with the knowledge 
                they need to make informed decisions.
              </p>
              <p>
                HindPrabhari is committed to journalistic integrity, factual accuracy, and balanced reporting. We strive to present 
                multiple perspectives on complex issues, enabling our readers to form their own opinions based on reliable information.
              </p>
            </div>
          </div>
          
          {/* Team section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary/10 text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Values */}
          <div className="bg-muted py-12 px-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Truth</h3>
                <p className="text-muted-foreground">We are committed to factual accuracy and integrity in our reporting.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Independence</h3>
                <p className="text-muted-foreground">We maintain editorial independence and freedom from external influence.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Innovation</h3>
                <p className="text-muted-foreground">We embrace new technologies to deliver news in engaging and accessible ways.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
