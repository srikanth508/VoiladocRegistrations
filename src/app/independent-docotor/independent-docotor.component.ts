import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-independent-docotor',
  templateUrl: './independent-docotor.component.html',
  styleUrls: ['./independent-docotor.component.css']
})
export class IndependentDocotorComponent implements OnInit {
  doctortypelist: any;
  hospitallist: any;
  degreemaster: any;
  degreeid: any;
  codeid: any;
  constructor(private docservice: DoctorserviceService) { }
  countrylist: any;
  provicelist: any;
  citylist: any;
  public gender: any;
  public doctorname: any;
  public phoneno: any;
  public email: any;
  public Address: any;
  public experience: any;
  public speaklanguages: any;
  public departmentid: any;
  public departmentlist: any;
  public loginid: any;
  countryid: any;
  provinceid: any;
  cityid: any;
  languageid: any;
  specilaizationlist = [];
  selectedspecilaization = [];
  dropdownSettings = {};
  doctortypeid: any;
  specilizationid: any;
  malpractice: any;
  reffereddoctor: any;
  hospitalclinicid: any;
  otherexperiences: any;
  labels: any;
  public hospitadd = {};
  search: any;
  SelectLabel: any;
  countryemail: any;
  countrymanagerid: any;
  ngOnInit(): void {
    debugger
    this.loginid = localStorage.getItem('loginid');
    this.languageid = localStorage.getItem('LanguageID');
    this.countryemail = localStorage.getItem('Email');
    this.countrymanagerid = localStorage.getItem('countrymanagerid');
    this.getdepartmentmaster();

    this.GetDoctorType(this.languageid);
    this.GetHospitalclinic(this.languageid);
    this.GetCountry(this.languageid);
    this.GetDegreeMaster(this.languageid);
    this.getlanguage();
    this.codeid = 0;
  }


  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(data => {
      this.labels = data;
      this.SelectLabel = this.labels[0].select

    })
  }


  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }

  public slotdurationid: any;

  public GetSlotDurationID(even) {
    this.slotdurationid = even.target.value;
  }

  public signaturephoto: any;
  public resumeurl: any;
  public docphoto: any;
  public identityproof = [];
  public colleagename: any;
  public regno: any;
  regcouncil: any;
  medicalregproof: any;


  public InsertedDetails() {
    debugger;
    if (this.hospitalclinicid == undefined || this.slotdurationid == undefined || this.doctortypeid == undefined || this.departmentid == undefined) {
      Swal.fire('Please fill All Mandatory fills');
    }
    else {

      var entity = {
        'DoctorName': this.doctorname,
        'PhoneNo': this.codeid + ',' + this.phoneno,
        'Email': this.email,
        'GenderID': this.gender,
        'Address': this.Address,
        'Experience': this.experience,
        'SpeakLanguages': this.speaklanguages,
        'DepartmentID': this.departmentid,
        'RegID': this.loginid,
        'SpecializationID': this.specilizationid,
        'CountryID': this.countryid,
        'ProvinceID': this.provinceid,
        'CityID': this.cityid,
        'SlotDurationID': this.slotdurationid,
        'DoctorType': this.doctortypeid,
        'MallPractise': this.malpractice,
        'ReferredDoctor': this.reffereddoctor,
        'SignaturePhoto': this.signaturephoto,
        'Photo': this.docphoto,
        'HospitalID': this.hospitalclinicid,
        'Resume': this.resumeurl,
        'OtherExperiences': this.otherexperiences,
        'Identityproof': this.identityproofurl,
        'DegreeID': this.degreeid,
        'Colleage': this.colleagename,
        'RegistrationNumber': this.regno,
        'RegistrationCouncil': this.regcouncil,
        'MedicalRegProof': this.medicalregproof,
        'Pincode': this.zipcode
      }
      this.docservice.InsertDoctorRegistration(entity).subscribe(data => {
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire({
              text: "Thank you for completing the online registration form. We received it. A Voiladoc specialist will contact you shortly.",
              confirmButtonColor: '#3085d6',
              confirmButtonText: "OK"
            }).then((result) => {
              if (result.isConfirmed) {
                var desc = "You have a new online registration. Please login to Voiladoc and check the online registration dashboard"
                this.InsertNotifications(desc)
                this.sendmail(desc);
                this.getupdateLoginsUsers()
                this.doctorname = ""
                this.phoneno = ""
                this.email = ""
                this.gender = ""
                this.Address = ""
                this.experience = ""
                this.speaklanguages = ""

                localStorage.clear();
                sessionStorage.clear();
                location.href = "#/Login";
                location.reload();
              }
            })
          }
          else {
            /*  Swal.fire("Inscription réussie. L'équipe Voiladoc sera bientôt en contact"); */
            Swal.fire({
              text: "Merci d'avoir rempli le formulaire d'inscription en ligne. Nous l'avons reçu. Un spécialiste Voiladoc vous contactera prochainement.",
              confirmButtonColor: '#3085d6',
              confirmButtonText: "D'accord"
            }).then((result) => {
              if (result.isConfirmed) {
                var desc = "Vous avez une nouvelle inscription en ligne. Veuillez vous connecter à Voiladoc et vérifier le tableau de bord d'inscription en ligne. "
                this.InsertNotifications(desc)
                this.sendmail(desc);
                this.getupdateLoginsUsers()
                this.doctorname = ""
                this.phoneno = ""
                this.email = ""
                this.gender = ""
                this.Address = ""
                this.experience = ""
                this.speaklanguages = ""

                localStorage.clear();
                sessionStorage.clear();
                location.href = "#/Login";
                location.reload();
              }
            })
          }

        }
      })
    }

  }

  public getupdateLoginsUsers() {
    this.docservice.UpdateVoiladocRegistrationEmails(this.loginid).subscribe(data => {

    })
  }

  public GetDepartmentID(even) {
    this.departmentid = even.target.value;
    this.GetSpecilizationmaster(this.languageid);
  }

  public GetCountry(LanguageID) {
    this.docservice.GetCountryMasterByLanguageID(LanguageID).subscribe(data => {
      this.countrylist = data;
    })
  }

  public GetCountryID(even) {
    this.countryid = even.target.value;
    this.GetProviceMaster(this.countryid, this.languageid);
  }

  public GetProviceMaster(CountryID, LanguageID) {
    this.docservice.GetCityMasterBYIDandLanguageID(CountryID, LanguageID).subscribe(data => {
      this.provicelist = data;
    })
  }

  public GetProviceID(even) {
    this.provinceid = even.target.value;
    this.GetCityMaster(this.provinceid, this.languageid);
  }

  public GetCityMaster(ProvinceID, LanguageID) {
    this.docservice.GetAreaMasterByCityIDAndLanguageID(ProvinceID, LanguageID).subscribe(data => {
      this.citylist = data;
    })
  }
  zipcode: any;
  public GetCityID(even) {
    this.cityid = even.target.value;
    this.zipcode = this.citylist.filter(x => x.id == this.cityid)[0].pincode;
  }

  public GetSpecilizationmaster(LanguageID) {
    debugger
    this.docservice.GetSpecilaizationMaster(LanguageID).subscribe(data => {
      this.specilaizationlist = data;
      this.specilaizationlist = this.specilaizationlist.filter(x => x.departmentID == this.departmentid);
    })
  }

  public GetDoctorType(LanguageID) {
    this.docservice.GetDoctorTypeMaster(LanguageID).subscribe(data => {
      this.doctortypelist = data;
    })
  }

  public GetSpecilizationID(even) {
    this.specilizationid = even.target.value;
  }

  public GetDoctorTypeID(even) {
    this.doctortypeid = even.target.value;
  }
  dummlist: any;
  public GetHospitalclinic(LanguageID) {
    debugger
    this.docservice.GetHospital_Clinic(LanguageID).subscribe(data => {
      debugger
      this.dummlist = data;
      debugger
      this.hospitallist = this.dummlist.filter(x => x.id != 612 && x.id != 613 && x.id != 614)

      debugger

      this.hospitadd = {
        singleSelection: true,
        idField: 'id',
        textField: 'hospital_ClinicName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        //  itemsShowLimit: 3,
        allowSearchFilter: true,
        searchPlaceholderText: this.search,
      };
    })
  }

  public GetHospitalClinicID(even) {
    this.hospitalclinicid = even.target.value;
  }

  public GetDegreeMaster(LanguageID) {
    debugger
    this.docservice.GetDegreeMaster(LanguageID).subscribe(data => {
      debugger
      this.degreemaster = data;
    })
  }
  public GetDegreeID(even) {
    this.degreeid = even.target.value;
  }



  public identityproofurl: any;
  showidentityphoto: any;


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
      let b = 'https://maroc.voiladoc.org' + a;
      this.showidentityphoto = b;
      if (this.languageid == 1) {
        Swal.fire('Photo added successfully.');
      }
      else {
        Swal.fire('Ajouté avec succès');
      }
      this.identityproof.length = 0
      debugger
    })

  }






  medicalproof = [];
  showmedicalproof: any;

  public onmecicalregproof(abcd) {
    debugger
    this.medicalproof.push(abcd.addedFiles[0]);
    this.uploadmedicalproof();
    abcd.length = 0;
  }



  public uploadmedicalproof() {
    this.docservice.DoctorPhotoUpload(this.medicalproof).subscribe(res => {
      debugger
      this.medicalregproof = res;
      let a = this.medicalregproof.slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showmedicalproof = b;
      if (this.languageid == 1) {
        Swal.fire('Photo added successfully.');
      }
      else {
        Swal.fire('Ajouté avec succès');
      }
      this.medicalproof.length = 0;
      debugger
    })

  }



  uploadresume = [];



  public OnUploadResume(abcd) {
    debugger
    this.uploadresume.push(abcd.addedFiles[0]);
    this.uploadresumess();
    abcd.length = 0;
  }

  public showressume: any;


  public uploadresumess() {
    this.docservice.DoctorPhotoUpload(this.uploadresume).subscribe(res => {
      debugger
      this.resumeurl = res;
      let a = this.resumeurl.slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showressume = b;
      if (this.languageid == 1) {
        Swal.fire('Photo added successfully.');
      }
      else {
        Swal.fire('Ajouté avec succès');
      }
      this.uploadresume.length = 0;

      debugger
    })

  }


  docphotos = [];

  public DoctorPhotoUpload(abcd) {
    debugger
    this.docphotos.push(abcd.addedFiles[0]);
    this.uploaddocprofilephoto();
    abcd.length = 0;
  }

  showdocphoto: any;


  public uploaddocprofilephoto() {
    debugger
    this.docservice.DoctorPhotoUpload(this.docphotos).subscribe(res => {
      debugger
      this.docphoto = res;
      let a = this.docphoto.slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showdocphoto = b;
      if (this.languageid == 1) {
        Swal.fire('Photo added successfully.');
      }
      else {
        Swal.fire('Ajouté avec succès');
      }
      this.docphotos.length = 0;
      debugger
    })

  }


  signatures = []



  public sinatureupload(abcd) {
    debugger
    this.signatures.push(abcd.addedFiles[0]);
    this.signatureupload();
    abcd.length = 0;
  }


  showsigphoto: any;

  public signatureupload() {
    this.docservice.DoctorPhotoUpload(this.signatures).subscribe(res => {
      debugger
      this.signaturephoto = res;
      let a = this.signaturephoto.slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showsigphoto = b;
      if (this.languageid == 1) {
        Swal.fire('Photo added successfully.');
      }
      else {
        Swal.fire('Ajouté avec succès');
      }
      this.signatures.length = 0;
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

  public GetTypeID(even) {
    debugger;
    this.cityid = even.target.value
  }
}
