# Magic the Gathering

Prova prática para a disciplina de Desafio Profissional VI do 6º semestre do curso de graduação de Engenharia de Software da Unicesumar.

Desenvolvido por:
- **Kauan Muriel Rossi (22014501-2)**
- **Daniel Bonam Rissardi (22013838-2)**
- **Eduardo Thomé (22110037-2)**
- **Nathan Lisandro Toppa (22019971-2)**

## Sumario

- Visão geral
- Tecnologias utilizadas
- Funcionalidades
- Observações

## Visão Geral

Nossa prova prática consiste em uma aplicação web o qual os usuário podem gerar e gerenciar facilmente decks para o modo de jogo Commander, do Magic the Gathering.

A aplicação permite o fácil gerenciamento de decks, permitindo tanto a criação (com a escolha aleatória de cards), quanto também a importação e exportação de decks prontos. Para isso, foram implementadas as regras básicas desse modo de jogo, possibilitando que os decks possam ser utilizados em partidas reais.

## Testes e2e e Testes de carga.

A foi desenvolvido para a aplicação testes unitários que cobrem todos os controllers, services e repository da aplicação garantindo uma maior qualidade e controle durente o desenvolvimento do sistema.

### Teste de carga sem cache
Abaixo os testes de carga em requisições aos decks sem utilizar cache

![image](https://github.com/user-attachments/assets/140e6fdf-38a0-495d-ba2b-8c751f1ff939)

### Teste de carga com cache
Abaixo os testes de carga em requisições aos decks utilizando cache

![image](https://github.com/user-attachments/assets/003c2e6b-3d82-4872-84de-bf6eb5494479)

Como pode ser observado nas comparações acima, sem a utilização de cache há uma perda considerável de desempenho na listagem de decks.
Os testes foram realizados utilizando a ferramenta wrk com 67679 requisições.

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
- Autorização
    - O sistema conta com uma autorização, onde somente usuários privilegiados podem fazer uso de certas rotas
- Criar Decks
    - O sistema permite criar decks gerados aleatoriamente
- Exportar Decks
- Importar Decks


## Escopo do projeto - Solicitação do professor.

* Magic the Gathering é um jogo de cartas competitivo e colecionável publicado pela empresa Wizards of the Coast. MTG tem diversos formatos de jogo, commander, pauper, standard, entre outros. Cada modo de jogo tem suas próprias regras, que irão ditar mecanicas, quantidade de cartas, cards permitidos entre outras caracteristicas.
Um dos modos mais jogados no mundo todo é o Commander, também conhecido como Elder Dragon Highlander (EDH).
* As características desse modo de jogo, é que seu baralho será composto de 99 cartas + 1 card de comandante. Porém não pode haver repetição de cartas, somente terremos básicos podem ser repetidos (basic lands) ou cartas que tenham explicitamente em seu texto uma indicação de que podem ter mais de uma cópia, sendo essa uma exceção rara.Um comandante é uma criatura Lendária, e isso está indicado no card desta criatura.

Objetivos da Atividade

- Tendo essas informações como base, você deve ler a documentação fornecida, e buscar por 99 cards nessa base de dados para formar o seu baralho.
Procure primeiro por um comandante, pois ele irá ditar quais cores suas outras 99 cartas poderão ter. Escolhendo o comandante, utilize as informações na doc para buscar outras 99 cartas na base de dados correspondente as cores permitidas, lembrando que você pode repetir somente os terrenos básicos. ✔️
- Após consumir a API e buscar esses dados, salve eles em um arquivo.json. ✔️
- Crie uma rota em sua API para trazer os 100 cards de seu baralho ✔️
- Salve seu deck no banco de dados de sua escolha ✔️
- Criar o sistema de Autenticação para sua API (Só usuários autenticados podem criar e editar seus baralhos) ✔️
- Criar o sistema de Autorização ✔️
- Crie os testes automatizados para validar as regras de negócio e o funcionamento de seus endpoints, você pode utilizar mocks para isso. ✔️
- Permita que mais de um baralho seja criado em sua aplicação ✔️
- Crie uma rota para listar todos os baralhos (somente um usuário com permissão admin pode usar essa rota) ✔️
- Crie uma rota para listar somente os baralhos do jogador que está logado ✔️
- Adicione cacheamento na rota de listar para listar todos os baralhos do jogador logado (Recomendação: https://docs.nestjs.com/techniques/caching) ✔️
- Crie uma rota onde seja possível "importar" um baralho via json, e valide se esse baralho segue as regras do commander. ✔️
- Realize os testes de performance e indique o comparativo de quantas vezes mais requisições e tempo de resposta você conseguiu atender utilizando a listagem de baralhos com cache e sem cache.✔️
- (EXTRA) Utilize Clusters na sua aplicação e faça novos testes de performance e 
demonstre os números obtidos.
- (EXTRA) Utilizar Node.js streams para consumir a API de magic e também para consumir sua própria API.
- (EXTRA) Front-end ✔️

### Segunda Parte

### Mensageria
Mensageria refere-se ao uso de sistemas de troca de mensagens entre diferentes componentes ou serviços de uma aplicação. Em arquiteturas modernas, especialmente em sistemas distribuídos e de microserviços, a mensageria facilita a comunicação assíncrona, permitindo que diferentes partes da aplicação interajam de forma eficiente e escalável.

Proposta
### Utilizando a API de magic construida no bimestre passado, faça as seguintes alterações/funcionalidades

- Implemente um sistema de notificações que informe os usuários sobre atualizações nos baralhos, como adição de novas cartas ou modificações. Isso pode ser feito emitindo mensagens através do RabbitMQ ou Kafka que sejam consumidas por uma aplicação de frontend para exibir notificações instantâneas (frontend opcional).

- Implemente a funcionalidade de importação de baralhos de forma assíncrona, utilizando RabbitMQ para gerenciamento de filas e WebSockets para notificações em tempo real aos usuários sobre o status da importação.
EX:

    - O usuário faz uma requisição para importar um baralho
A API recebe a requisição, valida os dados e salva as informações iniciais do baralho no banco de dados.
Em seguida, a API envia uma mensagem para a fila deck_import_queue no RabbitMQ,/Kafka contendo os detalhes do baralho a ser importado.✔️
Um worker dedicado está escutando a fila deck_import_queue.
Ao receber uma mensagem, o worker processa a importação do baralho, realizando todas as operações necessárias, como validação adicional, integração com outros serviços ou persistência final no banco de dados.✔️
Após concluir o processamento, o worker envia uma mensagem para a fila deck_updates_queue.
Outro worker, responsável por gerenciar notificações, consome essa mensagem e utiliza WebSockets✔️ (por exemplo, com Socket.IO) para emitir um evento de atualização para o cliente conectado.
O frontend, por sua vez, ouve esse evento e atualiza a interface do usuário em tempo real, informando sobre a conclusão da importação.
- Implemente filas de tarefas com diferentes prioridades para garantir que operações críticas sejam tratadas com maior prioridade. Por exemplo, operações de autenticação podem ter prioridade mais alta em relação a atualizações de baralhos, no nosso caso, usuários autenticados e com permissão de ADM tem prioridade sobre usuários normais.
- Extra: Configure o envio de métricas e eventos para uma ferramenta de monitoramento (como Prometheus ou Grafana) através de mensagens. Isso permite a criação de dashboards em tempo real e configurações de alertas para eventos críticos no sistema.✔️