import helmet from 'helmet';

// O Helmet é uma coleção de 14 pequenos middlewares de segurança
// que ajudam a proteger sua aplicação Express definindo vários cabeçalhos HTTP.
const helmetMiddleware = helmet({
  // Desativa o cabeçalho X-Powered-By para não divulgar a tecnologia
  hidePoweredBy: true,
  // Define a Content Security Policy (CSP) para prevenir ataques XSS e injeção de dados
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Ajustar conforme necessário para scripts
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"], // Ajustar para fontes de imagens
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  // Proteção contra ataques de Clickjacking
  frameguard: { action: 'deny' },
  // Prevenção de ataques XSS (Cross-Site Scripting)
  xssFilter: true,
  // Proteção contra "mime sniffing"
  noSniff: true,
  // Força o uso de HTTPS em clientes que suportam
  hsts: {
    maxAge: 31536000, // 1 ano em segundos
    includeSubDomains: true,
    preload: true
  },
  // Desativa o cache de requisições em alguns browsers
  noCache: false
});

export default helmetMiddleware;
