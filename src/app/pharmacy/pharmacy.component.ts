import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  constructor(private docservice: DoctorserviceService) { }

  public loginid: any;
  public pharmacyname: any;
  public contactpersoname: any;
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
  licencevalidtill: any;
  preferred: boolean;
  teleordering: any;
  homedelivery: boolean;
  nightpharmacy: boolean;
  labels: any;
  countryemail: any;
  countrymanagerid: any;
  countryID: any;

  ngOnInit(): void {
    this.countryID = sessionStorage.getItem('CountryID');
    this.loginid = localStorage.getItem('loginid');
    this.languageid = localStorage.getItem('LanguageID');
    this.countryemail = localStorage.getItem('Email');
    this.countrymanagerid = localStorage.getItem('countrymanagerid');
    this.GetCountry(this.languageid);
    

    if (this.countryID == 'maroc') {
      this.docservice.GetAdmin_PharmacyRegistration_LabelByLanguageID(this.languageid).subscribe(
        data => {

          this.labels = data;

        }, error => {
        }
      )
    } else {
     this.docservice.GetAdmin_PharmacyRegistration_LabelByLanguageIDByCountryID(this.languageid).subscribe(
        data => {

          this.labels = data;

        }, error => {
        }
      ) 
    }
  }

  public Insertdetails() {
    var entity = {
      'PharmacyName': this.pharmacyname,
      'ContactPersonName': this.contactpersoname,
      'LicenceNumber': this.licenceno,
      'PhoneNo': this.contatcpersonphoneno + ',' +  Number(this.countryID=='maroc'?'1':'2'),
      'EmailID': this.emailid,
      'Address': this.address,
      'Website': this.website,
      'Description': this.description,
      'RegID': this.loginid,
      'LicencevalidTill': this.licencevalidtill,
      'CountryID': this.countryid,
      'ProvinceID': this.provinceid,
      'CityID': this.cityid,
      'Pincode': this.zipcode,
      'Photos': this.photourl,
      'HomeDelivery': this.homedelivery,
      'NightPharmacy': this.nightpharmacy,
      'TelephoneOrdering': this.teleordering,
      'Preferred': this.preferred
    }
    this.docservice.InsertPharmacy_Registration(entity).subscribe(data => {
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



  public GetCountry(LanguageID) {
    if (this.countryID == 'maroc') {
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
    if (this.countryID == 'maroc') {
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
    if (this.countryID == 'maroc') {
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


  public getupdateLoginsUsers() {
    this.docservice.UpdateVoiladocRegistrationEmails(this.loginid).subscribe(data => {

    })
  }

  public photo = [];
  public photourl: any;
  public showphoto: any;

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
      if (this.countryID == 'maroc') {
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
