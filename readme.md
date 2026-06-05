ArduClass - Laboratório de Robótica
O ArduClass é um aplicativo mobile multiplataforma (Android/iOS) focado em auxiliar estudantes e professores de robótica. Ele centraliza catálogos de componentes, oferece tutoriais de montagem passo a passo e permite o envio de validações práticas diretamente do laboratório.
Projeto desenvolvido para a disciplina da faculdade

Telas do Projeto
O aplicativo possui 5 telas principais funcionais:
1. Login: com a autenticação de usuários.
2. Dashboard (Home): Resumo de aulas e atalhos rápidos.
3. Catálogo de Componentes: Lista de sensores e placas disponíveis.
4. Tutorial de Montagem: Passo a passo detalhado de circuitos.
5. Envio de Progresso: Formulário para fotos e dúvidas sobre os protótipos.

Como Instalar e Executar o Projeto

Pré-requisitos
Node.js v18+ instalado
NPM ou Yarn (gerenciador de pacotes)
Expo CLI (`npm install -g expo-cli`)
Conta no Firebase (para banco de dados e autenticação futura)
Celular ou emulador Android/iOS configurado (Expo Go)

1. Clonar o repositório:
git clone [ https://github.com/annajseixas/arduClass/tree/main ]
cd arduclass
2. Instalar dependências:
npm install
3. Configurar variáveis de ambiente:
Copie o arquivo .env.example para .env e preencha com suas credenciais do Firebase.
4. Iniciar o projeto:
npx expo start
5. Abrir no celular:
Escaneie o QR Code com o aplicativo Expo Go (disponível na App Store e Google Play)
Nota: Lembre-se de incluir um arquivo README.md no repositório com essas instruções.

