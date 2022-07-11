let submit = document.getElementById('submit')
console.log(submit)
const formName = 'staffFeedbackForm'
console.log('form: ' + formName)
let newForm = {}
let submitted = 0
let additional = 0

let comment1 = document.querySelector('input#comment1')
comment1.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment1 = e.target.value;
  console.log(newForm.comment1);
})
  
let comment2 = document.querySelector('input#comment2')
comment2.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment2 = e.target.value;
  console.log(newForm.comment2);
})
  
let comment3 = document.querySelector('input#comment3')
comment3.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment3 = e.target.value;
  console.log(newForm.comment3);
})
  
let comment4 = document.querySelector('input#comment4')
comment4.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment4 = e.target.value;
  console.log(newForm.comment4);
  })
  
const question1 = new Promise ((res) => {
    var response
    let answers = ['very useful', 'useful', 'somewhat useful', 'neutral', 'not useful']
    for (let i = 0; i < 5; i++) {
        if (document.getElementById(`q1-checkbox-${i}`).isChecked()) {
            i = 5;
            response = answers[i]
        }
    }
    res(response)
})

const question2 = new Promise ((res) => {
    var response
    let answers = ['very appropriate', 'appropriate', 'somewhat appropriate', 'useful on some level', 'neutral', 'not appropriate']
    for (let i = 0; i < 6; i++) {
        if (document.getElementById(`q2-checkbox-${i}`).isChecked()) {
            i = 5;
            response = answers[i]
        }
    }
    res(response)
})

const question3 = new Promise ((res) => {
    var response
    let answers = ['many useful strategies were provided', 'some useful strategies were provided', 'useful enough', 'neutral', 'no useful strategies']
    for (let i = 0; i < 5; i++) {
        if (document.getElementById(`q3-checkbox-${i}`).isChecked()) {
            i = 5;
            response = answers[i]
        }
    }
    res(response)
})

const question4 = new Promise ((res) => {
    var response
    let answers = ['loved it', 'needed a few more activities', 'neutral', 'sometimes it was dry', 'I was bored']
    for (let i = 0; i < 5; i++) {
        if (document.getElementById(`q4-checkbox-${i}`).isChecked()) {
            i = 5;
            response = answers[i]
        }
    }
    res(response)
})

const question5 = new Promise ((res) => {
    var response
    let answers = ['nailed it', 'it was enough time', 'a bit more time was needed', 'neutral', 'Nah']
    for (let i = 0; i < 5; i++) {
        if (document.getElementById(`q5-checkbox-${i}`).isChecked()) {
            i = 5;
            response = answers[i]
        }
    }
    resolve(response)
})

const question6 = new Promise ((res) => {
    var response
    let answers = ['#letsgetit', 'I will be ok', 'I have questions', 'I need some help', 'I am not ready']
    for (let i = 0; i < 5; i++) {
        if (document.getElementById(`q6-checkbox-${i}`).isChecked()) {
            i = 5;
            response = answers[i]
        }
    }
    resolve(response)
})

async function getAnswers() {
    answers = Promise.all(question1, question2, question3, question4, question5, question6)
        .then((res) => { return results })
        .catch(console.error)
    return answers
}

document.getElementById('submit').addEventListener("click", async (event) => {
    newForm.answers = await getAnswers() 
    submitForm(newForm, formName)
})

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}