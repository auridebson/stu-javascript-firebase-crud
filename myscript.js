let rollV, nameV, genderV, addressV;

function readFom() {
  rollV = document.getElementById("roll").value;
  nameV = document.getElementById("name").value;
  genderV = document.getElementById("gender").value;
  addressV = document.getElementById("address").value;
  console.log(rollV, nameV, addressV, genderV);
}

document.getElementById("insert").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + rollV)
    .set({
      rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
    });
  alert("Data Inserted");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};





document.getElementById("read").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + rollV)
    .on("value", function (snap) {
      document.getElementById("roll").value = snap.val().rollNo;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("gender").value = snap.val().gender;
      document.getElementById("address").value = snap.val().address;
    });
};

document.getElementById("update").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + rollV)
    .update({
      //   rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
    });
  alert("Data Update");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};
document.getElementById("delete").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("student/" + rollV)
    .remove();
  alert("Data Deleted");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
};


// ---------------------------------------------------

const btnTeste = document.querySelector("#teste")
let nome, cpf, email, dataNascimento, academia, graduacao, sexo, telefone

// Carrega dados db
const  dadosDb = () => {
  nome = document.querySelector("#nome").value
  cpf = document.querySelector("#cpf").value
  email = document.querySelector("#email").value
  dataNascimento = document.querySelector("#dataNascimento").value
  academia = document.querySelector("#academia").value
  graduacao = document.querySelector("#graduacao").value
  sexo = document.querySelector("#sexo").value
  telefone = document.querySelector("#telefone").value
  alert("Dados Carregados")
}

// testando o acesso e coleta de dados no banco de dados dbKravmaga
function carregaDados() {
  dadosDb()
  firebase.database().ref("dbKravmaga/"+rollV).on("value", function(dados) {
    nameV = dados.val().nome
    genderV = dados.val().sexo
    alert(nameV + " - " + genderV)
  })
}


btnTeste.addEventListener("click", dadosDb)