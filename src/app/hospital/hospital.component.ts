import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  countryid: any;
  provinceid: any;
  cityid: any;
  showphoto: any;
  countryID: any;

  constructor(private docservice: DoctorserviceService) { }

  public hospitalname: any;
  public hospitalphoneno: any;
  public contactpersonname: any;
  public contatcpersonphoneno: any;
  public emailid: any;
  public address: any;
  public website: any;
  public loginid: any;
  public languageid: any;
  countrylist: any;
  provicelist: any;
  citylist: any;
  open24hrs: any;
  zipcode: any;
  yearestablished: any;
  noofbeds: any;
  isemergencyserviceavilable: any;
  description: any;
  photo = [];
  photourl: any;
  labels: any;
  countryemail: any;
  countrymanagerid: any;
  ngOnInit(): void {

    this.loginid = localStorage.getItem('loginid');
    this.languageid = localStorage.getItem('LanguageID');
    this.countryemail = localStorage.getItem('Email');
    this.countrymanagerid = localStorage.getItem('countrymanagerid');
   // this.countryID = sessionStorage.getItem('CountryID');
    this.GetCountry(this.languageid);
    this.getlanguage()
  }

  public getlanguage() {
    if (this.countryID == 1) {
      this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(data => {
        this.labels = data;

      })
    } else {
      this.docservice.GetAdmin_HospitalClinicRegistration_LablesByCountryID(this.languageid).subscribe(data => {
        this.labels = data;

      })
    }
  }


  public InsertedDetails() {
    debugger
    var entity = {
      'HospitalName': this.hospitalname,
      'HospitalPhoneNo': this.hospitalphoneno+ ',' + this.countryID,
      'ContactpersonName': this.contactpersonname,
      'ContatcpersonPhoneNo': this.contatcpersonphoneno,
      'EmailID': this.emailid,
      'Address': this.address,
      'Website': this.website,
      'HospitalClinicID': 1,
      'RegID': this.loginid ,
      'Zipcode': this.zipcode,
      'Open24Hrs': this.open24hrs,
      'YearEstablished': this.yearestablished,
      'NoOfBeds': this.noofbeds,
      'IsEmergencyServiceAvailable': this.isemergencyserviceavilable,
      'Description': this.description,
      'HospitalPhoto': this.photourl,
      'CountryID': this.countryid,
      'ProvinceID': this.provinceid,
      'CityID': this.cityid
    }
    this.docservice.InsertHospitalRegistration(entity).subscribe(data => {
      debugger
      if (this.languageid == 1) {

        var desc = "You have a new online registration. Please login to Voiladoc and check the online registration dashboard"
        this.InsertNotifications(desc)
        this.sendmail(desc);
        Swal.fire('Registration successfully done.  Voiladoc team will be in touch soon.');
      }
      else {
        var desc = "Vous avez une nouvelle inscription en ligne. Veuillez vous connecter à Voiladoc et vérifier le tableau de bord d'inscription en ligne. "
        this.InsertNotifications(desc)
        this.sendmail(desc);
        Swal.fire("Inscription réussie. L'équipe Voiladoc sera bientôt en contact");
      }
      this.getupdateLoginsUsers();
      this.hospitalname = ""
      this.hospitalphoneno = ""
      this.contactpersonname = ""
      this.contatcpersonphoneno = ""
      this.emailid = ""
      this.address = ""
      this.website = ""

      localStorage.clear();
      sessionStorage.clear();

      location.href = "#/Login";
      location.reload();

    })

  }

  public getupdateLoginsUsers() {
    this.docservice.UpdateVoiladocRegistrationEmails(this.loginid).subscribe(data => {

    })
  }

  public GetCountry(LanguageID) {
    if (this.countryID == 1) {
      this.docservice.GetCountryMasterByLanguageID(LanguageID).subscribe(data => {
        this.countrylist = data;
      })
    }
    else {
      this.docservice.GetCountryMasterByLanguageIDByCountryID(LanguageID).subscribe(data => {
        this.countrylist = data;
      })
    }

  }

  public GetCountryID(even) {
    debugger
    this.countryid = even.target.value;
    this.GetProviceMaster(this.countryid, this.languageid);
  }

  public GetProviceMaster(CountryID, LanguageID) {
    if (this.countryID == 1) {
      this.docservice.GetCityMasterBYIDandLanguageID(CountryID, LanguageID).subscribe(data => {
        this.provicelist = data;
      })
    }
    else {
      this.docservice.GetCityMasterByIdDandLanguageIDByCountryID(CountryID, LanguageID).subscribe(data => {
        this.provicelist = data;
      })
    }
  }

  public GetProviceID(even) {
    debugger;
    this.provinceid = even.target.value;
    this.GetCityMaster(this.provinceid, this.languageid);
  }

  public GetCityMaster(ProvinceID, LanguageID) {
    if (this.countryID == 1) {
      this.docservice.GetAreaMasterByCityIDAndLanguageID(ProvinceID, LanguageID).subscribe(data => {
        this.citylist = data;
      })
    } else {
      this.docservice.GetAreaMasterByCityIDAndLanguageIDByCountryID(ProvinceID, LanguageID).subscribe(data => {
        this.citylist = data;
      })
    }
  }

  public GetCityID(even) {
    this.cityid = even.target.value;
    this.zipcode = this.citylist.filter(x => x.id == this.cityid)[0].pincode;
  }

  public onphotoUpload(abcd) {
    debugger
    this.photo.push(abcd.addedFiles[0]);
    this.uploadphoto();
    abcd.length = 0;
  }

  public uploadphoto() {
    debugger
    this.docservice.DoctorPhotoUpload(this.photo).subscribe(res => {
      debugger
      this.photourl = res;
      let a = this.photourl.slice(2);
      var b;
      if (this.countryID == 1) {
        b = 'https://maroc.voiladoc.org' + a;
      } else {
        b = 'https://madagascar.voiladoc-eastafrica.com' + a;
      }


      this.showphoto = b;
      if (this.languageid == 1) {
        Swal.fire('Photo added successfully.');
      }
      else {
        Swal.fire('Ajouté avec succès');
      }
      this.photo.length = 0;
      debugger
    }, error => {

    })
  }


  emailattchementurl = []

  public InsertNotifications(desc) {
    var entity = {
      'Notification': 'New online Registartion',
      'TypeID': 1,
      'Description': desc,
      'countrymangerID': this.countrymanagerid
    }
    this.docservice.InsertNotifications(entity).subscribe(data => {
      debugger
    })
  }



  public sendmail(desc) {

    var entity = {
      'emailto': this.countryemail,
      'emailsubject': "Voiladoc",
      'emailbody': desc,
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
      debugger
    })
  }
}
