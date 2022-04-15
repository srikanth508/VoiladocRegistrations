import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TrainingCategoryComponent } from './Masters/training-category/training-category.component';
import { TraingingCategoryDashComponent } from './Masters/trainging-category-dash/trainging-category-dash.component';
import { TrainingsubcategoryComponent } from './Masters/trainingsubcategory/trainingsubcategory.component';
import { TrainingsubcategorydashComponent } from './Masters/trainingsubcategorydash/trainingsubcategorydash.component';
import { CourseComponent } from './Masters/course/course.component';
import { CourseDashComponent } from './Masters/course-dash/course-dash.component';
import { CourseChaptersComponent } from './Masters/course-chapters/course-chapters.component';
import { CourseChaptersDashComponent } from './Masters/course-chapters-dash/course-chapters-dash.component';
import { HospitalComponent } from './hospital/hospital.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { IndependentDocotorComponent } from './independent-docotor/independent-docotor.component';
import { FormsModule } from '@angular/forms';
import { IndependentNurseComponent } from './independent-nurse/independent-nurse.component';
import { IndependentPhysioRegistrationComponent } from './independent-physio-registration/independent-physio-registration.component';
import { IndependenMidwifeComponent } from './independen-midwife/independen-midwife.component';
import { DiagnosticCenterComponent } from './diagnostic-center/diagnostic-center.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyHttpInterceptor } from './my-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    TrainingCategoryComponent,
    TraingingCategoryDashComponent,
    TrainingsubcategoryComponent,
    TrainingsubcategorydashComponent,
    CourseComponent,
    CourseDashComponent,
    CourseChaptersComponent,
    CourseChaptersDashComponent,
    HospitalComponent,
    ClinicsComponent,
    IndependentDocotorComponent,
    IndependentNurseComponent,
    IndependentPhysioRegistrationComponent,
    IndependenMidwifeComponent,
    DiagnosticCenterComponent,
    PharmacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgxDropzoneModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true}
  ],
  
  bootstrap: [AppComponent]
})



export class AppModule { 


}
