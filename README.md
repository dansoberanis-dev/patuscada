# Patuscada Bar e Cultura - Site Oficial

Site oficial do **Patuscada Bar e Cultura**, bar e restaurante com música ao vivo no casarão da Praça João Cândido, bairro São Francisco, Curitiba, PR.

Bebidas, comidas e muita folia.

## Stack

- **Vite 8** (build tool moderno e rápido)
- **HTML5 + CSS3 + JavaScript vanilla** (sem frameworks pesados, performance máxima)
- **Zero dependências de runtime** (apenas Vite como devDependency)
- Pronto para rodar localmente com Node.js e para deploy na Vercel

## Como rodar localmente

Requer Node.js instalado (versão 18 ou superior recomendada).

```powershell
cd e:\sites\patuscada
npm install
npm run dev
```

Abra no navegador: `http://localhost:5173`

Para gerar a versão de produção:

```powershell
npm run build
npm run preview
```

A pasta `dist/` contém o site pronto para publicar.

## Estrutura do projeto

```
patuscada/
  index.html                  Página inicial (hero, agenda, cardápio, galeria, avaliações, visita, reserva)
  politica-de-privacidade.html
  termos-de-uso.html
  obrigado.html               Página de agradecimento pós reserva
  404.html                    Página de erro personalizada
  vite.config.js              Configuração do Vite (multi-páginas)
  vercel.json                 Configuração para deploy na Vercel
  public/
    assets/
      images/
        hero-palco-neon.webp  Imagem de fallback do hero
        logo/                 Logotipos colorido e branco (WebP e PNG)
        gallery/              Fotos do salão, palco e shows (WebP)
      video/
        patuscada-hero.mp4    Vídeo do hero
    data/
      agenda.json             Programação cultural da semana (editável)
    og-image.jpg              Imagem para compartilhamento (Open Graph)
    favicon.svg / .ico / .png Ícones do site
    robots.txt
    sitemap.xml
    site.webmanifest
  src/
    main.js                   Scripts (loader, menu, carrossel, cookies, formulário)
    style.css                 Design system completo
```

## Como editar a agenda cultural

Edite o arquivo `public/data/agenda.json`. Cada evento tem: dia da semana, data, horário, artista, descrição, imagem e texto alternativo. O carrossel avança automaticamente a cada 3 segundos e também funciona com botões e toque na tela.

## Deploy na Vercel (futuro)

1. Faça push deste projeto para o GitHub.
2. Importe o repositório na Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.

O arquivo `vercel.json` já está configurado com cache de assets e URLs limpas.

## Contato da casa

- Endereço: Av. Jaime Reis, 238, São Francisco, Curitiba, PR, CEP 80510-010
- WhatsApp: (41) 99833-9925
- Instagram: @opatuscada
- Cardápio digital: https://bar-patuscada.cluvi.com.br/

Desenvolvido por **Daniel Soberanis**.
