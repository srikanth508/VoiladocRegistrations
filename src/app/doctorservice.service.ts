import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {

  constructor(private http: HttpClient) { }

  private host = "https://voiladoc.org/VoiladocRegistrationsWebApi";

  // private host = "http://localhost:4199/";

  // private host1 = "https://maroc.voiladoc.org/VoilaDocWebAPI";

  private host1 = "https://maroc.voiladoc.org/MarocAPI";
  private url: string = '';

  public GetLanguageMaster() {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetLanguageMaster');
  }

  public InsertHospitalRegistration(data) {
    this.url = this.host + '/Master/InsertHospitalRegistration';
    return this.http.post(this.url, data)
  }

  public InsertDoctorRegistration(data) {
    this.url = this.host + '/Master/InsertDoctorRegistration';
    return this.http.post(this.url, data)
  }

  public InsertMidwifeRegistration(data) {
    this.url = this.host + '/Master/InsertMidwifeRegistration';
    return this.http.post(this.url, data)
  }
  public InsertNurseRegistration(data) {
    this.url = this.host + '/Master/InsertNurseRegistration';
    return this.http.post(this.url, data)
  }

  public InsertPhysiotherapistRegistration(data) {
    this.url = this.host + '/Master/InsertPhysiotherapistRegistration';
    return this.http.post(this.url, data)
  }

  public GetVoiladocRegistrationEmailsByUnameAndPwd(uname, pwd) {
    debugger
    return this.http.get<any[]>(this.host + '/Master/GetVoiladocRegistrationEmailsByUnameAndPwd?UserName=' + uname + '&Password=' + pwd);
  }

  public GetDepartmentMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host1 + '/ServiceMaster/GetDepartmentMasterByLanguageID?LanguageID=' + lid);
  }

  public InsertPharmacy_Registration(data) {
    this.url = this.host + '/Master/InsertPharmacy_Registration';
    return this.http.post(this.url, data)
  }

  public InsertDiagnosticcenter_Registration(data) {
    this.url = this.host + '/Master/InsertDiagnosticcenter_Registration';
    return this.http.post(this.url, data)
  }

  public UpdateVoiladocRegistrationEmails(id) {
    debugger
    return this.http.get<any[]>(this.host + '/Master/UpdateVoiladocRegistrationEmails?ID=' + id);
  }
  public GetCountryMasterByLanguageID(lid) {

    return this.http.get<any[]>(this.host1 + '/ServiceMaster/GetCountryMasterByLanguageID?LanguageID=' + lid);
  }

  public GetAreaMasterByCityIDAndLanguageID(did, lid) {

    return this.http.get<any[]>(this.host1 + '/ServiceMaster/GetAreaMasterByCityIDAndLanguageID?CityID=' + did + '&LanguageID=' + lid);
  }
  public GetCityMasterBYIDandLanguageID(did, lid) {

    return this.http.get<any[]>(this.host1 + '/ServiceMaster/GetCityMasterBYIDandLanguageID?CountryID=' + did + '&LanguageID=' + lid);
  }

  public NurseIdentityProof(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Master/NurseIdentityProof/', formdata);
  }


  public UploadNursePhoto(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host + '/Master/UploadNursePhoto/', formdata);
  }

  public UploadHospitalImages(files) {
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host1 + '/Master/UploadHospitalImages/', formdata);
  }
  public GetSpecilaizationMaster(lid) {

    return this.http.get<any[]>(this.host1 + '/ServiceMaster/GetSpecilaizationMasterByLanguageID?LanguageID=' + lid);
  }

  public GetDoctorTypeMaster(lid) {

    return this.http.get<any[]>(this.host1 + '/ServiceMaster/GetDoctorTypeMasterByLanguageID?LanguageID=' + lid);
  }

  public GetHospital_ClinicDetailsForAdminByLanguageID(did, lid) {

    return this.http.get<any[]>(this.host + '/ServiceMaster/GetHospital_ClinicDetailsForAdminByLanguageID?Hospital_ClinicID=' + did + '&LanguageID=' + lid);
  }

  public GetHospital_Clinic(did) {

    return this.http.get<any[]>(this.host1 + '/Hospital/GetHospital_ClinicForAdminByAdmin?LanguageID=' + did);
  }

  public GetDegreeMaster(lid) {

    return this.http.get<any[]>(this.host1 + '/ServiceMaster/GetDegreeMasterBylanguageID?LanguageID=' + lid);
  }

  public DoctorMedicalProof(files) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host1 + '/Doctor/MedicalProofUpload/', formdata);
  }

  public DoctorPhotoUpload(files) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.host1 + '/Doctor/PhotoUpload/', formdata);
  }



  //labels

  public GetAdmin_Doctorregistration_LabelsByLanguageID(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_Doctorregistration_LabelsByLanguageID?LanguageID=' + lid);
  }

  public GetAdmin_HospitalClinicRegistration_Lables(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_HospitalClinicRegistration_Lables?LanguageID=' + lid);
  }

  public GetAdmin_NurseRegistration_labelByLanguageID(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_NurseRegistration_labelByLanguageID?LanguageID=' + lid);
  }
  public GetAdmin_PhysiotherapistRegistration_Label(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_PhysiotherapistRegistration_Label?LanguageID=' + lid);
  }

  public GetAdmin_MidWifeRegistration_LabelByLanguageID(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_MidWifeRegistration_LabelByLanguageID?LanguageID=' + lid);
  }

  public GetAdmin_PharmacyRegistration_LabelByLanguageID(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_PharmacyRegistration_LabelByLanguageID?LanguageID=' + lid);
  }

  public GetAdmin_DiagnosticRegistration_LabelBYLanguageID(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_DiagnosticRegistration_LabelBYLanguageID?LanguageID=' + lid);
  }

  public GetAdmin_LoginPage_Labels(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_LoginPage_Labels?LanguageID=' + lid);
  }

  public Getloginlabel(lid) {

    return this.http.get<any[]>(this.host1 + '/LanguageMaster/GetAdmin_RegisterLogins_Label?LanguageID=' + lid);
  }

  public Authenicate(data) {
    this.url = this.host1 + '/Doctor/Authenicate';
    return this.http.post(this.url, data)
  }

  public sendemail(data) {
    this.url = this.host1 + '/Doctor/sendemail';
    return this.http.post(this.url, data)
  }

  public InsertNotifications(data) {
    this.url = this.host + '/Master/InsertNotifications';
    return this.http.post(this.url, data)
  }
}
