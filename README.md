# Magic the Gathering

Prova prática para a disciplina de Desafio Profissional VI do 6º semestre do curso de graduação de Engenharia de Software da Unicesumar.

Desenvolvido por:
- **Kauan Muriel Rossi (2214501-2)**
- **Daniel Bonam Rissardi (22013838-2)**
- **Eduardo Thomé ()**
- **Nathan Lisandro Toppa ()**

## Sumario

- Visão geral
- Tecnologias utilizadas
- Funcionalidades
- Observações

## Visão Geral

Nossa prova prática consiste em uma aplicação web o qual os usuário podem gerar e gerenciar facilmente decks para o modo de jogo Commander, do Magic the Gathering.

A aplicação permite o fácil gerenciamento de decks, permitindo tanto a criação (com a escolha aleatória de cards), quanto também a importação e exportação de decks prontos. Para isso, foram implementadas as regras básicas desse modo de jogo, possibilitando que os decks possam ser utilizados em partidas reais.

## Tecnologias utilizadas

- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [JWT](https://jwt.io/)
- [MongoDB](https://www.mongodb.com)
- [Docker](https://www.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/)
- [VueJS](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [VueRouter](https://router.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Vite](https://vitejs.dev/)

## Funcionalidades

Abaixo as funcionalidades desenvolvidas.

- Autenticação
    - O sistema conta com uma autenticação, onde para realizar ações relevantes na aplicação é necessário que o usuário esteja tenha criado uma conta válida e esteja logado ao sistema.
- Carteira do usuário
    - Os usuários possuem uma carteira própria onde podem depositar ou sacar dinheiro. Os usuários utilizam a carteira para comprar novos tokens ou ganhar dinheiro por meio da venda dos mesmos.
- Preferencias
    - Ao realizar a criação da sua conta, o usuario pode selecionar seu personagem, criador e revista preferidos, os quais devem ser cadastrados pelo administrador do sistema, entretanto não influenciam a geração de tokens.
- Minerar tokens
    - O usuário faz uma requisição para a rota de mineração e recebe como retorno um token como recompensa de seu esforço.
    - Cada token é unico, o mesmo é gerado por meio da API da marvel.
    - O token gerado é armazenado no banco de dados e atrelado ao usuário que o minerou.
- Marketplace de tokens
    - O usuário é capaz de anunciar os seus tokens em um marketplace onde outros usuários podem compra-lo.
    - O anuncio possui um valor fixo com valor definido.
    - O usuário é capaz de adquirir novos tokens por meio de seu dinheiro na plataforma.
- Obter detalhes do conteúdo do token
    - O usuário pode visualizar os detalhes de um tokens.
    - Os dados podem ser do seu token ou de tokens de outros usuários.

## Escopo do projeto - Solicitação do professor.

* Magic the Gathering é um jogo de cartas competitivo e colecionável publicado pela empresa Wizards of the Coast. MTG tem diversos formatos de jogo, commander, pauper, standard, entre outros. Cada modo de jogo tem suas próprias regras, que irão ditar mecanicas, quantidade de cartas, cards permitidos entre outras caracteristicas.
Um dos modos mais jogados no mundo todo é o Commander, também conhecido como Elder Dragon Highlander (EDH).
* As características desse modo de jogo, é que seu baralho será composto de 99 cartas + 1 card de comandante. Porém não pode haver repetição de cartas, somente terremos básicos podem ser repetidos (basic lands) ou cartas que tenham explicitamente em seu texto uma indicação de que podem ter mais de uma cópia, sendo essa uma exceção rara.Um comandante é uma criatura Lendária, e isso está indicado no card desta criatura.

Objetivos da Atividade

- Tendo essas informações como base, você deve ler a documentação fornecida, e buscar por 99 cards nessa base de dados para formar o seu baralho.
Procure primeiro por um comandante, pois ele irá ditar quais cores suas outras 99 cartas poderão ter. Escolhendo o comandante, utilize as informações na doc para buscar outras 99 cartas na base de dados correspondente as cores permitidas, lembrando que você pode repetir somente os terrenos básicos.
- Após consumir a API e buscar esses dados, salve eles em um arquivo.json.
- Crie uma rota em sua API para trazer os 100 cards de seu baralho
- Salve seu deck no banco de dados de sua escolha
- Criar o sistema de Autenticação para sua API (Só usuários autenticados podem criar e editar seus baralhos)
- Criar o sistema de Autorização
- Crie os testes automatizados para validar as regras de negócio e o funcionamento de seus endpoints, você pode utilizar mocks para isso.
- Permita que mais de um baralho seja criado em sua aplicação
- Crie uma rota para listar todos os baralhos (somente um usuário com permissão admin pode usar essa rota)
- Crie uma rota para listar somente os baralhos do jogador que está logado
- Adicione cacheamento na rota de listar para listar todos os baralhos do jogador logado (Recomendação: https://docs.nestjs.com/techniques/caching)
- Crie uma rota onde seja possível "importar" um baralho via json, e valide se esse baralho segue as regras do commander.
- Realize os testes de performance e indique o comparativo de quantas vezes mais requisições e tempo de resposta você conseguiu atender utilizando a listagem de baralhos com cache e sem cache.
- (EXTRA) Utilize Clusters na sua aplicação e faça novos testes de performance e 
demonstre os números obtidos.
- (EXTRA) Utilizar Node.js streams para consumir a API de magic e também para consumir sua própria API.
- (EXTRA) Front-end