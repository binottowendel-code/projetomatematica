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
       "Nessa questão temos os grupos A, B e C e eles batem palmas a cada 2s, 3s e 4s respectivamente, assim, temos que eles começaram a bater palmas no instante 1s.<br><br>" +

  "Dessa forma, devemos saber o tempo que demora em segundos para eles baterem palmas simultaneamente. Então vamos calcular o MMC:<br>" +
  "MMC entre 2, 3, 4:<br>" +
  "2, 3, 4 | 2<br>" +
  "1, 3, 2 | 2<br>" +
  "1, 3, 1 | 3<br>" +
  "1, 1, 1<br>" +
  "MMC = 12<br><br>" +

  "A cada 12 segundos eles batem palmas simultaneamente, assim, a razão da nossa PA é 12.<br><br>" +

  "Calculando o número de termos:<br>" +
  "60 / 12 = 5 → sabemos que 1 ≤ n ≤ 5<br><br>" +

  "Utilizando a fórmula do termo geral temos:<br>" +
  "aₙ = a₁ + (n - 1) · r<br>" +
  "aₙ = 1 + (n - 1) · 12",

        // 2ª justificativa
  "Para resolver, vamos analisar cada linha da imagem.<br><br>" +

  "A primeira linha possui uma ficha na figura 1, 3 na figura 2, 6 na figura 3 e 10 na figura 4, ou seja, temos a seguinte sequência:<br>" +
  "1, 3, 6, 10 – Repare que, da primeira figura para a segunda, aumentamos 2 fichas, da segunda para a terceira 3 fichas, da terceira para a quarta 4 fichas.<br>" +
  "Seguindo esse padrão:<br>" +
  "5ª figura – 10 + 5 = 15<br>" +
  "6ª figura – 15 + 6 = 21<br>" +
  "7ª figura – 21 + 7 = 28<br>" +
  "8ª figura – 28 + 8 = 36<br>" +
  "9ª figura – 36 + 9 = 45<br>" +
  "Então a 15ª terá: 28 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15 = 120 fichas.<br><br>" +

  "Agora, analisando a segunda linha, podemos reparar que ela é sempre o dobro da primeira.<br>" +
  "Na 1ª figura em cima há 1 e embaixo há 2, na segunda em cima há 3 e embaixo há 6, na terceira em cima há 6 e embaixo 12, e assim sucessivamente.<br>" +
  "Logo, se na 15ª figura em cima há 120, então embaixo haverá 240.<br><br>" +

  "Somando o total de fichas da primeira linha com a segunda: 120 + 240 = 360.<br><br>" +

  "Obs.: Ao encontrar 120, já poderíamos descartar as alternativas B, C e D. Isso porque a B é menor que 120, a C é igual a 120 e a D é o dobro de 120.<br>" +
  "No entanto, sabemos que, analisando a figura, a parte de baixo não é igual à parte de cima, não permitindo ser o dobro e sim um número maior, restando apenas a letra A.",
  

        // 3ª justificativa
        "O comando pede a diferença da área de Aₙ – Aₙ₋₁, assim, sabendo que a área de um quadrado (Aₙ) é igual a n², para encontrar a área de Aₙ₋₁ devemos subtrair 1, ou seja, (n-1)².<br><br>" +

  "Montando a relação, temos:<br>" +
  "n² – (n-1)²<br>" +
  "n² – (n² - 2n + 1)<br>" +
  "n² – n² + 2n - 1<br>" +
  "2n - 1",

        // 4ª justificativa
         "Analisando a imagem, é possível perceber que as estrelas compõem uma PA de razão igual a 1, em que 1 é nosso primeiro termo e 150 o último.<br><br>" +

  "Logo, como a tarefa é descobrir o total de estrelas, podemos aplicar a ideia de soma de todos os termos de uma PA:<br>" +
  "Sₙ = (1 + 150) · 150 / 2<br>" +
  "Sₙ = 151 · 75 = 11 325<br><br>" +

  "O mais próximo foi o funcionário III.",

        // 5ª justificativa
          "O gato mais velho morreu com 38 anos.<br><br>" +

  "A última idade dada foi 25 anos, que representa 116 anos humanos. Para chegar em 38, faltam:<br>" +
  "38 – 25 = 13 anos<br><br>" +

  "Observando a tabela, a idade em humano aumenta 4 anos a cada 1 ano que aumenta na idade do gato.<br>" +
  "Então basta adicionar 116 a 13 · 4:<br>" +
  "116 + 13 · 4 = 116 + 52 = 168 anos em humanos.",
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