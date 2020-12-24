import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TrainingRegistrationComponent } from "./ClientSide/Trainings/training-registration/training-registration.component";
import { TrainingsComponent } from "./ClientSide/Trainings/trainings/trainings.component";
import { SingleTrainingComponent } from "./ClientSide/Trainings/single-training/single-training.component";
import { BlogComponent } from "./ClientSide/Blog/blog/blog.component";
import { ArticleComponent } from "./ClientSide/Blog/article/article.component";
import { ServicesComponent } from "./ClientSide/Consulting/services/services.component";
import { ServiceRegistrationComponent } from "./ClientSide/Consulting/service-registration/service-registration.component";
import { TemplateComponent } from "./ClientSide/Home/template/template.component";
import { ContactComponent } from "./ClientSide/Home/contact/contact.component";
import { AccueilComponent } from "./Dashboard/accueil/accueil.component";
import { LoginComponent } from "./Dashboard/login/login.component";
import { RegisterComponent } from "./Dashboard/register/register.component";
import { ProgrammesComponent } from "./ClientSide/Trainings/programmes/programmes.component";
import { CompanyRegistrationComponent } from "./ClientSide/Consulting/company-registration/company-registration.component";

/*const routes: Routes = []*/

export const AppRoutes: Routes = [
  { path: "", component: TemplateComponent },
  { path: "template", component: TemplateComponent },
  { path: "trainings", component: TrainingsComponent },
  { path: "programmes", component: ProgrammesComponent },
  { path: "singleTraining/:id", component: SingleTrainingComponent },
  { path: "trainingRegistration", component: TrainingRegistrationComponent },
  { path: "blog", component: BlogComponent },
  { path: "trainingRegistration/:id", component: TrainingRegistrationComponent },
  { path: "article/:id", component: ArticleComponent },
  { path: "services", component: ServicesComponent },
  {
    path: "serviceRegistrationComponent",
    component: ServiceRegistrationComponent,
  },
  { path: "companyRegistration", component: CompanyRegistrationComponent },

  { path: "contact", component: ContactComponent },

  { path: "accueilDashboard", component: AccueilComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
];
