import { Component } from '@angular/core';
import { LmsService } from '../app/lms.service'
import { DoctorserviceService } from '../app/doctorservice.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigiLMS';
  countryCode: any;
  phonenumer: string;
  constructor(private lmsservice: LmsService, private docservice: DoctorserviceService) { }
  public temp: any;
  public userid: any;
  public messages: any;
  public count: any;
  public isMobileResolution: boolean;
  public isDescktopResolution: boolean;
  public roleid: any;
  public username: any;
  languageid: any;
  labels: any;
  ngOnInit() {
    debugger;
    this.temp = sessionStorage.getItem("temp");
    this.roleid = localStorage.getItem('roleid');
    this.username = localStorage.getItem('username');
    this.languageid = localStorage.getItem('LanguageID');
    this.countryCode = sessionStorage.getItem('CountryID');
    if (this.countryCode == 2) {
      this.phonenumer = '+261 340795048';
    }
    else {
      this.phonenumer = '+212 522446145';
    }
    if (window.innerWidth < 600) {
      this.isMobileResolution = true;
      this.isDescktopResolution = false;
    } else {
      this.isMobileResolution = false;
      this.isDescktopResolution = true;
    }


    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }

  public logout() {
    debugger;
    localStorage.clear();
    sessionStorage.clear();
    location.href = "#/Login";
    location.reload();
  }

  public onActivate(event) {
    window.scroll(0, 0);
  }

  public show: any;
  public showsidebar: any;

  public openNav() {

    this.show = 0;
    this.showsidebar = 1;
    document.getElementById("sidenav").style.width = "230px";
    document.getElementById("main").style.marginLeft = "230px";
  }

  public closeNav() {

    this.show = 1;
    this.showsidebar = 0;
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}
