export type StepType = 'opening' | 'multiple-choice' | 'transition' | 'text-input' | 'summary' | 'loading' | 'result' | 'testimonials' | 'offer' | 'closing';

export interface Option {
  id: string;
  text: string;
}

export interface QuizStep {
  id: number;
  type: StepType;
  title: string;
  description?: string;
  subDescription?: string;
  imageUrl?: string;
  options?: Option[];
}

export const quizData: QuizStep[] = [
  {
    id: 1,
    type: 'opening',
    title: 'PERCA ATÉ 8KG EM 21 DIAS COM APENAS 10 MINUTOS POR DIA',
    description: 'Sem academia, Sem equipamento, Sem dieta maluca, Só um plano que te diz exatamente o que fazer, todos os dias, até seu corpo mudar.',
    imageUrl: '/__l5e/assets-v1/05d927bd-1cdb-4c96-8708-38b54e39fe5d/Chat-GPT-Image-23-de-set-de-2026-15-02-24.webp',
  },
  {
    id: 2,
    type: 'transition',
    title: 'Mais de 379 mil',
    description: 'É o número de mulheres que já ajudamos através desse teste!',
    imageUrl: '/__l5e/assets-v1/535630b0-85c2-447c-a72a-7359f1db3044/Whats-App-Image-2026-09-23-at-15-33-42.webp',
  },
  {
    id: 3,
    type: 'multiple-choice',
    title: 'Hoje, como você se sente em relação a exercícios?',
    options: [
      { id: '1', text: 'Estou sedentária e preciso mudar isso' },
      { id: '2', text: 'Já tentei antes, mas parei' },
      { id: '3', text: 'Treino de vez em quando' },
      { id: '4', text: 'Já tenho uma rotina, quero intensificar' },
    ],
  },
  {
    id: 4,
    type: 'multiple-choice',
    title: 'Você já praticou calistenia?',
    options: [
      { id: '1', text: 'Nunca ouvi falar direito' },
      { id: '2', text: 'Já vi, mas nunca fiz' },
      { id: '3', text: 'Faço às vezes' },
      { id: '4', text: 'Já tenho experiência' },
    ],
  },
  {
    id: 5,
    type: 'multiple-choice',
    title: 'O que você mais quer mudar nos próximos 21 dias?',
    options: [
      { id: '1', text: 'Emagrecer e definir' },
      { id: '2', text: 'Ganhar força' },
      { id: '3', text: 'Melhorar o condicionamento' },
      { id: '4', text: 'Sair do sedentarismo de vez' },
      { id: '5', text: 'Criar uma rotina que eu NÃO abandone' },
    ],
  },
  {
    id: 6,
    type: 'transition',
    title: 'Boa, Agora a parte que a maioria erra: descobrir quanto treino REALMENTE cabe na sua rotina, não quanto você acha que deveria fazer.',
  },
  {
    id: 7,
    type: 'multiple-choice',
    title: 'Quanto tempo você consegue dedicar por sessão, sendo 100% honesta?',
    options: [
      { id: '1', text: 'Cerca de 10 minutos' },
      { id: '2', text: '15, 20 minutos' },
      { id: '3', text: '20, 30 minutos' },
      { id: '4', text: 'Depende do dia' },
    ],
  },
  {
    id: 8,
    type: 'multiple-choice',
    title: 'Quantos dias por semana você consegue treinar de verdade?',
    options: [
      { id: '1', text: '1, 2 dias' },
      { id: '2', text: '3, 4 dias' },
      { id: '3', text: '5 dias' },
      { id: '4', text: 'Depende da semana' },
    ],
  },
  {
    id: 9,
    type: 'multiple-choice',
    title: 'Como costuma ser seu dia?',
    options: [
      { id: '1', text: 'Passo o dia inteiro sentada' },
      { id: '2', text: 'Tenho uma rotina equilibrada' },
      { id: '3', text: 'Estou sempre me movimentando' },
      { id: '4', text: 'Minha rotina muda toda hora' },
    ],
  },
  {
    id: 10,
    type: 'multiple-choice',
    title: 'O que mais te faz DESISTIR de uma rotina de exercícios?',
    description: 'Seja honesta, Essa resposta define tudo.',
    options: [
      { id: '1', text: 'Falta de tempo' },
      { id: '2', text: 'Falta de motivação' },
      { id: '3', text: 'Não sei o que fazer' },
      { id: '4', text: 'Cansaço' },
      { id: '5', text: 'Eu começo e paro sempre' },
    ],
  },
  {
    id: 11,
    type: 'multiple-choice',
    title: 'Onde você pretende treinar?',
    options: [
      { id: '1', text: 'Em casa' },
      { id: '2', text: 'No quarto' },
      { id: '3', text: 'Na sala' },
      { id: '4', text: 'Onde tiver espaço' },
    ],
  },
  {
    id: 12,
    type: 'multiple-choice',
    title: 'Você tem algum equipamento?',
    description: 'Não tem nada? Ótimo, O desafio foi feito pra funcionar só com o peso do seu corpo, sem desculpa de "não tenho equipamento".',
    options: [
      { id: '1', text: 'Nenhum' },
      { id: '2', text: 'Colchonete' },
      { id: '3', text: 'Elástico' },
      { id: '4', text: 'Outro' },
    ],
  },
  {
    id: 13,
    type: 'multiple-choice',
    title: 'Como está sua mobilidade hoje?',
    options: [
      { id: '1', text: 'Boa' },
      { id: '2', text: 'Razoável' },
      { id: '3', text: 'Preciso melhorar muito' },
      { id: '4', text: 'Não sei avaliar' },
    ],
  },
  {
    id: 14,
    type: 'multiple-choice',
    title: 'Como sua energia costuma estar durante o dia?',
    options: [
      { id: '1', text: 'Baixa, vivo cansada' },
      { id: '2', text: 'Oscila muito' },
      { id: '3', text: 'Razoável' },
      { id: '4', text: 'Boa' },
    ],
  },
  {
    id: 15,
    type: 'multiple-choice',
    title: 'Qual formato de treino combina mais com você?',
    options: [
      { id: '1', text: 'Curto e direto ao ponto' },
      { id: '2', text: 'Mais tranquilo' },
      { id: '3', text: 'Mais dinâmico' },
      { id: '4', text: 'Quero variar' },
      { id: '5', text: 'Mais intenso' },
    ],
  },
  {
    id: 16,
    type: 'multiple-choice',
    title: 'Qual tipo de treino te interessa mais?',
    options: [
      { id: '1', text: 'Corpo inteiro' },
      { id: '2', text: 'Força' },
      { id: '3', text: 'Condicionamento' },
      { id: '4', text: 'Mobilidade' },
    ],
  },
  {
    id: 17,
    type: 'multiple-choice',
    title: 'O que faria você NÃO desistir dessa vez?',
    options: [
      { id: '1', text: 'Ter um plano pronto' },
      { id: '2', text: 'Ver minha evolução acontecendo' },
      { id: '3', text: 'Treinos curtos de verdade' },
      { id: '4', text: 'Saber exatamente o que fazer todo dia' },
      { id: '5', text: 'Ter variedade pra não enjoar' },
    ],
  },
  {
    id: 18,
    type: 'multiple-choice',
    title: 'Quando você perde um dia de treino, o que acontece?',
    description: 'Se você marcou a 2 ou a 3, essa resposta é a mais importante do quiz, É aqui que a maioria perde o resultado, E é exatamente aqui que o seu plano vai te salvar.',
    options: [
      { id: '1', text: 'Volto no dia seguinte' },
      { id: '2', text: 'Acabo perdendo a semana inteira' },
      { id: '3', text: 'Espero "recomeçar do zero" na segunda' },
      { id: '4', text: 'Tento compensar depois' },
    ],
  },
  {
    id: 19,
    type: 'multiple-choice',
    title: 'Em qual período você provavelmente treinaria?',
    options: [
      { id: '1', text: 'Manhã' },
      { id: '2', text: 'Tarde' },
      { id: '3', text: 'Noite' },
      { id: '4', text: 'Varia bastante' },
    ],
  },
  {
    id: 20,
    type: 'text-input',
    title: 'Como você quer ser chamada?',
    description: 'Vamos personalizar seu plano com seu nome.',
  },
  {
    id: 21,
    type: 'text-input',
    title: 'Qual sua altura?',
    description: 'Ex: 1,65',
  },
  {
    id: 22,
    type: 'text-input',
    title: 'Qual seu peso atual e qual peso deseja atingir?',
    description: 'Ex: 70kg, 65kg',
  },
  {
    id: 23,
    type: 'summary',
    title: 'Seu perfil está tomando forma, [NOME].',
  },
  {
    id: 24,
    type: 'multiple-choice',
    title: 'Últimos ajustes, Qual é sua prioridade MÁXIMA nos próximos 21 dias?',
    options: [
      { id: '1', text: 'Criar consistência (parar de desistir)' },
      { id: '2', text: 'Evoluir minha força' },
      { id: '3', text: 'Melhorar meu condicionamento' },
      { id: '4', text: 'Me movimentar mais no dia a dia' },
    ],
  },
  {
    id: 25,
    type: 'loading',
    title: 'Seu plano de 21 dias está sendo montado...',
    description: 'Analisando suas respostas...',
  },
  {
    id: 26,
    type: 'result',
    title: '[NOME], SEU PERFIL ESTÁ PRONTO',
  },
  {
    id: 27,
    type: 'testimonials',
    title: 'Veja o que quem usou o método está falando:',
  },
  {
    id: 28,
    type: 'offer',
    title: '[NOME], SEU DESAFIO DE 21 DIA ESTÁ PRONTO',
  },
  {
    id: 29,
    type: 'closing',
    title: 'Você já tem o primeiro passo, [NOME].',
  },
];

export const TOTAL_STEPS = 29;
