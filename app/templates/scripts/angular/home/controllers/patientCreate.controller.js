class PatientCreateController {
  /* @ngInject */
  constructor(openmrsRest, $http, openmrsContext) {
    var vm = this;
    vm.loading = true;
    vm.error = true;
    vm.statusPatient = true;
    vm.errorPatient = true;
    vm.loadingPatient = true;
    vm.loadingIdentifier = true;
    vm.isHiddenPerson = false;
    vm.isHiddenPatient = true;
    vm.addressHidden = true;
    vm.blankFields = true;
    vm.personData = {
      "gender": "",
      "age": "",
      "names": [
        {
          "givenName":"",
          "middleName": "",
          "familyName":""
        }],
      "addresses": [
        {
          "address1": "",
          "address2": "",
          "cityVillage": "",
          "stateProvince": "",
          "country": ""
        }
      ]
    };

    vm.patientData = {

      "identifiers": [
        {
          "identifier":"",
          "identifierType":"05a29f94-c0ed-11e2-94be-8c13b969e334",
          "location":"aff27d58-a15c-49a6-9beb-d30dcfc0c66e",
          "preferred":true
        } ],
      "person": ""
    };

    vm.locations = [
      {name : "Amani Hospital", uuid : "aff27d58-a15c-49a6-9beb-d30dcfc0c66e"},
      {name : "Inpatient Ward", uuid : "b1a8b05e-3542-4037-bbd3-998ee9c40574"},
      {name : "Isolation Ward", uuid : "2131aff8-2e2a-480a-b7ab-4ac53250262b"},
      {name : "Laboratory", uuid : "7fdfa2cb-bc95-405a-88c6-32b7673c0453"},
      {name : "Outpatient Clinic", uuid : "58c57d25-8d39-41ab-8422-108a0c277d98"},
      {name : "Pharmacy", uuid : "7f65d926-57d6-4402-ae10-a5b3bcbf7986"},
      {name : "Registration Desk", uuid : "6351fcf4-e311-4a19-90f9-35667d99a8af"},
      {name : "Unknown Location", uuid : "8d6c993e-c2cc-11de-8d13-0010c6dffd0f"}
    ];

    vm.oncreatePerson = () => {
      vm.error = true;
      vm.loading = false;
      if(vm.personData.names[0].givenName.length > 0 && vm.personData.names[0].familyName.length > 0 && vm.personData.gender.length > 0) {
        openmrsRest.create('person', vm.personData).then(function (response) {
          console.log(response.status);
          vm.uuidPerson = response.uuid;
          vm.patientData.person = vm.uuidPerson;
          vm.loading = true;
          vm.isHiddenPerson = true;
          vm.isHiddenPatient = false;
        });
      }
      else {
        vm.loading = true;
        vm.error = false;
      }
    };

    vm.addressFields = () => {
      if(vm.addressHidden) {
        vm.addressHidden = false;
      }
      else {
        vm.addressHidden = true;
      }
    };

    vm.generateIdentifier = () => {
      vm.platform = openmrsContext.getConfig().href;
      vm.loadingIdentifier = false;
      $http.get('http://localhost:8081'+ vm.platform +'/module/idgen/generateIdentifier.form?source=1').
      then(function successCallback(response) {
        vm.generate_identifier = response.data;
        vm.patientData.identifiers[0].identifier = vm.generate_identifier.identifiers[0];
        vm.loadingIdentifier = true;
      }, function errorCallback(response) {
        console.log('An Error occurred with status : ' + response.status);
        vm.loadingIdentifier = true;
      });
    };

    vm.back = () => {
      vm.isHiddenPatient = true;
      vm.isHiddenPerson = false;
    };

    vm.newPatient = () => {
      vm.personData.names[0].givenName = "";
      vm.personData.names[0].middleName = "";
      vm.personData.names[0].familyName = "";
      vm.personData.gender = "";
      vm.personData.age = "";
      vm.personData.addresses[0].address1 = "";
      vm.personData.addresses[0].address2 = "";
      vm.personData.addresses[0].cityVillage = "";
      vm.personData.addresses[0].stateProvince = "";
      vm.personData.addresses[0].country = "";
      vm.isHiddenPatient = true;
      vm.isHiddenPerson = false;
    };

    vm.oncreatePatient = () => {
      vm.statusPatient = true;
      vm.errorPatient = true;
      vm.blankFields = true;
      vm.loadingPatient = false;
      if(vm.patientData.person.length > 0 && vm.patientData.identifiers[0].identifier.length > 0 &&
        vm.patientData.identifiers[0].identifierType.length > 0 && vm.patientData.identifiers[0].location.length > 0) {
        openmrsRest.create('patient', vm.patientData).then(function successCallback(response) {
          console.log(response.status);
          vm.displayPatient = response.display;
          vm.uuidPatient = response.uuid;
          vm.agePatient = response.person.age;
          vm.genderPatient = response.person.gender;
          vm.loadingPatient = true;
          vm.statusPatient = false;
        }, function errorCallback(response) {
          vm.loadingPatient = true;
          vm.errorPatient = false;
        });
      }
      else {
        vm.loadingPatient = true;
        vm.blankFields = false;
      }
    };

    vm.onSelectLocation = () => {
      if (vm.selectedLocation == vm.locations[0].name) {
        vm.patientData.identifiers[0].location = vm.locations[0].uuid;
      }
      else if (vm.selectedLocation == vm.locations[1].name) {
        vm.patientData.identifiers[0].location = vm.locations[1].uuid;
      }
      else if (vm.selectedLocation == vm.locations[2].name) {
        vm.patientData.identifiers[0].location = vm.locations[2].uuid;
      }
      else if (vm.selectedLocation == vm.locations[3].name) {
        vm.patientData.identifiers[0].location = vm.locations[3].uuid;
      }
      else if (vm.selectedLocation == vm.locations[4].name) {
        vm.patientData.identifiers[0].location = vm.locations[4].uuid;
      }
      else if (vm.selectedLocation == vm.locations[5].name) {
        vm.patientData.identifiers[0].location = vm.locations[5].uuid;
      }
      else if (vm.selectedLocation == vm.locations[6].name) {
        vm.patientData.identifiers[0].location = vm.locations[6].uuid;
      }
      else if (vm.selectedLocation == vm.locations[7].name) {
        vm.patientData.identifiers[0].location = vm.locations[7].uuid;
      }
    }
  }
}

export default PatientCreateController;
