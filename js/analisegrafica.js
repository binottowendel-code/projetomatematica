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
        "a) Incorreta!<br>Na segunda rodada, a equipe venceu o jogo, subindo seu ranking para 4 pontos.<br><br>" +
    "b) Correta!<br><br>" +
    "c) Incorreto!<br>A média dos pontos obtidos por rodada é a soma de todos os pontos obtidos, dividida pelo número de rodadas jogadas. Pela tabela, o time alcançou 17 pontos em 12 rodadas:<br>" +
    "17/12 = 1,42 aproximadamente.<br><br>" +
    "d) Incorreta!<br>A equipe venceu o jogo da sétima rodada e perdeu os jogos da oitava e nona.<br><br>" ,

        // 2ª justificativa
         "Observe que as medidas do lado direito desse gráfico são ambas com 90°, totalizando 180°.<br><br>" +
    "Para os dois outros ângulos, sobram apenas 180°.<br><br>" +
    "Como 30° é a medida do ângulo do menor setor, então 150° é a medida do ângulo do maior setor.<br><br>" +
    "Portanto, a alternativa correta é a letra A.<br><br>" +
    "Para mostrar que as outras alternativas estão erradas, basta usar regra de três e descobrir os valores específicos de cada parte do gráfico.",
  

        // 3ª justificativa
       "Para calcular o percentual de professores aprovados, primeiro vamos encontrar quantos professores obtiveram o resultado como ótimo ou excelente.<br><br>" +
  "Analisando o gráfico é possível observar que 6 professores atingiram o resultado ótimo e 1 atingiu o resultado excelente, tendo um total de 7 aprovados.<br><br>" +
  "Note também que 6 professores foram reprovados com resultados bom ou ruim, totalizando (6 reprovados + 7 aprovados) = 13 professores.<br><br>" +
  "Então, para calcular a porcentagem de aprovados temos que dividir 6 por 13.<br>" +
  "6 ÷ 13 = 0,46 → aproximadamente 46% de aprovados.",


        // 4ª justificativa
       "a) Incorreta!<br>" +
  "O texto do exercício diz que as respostas devem ter como base exclusivamente os dados apresentados no gráfico. " +
  "Como ele é referente apenas ao ano de 2015, não é possível garantir que a cotação do dólar em 2014 seguiu o mesmo padrão de 2015.<br><br>" +

  "b) Incorreta!<br>" +
  "Em 22 de setembro, a cotação do dólar foi a maior: 4,145. No dia 28 de setembro, a cotação foi de 4,109.<br><br>" +

  "c) Incorreta!<br>" +
  "A função apresenta alguns intervalos decrescentes, embora pareça ser crescente em um sentido geral. " +
  "Por exemplo, do mês de março para abril, a função é decrescente.<br><br>" +

  "d) Correta!<br><br>" ,

        // 5ª justificativa
        "Para resolver essa questão, basta analisar o gráfico dado no exercício.<br><br>" +
  "Para cada mês há um ponto que corresponde ao valor das vendas desse mês. Mesmo que não tenhamos valores numéricos para cada mês, " +
  "podemos perceber que, quanto mais alto o ponto, maior a venda, e quanto mais baixo o ponto, menor a venda desse mês.<br><br>" +
  "Facilmente observamos que o mais alto dos pontos corresponde ao mês de Junho, e o mais baixo dos pontos corresponde ao mês de Agosto.<br><br>" +
  "Podemos concluir com essa análise que o mês de Junho teve a maior venda absoluta, e o mês de Agosto teve a menor venda absoluta.<br><br>" +
  "Portanto, a alternativa correta é a letra D.",
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