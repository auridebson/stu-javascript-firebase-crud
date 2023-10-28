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
const containerCard = document.querySelector(".container-card-aluno")

let nome, cpf, email, dataNascimento, academia, graduacao, sexo, telefone, endereco

// Carrega dados db
function  dadosDb() {
  nome = document.querySelector("#nome").value
  cpf = document.querySelector("#cpf").value
  email = document.querySelector("#email").value
  dataNascimento = document.querySelector("#dataNascimento").value
  academia = document.querySelector("#academia").value
  graduacao = document.querySelector("#graduacao").value
  sexo = document.querySelector("#sexo").value
  telefone = document.querySelector("#telefone").value
  endereco = document.querySelector("#endereco").value
}

// testando o acesso e coleta de dados no banco de dados dbKravmaga
function carregaDados() {
  dadosDb()
  firebase.database().ref("dbKravmaga/"+cpf).on("value", function(dado) {
    nome = dado.val().nome
    cpf = dado.val().cpf
    email = dado.val().email
    dataNascimento = dado.val().dataNascimento
    academia = dado.val().academia
    graduacao = dado.val().graduacao
    sexo = dado.val().sexo
    telefone = dado.val().telefone
    endereco = dado.val().endereco
    // console.log(nome, cpf, email, dataNascimento, academia, graduacao, sexo, telefone, endereco)

    // Carrega os campos da página com os dados do banco de dados
    document.querySelector("#nome").value = nome
    document.querySelector("#email").value = email
    document.querySelector("#endereco").value = endereco
    document.querySelector("#dataNascimento").value = dataNascimento
    document.querySelector("#academia").value = academia
    document.querySelector("#graduacao").value = graduacao
    document.querySelector("#sexo").value = sexo
    document.querySelector("#telefone").value = telefone

      firebase.database().ref("dbKravmaga/").on("value", function(idsAlunos) {
        let Alunos = idsAlunos.val()

        for (let idCpf in Alunos) {
          console.log(" - - - - - - - - - - - ")
          console.log(Alunos[idCpf].nome)
          console.log(" - - - - - - - - - - - ")
          containerCard.innerHTML += `<p>&nbsp</p><p>CPF: ${idCpf}</p>`
          firebase.database().ref("dbKravmaga/"+idCpf).on("value", function(dadosAluno) {
            let dadosCpf = dadosAluno.val()

            for (i in dadosCpf) {
              containerCard.innerHTML += "<ul>"
              containerCard.innerHTML += `<li> ${i}:${dadosCpf[i]}</li>`
              containerCard.innerHTML += "</ul>"
              console.log(i +": "+ dadosCpf[i])
            }
          })
          
        }
          
        })

    })
  }




btnTeste.addEventListener("click", carregaDados)