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
        "Como a capacidade do balde é de 18 litros e 50% dele está ocupado, sabemos que:<br>" +
  "50% de 18 = 0,5 × 18 = 9 litros<br>" +
  "9 litros = 9 000 ml<br><br>" +

  "Sabemos que cada gota possui 5 × 10⁻² ml = 0,05 ml cada.<br>" +
  "Como a cada segundo há 5 gotas, então é um total de 0,25 ml por segundo.<br><br>" +

  "Logo será necessário um total de 9000 ÷ 0,25 = 36 000 segundos para preencher os 9 000 ml restantes.<br><br>" +

  "Sabemos que 3 600 segundos correspondem a 1 hora, portanto 36 000 segundos correspondem a 10 horas, que, em notação científica, é igual a 1 × 10¹.",

        // 2ª justificativa
         "Sabemos que 100 km consomem 5 litros, logo o consumo é de 100 ÷ 5 = 20 km/l.<br><br>" +

  "Para percorrer 420 km, é necessário um total de 420 ÷ 20 = 21 litros.<br>" +
  "A capacidade do tanque é de 22 litros, então 22 − 21 = 1 litro restante.<br><br>" +

  "O que nos interessa é o combustível necessário para que ele ande os 80 km restantes, mais 200 km dentro da cidade e os 80 km na volta, ou seja, um total de 360 km.<br>" +
  "360 ÷ 20 = 18 litros.<br><br>" +

  "Como restou 1 litro, então é necessário que ele abasteça, no mínimo, 18 − 1 = 17 litros.",
  

        // 3ª justificativa
        "Cada empresa receberá de forma inversamente proporcional ao tempo de uso da máquina, então sejam x, y, z correspondentes ao recebimento de cada empresa, temos que:"+
        "<img src='imagens/exarp3.png' alt='Altura do triângulo'height='100' width='250'><br><br>" +
         "Sabemos que a soma x + y + z = 31.000, logo:"+
         "<img src='imagens/exarp3.1.png' alt='Altura do triângulo'height='100' width='250'><br><br>" +
         "Conhecendo o valor de k, a empresa que tem maior idade é a de 5 anos, então basta calcular k dividido por 5:"+
         "<img src='imagens/exarp3.2.png' alt='Altura do triângulo'height='100' width='250'><br><br>" ,


        // 4ª justificativa
       "a) Incorreta!<br>" +
  "O texto do exercício diz que as respostas devem ter como base exclusivamente os dados apresentados no gráfico. " +
  "Como ele é referente apenas ao ano de 2015, não é possível garantir que a cotação do dólar em 2014 seguiu o mesmo padrão de 2015.<br><br>" +

  "b) Incorreta!<br>" +
  "Em 22 de setembro, a cotação do dólar foi a maior: 4,145. No dia 28 de setembro, a cotação foi de 4,109.<br><br>" +

  "c) Incorreta!<br>" +
  "A função apresenta alguns intervalos decrescentes, embora pareça ser crescente em um sentido geral. " +
  "Por exemplo, do mês de março para abril, a função é decrescente.<br><br>" +

  "d) Correta!<br><br>" +

  "e) Incorreta!<br>" +
  "Os valores presentes na tabela são referentes ao último dia do mês. A linha que liga esses valores não é exata, " +
  "pois indica um 'progresso médio' da cotação do dólar. Assim, do mês de julho para o mês de agosto, em média, a cotação do dólar aumentou, " +
  "mas nada garante que exatamente no dia 15 de agosto ela tenha sido maior que 3,629.",

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