import { Question } from './../models/question.model';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  currentQuestion: object = {}

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
    this.startTimer()
  }


  displayTimeElapsed() {
    return  Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60)
  }

  displayQuestions = ( ) => {
    if(this.quizService.questions.length !== 0){
      this.currentQuestion = this.quizService.questions[this.currentQuestionIndex]
      this.nextQuestion = this.quizService.questions[this.currentQuestionIndex + 1]
      this.previousQuestion = this.quizService.questions[this.currentQuestionIndex - 1]
      this.answer = this.currentQuestion["correctAnswer"]
    }
  }

  displayNextQuestion() {
    this.numberOfAnsweredQuestions++;
    if(this.currentQuestionIndex < this.numberOfQuestions - 1){
      this.currentQuestionIndex = this.currentQuestionIndex + 1
      this.displayQuestions()
    }
    else if(this.numberOfAnsweredQuestions == this.numberOfQuestions){
      this.endTest()
    }
  }

  displayPreviousQuestion() {
    this.numberOfAnsweredQuestions--;
    if(this.currentQuestionIndex > 0){
      this.currentQuestionIndex = this.currentQuestionIndex - 1
      this.displayQuestions()
    }
  }

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

  handleClick(e){
    e.preventDefault()
    let choice = e.explicitOriginalTarget.innerText
    if(choice == this.answer){
      this.correctAnswers++
      this.score++
    }
    else{
      this.wrongAnswers++
    }
    console.log(choice, this.answer)
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
      if(Math.floor(this.seconds / 60) > 15){
        this.endTest()
      }
      if(Math.floor(this.seconds % 60) > 0 ){
        this.displayQuestions()
      }
    }, 1000)
  }
}

