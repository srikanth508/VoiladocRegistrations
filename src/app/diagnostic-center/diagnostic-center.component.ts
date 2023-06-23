import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-diagnostic-center',
  templateUrl: './diagnostic-center.component.html',
  styleUrls: ['./diagnostic-center.component.css']
})
export class DiagnosticCenterComponent implements OnInit {

  constructor(private docservice: DoctorserviceService) { }

  public loginid: any;
  public diagnosticcentername: any;
  public businessphno: any;
  public contactpersonname: any;
  public contatcpersonphoneno: any;
  public licenceno: any;
  public emailid: any;
  public address: any;
  public website: any;
  public description: any;
  public languageid: any;

  countrylist: any;
  provicelist: any;
  citylist: any;
  countryid: any;
  provinceid: any;
  cityid: any;
  zipcode: any;
  labels: any;
  countryemail: any;
  countrymanagerid: any;
  countryID: any;
  ngOnInit(): void {

    this.loginid = localStorage.getItem('loginid')
    this.languageid = localStorage.getItem('LanguageID');
    this.countryemail = localStorage.getItem('Email');
    this.countrymanagerid = localStorage.getItem('countrymanagerid');
    this.GetCountry(this.languageid);
    this.countryID = sessionStorage.getItem('CountryID');

    if (this.countryID == 1) {
      this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
        data => {

          this.labels = data;

        }, error => {
        }
      )
    } else {
      this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageIDByCountryID(this.languageid).subscribe(
        data => {

          this.labels = data;

        }, error => {
        }
      )
    }

  }





  public GetCountry(LanguageID) {
    if (this.countryID == 1) {
      this.docservice.GetCountryMasterByLanguageID(LanguageID).subscribe(data => {
        this.countrylist = data;
      })
    }
    else {
      debugger;
      this.docservice.GetCountryMasterlanguageIDbyCountryID(LanguageID).subscribe(data => {
        this.countrylist = data;
      })
    }
  }

  public GetCountryID(even) {
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

  public homesample: any;
  public openhours: any;
  public licencevalidtill: any;


  public Insertdetails() {
    var entity = {
      'DiagnosticCenterName': this.diagnosticcentername,
      'BusinessPhoneNo': this.businessphno + ',' + this.countryID,
      'ContactPersonName': this.contactpersonname,
      'ContactPersonPhNo': this.contatcpersonphoneno,
      'BusinessLicenceNumber': this.licenceno,
      'EmailID': this.emailid,
      'Address': this.address,
      'Website': this.website,
      'Description': this.description,
      'RegID': this.loginid,
      'CountryID': this.countryid,
      'ProvinceID': this.provinceid,
      'CityID': this.cityid,
      'Pincode': this.zipcode,
      'OpenHours': this.openhours,
      'HomeSamplePickup': this.homesample,
      'Preferred': 0,
      'Photo': this.photourl,
      'LicencevalidTill': this.licencevalidtill
    }
    this.docservice.InsertDiagnosticcenter_Registration(entity).subscribe(data => {
      if (data != 0) {
        this.getupdateLoginsUsers();
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

        localStorage.clear();
        sessionStorage.clear();
        location.href = "#/Login";
        location.reload();

      }

    })
  }



  public getupdateLoginsUsers() {
    this.docservice.UpdateVoiladocRegistrationEmails(this.loginid).subscribe(data => {

    })
  }

  photo = [];
  showphoto: any;
  photourl: any;



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
