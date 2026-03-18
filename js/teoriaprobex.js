        document.addEventListener('DOMContentLoaded', function() {
            let currentExercise = 1;
            const totalExercises = 5;
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            const themeToggle = document.getElementById('themeToggle');
            const backBtn = document.getElementById('backBtn');
            
            // Inicializa a barra de progresso
            updateProgress();
            // Configura os exercícios
            setupExercise(currentExercise);
            
            function updateProgress() {
                const progress = (currentExercise / totalExercises) * 100;
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${currentExercise}/${totalExercises}`;
            }
            
            function setupExercise(exerciseNum) {
                const exercise = document.getElementById(`exercise${exerciseNum}`);
                const options = exercise.querySelectorAll('.option-btn');
                const feedback = exercise.querySelector('.feedback');
                const nextBtn = exercise.querySelector('.next-btn');
                
                options.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const isCorrect = this.getAttribute('data-correct') === 'true';
                        
                        // Desabilita todos os botões
                        options.forEach(opt => opt.disabled = true);
                        
                      if (isCorrect) {
                        this.classList.add('correct');
                        showFeedback(feedback, true, exerciseNum);
                        nextBtn.style.display = 'block';
                    } else {
                        this.classList.add('incorrect');
                        showFeedback(feedback, false, exerciseNum);

                        // Mostra o botão de tentar novamente
                        const retryBtn = exercise.querySelector('.retry-btn');
                        retryBtn.style.display = 'block';

                        retryBtn.onclick = () => {
                            resetExercise(exerciseNum);
                            retryBtn.style.display = 'none';
                        };
}

                    });
                });
                
                // Configura o botão próximo
                nextBtn.addEventListener('click', function() {
                    if (exerciseNum < totalExercises) {
                        document.getElementById(`exercise${exerciseNum}`).classList.add('hidden');
                        document.getElementById(`exercise${exerciseNum + 1}`).classList.remove('hidden');
                        currentExercise = exerciseNum + 1;
                        updateProgress();
                        setupExercise(currentExercise);
                    }
                });
            }
            
            function resetExercise(exerciseNum) {
                const exercise = document.getElementById(`exercise${exerciseNum}`);
                const options = exercise.querySelectorAll('.option-btn');
                const feedback = exercise.querySelector('.feedback');
                
                // Reseta todas as opções
                options.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('correct', 'incorrect');
                });
                
                // Esconde o feedback
                feedback.style.display = 'none';
            }
            
            function showFeedback(feedbackElement, isCorrect, exerciseNum) {
                const justifications = [
                    // 1ª justificativa
                     "1º passo: determinar o número de eventos possíveis.<br>" +
  "Para cada dado há 6 possibilidades de resultado. São seis possibilidades para um dado e seis possibilidades para o outro.<br>" +
  "Sendo assim, o número de eventos possíveis é:<br>" +
  "U = 6 × 6 = 36 possibilidades<br><br>" +

  "2º passo: determinar o número de eventos favoráveis.<br>" +
  "Se os dados possuem 6 lados com números de 1 a 6, os resultados com números iguais são:<br>" +
  "Existem seis resultados favoráveis.<br><br>" +

  "3º passo: aplicar os valores na fórmula de probabilidade."+
        "<img src='imagens/tp1.png' alt='Altura do triângulo'height='100' width='250'><br><br>" +
        "Para termos o resultado em porcentagem, basta multiplicar o resultado por 100.<br>" +
  "Logo, a probabilidade de se obter dois números iguais voltados para cima é de 16,66%.",

        // 2ª justificativa
 "O total de meias é 5 + 3 = 8 meias.<br>" +
  "O número total de formas de escolher 2 meias quaisquer entre 8 é dado por uma combinação:<br>" +
  "C(8,2) = 8 × 7 / 2 = 28<br><br>" +

  "Agora, calculamos os casos favoráveis:<br>" +
  "Duas azuis: C(5,2) = 5 × 4 / 2 = 10<br>" +
  "Duas pretas: C(3,2) = 3 × 2 / 2 = 3<br>" +
  "Total de casos favoráveis = 10 + 3 = 13<br><br>" +

  "Probabilidade = casos favoráveis / total de casos = 13 / 28<br>" +
  "Como a pergunta quer uma fração equivalente com denominador 56, multiplicamos numerador e denominador por 2.",
  

        // 3ª justificativa
        "Probabilidade de acertar uma questão = 1/4<br>" +
  "Probabilidade de errar uma questão = 3/4<br><br>" +

  "Queremos que ele acerte exatamente uma questão e erre as outras quatro.<br>" +
  "A quantidade de formas diferentes de isso acontecer (acertar 1 específica e errar as outras) é C(5,1) = 5.<br><br>" +

  "Logo, a probabilidade é:<br>" +
  "5 × (1/4) × (3/4)⁴",
        // 4ª justificativa
        "Vamos usar o princípio da inclusão e exclusão.<br><br>" +

  "Total de cartas: 52<br>" +
  "Cartas de copas: 13<br>" +
  "Cartas com valor maior que 10 (valete, dama, rei, ás): há 4 naipes × 4 cartas = 16<br>" +
  "Cartas que são ao mesmo tempo de copas e maiores que 10: valete, dama, rei e ás de copas = 4<br><br>" +

  "Usamos a fórmula:<br>" +
  "P(A ou B) = P(A) + P(B) − P(A e B)<br><br>" +

  "Assim:<br>" +
  "P = 13/52 + 16/52 − 4/52 = 25/52<br><br>" +

  "Resposta correta: C) 25/52",

        // 5ª justificativa
  "Total de senhas com 4 dígitos distintos (de 0 a 9):<br>" +
  "Para a primeira posição (dígito inicial), não pode começar com zero.<br><br>" +

  "Se não houver restrição, temos:<br>" +
  "Total = permutação de 4 dígitos distintos entre 10 → P(10,4) = 10 × 9 × 8 × 7 = 5040<br><br>" +

  "Agora, vamos contar quantas senhas têm o primeiro dígito ímpar.<br>" +
  "Os dígitos ímpares são: 1, 3, 5, 7, 9 → 5 opções.<br>" +
  "Para cada escolha de primeiro dígito (ímpares), restam 9 dígitos diferentes (já que um foi usado).<br>" +
  "Então:<br>" +
  "1ª posição: 5 opções (ímpares)<br>" +
  "2ª posição: 9 restantes<br>" +
  "3ª posição: 8<br>" +
  "4ª posição: 7<br>" +
  "Total de senhas começando com ímpar: 5 × 9 × 8 × 7 = 2520<br><br>" +

  "Probabilidade = 2520 / 5040 = 1/2",
                ];
                
                if (isCorrect) {
                    feedbackElement.innerHTML = `
                        <p><i class="fas fa-check-circle correct-icon"></i> <strong>Resposta Correta!</strong></p>
                    `;
                } else {
                    const correctAnswer = document.querySelector(`#exercise${exerciseNum} .option-btn[data-correct="true"]`).textContent;
                    feedbackElement.innerHTML = `
                        <p><i class="fas fa-times-circle incorrect-icon"></i> <strong>Resposta Incorreta</strong></p>
                        <p>${justifications[exerciseNum - 1]}</p>
                    `;
                }
                
                feedbackElement.style.display = 'block';
            }
        });