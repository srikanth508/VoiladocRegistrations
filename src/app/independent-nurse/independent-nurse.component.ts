import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-independent-nurse',
  templateUrl: './independent-nurse.component.html',
  styleUrls: ['./independent-nurse.component.css']
})
export class IndependentNurseComponent implements OnInit {
  zipcode: any;
  countryID: any;

  constructor(private docservice: DoctorserviceService) { }

  public gender: any;
  public nursename: any;
  public phoneno: any;
  public email: any;
  public address: any;
  public experience: any;
  public education = [];
  public professionalprofile: any;
  public speaklanguages: any;
  public loginid: any;
  public departmentlist: any;
  public departmentid: any;
  specilaizationlist: any;
  specilizationid: any;
  homecare: any;
  photo = [];
  showphoto: any;
  photourl: any;
  identityproof = [];
  identityproofurl: any;
  showidentityphoto: any;
  languageid: any;
  countrylist: any;
  provicelist: any;
  citylist: any;
  countryid: any;
  provinceid: any;
  cityid: any;
  educationurl: any;
  public Education: any;
  public labels: any;
  countryemail: any;
  countrymanagerid: any;
  ngOnInit(): void {
    this.loginid = localStorage.getItem('loginid');
    this.languageid = localStorage.getItem('LanguageID');
    this.countryemail = localStorage.getItem('Email');
    this.countrymanagerid = localStorage.getItem('countrymanagerid');
   this.countryID = sessionStorage.getItem('CountryID');
    this.getdepartmentmaster();
    this.GetCountry(this.languageid);
    if (this.countryID == 1) {

      this.docservice.GetAdmin_NurseRegistration_labelByLanguageID(this.languageid).subscribe(
        data => {

          this.labels = data;

        }, error => {
        }
      )
    } else {
    this.docservice.GetAdmin_NurseRegistration_labelByLanguageIDByCountryID(this.languageid).subscribe(
        data => {

          this.labels = data;

        }, error => {
        }
      ) 
    }
    this.GetSpecilizationmaster(this.languageid)
  }

  public getdepartmentmaster() {
    this.docservice.GetDepartmentMasterByLanguageID(1).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }

  public GetDepartmentID(even) {
    this.departmentid = even.target.value;

  }

  public InsertedDetails() {
    debugger
    var entity = {
      'NurseName': this.nursename,
      'PhoneNo': this.phoneno + ',' + this.countryID,
      'Email': this.email,
      'GenderID': this.gender,
      'Address': this.address,
      'Experience': this.experience,
      'Education': this.Education,
      'ProfessionalProfile': this.professionalprofile,
      'SpeakLanguages': this.speaklanguages,
      'DepartmentID': this.departmentid,
      'RegID': this.loginid,
      'SpecializationID': this.specilizationid,
      'HomeCare': this.homecare,
      'IdentityProof': this.identityproofurl,
      'Photo': this.photourl,
      'CountryID': this.countryid,
      'ProvinceID': this.provinceid,
      'CityID': this.cityid,
      'Zipcode': this.zipcode
    }
    this.docservice.InsertNurseRegistration(entity).subscribe(data => {
      debugger
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
        this.nursename = "";
        this.phoneno = "";
        this.email = "";
        this.gender = "";
        this.address = "";
        this.experience = "";
        this.professionalprofile = "";
        this.speaklanguages = "";
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


  public GetSpecilizationmaster(LanguageID) {
    debugger
    this.docservice.GetSpecilaizationMaster(LanguageID).subscribe(data => {
      this.specilaizationlist = data;
      this.specilaizationlist = this.specilaizationlist.filter(x => x.departmentID == 30);
    })
  }
  public GetSpecilizationID(even) {
    this.specilizationid = even.target.value;
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
      //  let b = 'https://maroc.voiladoc.org' + a;
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

  public onIdentityProofUpload(abcd) {
    debugger
    this.identityproof.push(abcd.addedFiles[0]);
    this.uploadIdentityProof();
    abcd.length = 0;
  }

  public uploadIdentityProof() {
    debugger
    this.docservice.DoctorPhotoUpload(this.identityproof).subscribe(res => {
      debugger
      this.identityproofurl = res;
      let a = this.identityproofurl.slice(2);
      var b;
      if (this.countryID == 1) {
        b = 'https://maroc.voiladoc.org' + a;
      } else {
        b = 'https://madagascar.voiladoc-eastafrica.com' + a;
      }
      // let b = 'https://maroc.voiladoc.org' + a;
      this.showidentityphoto = b;
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



  public oneductaionUpload(abcd) {
    debugger
    this.education.push(abcd.addedFiles[0]);
    this.uploadIeducation();
    abcd.length = 0;
  }

  public uploadIeducation() {
    debugger
    this.docservice.NurseIdentityProof(this.education).subscribe(res => {
      debugger
      this.educationurl = res;
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
