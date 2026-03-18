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
        "Observando a figura, notamos que a área hachurada corresponde à área do quadrado de lado 50 m menos a área dos triângulos BEC e CFD.<br><br>" +

  "A medida do lado BE, do triângulo BEC, é igual a 25 m, pois o ponto B divide o lado em dois segmentos congruentes (B é ponto médio). " +
  "Da mesma forma, EC e CF medem 25 m (C é ponto médio de EF).<br><br>" +

  "Assim, calculamos as áreas:<br>" +
  "Área do quadrado: A□ = L² = 50 · 50 = 2500 m².<br><br>" +

  "Área do triângulo BEC (retângulo com base 25 e altura 25):<br>" +
  "AΔ_BEC = (b · h) / 2 = (25 · 25) / 2 = 625 / 2 = 312,5 m².<br><br>" +

  "Área do triângulo CFD (retângulo com base 25 e altura 50):<br>" +
  "AΔ_CFD = (b · h) / 2 = (25 · 50) / 2 = 1250 / 2 = 625 m².<br><br>" +

  "Portanto, a área hachurada é:<br>" +
  "A_h = A□ − AΔ_BEC − AΔ_CFD = 2500 − 312,5 − 625 = 1562,5 m².<br><br>" +

  "Resposta: A área hachurada é 1562,5 m².",

        // 2ª justificativa
        "A área do triângulo é encontrada multiplicando a medida da base pela medida da altura e dividindo o resultado por 2.<br><br>" +

  "Sendo o triângulo equilátero e o lado igual a y, o valor da sua altura é dado por:<br>" +
  

  "Assim, a área do triângulo pode ser calculada como:<br>" +
  "AΔ = (base · altura) / 2 = (y · h) / 2 = (y · (y · √3 / 2)) / 2 = (y² · √3) / 4.<br><br>" +

  "A área do triângulo equilátero de lado y é (y² · √3) / 4."+
  "<img src='imagens/ex2gp.png' alt='Altura do triângulo'height='200' width='250'><br><br>" ,
  

        // 3ª justificativa
       "Para encontrar a área da praça, devemos utilizar a fórmula da área do círculo:<br>" +
  "A = π · R²<br><br>" +
  "<img src='imagens/exgp3.png' alt='Altura do triângulo'height='100' width='250'><br><br>" +
  "A área mais escura é encontrada somando-se a área da semicircunferência com a área do triângulo ABD.<br><br>" +

  "Vamos começar calculando a área do triângulo. Note que o triângulo é retângulo.<br>" +

  "Vamos chamar o lado AD de x e calcular a sua medida através do Teorema de Pitágoras:<br>" +
  "5² = x² + 3²<br>" +
  "x² = 25 - 9<br>" +
  "x = √16<br>" +
  "x = 4<br><br>" +

  "Conhecendo a medida do lado AD, podemos calcular a área do triângulo ABD.<br><br>" +

  "Precisamos ainda calcular a área da semicircunferência. Note que o seu raio será igual a metade da medida do lado AD, assim, r = 2 cm.<br>" +
  "A área da semicircunferência será igual a:<br>" +
  "A_semi = (π · r²) / 2<br>" +
  "A_semi = (3,14 · 2²) / 2<br>" +
  "A_semi = (3,14 · 4) / 2<br>" +
  "A_semi = 12,56 / 2<br>" +
  "A_semi = 6,28 cm²"+
  "<img src='imagens/exgp3.1.png' alt='Altura do triângulo'height='100' width='250'><br><br>" +
  "A área mais escura é encontrada somando-se a área da semicircunferência com a área do triângulo ABD.<br><br>" +

  "Vamos começar calculando a área do triângulo. Note que o triângulo é retângulo.<br>" +

  "Vamos chamar o lado AD de x e calcular a sua medida através do Teorema de Pitágoras:<br>" +
  "5² = x² + 3²<br>" +
  "x² = 25 - 9<br>" +
  "x = √16<br>" +
  "x = 4<br><br>" +

  "Conhecendo a medida do lado AD, podemos calcular a área do triângulo ABD.<br>" +
  "A_triângulo = (base · altura) / 2 = (4 · 3) / 2 = 6 cm²<br><br>" +

  "Agora, calculamos a área da semicircunferência. O raio será metade do lado AD, assim, r = 2 cm.<br>" +
  "A_semi = (π · r²) / 2 = (3,14 · 2²) / 2 = 6,28 cm²<br><br>" +

  "A área mais escura será encontrada somando-se as duas áreas:<br>" +
  "A_T = 6 + 6,28 ≈ 12 cm²<br><br>" +

  "Portanto, o valor da área mais escura é 12 cm².",
        // 4ª justificativa
      "A área mais escura é encontrada somando-se a área da semicircunferência com a área do triângulo ABD.<br><br>" +

  "Vamos começar calculando a área do triângulo. Note que o triângulo é retângulo.<br>" +

  "Vamos chamar o lado AD de x e calcular a sua medida através do Teorema de Pitágoras, conforme indicado abaixo:<br>" +
  "5² = x² + 3²<br>" +
  "x² = 25 - 9<br>" +
  "x = √16<br>" +
  "x = 4<br><br>" +

  "Conhecendo a medida do lado AD, podemos calcular a área do triângulo:"+
  "Precisamos ainda calcular a área da semicircunferência.<br><br>" +

  "Note que o seu raio será igual a metade da medida do lado AD, assim, r = 2 cm.<br>" +
  "A área da semicircunferência será igual a:<br>" +
  "A_semi = (π · r²) / 2<br>" +
  "A_semi = (3,14 · 2²) / 2<br>" +
  "A_semi = (3,14 · 4) / 2<br>" +
  "A_semi = 12,56 / 2<br>" +
  "A_semi = 6,28 cm²"+
  "A área mais escura será encontrada fazendo-se: AT = 6 + 6 = 12 cm²<br><br>" +
  "Portanto, o valor da área mais escura é 12 cm².",


        // 5ª justificativa
         "A cobertura do armazém é feita por duas placas retangulares.<br><br>" +

  "Portanto, devemos calcular a área de um retângulo e multiplicar por 2:<br>" +
  "A_retângulo = base · altura<br>" +
  "A_cobertura = 2 · A_retângulo"+
  "<img src='imagens/exgp4.png' alt='Altura do triângulo'height='100' width='250'><br><br>" +
  "Sendo assim, a área total do telhado é 800 m².<br><br>" +

  "Se cada metro quadrado necessita de 20 telhas, podemos calcular a quantidade total de telhas através de uma regra de três simples:<br>" +
  "Área total → 800 m²<br>" +
  "Telhas por m² → 20<br>" +
  "Total de telhas = 800 · 20 = 16 000 telhas<br><br>" +

  "Portanto, são necessárias 16 000 telhas para cobrir todo o armazém.",
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