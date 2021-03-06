import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ClientSide/Home/header/header.component';
import { FooterComponent } from './ClientSide/Home/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './ClientSide/Blog/article/article.component';
import { BlogComponent } from './ClientSide/Blog/blog/blog.component';
import { SingleTrainingComponent } from './ClientSide/Trainings/single-training/single-training.component';
import { TrainingsComponent } from './ClientSide/Trainings/trainings/trainings.component';
import { TrainingRegistrationComponent } from './ClientSide/Trainings/training-registration/training-registration.component';
import { authAdminService } from './services/authAdmin.service';

import { TrainingService } from './services/training.service';
import { BlogService } from './services/blog.service';
import { UserService } from './services/user.service';
import { CommentService } from './services/comment.service';
import { ContactService } from './services/contact.service';
import{PartenairesService} from './services/partenaires.service'
import { TrainingRegistrationService } from './services/training-registration.service';
import { RegistrationService } from './services/registration.service';
import{MemberService} from './services/member.service';

import { TemplateComponent } from './ClientSide/Home/template/template.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { ServicesComponent } from './ClientSide/Consulting/services/services.component';
import { ServiceRegistrationComponent } from './ClientSide/Consulting/service-registration/service-registration.component';
import { ContactComponent } from './ClientSide/Home/contact/contact.component';
import { AccueilComponent } from './Dashboard/accueil/accueil.component';
import { LoginComponent } from './Dashboard/login/login.component';
import { RegisterComponent } from './Dashboard/register/register.component';
import { SearchPipe } from './pipes/search.pipe';
import { VoteModalComponent } from './ClientSide/Trainings/vote-modal/vote-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReplyModalComponent } from './ClientSide/Blog/reply-modal/reply-modal.component';
import { AuthInterceptor } from './ClientSide/Trainings/interceptor';
import { ReadrepliesModalComponent } from './ClientSide/Blog/readreplies-modal/readreplies-modal.component';
import {PdfViewerModule} from 'ng2-pdf-viewer'
import { ProgrammesComponent } from './ClientSide/Trainings/programmes/programmes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyRegistrationComponent } from './ClientSide/Consulting/company-registration/company-registration.component';
import { AddBlogComponent } from './Dashboard/blog/addBlog/add-blog.component';
import { ListBlogComponent } from './Dashboard/blog/list-blog/list-blog.component';
import { ListCommentsComponent } from './Dashboard/Comments/list-comments/list-comments.component';
import { AddTrainingComponent } from './Dashboard/sessions/add-training/add-training.component';
import { ListTrainingComponent } from './Dashboard/sessions/list-training/list-training.component';
import { AddMemberComponent } from './Dashboard/team/add-member/add-member.component';
import { ListMemberComponent } from './Dashboard/team/list-member/list-member.component';
import { AddPartenaireComponent } from './Dashboard/Partenaire/add-partenaire/add-partenaire.component';
import { ListPartenaireComponent } from './Dashboard/Partenaire/list-partenaire/list-partenaire.component';
import { ListblogpipePipe } from './pipes/listblogpipe.pipe';
import { ListsessionspipePipe } from './pipes/listsessionspipe.pipe';
import { ListmembrespipePipe } from './pipes/listmembrespipe.pipe';
import { ListpartenairespipePipe } from './pipes/listpartenairespipe.pipe';
import { ListcommentairespipePipe } from './pipes/listcommentairespipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    BlogComponent,
    SingleTrainingComponent,
    TrainingsComponent,
    TrainingRegistrationComponent,
    TemplateComponent,
    ServicesComponent,
    ServiceRegistrationComponent,
    ContactComponent,
    AccueilComponent,
    LoginComponent,
    RegisterComponent,
    SearchPipe,
    VoteModalComponent,
    ReplyModalComponent,
    ReadrepliesModalComponent,
    ProgrammesComponent,
    CompanyRegistrationComponent,
    AddBlogComponent,
    ListBlogComponent,
    ListCommentsComponent,
    AddTrainingComponent,
    ListTrainingComponent,
    AddMemberComponent,
    ListMemberComponent,
    AddPartenaireComponent,
    ListPartenaireComponent,
    ListblogpipePipe,
    ListsessionspipePipe,
    ListmembrespipePipe,
    ListpartenairespipePipe,
    ListcommentairespipePipe,
  
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    MatListModule,
    MatSelectModule,
    MatIconModule,
    Ng2PageScrollModule,
    MatDialogModule,
    PdfViewerModule

  ],
  entryComponents: [VoteModalComponent ,ReplyModalComponent , ReadrepliesModalComponent] ,
  providers: [
    ,
     {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  authAdminService,TrainingService, BlogService, UserService, ContactService,PartenairesService,CommentService, TrainingRegistrationService, RegistrationService,MemberService ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
