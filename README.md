<div align="center">

# ⚖️ Bruna Simões Pereira de Almeida — Advocacia 100% Digital

<p align="center">
  <strong>Landing page institucional de alta sofisticação para consultoria jurídica e advocacia 100% online em âmbito nacional.</strong>
</p>

<p align="center">
  <a href="https://brunasimoes-adv-vdonoladev.vercel.app/"><strong>Visualizar Demonstração Online »</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-E34F26?style=for-the-badge" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/Compliance-OAB%20%7C%20LGPD-blue?style=for-the-badge" alt="Compliance" />
</p>

</div>

## 📖 Sobre o Projeto

Aplicação web desenvolvida para a advogada **Dra. Bruna Simões Pereira de Almeida** (OAB/SP 458.912), focada na prestação de assessoria jurídica estratégica e humanizada de forma **100% digital**, cobrindo comarcas e tribunais de todo o Brasil e exterior.

O projeto foi estruturado com base nas diretrizes éticas do **Provimento nº 205/2021 da OAB**, equilibrando elegância estética, sobriedade visual e alto padrão de conversão para as três principais frentes de atuação do escritório:
- **Direito Civil:** Contratos estratégicos, ações indenizatórias, cobranças e litígios imobiliários.
- **Direito de Família & Sucessões:** Divórcio online, partilha de bens, guarda, pensão alimentícia e inventários.
- **Direito do Trabalho:** Reclamações trabalhistas, rescisões indiretas, verbas rescisórias e combate a práticas abusivas.

## ✨ Recursos & Funcionalidades

- **Identidade Visual Premium:** Tipografia refinada combinando a clássica *Cormorant Garamond* (serifa) com a moderna *Plus Jakarta Sans*, sobreposta por uma textura tangível de ruído sutil (`bg-noise`).
- **Painel de Métricas Animadas:** Seção com contadores progressivos em JavaScript para anos de experiência e volume de casos.
- **Carrossel Interativo de Depoimentos:** Slider nativo com suporte a navegação por botões anterior/próximo e indicadores em dots.
- **FAQ Dinâmico (Accordion):** Seção de dúvidas frequentes com animação de expansão e controle de estado `aria-expanded` para acessibilidade.
- **Formulário de Contato Inteligente:** Coleta estruturada de dados com opção de disparo simultâneo de mensagem pré-formatada para o WhatsApp e modal acessível de confirmação de envio.
- **Canal de Conversão Flutuante:** Botão fixo de WhatsApp com tooltip animado para atendimento imediato.
- **SEO Avançado & JSON-LD:** Marcação estruturada completa com `Schema.org/LegalService`, otimizando a indexação para buscas de advocacia online no Google.

## 🛠️ Tecnologias Utilizadas

Construído priorizando performance nativa, acessibilidade e carregamento instantâneo:

- **HTML5 Semântico:** Estrutura otimizada para leitores de tela e robôs de busca.
- **CSS3 Moderno & Keyframes:**
  - Sistema de variáveis CSS para controle centralizado de cores (tons escuros profundos e dourado/champagne).
  - Animações de revelação por scroll (`reveal-fade`, `reveal-scale`).
  - Layouts responsivos via Flexbox e CSS Grid.
- **JavaScript (Vanilla ES6+):**
  - Controle de rolagem suave e menu mobile interativo.
  - Lógica de transição do carrossel e accordions do FAQ.
  - Formatação e validação de formulários.
- **Schema.org / JSON-LD:** Metadados enriquecidos para exibição em rich snippets de busca jurídica.
- **Hospedagem / Deploy:** Vercel.

## 📁 Estrutura do Repositório

```bash
bruna-simoes-advocacia/
├── assets/
│   └── images/              # Retrato profissional, hero backgrounds e ícones
│       ├── bruna-almeida-portrait.jpg
│       └── hero-bg.jpg
├── css/
│   ├── style.css            # Estilos base, variáveis e layout
│   └── animations.css       # Animações de entrada e transições
├── js/
│   └── main.js              # Lógica do carrossel, FAQ, menu e modais
├── index.html               # Documento principal
└── README.md                # Documentação técnica