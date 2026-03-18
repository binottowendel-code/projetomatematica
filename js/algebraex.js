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
        "Para encontrar o número de soluções reais de uma equação de 2° grau, é necessário encontrar o valor do discriminante (delta).<br><br>" +
        "Para isso, encontraremos primeiro o valor dos coeficientes a, b e c na equação:<br>" +
        "a = 1<br>" +
        "b = -2<br>" +
        "c = 1<br><br>" +
        "Agora vamos calcular o valor de delta:<br>" +
        "Δ = b² – 4ac<br>" +
        "Δ = (-2)² – 4·1·1<br>" +
        "Δ = 4 – 4<br>" +
        "Δ = 0<br><br>" +
        "O valor de delta mostra o número de soluções da equação, sem ter a necessidade de calcular os valores dessas raízes. " +
        "Como Δ = 0, a equação possui uma única solução real.",

        // 2ª justificativa
        "Para que essa equação seja do 2º grau, o coeficiente de x³ tem que ser igual a zero, e o coeficiente de x² tem que ser diferente de zero, ou seja:<br><br>" +
        "Condição I:<br>" +
        "k² – 4 = 0<br>" +
        "k² = 4<br>" +
        "k = ±√4<br>" +
        "k = ±2<br><br>" +
        "Logo, para satisfazer a primeira condição, temos k = 2 ou k = -2.<br><br>" +
        "Agora vamos analisar a segunda condição:<br>" +
        "Condição II:<br>" +
        "k – 2 ≠ 0<br>" +
        "k ≠ 2<br><br>" +
        "O valor que satisfaz ambas as condições é k = -2.",

        // 3ª justificativa
        "-x² - 4x + 5 = 0<br>" +
        "Para resolver, usamos a fórmula de Bhaskara. Os coeficientes são:<br>" +
        "a = -1<br>" +
        "b = -4<br>" +
        "c = 5<br><br>" +
        "Calculando o discriminante (delta), que é o que fica dentro da raiz:<br>" +
        "Δ = b² - 4ac<br>" +
        "Δ = (-4)² - 4 * (-1) * 5<br>" +
        "Δ = 16 + 20<br>" +
        "Δ = 36<br><br>" +
        "Agora, a fórmula de Bhaskara nos dá duas soluções:<br>" +
        "x₁ = (4 + 6) / -2 = -5<br>" +
        "x₂ = (4 - 6) / -2 = 1<br><br>" +
        "Portanto, as soluções são x = -5 e x = 1.<br>" +
        "Logo, o conjunto solução é {-5, 1}.",

        // 4ª justificativa
        "Para que uma raiz tenha multiplicidade 2, a equação precisa ter uma única solução, ou seja, Δ = 0.<br><br>" +
        "Vamos calcular o valor de Δ na equação x² - 10x + k = 0, em que:<br>" +
        "a = 1<br>" +
        "b = -10<br>" +
        "c = k<br><br>" +
        "Δ = b² – 4ac<br>" +
        "Δ = (-10)² – 4·1·k<br>" +
        "Δ = 100 – 4k<br><br>" +
        "Mas Δ = 0, então:<br>" +
        "100 – 4k = 0<br>" +
        "100 = 4k<br>" +
        "100 ÷ 4 = k<br>" +
        "k = 25<br><br>" +
        "Logo, k = 25 é o valor que faz com que a equação tenha uma solução de multiplicidade 2.",

        // 5ª justificativa
        "2x² − 5x − 7 = 0<br>" +
        "Para encontrar a soma (S) e o produto (P) das raízes, usamos as propriedades das equações quadráticas.<br><br>" +
        "Para qualquer equação da forma ax² + bx + c = 0, temos:<br>" +
        "Soma das raízes (S) = -b / a<br>" +
        "Produto das raízes (P) = c / a<br><br>" +
        "No nosso caso:<br>" +
        "a = 2<br>" +
        "b = -5<br>" +
        "c = -7<br><br>" +
        "Aplicando as fórmulas:<br>" +
        "S = -(-5) / 2 = 5/2<br>" +
        "P = -7 / 2<br><br>" +
        "Portanto:<br>" +
        "A soma das raízes é S = 5/2<br>" +
        "O produto das raízes é P = -7/2.",
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