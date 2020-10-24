import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  start: boolean= false

  indication: string = "neutral"

  currentQuestion: object = {}

  disableOptions: boolean = false

  nextQuestion: object = {}

  previousQuestion: object = {}

  answer: string = ''

  numberOfQuestions: number = this.quizService.numberOfQuestions

  numberOfAnsweredQuestions: number = this.quizService.numberOfAnsweredQuestions

  currentQuestionIndex: number = 0

  score: number = this.quizService.score

  correctAnswers:number = this.quizService.correctAnswers

  wrongAnswers: number = this.quizService.wrongAnswers

  seconds: number = this.quizService.seconds

  timer;

  constructor(private router: Router, private quizService: QuizService) {  }

  ngOnInit() {
  }

  // Starting Quiz
  startQuiz() {
    this.start = true
    this.seconds = 0
    this.startTimer()
    this.displayQuestions()
  }

  // For time display
  displayTimeElapsed() {
    return  Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60)
  }

  // To display the question
  displayQuestions = ( ) => {
    if(this.quizService.questions.length !== 0){
      this.currentQuestion = this.quizService.questions[this.currentQuestionIndex]
      this.nextQuestion = this.quizService.questions[this.currentQuestionIndex + 1]
      this.previousQuestion = this.quizService.questions[this.currentQuestionIndex - 1]
      this.answer = this.currentQuestion["correctAnswer"]
    }
  }

  // To display next  question
  displayNextQuestion() {
    this.numberOfAnsweredQuestions++;
    this.indication = "neutral"
    this.disableOptions = false
    if(this.currentQuestionIndex < this.numberOfQuestions - 1){
      this.currentQuestionIndex = this.currentQuestionIndex + 1
      this.displayQuestions()
    }
    else if(this.numberOfAnsweredQuestions == this.numberOfQuestions){
      this.endTest()
    }
  }

  // To end the test
  endTest() {
    clearInterval(this.timer)
    window.alert("Your answers are submitted!")
    this.quizService.seconds = this.seconds;
    this.quizService.numberOfAnsweredQuestions = this.numberOfAnsweredQuestions;
    this.quizService.correctAnswers = this.correctAnswers;
    this.quizService.wrongAnswers = this.wrongAnswers;
    this.quizService.score = this.score;
    this.router.navigate(['/result'])
  }

  // To check answer is correct or wrong
  handleClick(e){
    this.disableOptions = true
    let choice = e.explicitOriginalTarget.innerText
    if(choice === this.answer){
      this.correctAnswers++
      this.score++
      this.indication = "correct"
    }
    else{
      this.wrongAnswers++
      this.indication = "wrong"
    }
    console.log(choice)
  }

  // Timer
  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
      if(Math.floor(this.seconds / 60) >= 15 && Math.floor(this.seconds % 60) >= 0){
        this.endTest()
      }
    }, 1000)
  }
}

