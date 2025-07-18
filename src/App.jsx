import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Globe, Zap, Building, Users, Award, ArrowRight, Download, Mail, Phone, MapPin, ExternalLink, FileText, CheckCircle, X, Leaf, Heart, GraduationCap, Music, Sprout } from 'lucide-react'
import './App.css'

function App() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isContactSubmitted, setIsContactSubmitted] = useState(false)
  const [isContactLoading, setIsContactLoading] = useState(false)
  const [contactError, setContactError] = useState('')
  const [activeProject, setActiveProject] = useState(null)
  
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    solution: '',
    date: '',
    message: ''
  })
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false)
  const [isDemoLoading, setIsDemoLoading] = useState(false)
  const [demoError, setDemoError] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const [partnershipForm, setPartnershipForm] = useState({
    name: '',
    email: '',
    company: '',
    partnershipType: '',
    message: ''
  })
  const [isPartnershipSubmitted, setIsPartnershipSubmitted] = useState(false)

  const handleContactSubmit = async (e, solutionType = null) => {
    e.preventDefault()
    
    // Limpar erros anteriores
    setContactError('')
    setIsContactLoading(true)
    
    try {
      // Determinar o assunto baseado no tipo de solução
      let subject = `Nova mensagem de contato - ${contactForm.name} (${contactForm.company})`
      if (solutionType) {
        subject = `Nova solicitação ${solutionType} - ${contactForm.name} (${contactForm.company})`
      }
      
      // Enviar dados para o backend Flask
      const emailData = {
        to: 'helio@nowgo.com.br',
        subject: subject,
        name: contactForm.name,
        email: contactForm.email,
        company: contactForm.company,
        message: contactForm.message,
        solutionType: solutionType || 'Contato Geral',
        timestamp: new Date().toISOString()
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsContactSubmitted(true)
        setContactError('')
        
        // Limpar formulário após 2 segundos
        setTimeout(() => {
          setContactForm({ name: '', email: '', company: '', message: '' })
        }, 2000)
        
        // Fechar modal automaticamente após 4 segundos
        setTimeout(() => {
          setIsContactSubmitted(false)
          // Fechar o modal clicando no botão close
          const closeButtons = document.querySelectorAll('[data-dialog-close]')
          if (closeButtons.length > 0) {
            closeButtons[closeButtons.length - 1].click()
          }
        }, 4000)
      } else {
        setContactError(result.message || 'Desculpe, houve um erro ao enviar sua mensagem. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      setContactError('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setIsContactLoading(false)
    }
  }

  const handleDemoSubmit = async (e) => {
    e.preventDefault()
    
    // Limpar erros anteriores
    setDemoError('')
    setIsDemoLoading(true)
    
    // Validação básica
    if (!demoForm.name || !demoForm.email || !demoForm.company || !demoForm.solution || !demoForm.date) {
      setDemoError('Por favor, preencha todos os campos obrigatórios.')
      setIsDemoLoading(false)
      return
    }
    
    try {
      const emailData = {
        to: 'helio@nowgo.com.br',
        subject: `Nova solicitação de demonstração - ${demoForm.name} (${demoForm.company})`,
        name: demoForm.name,
        email: demoForm.email,
        company: demoForm.company,
        message: `Solução: ${demoForm.solution}\nData preferida: ${demoForm.date}\nMensagem: ${demoForm.message}`,
        solutionType: 'Demonstração',
        timestamp: new Date().toISOString()
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsDemoSubmitted(true)
        setDemoError('')
        
        // Limpar formulário após 2 segundos
        setTimeout(() => {
          setDemoForm({ name: '', email: '', company: '', solution: '', date: '', message: '' })
        }, 2000)
        
        // Fechar modal automaticamente após 4 segundos
        setTimeout(() => {
          setIsDemoSubmitted(false)
          // Fechar o modal clicando no botão close
          const closeButtons = document.querySelectorAll('[data-dialog-close]')
          if (closeButtons.length > 0) {
            closeButtons[closeButtons.length - 1].click()
          }
        }, 4000)
      } else {
        setDemoError(result.message || 'Desculpe, houve um erro ao enviar sua solicitação. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao enviar demonstração:', error)
      setDemoError('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setIsDemoLoading(false)
    }
  }

  const handlePartnershipSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const emailData = {
        to: 'helio@nowgo.com.br',
        subject: `Nova solicitação de parceria - ${partnershipForm.name} (${partnershipForm.company})`,
        name: partnershipForm.name,
        email: partnershipForm.email,
        company: partnershipForm.company,
        message: `Tipo de parceria: ${partnershipForm.partnershipType}\nMensagem: ${partnershipForm.message}`,
        solutionType: 'Parceria',
        timestamp: new Date().toISOString()
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsPartnershipSubmitted(true)
        setTimeout(() => {
          setIsPartnershipSubmitted(false)
          setPartnershipForm({ name: '', email: '', company: '', partnershipType: '', message: '' })
        }, 3000)
      }
    } catch (error) {
      console.error('Erro ao enviar parceria:', error)
    }
  }

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  const handleDemoInputChange = (e) => {
    setDemoForm({
      ...demoForm,
      [e.target.name]: e.target.value
    })
  }

  const handlePartnershipInputChange = (e) => {
    setPartnershipForm({
      ...partnershipForm,
      [e.target.name]: e.target.value
    })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadPDF = () => {
    // Real PDF download
    const link = document.createElement('a')
    link.href = '/artigo_cientifico_nowgo_ai_final.pdf'
    link.download = 'Enterprise-AI-Smart-Cities-NowGo-AI.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const projects = [
    {
      id: 1,
      title: "NowGo Urban Mirror",
      description: "Urban infrastructure optimization with AI",
      category: "Smart Cities",
      fullDescription: "A comprehensive AI-powered platform that analyzes urban infrastructure in real-time, optimizing traffic flow, energy consumption, and public services. The system uses computer vision, IoT sensors, and predictive analytics to create a digital twin of city operations.",
      features: [
        "Real-time traffic optimization",
        "Smart energy grid management", 
        "Predictive maintenance for infrastructure",
        "Citizen engagement platform",
        "Environmental monitoring"
      ],
      technologies: ["Computer Vision", "IoT Integration", "Predictive Analytics", "Digital Twin Technology"],
      status: "Active Development"
    },
    {
      id: 2,
      title: "Earth Guard & GEIH",
      description: "Environmental protection powered by AI",
      category: "Sustainability",
      fullDescription: "Global Environmental Intelligence Hub (GEIH) combines satellite imagery, climate data, and AI models to monitor environmental changes, predict climate impacts, and recommend sustainable practices for businesses and governments.",
      features: [
        "Satellite imagery analysis",
        "Climate change prediction",
        "Carbon footprint tracking",
        "Biodiversity monitoring",
        "Sustainable practice recommendations"
      ],
      technologies: ["Satellite AI", "Climate Modeling", "Carbon Analytics", "Biodiversity AI"],
      status: "Pilot Phase"
    },
    {
      id: 3,
      title: "100% AI Hospital",
      description: "Fully integrated intelligent healthcare system",
      category: "Healthcare",
      fullDescription: "Revolutionary healthcare system where AI handles diagnosis, treatment planning, patient monitoring, and hospital operations. Designed for emerging countries to provide world-class healthcare with minimal human intervention.",
      features: [
        "AI-powered diagnosis",
        "Automated treatment planning",
        "24/7 patient monitoring",
        "Robotic surgery assistance",
        "Predictive health analytics"
      ],
      technologies: ["Medical AI", "Robotics", "Computer Vision", "Natural Language Processing"],
      status: "Research Phase"
    },
    {
      id: 4,
      title: "AI-Based Schools",
      description: "Personalized and scalable education",
      category: "Education",
      fullDescription: "Adaptive learning platform that personalizes education for each student, providing customized curricula, real-time assessment, and intelligent tutoring systems that scale globally.",
      features: [
        "Personalized learning paths",
        "Real-time performance assessment",
        "AI tutoring systems",
        "Multilingual support",
        "Teacher assistance tools"
      ],
      technologies: ["Adaptive Learning", "Natural Language Processing", "Educational Analytics", "Personalization AI"],
      status: "Beta Testing"
    },
    {
      id: 5,
      title: "Twinverse Studios",
      description: "Music, cinema and storytelling with AI",
      category: "Entertainment",
      fullDescription: "Creative AI platform that assists in music composition, film production, and interactive storytelling. Enables creators to produce high-quality content with AI-powered tools for script writing, music generation, and visual effects.",
      features: [
        "AI music composition",
        "Automated video editing",
        "Script generation",
        "Voice synthesis",
        "Interactive storytelling"
      ],
      technologies: ["Generative AI", "Audio Processing", "Computer Graphics", "Natural Language Generation"],
      status: "Commercial Release"
    },
    {
      id: 6,
      title: "AgriAI",
      description: "Smart farming and AI-driven food systems",
      category: "Agritech",
      fullDescription: "Comprehensive agricultural AI system that optimizes crop yields, monitors soil health, predicts weather impacts, and manages supply chains to ensure food security and sustainable farming practices.",
      features: [
        "Crop yield optimization",
        "Soil health monitoring",
        "Weather prediction",
        "Pest detection",
        "Supply chain optimization"
      ],
      technologies: ["Precision Agriculture", "Computer Vision", "Weather AI", "Supply Chain Analytics"],
      status: "Field Trials"
    }
  ]

  const solutions = [
    {
      id: 'custom-llms',
      title: 'Custom LLMs',
      description: 'Personalized language models for all sectors',
      icon: Globe,
      features: [
        'Fine-tuning for all sectors',
        'ESG and sustainability models',
        'Integration with existing systems'
      ],
      fullDescription: 'Our Custom Large Language Models are specifically designed and trained for your industry needs. We fine-tune state-of-the-art models on your proprietary data while ensuring privacy and compliance.',
      benefits: [
        'Industry-specific knowledge and terminology',
        'Improved accuracy for domain-specific tasks',
        'Seamless integration with existing workflows',
        'Enhanced data privacy and security',
        'Reduced hallucinations and improved reliability'
      ],
      useCases: [
        'Legal document analysis and generation',
        'Medical diagnosis assistance',
        'Financial risk assessment',
        'Technical documentation',
        'Customer service automation'
      ]
    },
    {
      id: 'tailored-iaas',
      title: 'Tailored IaaS',
      description: 'Scalable and secure infrastructure for enterprise AI',
      icon: Building,
      features: [
        'Hybrid and multi-cloud',
        'Regulatory compliance',
        'Automatic scalability'
      ],
      fullDescription: 'Our Infrastructure as a Service solution provides enterprise-grade AI infrastructure that scales with your needs while maintaining the highest security and compliance standards.',
      benefits: [
        'Cost-effective scaling',
        'Enterprise-grade security',
        'Multi-cloud flexibility',
        'Automated resource management',
        'Compliance with global regulations'
      ],
      useCases: [
        'Large-scale AI model training',
        'Real-time inference at scale',
        'Data processing pipelines',
        'Disaster recovery systems',
        'Global AI deployment'
      ]
    },
    {
      id: 'autonomous-agents',
      title: 'Autonomous Agents',
      description: 'Autonomous agents for urban and enterprise systems',
      icon: Zap,
      features: [
        'Smart city management',
        'Process automation',
        'Real-time decision making'
      ],
      fullDescription: 'Intelligent autonomous agents that can operate independently to manage complex systems, make decisions, and optimize operations in real-time across various domains.',
      benefits: [
        '24/7 autonomous operation',
        'Reduced operational costs',
        'Improved efficiency and accuracy',
        'Real-time adaptation to changes',
        'Scalable across multiple domains'
      ],
      useCases: [
        'Smart city traffic management',
        'Industrial process optimization',
        'Supply chain automation',
        'Energy grid management',
        'Emergency response coordination'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background smooth-scroll">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <span className="text-2xl font-bold text-gradient">NowGo AI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollToSection('solutions')} className="text-sm font-medium hover:text-primary transition-colors">Solutions</button>
            <button onClick={() => scrollToSection('projects')} className="text-sm font-medium hover:text-primary transition-colors">Projects</button>
            <button onClick={() => scrollToSection('research')} className="text-sm font-medium hover:text-primary transition-colors">Research</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">About</button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact NowGo AI</DialogTitle>
                  <DialogDescription>
                    Get in touch with our team to discuss your AI transformation needs.
                  </DialogDescription>
                </DialogHeader>
                {isContactSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground text-center mb-2">
                      Your message has been sent successfully to our team.
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      We'll get back to you within 24 hours. This window will close automatically.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {contactError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                        {contactError}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={contactForm.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isContactLoading}>
                      {isContactLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary schedule-demo-btn"
                  style={{
                    color: 'white !important',
                    backgroundColor: 'transparent',
                    borderColor: 'white'
                  }}
                >
                  <Users className="mr-2 h-5 w-5" style={{color: 'white'}} />
                  <span style={{color: 'white', opacity: 1, visibility: 'visible'}}>
                    Schedule a Demonstration
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule a Demonstration</DialogTitle>
                  <DialogDescription>
                    Book a personalized demo of our AI solutions with our expert team.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-name">Name</Label>
                      <Input
                        id="demo-name"
                        name="name"
                        value={demoForm.name}
                        onChange={handleDemoInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-email">Email</Label>
                      <Input
                        id="demo-email"
                        name="email"
                        type="email"
                        value={demoForm.email}
                        onChange={handleDemoInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-company">Company</Label>
                    <Input
                      id="demo-company"
                      name="company"
                      value={demoForm.company}
                      onChange={handleDemoInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-solution">Solution of Interest</Label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full p-2 border rounded-md text-left bg-white flex justify-between items-center"
                        required
                      >
                        <span className={demoForm.solution ? 'text-black' : 'text-gray-500'}>
                          {demoForm.solution ? 
                            (demoForm.solution === 'custom-llms' ? 'Custom LLMs' :
                             demoForm.solution === 'tailored-iaas' ? 'Tailored IaaS' :
                             demoForm.solution === 'autonomous-agents' ? 'Autonomous Agents' :
                             demoForm.solution === 'all-solutions' ? 'All Solutions' : 'Select a solution')
                            : 'Select a solution'
                          }
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                          <div 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDemoForm(prev => ({...prev, solution: 'custom-llms'}))
                              setIsDropdownOpen(false)
                            }}
                          >
                            Custom LLMs
                          </div>
                          <div 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDemoForm(prev => ({...prev, solution: 'tailored-iaas'}))
                              setIsDropdownOpen(false)
                            }}
                          >
                            Tailored IaaS
                          </div>
                          <div 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDemoForm(prev => ({...prev, solution: 'autonomous-agents'}))
                              setIsDropdownOpen(false)
                            }}
                          >
                            Autonomous Agents
                          </div>
                          <div 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDemoForm(prev => ({...prev, solution: 'all-solutions'}))
                              setIsDropdownOpen(false)
                            }}
                          >
                            All Solutions
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-date">Preferred Date</Label>
                    <Input
                      id="demo-date"
                      name="date"
                      type="date"
                      value={demoForm.date}
                      onChange={handleDemoInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-message">Additional Information</Label>
                    <Textarea
                      id="demo-message"
                      name="message"
                      value={demoForm.message}
                      onChange={handleDemoInputChange}
                      rows={3}
                      placeholder="Tell us about your specific needs or questions..."
                    />
                  </div>
                  
                  {/* Mensagem de erro */}
                  {demoError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{demoError}</p>
                    </div>
                  )}
                  
                  {/* Mensagem de sucesso */}
                  {isDemoSubmitted && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-green-800 mb-1">Thank You!</h3>
                      <p className="text-green-600">Your demo request has been sent successfully. We'll contact you soon!</p>
                    </div>
                  )}
                  
                  {!isDemoSubmitted && (
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isDemoLoading}
                    >
                      {isDemoLoading ? 'Sending...' : 'Schedule Demo'}
                    </Button>
                  )}
                </form>
              </DialogContent>
            </Dialog>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => scrollToSection('solutions')}
            >
              <Globe className="mr-2 h-5 w-5" />
              Discover Our Global Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 apple-stats-gradient">
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
              <div className="text-4xl font-bold text-primary mb-2">Global</div>
              <p className="text-muted-foreground">active global presence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 apple-gradient-radial">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Global Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We develop personalized AI solutions to transform industries and smart cities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution) => {
              const IconComponent = solution.icon
              return (
                <Card key={solution.id} className="card-hover">
                  <CardHeader>
                    <IconComponent className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{solution.title}</CardTitle>
                    <CardDescription>
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {solution.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4" variant="outline">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <IconComponent className="h-6 w-6 text-primary" />
                            {solution.title}
                          </DialogTitle>
                          <DialogDescription>
                            {solution.fullDescription}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3">Key Benefits</h4>
                            <ul className="space-y-2">
                              {solution.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Use Cases</h4>
                            <ul className="space-y-2">
                              {solution.useCases.map((useCase, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{useCase}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full">
                                  <Mail className="mr-2 h-4 w-4" />
                                  Get Started
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Get Started with {solution.title}</DialogTitle>
                                  <DialogDescription>
                                    Contact our team to learn how {solution.title} can transform your business.
                                  </DialogDescription>
                                </DialogHeader>
                                {isContactSubmitted ? (
                                  <div className="flex flex-col items-center justify-center py-8">
                                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
                                    <p className="text-muted-foreground text-center">
                                      Our {solution.title} specialists will contact you soon.
                                    </p>
                                  </div>
                                ) : (
                                  <form onSubmit={(e) => handleContactSubmit(e, solution.title)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                          id="name"
                                          name="name"
                                          value={contactForm.name}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                          id="email"
                                          name="email"
                                          type="email"
                                          value={contactForm.email}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="company">Company</Label>
                                      <Input
                                        id="company"
                                        name="company"
                                        value={contactForm.company}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="message">Tell us about your needs</Label>
                                      <Textarea
                                        id="message"
                                        name="message"
                                        value={contactForm.message}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder={`How can ${solution.title} help your organization?`}
                                        required
                                      />
                                    </div>
                                    <Button type="submit" className="w-full">
                                      Send Request
                                    </Button>
                                  </form>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 apple-blue-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Innovation Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Initiatives that are transforming the future of enterprise AI and smart cities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">NowGo Urban Mirror</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Urban infrastructure optimization with AI-powered analytics for smart city development and sustainable urban planning.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Smart Cities</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Infrastructure</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-primary" />
                          NowGo Urban Mirror
                        </DialogTitle>
                        <DialogDescription>
                          Advanced urban infrastructure optimization powered by artificial intelligence
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Project Overview</h4>
                          <p className="text-sm text-muted-foreground">
                            NowGo Urban Mirror is a comprehensive AI-powered platform designed to optimize urban infrastructure 
                            through real-time data analysis, predictive modeling, and intelligent resource allocation. Our solution 
                            integrates IoT sensors, satellite imagery, and machine learning algorithms to create a digital twin of 
                            urban environments, enabling smart city development and sustainable urban planning.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Real-time infrastructure monitoring and analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Predictive maintenance for urban systems</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Traffic flow optimization and smart routing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Energy consumption optimization</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Citizen engagement and feedback integration</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Applications</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Smart city infrastructure management</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Urban planning and development optimization</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Public transportation enhancement</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Emergency response coordination</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border-t pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Get Started with NowGo Urban Mirror
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Contact Our Urban Mirror Team</DialogTitle>
                                <DialogDescription>
                                  Let's discuss how NowGo Urban Mirror can transform your city's infrastructure.
                                </DialogDescription>
                              </DialogHeader>
                              {isContactSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                  <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
                                  <p className="text-muted-foreground text-center">
                                    Our NowGo Urban Mirror specialists will contact you soon.
                                  </p>
                                </div>
                              ) : (
                                <form onSubmit={(e) => handleContactSubmit(e, 'NowGo Urban Mirror - Innovation Project')} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                      id="company"
                                      name="company"
                                      value={contactForm.company}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="message">Tell us about your needs</Label>
                                    <Textarea
                                      id="message"
                                      name="message"
                                      value={contactForm.message}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="How can NowGo Urban Mirror help your city or organization?"
                                      required
                                    />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Send Request
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Earth Guard & GEIH</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Environmental protection powered by AI with real-time monitoring and predictive analytics for climate action.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Environment</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Climate</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-primary" />
                          Earth Guard & GEIH
                        </DialogTitle>
                        <DialogDescription>
                          Global Environmental Intelligence Hub for climate action and environmental protection
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Project Overview</h4>
                          <p className="text-sm text-muted-foreground">
                            Earth Guard & GEIH (Global Environmental Intelligence Hub) is an advanced AI-powered platform 
                            designed to monitor, analyze, and protect our planet's environmental systems. Using satellite 
                            imagery, IoT sensors, and machine learning algorithms, we provide real-time environmental 
                            monitoring and predictive analytics to support climate action and sustainable development.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Real-time environmental monitoring and alerts</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Climate change prediction and modeling</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Biodiversity tracking and conservation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Carbon footprint analysis and optimization</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Environmental impact assessment</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Applications</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Climate monitoring and early warning systems</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Environmental compliance and reporting</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Sustainable resource management</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Conservation strategy optimization</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border-t pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Get Started with Earth Guard & GEIH
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Contact Our Environmental Team</DialogTitle>
                                <DialogDescription>
                                  Let's discuss how Earth Guard & GEIH can support your environmental initiatives.
                                </DialogDescription>
                              </DialogHeader>
                              {isContactSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                  <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
                                  <p className="text-muted-foreground text-center">
                                    Our Earth Guard & GEIH specialists will contact you soon.
                                  </p>
                                </div>
                              ) : (
                                <form onSubmit={(e) => handleContactSubmit(e, 'Earth Guard & GEIH - Innovation Project')} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                      id="company"
                                      name="company"
                                      value={contactForm.company}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="message">Tell us about your needs</Label>
                                    <Textarea
                                      id="message"
                                      name="message"
                                      value={contactForm.message}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="How can Earth Guard & GEIH help your environmental initiatives?"
                                      required
                                    />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Send Request
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% AI Hospital</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fully integrated intelligent healthcare system with AI-driven diagnostics, treatment planning, and patient care optimization.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Healthcare</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Medical AI</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-primary" />
                          100% AI Hospital
                        </DialogTitle>
                        <DialogDescription>
                          Revolutionary healthcare system powered entirely by artificial intelligence
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Project Overview</h4>
                          <p className="text-sm text-muted-foreground">
                            The 100% AI Hospital represents the future of healthcare, where artificial intelligence 
                            seamlessly integrates into every aspect of patient care. From initial diagnosis to treatment 
                            planning and recovery monitoring, our AI-powered system provides comprehensive, personalized, 
                            and efficient healthcare solutions that enhance patient outcomes while reducing costs.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">AI-powered diagnostic imaging and analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Personalized treatment plan generation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Automated patient monitoring and alerts</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Predictive health analytics</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Intelligent resource allocation</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Applications</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Emergency department optimization</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Surgical planning and assistance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Chronic disease management</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Drug discovery and development</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border-t pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Get Started with 100% AI Hospital
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Contact Our Healthcare AI Team</DialogTitle>
                                <DialogDescription>
                                  Let's discuss how 100% AI Hospital can revolutionize your healthcare facility.
                                </DialogDescription>
                              </DialogHeader>
                              {isContactSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                  <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
                                  <p className="text-muted-foreground text-center">
                                    Our 100% AI Hospital specialists will contact you soon.
                                  </p>
                                </div>
                              ) : (
                                <form onSubmit={(e) => handleContactSubmit(e, '100% AI Hospital - Innovation Project')} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                      id="company"
                                      name="company"
                                      value={contactForm.company}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="message">Tell us about your needs</Label>
                                    <Textarea
                                      id="message"
                                      name="message"
                                      value={contactForm.message}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="How can 100% AI Hospital help your healthcare organization?"
                                      required
                                    />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Send Request
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Based Schools</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Personalized and scalable education powered by AI with adaptive learning systems and intelligent tutoring.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Education</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Learning</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          AI-Based Schools
                        </DialogTitle>
                        <DialogDescription>
                          Revolutionary education system with personalized AI-powered learning
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Project Overview</h4>
                          <p className="text-sm text-muted-foreground">
                            AI-Based Schools transforms traditional education through personalized, adaptive learning 
                            experiences powered by artificial intelligence. Our platform creates individualized learning 
                            paths, provides intelligent tutoring, and offers real-time assessment to maximize student 
                            potential while supporting educators with data-driven insights.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Personalized learning path generation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Intelligent tutoring and assistance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Real-time performance analytics</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Adaptive content delivery</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Educator support and insights</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Applications</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">K-12 personalized education</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Higher education optimization</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Corporate training programs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Special needs education support</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border-t pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Get Started with AI-Based Schools
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Contact Our Education AI Team</DialogTitle>
                                <DialogDescription>
                                  Let's discuss how AI-Based Schools can transform your educational institution.
                                </DialogDescription>
                              </DialogHeader>
                              {isContactSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                  <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
                                  <p className="text-muted-foreground text-center">
                                    Our AI-Based Schools specialists will contact you soon.
                                  </p>
                                </div>
                              ) : (
                                <form onSubmit={(e) => handleContactSubmit(e, 'AI-Based Schools - Innovation Project')} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                      id="company"
                                      name="company"
                                      value={contactForm.company}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="message">Tell us about your needs</Label>
                                    <Textarea
                                      id="message"
                                      name="message"
                                      value={contactForm.message}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="How can AI-Based Schools help your educational institution?"
                                      required
                                    />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Send Request
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Twinverse Studios</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Music, cinema and storytelling with AI-powered content creation and immersive digital experiences.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Entertainment</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Creative AI</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Music className="h-5 w-5 text-primary" />
                          Twinverse Studios
                        </DialogTitle>
                        <DialogDescription>
                          Revolutionary entertainment platform powered by AI for music, cinema, and storytelling
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Project Overview</h4>
                          <p className="text-sm text-muted-foreground">
                            Twinverse Studios revolutionizes the entertainment industry through AI-powered content 
                            creation, immersive storytelling, and personalized media experiences. Our platform 
                            combines advanced AI algorithms with creative tools to enable artists, filmmakers, 
                            and content creators to produce high-quality, engaging content at unprecedented scale.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">AI-powered music composition and production</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Automated video editing and post-production</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Interactive storytelling experiences</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Personalized content recommendations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Virtual production environments</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Applications</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Film and television production</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Music industry innovation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Gaming and interactive media</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Digital marketing and advertising</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border-t pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Get Started with Twinverse Studios
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Contact Our Creative AI Team</DialogTitle>
                                <DialogDescription>
                                  Let's discuss how Twinverse Studios can revolutionize your creative projects.
                                </DialogDescription>
                              </DialogHeader>
                              {isContactSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                  <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
                                  <p className="text-muted-foreground text-center">
                                    Our Twinverse Studios specialists will contact you soon.
                                  </p>
                                </div>
                              ) : (
                                <form onSubmit={(e) => handleContactSubmit(e, 'Twinverse Studios - Innovation Project')} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                      id="company"
                                      name="company"
                                      value={contactForm.company}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="message">Tell us about your needs</Label>
                                    <Textarea
                                      id="message"
                                      name="message"
                                      value={contactForm.message}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="How can Twinverse Studios help your creative projects?"
                                      required
                                    />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Send Request
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AgriAI</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Smart farming and AI-driven food systems with precision agriculture and sustainable crop management.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Agriculture</span>
                    <span className="px-2 py-1 bg-primary/10 rounded-full text-xs">Sustainability</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Sprout className="h-5 w-5 text-primary" />
                          AgriAI
                        </DialogTitle>
                        <DialogDescription>
                          Revolutionary smart farming platform powered by AI for sustainable agriculture
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Project Overview</h4>
                          <p className="text-sm text-muted-foreground">
                            AgriAI transforms traditional farming through intelligent, data-driven agricultural 
                            solutions. Our platform combines IoT sensors, satellite imagery, and machine learning 
                            to optimize crop yields, reduce resource consumption, and promote sustainable farming 
                            practices that benefit both farmers and the environment.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Precision agriculture and crop monitoring</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Automated irrigation and resource management</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Pest and disease prediction</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Yield optimization algorithms</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Sustainable farming recommendations</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Applications</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Large-scale commercial farming</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Smallholder farmer support</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Greenhouse and controlled environment agriculture</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">Food supply chain optimization</span>
                            </li>
                          </ul>
                        </div>
                        <div className="border-t pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Get Started with AgriAI
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Contact Our Agricultural AI Team</DialogTitle>
                                <DialogDescription>
                                  Let's discuss how AgriAI can transform your agricultural operations.
                                </DialogDescription>
                              </DialogHeader>
                              {isContactSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                  <h3 className="text-lg font-semibold mb-2">Request Sent!</h3>
                                  <p className="text-muted-foreground text-center">
                                    Our AgriAI specialists will contact you soon.
                                  </p>
                                </div>
                              ) : (
                                <form onSubmit={(e) => handleContactSubmit(e, 'AgriAI - Innovation Project')} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="name">Name</Label>
                                      <Input
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                      id="company"
                                      name="company"
                                      value={contactForm.company}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="message">Tell us about your needs</Label>
                                    <Textarea
                                      id="message"
                                      name="message"
                                      value={contactForm.message}
                                      onChange={handleInputChange}
                                      rows={3}
                                      placeholder="How can AgriAI help your agricultural operations?"
                                      required
                                    />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Send Request
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 apple-blue-soft">
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
                  <Button onClick={downloadPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        View Abstract
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Research Abstract</DialogTitle>
                        <DialogDescription>
                          Enterprise Artificial Intelligence in the Smart Cities Era
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Abstract</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Artificial intelligence (AI) is redefining the global business landscape, with the market 
                            projected to reach USD 2.7 trillion by 2030. This article presents a comprehensive 
                            analysis of practical AI applications in enterprises, focusing on the creation of custom 
                            large language models (LLMs), tailored infrastructure as a service (IaaS), and 
                            integration with smart cities through autonomous agents. Using NowGo AI as the main 
                            case study, this research examines how specialized companies are developing 
                            personalized AI solutions to meet specific demands of medium and large 
                            organizations. The methodology combines document analysis, systematic literature 
                            review, and exploratory case study. Results indicate that 75% of large-scale companies 
                            have already actively implemented AI, with 40% growth expected for 2025. The 
                            research reveals that the convergence between enterprise AI and smart cities, 
                            mediated by autonomous agents, represents a significant opportunity for sustainable 
                            digital transformation. Main contributions include a conceptual framework for 
                            enterprise AI implementation, detailed analysis of LLM customization methodologies, 
                            and identification of synergies between corporate solutions and intelligent urban 
                            infrastructure.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Findings</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• 75% of large-scale companies have actively implemented AI solutions</li>
                            <li>• USD 2.7 trillion projected market value by 2030</li>
                            <li>• 40% growth expected for enterprise AI adoption in 2025</li>
                            <li>• Custom LLMs provide significant competitive advantages for specific sectors</li>
                            <li>• Autonomous agents enable seamless integration between enterprise and smart city systems</li>
                            <li>• Sustainable digital transformation through AI-driven urban infrastructure</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Authors</h4>
                          <p className="text-sm text-muted-foreground">
                            NowGo AI Research Team
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Publication Details</h4>
                          <p className="text-sm text-muted-foreground">
                            Published: July 2025<br />
                            Pages: 20<br />
                            Keywords: Enterprise Artificial Intelligence, Custom LLMs, IaaS, Smart Cities, Autonomous Agents, Digital Transformation
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={downloadPDF} className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download Full Paper
                          </Button>
                          <Button variant="outline" onClick={() => window.open('mailto:research@nowgo.ai?subject=Research Inquiry')}>
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Authors
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 apple-blue-medium">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">About NowGo AI</h2>
              <p className="text-lg text-muted-foreground mb-6">
                NowGo AI is a global company in enterprise artificial intelligence, focused on democratizing AI through personalized and sustainable solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Official NVIDIA partner</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Global Presence</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Global multidisciplinary team</span>
                </div>
              </div>
              <div className="mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Users className="mr-2 h-4 w-4" />
                      Learn More About Us
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>About NowGo AI</DialogTitle>
                      <DialogDescription>
                        Transforming the future through enterprise artificial intelligence
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">Our Mission</h4>
                        <p className="text-sm text-muted-foreground">
                          To democratize artificial intelligence by creating personalized, sustainable, 
                          and scalable AI solutions that empower enterprises and smart cities worldwide.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Our Vision</h4>
                        <p className="text-sm text-muted-foreground">
                          A world where AI seamlessly integrates with human intelligence to solve 
                          complex global challenges and create sustainable prosperity for all.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Core Values</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Innovation with Purpose</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Sustainable Technology</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Global Collaboration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Ethical AI Development</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Core Services</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">AI Strategy & Implementation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Enterprise Mentorship & Consulting</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Globe className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Global Technology Leadership</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="flex-1">
                              <Mail className="mr-2 h-4 w-4" />
                              Join Our Team
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Join NowGo AI</DialogTitle>
                              <DialogDescription>
                                Be part of the AI revolution. Send us your information and we'll get in touch about opportunities.
                              </DialogDescription>
                            </DialogHeader>
                            {isContactSubmitted ? (
                              <div className="flex flex-col items-center justify-center py-8">
                                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Application Received!</h3>
                                <p className="text-muted-foreground text-center">
                                  Thank you for your interest. Our HR team will review your information.
                                </p>
                              </div>
                            ) : (
                              <form onSubmit={(e) => handleContactSubmit(e, 'Candidatura - Join our team')} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                      id="name"
                                      name="name"
                                      value={contactForm.name}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      id="email"
                                      name="email"
                                      type="email"
                                      value={contactForm.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="company">Current Position/Company</Label>
                                  <Input
                                    id="company"
                                    name="company"
                                    value={contactForm.company}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="message">Tell us about your background and interests</Label>
                                  <Textarea
                                    id="message"
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="What role interests you? What's your experience with AI?"
                                    required
                                  />
                                </div>
                                <Button type="submit" className="w-full">
                                  Submit Application
                                </Button>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Partnerships
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Partnership Opportunities</DialogTitle>
                              <DialogDescription>
                                Join forces with NowGo AI to create innovative AI solutions and expand global reach.
                              </DialogDescription>
                            </DialogHeader>
                            {isPartnershipSubmitted ? (
                              <div className="text-center py-8">
                                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Partnership Request Submitted!</h3>
                                <p className="text-muted-foreground">We'll review your proposal and get back to you within 48 hours.</p>
                              </div>
                            ) : (
                              <form onSubmit={(e) => handleContactSubmit(e, 'Parceria - Partnership')} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="partnership-name">Name</Label>
                                    <Input
                                      id="partnership-name"
                                      value={partnershipForm.name}
                                      onChange={(e) => setPartnershipForm({...partnershipForm, name: e.target.value})}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="partnership-email">Email</Label>
                                    <Input
                                      id="partnership-email"
                                      type="email"
                                      value={partnershipForm.email}
                                      onChange={(e) => setPartnershipForm({...partnershipForm, email: e.target.value})}
                                      required
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="partnership-company">Company/Organization</Label>
                                  <Input
                                    id="partnership-company"
                                    value={partnershipForm.company}
                                    onChange={(e) => setPartnershipForm({...partnershipForm, company: e.target.value})}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="partnership-type">Partnership Type</Label>
                                  <select
                                    id="partnership-type"
                                    className="w-full p-2 border border-input rounded-md"
                                    value={partnershipForm.partnershipType}
                                    onChange={(e) => setPartnershipForm({...partnershipForm, partnershipType: e.target.value})}
                                    required
                                  >
                                    <option value="">Select partnership type</option>
                                    <option value="technology">Technology Integration</option>
                                    <option value="reseller">Reseller/Channel Partner</option>
                                    <option value="strategic">Strategic Alliance</option>
                                    <option value="academic">Academic/Research</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                                <div>
                                  <Label htmlFor="partnership-message">Partnership Proposal</Label>
                                  <Textarea
                                    id="partnership-message"
                                    placeholder="Describe your partnership proposal and how we can collaborate..."
                                    value={partnershipForm.message}
                                    onChange={(e) => setPartnershipForm({...partnershipForm, message: e.target.value})}
                                    required
                                  />
                                </div>
                                <Button type="submit" className="w-full">
                                  Submit Partnership Request
                                </Button>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 apple-testimonials-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by medium and large enterprises worldwide. Here's what our clients say about 
              working with the NowGo AI team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-start gap-4 h-full">
                  <div className="text-4xl text-primary opacity-50">"</div>
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      "The partnership with NowGo AI was essential for the development of Artificial Intelligence projects within the 
                      Inovaskill program, which involved companies from the Jacto Group and others in the region. The support provided 
                      was crucial in achieving practical and innovative results. This collaboration highlights how the combination of 
                      expertise and purpose can turn challenges into effective and impactful solutions."
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Tiago Goulart, CEO and Founder, Mentto</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow h-full lg:col-start-2 lg:col-end-3">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-start gap-4 h-full">
                  <div className="text-4xl text-primary opacity-50">"</div>
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      "NowGo AI has been transforming education and the business ecosystem in São Paulo. In partnership with the NowGo AI team, 
                      the first Software Development and Artificial Intelligence curriculum was created at the São Paulo Technology College, 
                      preparing professionals for the 4.0 market and benefiting over 80,000 young talents across the state."
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Matheus, DEV, Intercept Rx</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-start gap-4 h-full">
                  <div className="text-4xl text-primary opacity-50">"</div>
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      "Having the NowGo AI team as mentors in the latest cohort of startups at Bluefields Accelerator was a privilege. 
                      Their expertise in artificial intelligence and strategic vision were essential to the entrepreneurs' success, providing 
                      insights that transformed business strategies and broadened market perspectives. During the MVP bootcamp, the team made 
                      a direct impact on the mentoring sessions, receiving 100% positive feedback from the startup founders."
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Ana Paula Costa, Bluefields</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-start gap-4 h-full">
                  <div className="text-4xl text-primary opacity-50">"</div>
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      "The NowGo AI team consists of highly experienced professionals, and every mentoring session with them is a masterclass. 
                      It's truly a privilege to learn from them – no doubt, a valuable use of time."
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Enterprise Client</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-start gap-4 h-full">
                  <div className="text-4xl text-primary opacity-50">"</div>
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      "Once again, the NowGo AI team amazed us with their depth of knowledge and genuine commitment to helping. 
                      They even studied our case beforehand and developed a prototype as an example. A fantastic mentoring session – we're extremely grateful!"
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Technology Company</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex items-start gap-4 h-full">
                  <div className="text-4xl text-primary opacity-50">"</div>
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      "The NowGo AI team led the session with great expertise. They're extremely skilled and knowledgeable. 
                      We're already scheduling a follow-up session to go even deeper."
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Enterprise Company</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          
          
          {/* Último depoimento centralizado */}
          <div className="flex justify-center mt-8">
            <div className="max-w-2xl w-full">
              <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="flex items-start gap-4 h-full">
                    <div className="text-4xl text-primary opacity-50">"</div>
                    <div className="flex flex-col h-full">
                      <p className="text-sm text-muted-foreground mb-4 flex-grow">
                        "Our session was exceptional. They brought us valuable insights for our project and introduced AI tools 
                        that can really accelerate our work. Looking forward to our next meeting!"
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">★</span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Global Enterprise</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Start Your AI Transformation</DialogTitle>
                  <DialogDescription>
                    Let's discuss how NowGo AI can help transform your business.
                  </DialogDescription>
                </DialogHeader>
                {isContactSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground text-center">
                      We'll be in touch within 24 hours to discuss your AI transformation journey.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleContactSubmit(e, 'Transformação Digital - Start Transformation')} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={contactForm.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">How can we help transform your business?</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell us about your AI transformation goals..."
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Start Transformation
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => scrollToSection('home')}>
                <span className="text-xl font-bold text-gradient">NowGo AI</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Transforming the future through enterprise artificial intelligence.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Global</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-primary transition-colors text-left">Custom LLMs</button></li>
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-primary transition-colors text-left">Tailored IaaS</button></li>
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-primary transition-colors text-left">Autonomous Agents</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="hover:text-primary transition-colors text-left">About</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>About NowGo AI</DialogTitle>
                        <DialogDescription>
                          Leading the future of enterprise artificial intelligence
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        <div>
                          <h4 className="font-semibold mb-2">Our Mission</h4>
                          <p className="text-sm text-muted-foreground">
                            To democratize artificial intelligence by creating personalized, sustainable, and scalable 
                            solutions that empower industries, cities, and ecosystems to transform responsibly.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Our Vision</h4>
                          <p className="text-sm text-muted-foreground">
                            A world where AI seamlessly integrates with human intelligence to solve complex global 
                            challenges, from enterprise transformation to smart city development.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Core Values</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• <strong>Innovation:</strong> Pushing the boundaries of AI technology</li>
                            <li>• <strong>Sustainability:</strong> Building environmentally responsible solutions</li>
                            <li>• <strong>Transparency:</strong> Ethical AI development and deployment</li>
                            <li>• <strong>Collaboration:</strong> Partnering with global organizations</li>
                            <li>• <strong>Excellence:</strong> Delivering world-class AI solutions</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Global Presence</h4>
                          <p className="text-sm text-muted-foreground">
                            Headquartered in Brasília, Brazil, with global operations and partnerships 
                            with leading technology companies including NVIDIA.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="hover:text-primary transition-colors text-left">Careers</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Join Our Team</DialogTitle>
                        <DialogDescription>
                          Be part of the AI revolution. Explore opportunities at NowGo AI.
                        </DialogDescription>
                      </DialogHeader>
                      {isContactSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-8">
                          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Application Received!</h3>
                          <p className="text-muted-foreground text-center">
                            Thank you for your interest. Our HR team will review your application.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Open Positions</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li>• AI Research Scientist</li>
                              <li>• Machine Learning Engineer</li>
                              <li>• Full Stack Developer</li>
                              <li>• Product Manager - AI Solutions</li>
                              <li>• Business Development Manager</li>
                              <li>• DevOps Engineer</li>
                            </ul>
                          </div>
                          <form onSubmit={(e) => handleContactSubmit(e, 'Candidatura - Careers')} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={contactForm.name}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={contactForm.email}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="position">Position of Interest</Label>
                              <select 
                                className="w-full p-2 border rounded-md"
                                name="position"
                                required
                              >
                                <option value="">Select a position</option>
                                <option value="ai-researcher">AI Research Scientist</option>
                                <option value="ml-engineer">Machine Learning Engineer</option>
                                <option value="fullstack-dev">Full Stack Developer</option>
                                <option value="product-manager">Product Manager</option>
                                <option value="business-dev">Business Development</option>
                                <option value="devops">DevOps Engineer</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="message">Tell us about yourself</Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Your experience, skills, and why you want to join NowGo AI..."
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              Submit Application
                            </Button>
                          </form>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="hover:text-primary transition-colors text-left">Partnerships</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Partnership Opportunities</DialogTitle>
                        <DialogDescription>
                          Let's collaborate to shape the future of AI together.
                        </DialogDescription>
                      </DialogHeader>
                      {isContactSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-8">
                          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Partnership Inquiry Sent!</h3>
                          <p className="text-muted-foreground text-center">
                            Our partnerships team will review your proposal and get back to you soon.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Partnership Types</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Technology Integration Partners</li>
                              <li>• Research & Development Collaborations</li>
                              <li>• Channel & Distribution Partners</li>
                              <li>• Strategic Enterprise Alliances</li>
                              <li>• Academic & Research Institutions</li>
                            </ul>
                          </div>
                          <form onSubmit={(e) => handleContactSubmit(e, 'Parceria - Partnerships')} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Contact Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={contactForm.name}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Business Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={contactForm.email}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="company">Organization</Label>
                              <Input
                                id="company"
                                name="company"
                                value={contactForm.company}
                                onChange={handleInputChange}
                                placeholder="Company/Institution name"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="partnership-type">Partnership Type</Label>
                              <select 
                                className="w-full p-2 border rounded-md"
                                name="partnershipType"
                                required
                              >
                                <option value="">Select partnership type</option>
                                <option value="technology">Technology Integration</option>
                                <option value="research">Research & Development</option>
                                <option value="channel">Channel & Distribution</option>
                                <option value="strategic">Strategic Alliance</option>
                                <option value="academic">Academic Institution</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="message">Partnership Proposal</Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Describe your partnership proposal, goals, and how we can collaborate..."
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              Submit Partnership Inquiry
                            </Button>
                          </form>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </li>
                <li><button onClick={() => scrollToSection('research')} className="hover:text-primary transition-colors text-left">Research</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <button onClick={() => window.open('mailto:helio@nowgo.com.br')} className="hover:text-primary transition-colors">
                    helio@nowgo.com.br
                  </button>
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Mail className="mr-2 h-4 w-4" />
                        Get in Touch
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Contact NowGo AI</DialogTitle>
                        <DialogDescription>
                          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </DialogDescription>
                      </DialogHeader>
                      {isContactSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-8">
                          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                          <p className="text-muted-foreground text-center">
                            Thank you for contacting us. We'll get back to you soon.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleContactSubmit(e, 'Contato Geral - Get in Touch')} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={contactForm.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              name="company"
                              value={contactForm.company}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              name="message"
                              value={contactForm.message}
                              onChange={handleInputChange}
                              rows={4}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Send Message
                          </Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </li>
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

