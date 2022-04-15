import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TrainingCategoryComponent } from './Masters/training-category/training-category.component';
import { TraingingCategoryDashComponent } from './Masters/trainging-category-dash/trainging-category-dash.component';
import { TrainingsubcategoryComponent } from './Masters/trainingsubcategory/trainingsubcategory.component';
import { TrainingsubcategorydashComponent } from './Masters/trainingsubcategorydash/trainingsubcategorydash.component';
import { CourseComponent } from './Masters/course/course.component';
import { CourseDashComponent } from './Masters/course-dash/course-dash.component';
import { CourseChaptersDashComponent } from './Masters/course-chapters-dash/course-chapters-dash.component';
import { CourseChaptersComponent } from './Masters/course-chapters/course-chapters.component';
import { HospitalComponent } from './hospital/hospital.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { IndependentDocotorComponent } from './independent-docotor/independent-docotor.component';
import { IndependentNurseComponent } from './independent-nurse/independent-nurse.component';
import { IndependentPhysioRegistrationComponent } from './independent-physio-registration/independent-physio-registration.component';
import { IndependenMidwifeComponent } from './independen-midwife/independen-midwife.component';
import { DiagnosticCenterComponent } from './diagnostic-center/diagnostic-center.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Sidebar', component: SidebarComponent },
  { path: 'TrainingCategory', component: TrainingCategoryComponent },
  { path: 'TraingingCategoryDash', component: TraingingCategoryDashComponent },
  { path: 'Trainingsubcategory', component: TrainingsubcategoryComponent },
  { path: 'Trainingsubcategorydash', component: TrainingsubcategorydashComponent },
  { path: 'Course', component: CourseComponent },
  { path: 'CourseDash', component: CourseDashComponent },
  { path: 'CourseChapters', component: CourseChaptersComponent },
  { path: 'CourseChaptersDash', component: CourseChaptersDashComponent },
  { path: 'Hospital', component: HospitalComponent },
  { path: 'Clinics', component: ClinicsComponent },
  { path: 'IndependentDocotor', component: IndependentDocotorComponent },
  { path: 'IndependentNurseComponent', component: IndependentNurseComponent },
  { path: 'IndependentPhysio', component: IndependentPhysioRegistrationComponent },
  { path: 'IndependenMidwife', component: IndependenMidwifeComponent },
  { path: 'DiagnosticCenter', component: DiagnosticCenterComponent },
  { path: 'Pharmacy', component: PharmacyComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
