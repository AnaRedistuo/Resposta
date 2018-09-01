(function() {
    var questions = [{
      question: "1.O que significa a sigla html?",
      choices: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
      correctAnswer: 0
    }, {
      question: "2. O que significa a sigla css?",
      choices: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 1
    }, {
      question: "3. Dentro de qual elemento html nos colocamos o javascript?",
      choices: ["script", "js", "Javascript"],
      correctAnswer: 0
    }];
    
    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 
    
 
    displayNext();
    
   
    $('#next').on('click', function (e) {
      e.preventDefault();
      
     
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      if (isNaN(selections[questionCounter])) {
        alert('Por favor marque uma opção!');
      } else {
        questionCounter++;
        displayNext();
      }
    });

    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    

    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
   
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Enigma nº' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
 
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' id="volta" />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }

    
   
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
 
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
        
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
 
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('Tu acertou ' + numCorrect + ' enigma(s) de ' +
                   questions.length + ' !!!');
      return score;
    }
  })();