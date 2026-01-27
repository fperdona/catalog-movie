# Catálogo de Filmes

Aplicação web de catálogo de filmes construída com React, TypeScript e Vite, consumindo a API pública do TMDB.

## Funcionalidades

- Listagem de filmes populares com paginação
- Busca de filmes por título via API
- Página de detalhes com sinopse, gêneros, duração e trailer
- Sistema de favoritos com persistência em localStorage
- Alternância de tema (dark/light mode)
- Skeleton loading durante carregamentos
- Layout responsivo
- Testes unitários com Vitest

## Tecnologias

- **React 19** com TypeScript
- **Vite** como bundler
- **React Router DOM** para navegação SPA
- **TanStack React Query** para gerenciamento de requisições e cache
- **CSS Modules** para estilização com escopo local
- **React Player** para reprodução de trailers
- **Vitest** + **Testing Library** para testes unitários
- **vite-plugin-svgr** para ícones SVG como componentes React

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
git clone https://github.com/fperdona/catalog-movie.git
cd catalog-movie
npm install
```

## Configuração da API Key

1. Crie uma conta em [themoviedb.org](https://www.themoviedb.org/)
2. Acesse **Settings > API** e gere sua API Key
3. Crie um arquivo `.env` na raiz do projeto:

```
VITE_TMDB_API_KEY=sua_api_key_aqui
```

## Execução

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Testes

```bash
npm test
```

## Build de produção

```bash
npm run build
npm run preview
```

## Decisões técnicas

- **TanStack React Query**: escolhido para gerenciar requisições à API com cache automático, evitando chamadas duplicadas e melhorando a experiência do usuário ao navegar entre páginas já visitadas.

- **CSS Modules**: garante escopo local das classes CSS, evitando conflitos de nomes e mantendo a estilização organizada por componente.

- **Context API para favoritos**: solução nativa do React para compartilhar estado entre componentes (MovieCard, página de Favoritos) sem necessidade de bibliotecas externas. Os dados são persistidos em localStorage para manter os favoritos entre sessões.

- **Variáveis CSS para temas**: a alternância dark/light é feita via CSS Custom Properties com o atributo `data-theme`, permitindo trocar todas as cores da aplicação sem re-renderizar componentes.

- **Componente Icon com vite-plugin-svgr**: permite importar SVGs como componentes React, herdando `currentColor` para trocar cores via CSS de forma consistente com o tema.

- **Vitest**: integração nativa com Vite, compartilhando a mesma configuração de build. Testes focados em renderização e comportamento dos componentes com Testing Library.
