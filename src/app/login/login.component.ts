import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service'
import Swal from 'sweetalert2';
import { LmsService } from '../lms.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public lmsservice: LmsService, public docservice: DoctorserviceService) { }

  public uname: any;
  public password: any;
  public result: any;
  public roleid: any;
  public languagelist: any;
  public LanguageID: any; jgjg
  Emails = [{
    'name': "Widad",
    'email': "widad@voiladoc.net"
  },
  {
    'name': "emmanuel",
    'email': "emmanuel@meridionalhealth.com"
  },
  {
    'name': "roumaissa",
    'email': "roumaissa.ma@voiladoc.ma"
  }]
  ngOnInit(): void {
    this.getlang();
    var Contry = location.href.split('/').pop();   
    localStorage.setItem('CountryID', Contry);
  }


  public getlang() {
    this.docservice.GetLanguageMaster().subscribe(
      data => {

        this.languagelist = data;
      }, error => {
      }
    )
  }

  public GetLanguageID(even) {
    this.LanguageID = even.target.value;
    localStorage.setItem('LanguageID', this.LanguageID);
    this.getlanguage();
  }

  public login() {
    debugger
    if (this.uname == "" || this.password == "") {
      Swal.fire('Please Enter Username and password')
    }
    else {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {
        debugger
        if (data['requestMessage'] != undefined || null) {
          debugger
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

          debugger
          this.docservice.GetVoiladocRegistrationEmailsByUnameAndPwd(this.uname, this.password).subscribe(data => {
            this.result = data[0];
            if (this.result != null) {
              sessionStorage.setItem('temp', '1');
              localStorage.setItem('roleid', this.result.typeID);
              localStorage.setItem('username', this.result.userName);
              localStorage.setItem('loginid', this.result.id);
              localStorage.setItem("LanguageID", this.LanguageID);
              localStorage.setItem('Email', JSON.stringify(this.Emails));
              localStorage.setItem('countrymanagerid', this.result.countryManagerID);

              this.roleid = this.result.typeID;
              debugger
              if (this.roleid == 1) {
                location.href = "#/Hospital";
                location.reload();
              }
              if (this.roleid == 2) {
                location.href = "#/Clinics";
                location.reload();
              }
              if (this.roleid == 3) {
                location.href = "#/IndependentDocotor";
                location.reload();
              }
              if (this.roleid == 4) {
                location.href = "#/IndependentNurseComponent";
                location.reload();
              }
              if (this.roleid == 5) {
                location.href = "#/IndependentPhysio";
                location.reload();
              }
              if (this.roleid == 6) {
                location.href = "#/IndependenMidwife";
                location.reload();
              }
              if (this.roleid == 7) {
                location.href = "#/Pharmacy";
                location.reload();
              }
              if (this.roleid == 8) {
                location.href = "#/DiagnosticCenter";
                location.reload();
              }
            }
            else {
              if (this.LanguageID == 1) {
                Swal.fire('Error', 'UserName and Password invalid');
              }
              else if (this.LanguageID == 6) {
                Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
              }


            }

          })

        }
      })

    }

  }

  labels: any;


  public getlanguage() {
    this.docservice.Getloginlabel(this.LanguageID).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
}
