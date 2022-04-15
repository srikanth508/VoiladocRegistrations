import { Component, OnInit } from '@angular/core';
import { LmsService } from '../lms.service'
import { DoctorserviceService } from '../doctorservice.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public lmsservice: LmsService,private docservice: DoctorserviceService) { }

  public roleid: any;
  public username:any;
  languageid:any;
  labels:any;
  ngOnInit(): void {
    this.roleid = localStorage.getItem('roleid');
    this.username=localStorage.getItem('username');
    this.languageid = localStorage.getItem('LanguageID');


    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )

  }

}
