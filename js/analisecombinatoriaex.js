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
         "Como o exercício indica que não ocorrerá repetição nos algarismos que irão compor a senha, teremos a seguinte situação:<br><br>" +

  "9 opções para o algarismo das unidades;<br>" +
  "8 opções para o algarismo das dezenas, visto que já utilizamos 1 algarismo na unidade e não pode repetir;<br>" +
  "7 opções para o algarismo das centenas, pois já utilizamos 1 algarismo na unidade e outro na dezena;<br>" +
  "6 opções para o algarismo do milhar, pois temos que tirar os que já usamos anteriormente.<br><br>" +

  "Assim, o número de senhas será dado por:<br>" +
  "9 · 8 · 7 · 6 = 3 024 senhas.",

        // 2ª justificativa
          "Nesta situação, devemos perceber que a ordem dos jogadores não faz diferença.<br>" +
  "Assim, usaremos a fórmula de combinação.<br><br>" +

  "Como uma equipe de voleibol compete com 6 jogadores, iremos combinar 6 elementos tirados de um conjunto de 15 elementos."+
  "<img src='imagens/ex2ac.png' alt='Altura do triângulo'height='50' width='250'><br><br>",
  

        // 3ª justificativa
       "Como a ordem faz diferença, usaremos arranjo.<br>" +
  "Assim:"+
"<img src='imagens/ex3ac.png' alt='Altura do triângulo'height='30' width='250'><br><br>"+
"Substituindo os dados do enunciado na fórmula, temos:"+
"<img src='imagens/ex3.1ac.png' alt='Altura do triângulo'height='40' width='250'><br><br>"+
"Portanto, é possível formar o pódio de 336 formas diferentes.",

        // 4ª justificativa
  "Para determinar quantas motos podem ser licenciadas com placas compostas por 2 vogais (podendo haver vogais repetidas) e 3 algarismos distintos, é necessário calcular o total de combinações possíveis para cada parte da placa e depois multiplicar os resultados.<br><br>" +

  "Primeiro, consideramos as vogais. Existem 5 vogais possíveis: A, E, I, O e U.<br>" +
  "Como as vogais podem se repetir e a ordem importa (por exemplo, AE é diferente de EA), temos 5 opções para a primeira vogal e 5 para a segunda.<br>" +
  "Isso resulta em 5 × 5 = 25 combinações diferentes de vogais.<br><br>" +

  "Em seguida, analisamos os números. Os algarismos variam de 0 a 9, totalizando 10 opções.<br>" +
  "Como os três algarismos devem ser distintos e a ordem importa (ou seja, 123 é diferente de 321), estamos lidando com uma permutação simples de 3 elementos entre 10.<br>" +
  "O cálculo é feito multiplicando 10 × 9 × 8, o que resulta em 720 combinações possíveis de números.<br><br>" +

  "Por fim, para obter o total de placas possíveis, multiplicamos as 25 combinações de vogais pelas 720 combinações de números.<br>" +
  "Isso resulta em 25 × 720 = 18.000.<br><br>" +

  "Portanto, é possível licenciar 18.000 motos com placas formadas por 2 vogais (com repetição permitida) e 3 algarismos distintos.",


        // 5ª justificativa
        "Para resolver o problema, precisamos calcular de quantas formas é possível formar um grupo de 4 atletas composto exatamente por 2 atletas do país A, que tem 10 atletas, e 2 atletas do país B, que tem 6 atletas.<br>" +
  "Como a ordem dos atletas dentro do grupo não importa, usamos o conceito de combinação.<br><br>" +

  "Primeiro, escolhemos 2 atletas entre os 10 do país A. O número de maneiras de fazer isso é dado pela combinação de 10 elementos tomados 2 a 2, o que resulta em 45 formas distintas.<br>" +
  "Em seguida, escolhemos 2 atletas entre os 6 do país B. A combinação de 6 elementos tomados 2 a 2 resulta em 15 formas diferentes.<br><br>" +

  "Como as escolhas dos atletas de A e de B são independentes entre si, multiplicamos as quantidades: 45 × 15, o que resulta em 675.<br><br>" +

  "Assim, existem 675 maneiras diferentes de formar um grupo com 2 atletas do país A e 2 do país B para ocupar o alojamento.",
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