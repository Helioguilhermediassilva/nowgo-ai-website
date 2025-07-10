import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Globe, Zap, Building, Users, Award, ArrowRight, Download, Mail } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background smooth-scroll">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">NowGo AI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
            <a href="#solutions" className="text-sm font-medium hover:text-primary transition-colors">Solutions</a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</a>
            <a href="#research" className="text-sm font-medium hover:text-primary transition-colors">Research</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            <Button size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-gradient text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            Official NVIDIA Partner
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Global Enterprise AI.
            <br />
            <span className="text-accent">Tailored for Transformation.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            NowGo AI creates customized AI solutions that empower industries, cities, and ecosystems 
            to scale responsibly, efficiently, and globally.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Globe className="mr-2 h-5 w-5" />
              Discover Our Global Solutions
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Download className="mr-2 h-5 w-5" />
              Access Scientific Publications
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">75%</div>
              <p className="text-muted-foreground">of large enterprises have implemented AI</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">USD 2.7T</div>
              <p className="text-muted-foreground">projected market by 2030</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4 Continents</div>
              <p className="text-muted-foreground">active global presence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Global Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We develop personalized AI solutions to transform industries and smart cities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Custom LLMs</CardTitle>
                <CardDescription>
                  Personalized language models for specific sectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Fine-tuning for legal, healthcare, finance</li>
                  <li>• ESG and sustainability models</li>
                  <li>• Integration with existing systems</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Tailored IaaS</CardTitle>
                <CardDescription>
                  Scalable and secure infrastructure for enterprise AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hybrid and multi-cloud</li>
                  <li>• Regulatory compliance</li>
                  <li>• Automatic scalability</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Autonomous Agents</CardTitle>
                <CardDescription>
                  Autonomous agents for urban and enterprise systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Smart city management</li>
                  <li>• Process automation</li>
                  <li>• Real-time decision making</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Innovation Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Initiatives that are transforming the future of enterprise AI and smart cities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "NowGo Urban Mirror",
                description: "Urban infrastructure optimization with AI",
                category: "Smart Cities"
              },
              {
                title: "Earth Guard & GEIH",
                description: "Environmental protection powered by AI",
                category: "Sustainability"
              },
              {
                title: "100% AI Hospital",
                description: "Fully integrated intelligent healthcare system",
                category: "Healthcare"
              },
              {
                title: "AI-Based Schools",
                description: "Personalized and scalable education",
                category: "Education"
              },
              {
                title: "Twinverse Studios",
                description: "Music, cinema and storytelling with AI",
                category: "Entertainment"
              },
              {
                title: "AgriAI",
                description: "Smart farming and AI-driven food systems",
                category: "Agritech"
              }
            ].map((project, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">{project.category}</Badge>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">
                    View Details <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Research & Thought Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Scientific publications and insights on the future of enterprise AI
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">
                      Enterprise Artificial Intelligence in the Smart Cities Era
                    </CardTitle>
                    <CardDescription className="text-base">
                      A Comprehensive Analysis of Custom LLMs, Tailored IaaS, and Autonomous Agents 
                      for Sustainable Digital Transformation
                    </CardDescription>
                  </div>
                  <Badge>New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This article presents a comprehensive analysis of practical AI applications in enterprises, 
                  focusing on the creation of custom LLMs, tailored IaaS, and integration with smart 
                  cities through autonomous agents.
                </p>
                <div className="flex gap-4">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline">
                    View Abstract
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">About NowGo AI</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Based in Brasília and operating globally, NowGo AI is a leading company in 
                enterprise artificial intelligence, focused on democratizing AI through 
                personalized and sustainable solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Official NVIDIA partner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Presence across 4 continents</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Global multidisciplinary team</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2024</div>
                  <p className="text-sm text-muted-foreground">Founded</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">50+</div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">15+</div>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Sustainable</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover how our AI solutions can accelerate your organization's digital transformation 
            in a sustainable and scalable way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold text-gradient">NowGo AI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Transforming the future through enterprise artificial intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Custom LLMs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tailored IaaS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Autonomous Agents</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partnerships</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Brasília, Brazil</li>
                <li>contact@nowgo.ai</li>
                <li>+55 (61) 9999-9999</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 NowGo AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

