/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { quizData, TOTAL_STEPS } from '@/data/quizData';

export default function App() {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const currentStep = quizData.find((step) => step.id === currentStepId);
  
  // Carousel logic for testimonials (moved up)
  const testimonialImages = [
    '/__l5e/assets-v1/416bb194-ffd8-46b4-9f18-82d1bfadcf7b/Whats-App-Image-2026-09-23-at-20-43-05.webp',
    '/__l5e/assets-v1/9737c595-ce49-4f6f-9574-d37475e6f60b/Whats-App-Image-2026-09-23-at-20-32-48.webp',
    '/__l5e/assets-v1/801f44b9-f47e-4eb0-8635-7b07f0bc7f88/Whats-App-Image-2026-09-23-at-20-22-22-1.webp',
    '/__l5e/assets-v1/c0c83b2a-825d-4c75-8a41-03c5283804e9/Whats-App-Image-2026-09-23-at-20-26-21.webp'
  ];

  const loadedImagesRef = useRef(new Set<string>());
  
  // Preload images intelligently
  useEffect(() => {
    const nextStepId = currentStepId + 1;
    const nextStep = quizData.find((step) => step.id === nextStepId);
    let imageUrlToLoad: string | null = null;

    if (nextStep && nextStep.imageUrl) {
      imageUrlToLoad = nextStep.imageUrl ?? null;
    } else if (nextStep && nextStep.type === 'testimonials') {
      imageUrlToLoad = testimonialImages[0] ?? null;
    }

    if (imageUrlToLoad && !loadedImagesRef.current.has(imageUrlToLoad)) {
      loadedImagesRef.current.add(imageUrlToLoad);
      const img = new Image();
      img.src = imageUrlToLoad;
    }
  }, [currentStepId]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    if (currentStep?.type === 'testimonials') {
      const interval = setInterval(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [currentStep?.type]);

  const [name, setName] = useState('');
  
  // States for interactive inputs
  const [height, setHeight] = useState(165);
  const [currentWeight, setCurrentWeight] = useState(70);
  const [targetWeight, setTargetWeight] = useState(65);

// Adicionar no topo do App, dentro do componente App, ou no escopo de variáveis globais.
const originalPrice = 97.90;
const currentPrice = 19.90;
const savings = (originalPrice - currentPrice).toFixed(2);
const urgencyText = "OFERTA VÁLIDA ATÉ 00:00!";
const scarcityText = "";

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentStepId]: answer }));
  };

  useEffect(() => {
    // Update answers automatically when sliders change
    if (currentStepId === 21) handleAnswer(`${height} cm`);
    if (currentStepId === 22) handleAnswer(`${currentWeight}kg / ${targetWeight}kg`);
  }, [currentStepId, height, currentWeight, targetWeight]);

  const nextStep = () => {
    if (currentStepId < TOTAL_STEPS) {
      setCurrentStepId((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepId > 1) {
      setCurrentStepId((prev) => prev - 1);
    }
  };

  const handleCheckout = () => {
    window.location.href = 'https://pay.cakto.com.br/32s95wy_1130175';
  };

  if (!currentStep) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        {currentStepId <= TOTAL_STEPS && (
          <div className="mb-6 mt-4 flex items-center gap-3">
            {currentStepId > 1 && currentStep.type !== 'loading' && (
              <button 
                onClick={() => prevStep()} 
                aria-label="Voltar para a etapa anterior"
                className="p-1 -ml-1 rounded-full text-gray-500 hover:text-[#7738E2] hover:bg-purple-50 transition-colors shrink-0 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#7738E2] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((currentStepId / TOTAL_STEPS) * 100)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-500 min-w-[2.5rem] text-right shrink-0">
              {Math.round((currentStepId / TOTAL_STEPS) * 100)}%
            </span>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
          >
            {currentStep.type === 'opening' && (
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{currentStep.title}</h1>
                
                {currentStep.imageUrl && (
                  <img src={currentStep.imageUrl} alt="Desafio" className="w-full rounded-xl mb-4" loading={currentStepId === 1 ? "eager" : "lazy"} fetchPriority={currentStepId === 1 ? "high" : "auto"} decoding="async" />
                )}
                
                <p className="text-base md:text-lg text-gray-600 mb-4 whitespace-pre-line">{currentStep.description}</p>
                
                {currentStep.subDescription && (
                  <p className="text-base md:text-lg text-gray-600 mb-4 whitespace-pre-line">{currentStep.subDescription}</p>
                )}
                
                <button
                  onClick={nextStep}
                  className="w-full py-4 px-6 bg-[#7738E2] text-white font-semibold rounded-lg hover:bg-[#652cc5] transition-colors"
                >
                  QUERO MEU PLANO AGORA →
                </button>
                <p className="text-sm text-gray-500 mt-4">leva menos de 2 minutos. Resultado personalizado no final.</p>
              </div>
            )}

            {currentStep.type === 'multiple-choice' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentStep.title}</h2>
                {currentStep.description && (
                  <p className="text-md text-gray-600 mb-6">{currentStep.description}</p>
                )}
                <div className="space-y-3">
                  {currentStep.options?.map((option) => {
                    const isSelected = answers[currentStepId] === option.text;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          handleAnswer(option.text);
                          setTimeout(nextStep, 200);
                        }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-[#7738E2] bg-purple-50 text-[#7738E2]'
                            : 'border-gray-200 hover:border-[#7738E2] hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
                {/* Buttons removed from here */}
              </div>
            )}

            {currentStep.type === 'text-input' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{currentStep.title}</h2>
                {currentStepId === 21 ? (
                  <div className="mb-8">
                    <div className="text-5xl font-bold text-[#7738E2] text-center mb-4">{height} cm</div>
                    <input
                      type="range"
                      min="140"
                      max="210"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7738E2]"
                    />
                  </div>
                ) : currentStepId === 22 ? (
                  <div className="space-y-8 mb-8">
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-2">Peso Atual (kg)</div>
                      <div className="text-4xl font-bold text-[#7738E2] text-center mb-2">{currentWeight}</div>
                      <input
                        type="range"
                        min="40"
                        max="150"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7738E2]"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-2">Peso Desejado (kg)</div>
                      <div className="text-4xl font-bold text-[#7738E2] text-center mb-2">{targetWeight}</div>
                      <input
                        type="range"
                        min="40"
                        max="150"
                        value={targetWeight}
                        onChange={(e) => setTargetWeight(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7738E2]"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleAnswer(e.target.value);
                      }}
                      placeholder={currentStep.description}
                      className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-[#7738E2] focus:outline-none mb-2"
                    />
                    <p className="text-sm text-gray-500 mb-8">{currentStep.description}</p>
                  </>
                )}
                <button
                  onClick={() => nextStep()}
                  disabled={currentStepId === 20 && !name.trim()}
                  className={`w-full py-3 px-6 bg-[#7738E2] text-white font-semibold rounded-lg transition-colors ${
                    currentStepId === 20 && !name.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#652cc5]'
                  }`}
                >
                  Continuar
                </button>
              </div>
            )}

            {currentStep.type === 'summary' && (
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-xs font-bold text-[#7738E2] uppercase tracking-widest">SEU PERFIL</span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">Seu plano começa a tomar forma, {name || 'amiga'}.</h2>
                  <p className="text-gray-600 mt-2">Você já respondeu o essencial. Agora vamos usar essas informações para organizar seus 21 dias de treino.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">SEU PERFIL DE TREINO</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {answers[3] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Nível</p><p className="text-sm font-semibold text-gray-700">{answers[3]}</p></div>}
                    {answers[7] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Tempo por sessão</p><p className="text-sm font-semibold text-gray-700">{answers[7]}</p></div>}
                    {answers[8] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Frequência</p><p className="text-sm font-semibold text-gray-700">{answers[8]}</p></div>}
                    {answers[5] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Objetivo principal</p><p className="text-sm font-semibold text-gray-700">{answers[5]}</p></div>}
                    {answers[4] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Experiência</p><p className="text-sm font-semibold text-gray-700">{answers[4]}</p></div>}
                    {answers[10] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Principal obstáculo</p><p className="text-sm font-semibold text-gray-700">{answers[10]}</p></div>}
                    {answers[15] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Preferência</p><p className="text-sm font-semibold text-gray-700">{answers[15]}</p></div>}
                    {answers[11] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Local</p><p className="text-sm font-semibold text-gray-700">{answers[11]}</p></div>}
                    {answers[21] && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Altura</p><p className="text-sm font-semibold text-gray-700">{answers[21]}</p></div>}
                    {currentWeight && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Peso Atual</p><p className="text-sm font-semibold text-gray-700">{currentWeight} kg</p></div>}
                    {targetWeight && <div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] font-bold text-gray-400 uppercase">Peso Desejado</p><p className="text-sm font-semibold text-gray-700">{targetWeight} kg</p></div>}
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-1">POR QUE PERGUNTAMOS ISSO?</h4>
                  <p>Porque um bom plano precisa caber na sua rotina — e não o contrário.</p>
                  <p className="mt-2 text-xs text-gray-500">Estamos usando suas respostas para definir um ponto de partida coerente com seu nível, seu tempo disponível e a frequência que você pretende manter.</p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                    <span>Perfil quase completo</span>
                    <span>{Math.round((currentStepId / TOTAL_STEPS) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#7738E2] rounded-full" style={{width: `${Math.round((currentStepId / TOTAL_STEPS) * 100)}%`}}></div>
                  </div>
                </div>

                <button onClick={() => nextStep()} className="w-full py-4 bg-[#7738E2] text-white font-bold rounded-xl text-lg hover:bg-[#652cc5] transition-colors">
                  Continuar e ver meu plano
                </button>
                <p className="text-center text-xs text-gray-400">Falta pouco para descobrir seu formato de treino.</p>
              </div>
            )}

            {currentStep.type === 'loading' && (
              <LoadingView title={currentStep.title} description={currentStep.description ?? ""} onComplete={nextStep} />
            )}

            {currentStep.type === 'testimonials' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">{currentStep.title}</h2>
                </div>
                
                <div className="relative w-full overflow-hidden rounded-2xl shadow-lg h-80 md:h-96">
                  {testimonialImages.map((img, index) => (
                    <img 
                      key={index}
                      src={img}
                      alt={`Depoimento ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentTestimonialIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                  ))}
                </div>

                <button
                  onClick={() => nextStep()}
                  className="w-full py-4 px-6 bg-[#7738E2] text-white font-semibold rounded-lg hover:bg-[#652cc5] transition-colors"
                >
                  CONTINUAR →
                </button>
              </div>
            )}

            {currentStep.type === 'result' && (
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{name}, SEU PERFIL ESTÁ PRONTO</h2>
                <div className="bg-purple-50 p-6 rounded-xl border border-[#7738E2]/20 mb-8">
                  <h3 className="font-bold text-[#7738E2] mb-4 text-center text-lg">SEU PERFIL DE TREINO</h3>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <p><span className="font-bold">Nível:</span> {answers[3]}</p>
                    <p><span className="font-bold">Altura:</span> {answers[21]}</p>
                    <p><span className="font-bold">Peso:</span> {answers[22]}</p>
                    <p><span className="font-bold">Duração:</span> aproximadamente {answers[7]} por sessão</p>
                    <p><span className="font-bold">Frequência:</span> {answers[8]}</p>
                    <p><span className="font-bold">Objetivo principal:</span> {answers[5]}</p>
                    <p><span className="font-bold">Formato:</span> Treino em casa, sem equipamento</p>
                  </div>
                </div>
                <div className="mb-8 text-gray-600">
                    <p className="font-semibold mb-2">Sua recomendação:</p>
                    <p>Começar com progressão iniciante, aumentando a dificuldade aos poucos ao longo dos 21 dias.</p>
                    <p className="mt-4">Se você seguir o plano como está montado, a tendência é:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Perder medidas já nas primeiras semanas</li>
                        <li>Ganhar condicionamento e disposição</li>
                        <li>Ver mudança real no espelho em até 21 dias</li>
                    </ul>
                </div>
                <button onClick={() => nextStep()} className="w-full py-4 px-6 bg-[#7738E2] text-white font-semibold rounded-lg hover:bg-[#652cc5] transition-colors">
                  VER MEU DESAFIO →
                </button>
              </div>
            )}

            {currentStep.type === 'offer' && (
              <div className="space-y-8">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-[#7738E2] uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">SEU PLANO ESTÁ PRONTO</span>
                  <h1 className="text-2xl font-bold text-gray-900 mt-4">{name || 'Amiga'}, seu acesso está liberado.</h1>
                  <p className="text-gray-600 mt-2">Agora você já sabe qual rotina pretende seguir. Falta apenas ter os treinos organizados para começar.</p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <h3 className="font-bold text-gray-900 mb-6 text-center text-xl">O QUE VOCÊ RECEBE</h3>
                    <div className="space-y-4 text-sm text-gray-700">
                      {[
                        "21 dias de treinos guiados",
                        `Sessões de ${answers[7]?.replace('Cerca de ', '') || 'aproximadamente 10 minutos'}`,
                        "Progressão passo a passo",
                        "Treinos em casa",
                        "Guia de execução",
                        "Calendário de acompanhamento"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-[#7738E2] font-bold">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                      
                      <div className="pt-4 mt-4 border-t border-gray-100">
                          <p className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <span className="text-[#7738E2] text-xl">+</span> <span className="font-bold">3 BÔNUS TOTALMENTE GRATUITOS:</span>
                          </p>
                          {[
                            "Guia de aquecimento e mobilidade",
                            "Biblioteca de treinos extras",
                            "Guia de retomada"
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 mb-3">
                              <span className="text-[#7738E2] font-bold">✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#7738E2] shadow-[0_4px_20px_rgba(119,56,226,0.05)]">
                  <img src="/__l5e/assets-v1/d7ab88b7-0fd9-4aa3-9017-f35a3f8d4045/Chat-GPT-Image-23-de-set-de-2026-19-52-49.webp" alt="Mockup do Produto" className="w-full h-auto mb-6 rounded-2xl" loading="lazy" decoding="async" />
                  
                  <div className="text-center mb-6">
                    <span className="text-[10px] font-bold text-[#7738E2] uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">OFERTA ESPECIAL</span>
                    <p className="text-gray-400 line-through text-md mt-4">VALOR NORMAL R$ {originalPrice.toFixed(2).replace('.', ',')}</p>
                    <p className="text-sm text-gray-500 font-medium">POR APENAS</p>
                    <p className="text-6xl font-extrabold text-[#7738E2] mt-1">R$ {currentPrice.toFixed(2).replace('.', ',')}</p>
                    <p className="text-sm text-gray-700 font-semibold mt-2">Você economiza R$ {savings.replace('.', ',')}</p>
                    <p className="text-xs text-gray-500 mt-1">Pagamento único • Pix ou cartão</p>
                    
                    {urgencyText && (
                        <div className="mt-4 bg-purple-50 py-2 px-4 rounded-full inline-block">
                            <p className="text-xs font-bold text-[#7738E2] uppercase">{urgencyText}</p>
                        </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="text-center p-4 bg-gray-50 rounded-xl mb-6">
                        <h4 className="font-bold text-gray-900 text-xs flex items-center justify-center gap-2 mb-1">
                            <span className="text-[#7738E2]">🛡️</span> 7 DIAS DE GARANTIA
                        </h4>
                        <p className="text-[11px] text-gray-600">Conheça o desafio sem risco. Se decidir que não é para você, poderá solicitar o reembolso dentro desse prazo.</p>
                    </div>

                    <a href="https://pay.cakto.com.br/32s95wy_1130175" className="block w-full text-center py-5 bg-[#7738E2] text-white font-bold rounded-2xl text-lg hover:bg-[#652cc5] transition-transform hover:scale-[1.02] shadow-[0_4px_15px_rgba(119,56,226,0.3)]">
                      QUERO COMEÇAR MEUS 21 DIAS
                    </a>
                    <p className="text-center text-[10px] text-gray-400 mt-2 uppercase">Pagamento único • Pix ou cartão</p>
                  </div>
                </div>

                <div className="text-center pt-8 border-t border-gray-100">
                    <p className="text-gray-700 font-semibold italic">Você já fez a parte mais difícil: começar.</p>
                    <p className="text-gray-600 text-sm mt-1">Agora só precisa seguir o próximo treino.</p>
                </div>
              </div>
            )}

            {currentStep.type === 'closing' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Você já tem o primeiro passo, {name}.</h2>
                <p className="text-gray-600 mb-8">Agora você não precisa descobrir sozinho(a) qual treino fazer. Seu desafio já está organizado. Comece com sua primeira sessão e avance um dia de cada vez.</p>
                <div className="border rounded-xl p-6 mb-8 text-left">
                  <p className="font-bold text-[#7738E2]">DESAFIO CALISTENIA EM CASA</p>
                  <p className="text-sm text-gray-600">21 dias • Treinos em casa • Progressão passo a passo</p>
                  <p className="text-2xl font-bold mt-4">R$ 19,90</p>
                </div>
                <button onClick={() => handleCheckout()} className="w-full py-4 px-6 bg-[#7738E2] text-white font-bold rounded-lg hover:bg-[#652cc5] transition-colors">
                  QUERO COMEÇAR MEUS 21 DIAS →
                </button>
              </div>
            )}
            
            {currentStep.type === 'transition' && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{currentStep.title}</h2>
                {currentStep.description && (
                  <p className="text-lg text-gray-600 mb-6">{currentStep.description}</p>
                )}
                {currentStep.imageUrl && (
                  <img src={currentStep.imageUrl} alt="Transição" className="w-full h-auto max-w-sm mx-auto rounded-xl mb-6" loading="lazy" decoding="async" />
                )}
                <button
                  onClick={nextStep}
                  className="w-full py-4 px-6 bg-[#7738E2] text-white font-semibold rounded-lg hover:bg-[#652cc5] transition-colors"
                >
                  CONTINUAR →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function LoadingView({ title, description, onComplete }: { title: string, description: string, onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-8">{description}</p>
      <div className="w-16 h-16 border-4 border-gray-200 border-t-[#7738E2] rounded-full animate-spin mx-auto"></div>
    </div>
  );
}
