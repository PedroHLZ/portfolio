# Pedro Queiroz · Portfólio Front-end

Portfólio estático com projetos de estudo, decisões técnicas e demonstrações navegáveis. HTML, CSS e JavaScript sem etapa de compilação.

## Executar localmente

Na raiz do repositório:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Abra http://127.0.0.1:8000. Use um servidor HTTP para testar armazenamento e navegação.

## Projetos selecionados

- **Organizador de tarefas** — adicionar, concluir e excluir tarefas, filtros e LocalStorage. Estado centralizado; textos inseridos por textContent; validação ao recuperar dados e aviso quando o armazenamento não está disponível. Dados limitados ao navegador, sem sincronização.
- **Divisor de conta** — gorjeta opcional, validação de valores e pessoas, cálculo em centavos, formatação pt-BR e distribuição dos centavos restantes. Não processa pagamentos.
- **Super Mario** — exercício baseado no curso Dev em Dobro. Modal com foco, fechamento por Escape, trailer carregado sob demanda e vídeo de fundo controlado pelo visitante. Personagens e mídia pertencem aos respectivos titulares.

## Organização

- `index.html`: conteúdo e estrutura da página.
- `css/style.css`: identidade visual, responsividade e estados de interação.
- `js/script.js`: navegação móvel, preferências de cor e contato.
- `projetos/demo.css`: estilos comuns das demonstrações.
- `projetos/`: exemplos independentes. Arquivos antigos permanecem disponíveis, mas não são dependências da nova página.

## Contato

O formulário encaminha dados ao FormSubmit. O serviço externo precisa estar ativado para o endereço destinatário. A confirmação HTTP/API não comprova entrega na caixa de entrada. O front-end trata falha, timeout e envio duplicado; preserva o texto em caso de erro. E-mail e LinkedIn continuam disponíveis como alternativas.

Não há segredos ou credenciais no código. Para validar entrega real, o proprietário deve realizar um envio e confirmar o recebimento; os testes locais não enviam mensagens.

## Acessibilidade e desempenho

HTML semântico, labels, foco visível, navegação por teclado, menu com aria-expanded, mensagens anunciadas e respeito a prefers-reduced-motion. Conteúdo da página não depende de animação nem de JavaScript para aparecer. Fontes do sistema e carregamento tardio da imagem secundária evitam dependências na primeira renderização.

## Efeito de partículas

A página principal inclui uma estrutura procedural inspirada no HTML de referência fornecido pelo proprietário. A projeção 3D é desenhada em Canvas 2D, sem bibliotecas externas. A rolagem controla rotação, posição e expansão, com uma leve resposta ao ponteiro. O botão “Pausar efeito” congela a animação. Com movimento reduzido, a composição fica estática. A animação pausa em abas ocultas e utiliza menos partículas em telas pequenas.

## Publicação do site

Compatível com GitHub Pages na raiz de `/portfolio/`. URLs de arquivos e demos são relativas. As mudanças locais precisam ser publicadas no repositório para aparecerem online. Os links de código apontam para a branch `main`.

## Próximas evoluções possíveis

Testes automatizados em navegador, integração com APIs em um novo projeto e inclusão de currículo revisado pelo proprietário. Experiência profissional, resultados de clientes e domínio de frameworks não são presumidos.
