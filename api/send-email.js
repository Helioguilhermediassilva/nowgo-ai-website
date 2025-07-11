// API route serverless para envio de emails no Vercel
// Compatível com Vercel Functions

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, company, message, solutionType, timestamp } = req.body;

    // Validar dados obrigatórios
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios ausentes: name, email, message'
      });
    }

    // Preparar dados do email
    const emailData = {
      from: 'onboarding@resend.dev',
      to: ['helio@nowgo.com.br'],
      subject: `Nova mensagem de contato - ${name} (${company || 'Não informado'})`,
      html: `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              Nova Mensagem - NowGo AI Website
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Informações do Contato</h3>
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
              <p><strong>Tipo de Solicitação:</strong> ${solutionType || 'Contato Geral'}</p>
              <p><strong>Data/Hora:</strong> ${timestamp || new Date().toISOString()}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
              <h3 style="color: #059669; margin-top: 0;">Mensagem</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              <p>Esta mensagem foi enviada através do formulário de contato do site NowGo AI.</p>
              <p>Para responder, utilize o email: ${email}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      reply_to: email
    };

    // Enviar email usando fetch para a API do Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer re_NL1dGwTC_5DZF45GP2DBF4xXEX1LgyXks`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(`Resend API error: ${resendResult.message || 'Unknown error'}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!',
      email_id: resendResult.id
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({
      success: false,
      message: `Erro interno do servidor: ${error.message}`
    });
  }
}

