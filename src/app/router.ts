import { ResultComponent } from './result/result.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: 'home', component:  HomeComponent},
  { path: 'instructions', component: InstructionsComponent},
  { path: 'quiz', component: QuizComponent},
  {path: 'result', component: ResultComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];