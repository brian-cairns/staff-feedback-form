let submit = document.getElementById('submit')
console.log(submit)
const formName = 'staffFeedbackForm'
console.log('form: ' + formName)
let newForm = {}
let submitted = 0
let additional = 0

let comment1 = document.getElementById('comment1')
comment1.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment1 = e.target.value;
  console.log(newForm.comment1);
})
  
let comment2 = document.getElementById('comment2')
comment2.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment2 = e.target.value;
  console.log(newForm.comment2);
})
  
let comment3 = document.getElementById('comment3')
comment3.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment3 = e.target.value;
  console.log(newForm.comment3);
})
  
let comment4 = document.getElementById('comment4')
comment4.addEventListener('change', (e) => {
	console.log('changed')
	newForm.comment4 = e.target.value;
  console.log(newForm.comment4);
  })
  
async function question1() { 
    let answer = new Promise((res) => {
        var response
        if (document.getElementById('q1-checkbox-2').checked) {response = 'very useful'}
        if (document.getElementById('q1-checkbox-2').checked) { response = 'useful' }
        if (document.getElementById('q1-checkbox-3').checked) { response = 'somewhat useful' }
        if (document.getElementById('q1-checkbox-4').checked) { response = 'neutral' }
        if (document.getElementById('q1-checkbox-5').checked) { response = 'not useful' }
        res(response)
    })
    return answer
}
 
async function question2() { 
    let answer = new Promise((res) => {
        var response
        if(document.getElementById('q2-checkbox-1').checked) {response = 'very appropriate'}
        if (document.getElementById('q2-checkbox-2').checked) { response = 'appropriate' }
        if (document.getElementById('q2-checkbox-3').checked) { response = 'somewhat appropriate' }
        if (document.getElementById('q2-checkbox-4').checked) { response = 'neutral' }
        if (document.getElementById('q2-checkbox-5').checked) { response = 'not appropriate' }
        res(response)
    })
    return answer
}

async function question3() { 
    let answer = new Promise((res) => {
        var response
        if(document.getElementById('q3-checkbox-1').checked) {response = 'many useful strategies were provided'}
        if (document.getElementById('q3-checkbox-2').checked) { response = 'some useful strategies were provided' }
        if (document.getElementById('q3-checkbox-3').checked) { response = 'useful enough' }
        if (document.getElementById('q3-checkbox-4').checked) { response = 'neutral' }
        if (document.getElementById('q3-checkbox-5').checked) { response = 'no useful strategies' }
        res(response)
    })
    return answer
}
async function question4() { 
    let answer = new Promise((res) => {
        var response
        if(document.getElementById('q4-checkbox-1').checked) {response = 'loved it'}
        if (document.getElementById('q4-checkbox-2').checked) { response = 'needed a few more activities' }
        if (document.getElementById('q4-checkbox-3').checked) { response = 'neutral' }
        if (document.getElementById('q4-checkbox-4').checked) { response = 'sometimes it was dry' }
        if (document.getElementById('q4-checkbox-5').checked) { response = 'I was bored' }
        res(response)
    })
    return answer
}
async function question5() { 
    let answer = new Promise((res) => {
        var response
        if(document.getElementById('q5-checkbox-1').checked) {response = 'nailed it'}
        if (document.getElementById('q5-checkbox-2').checked) { response = 'it was enough time' }
        if (document.getElementById('q5-checkbox-3').checked) { response = 'neutral' }
        if (document.getElementById('q5-checkbox-4').checked) { response = 'a bit more time was needed' }
        if (document.getElementById('q5-checkbox-5').checked) { response = 'Nah' }
        res(response)
    })
    return answer
}

async function question6() { 
    let answer = new Promise((res) => {
        var response
        if (document.getElementById('q6-checkbox-1').checked) {response = '#letsgetit'}
        if (document.getElementById('q6-checkbox-2').checked) { response = 'I will be ok' }
        if (document.getElementById('q6-checkbox-3').checked) { response = 'I have questions' }
        if (document.getElementById('q6-checkbox-4').checked) { response = 'I need some help' }
        if (document.getElementById('q6-checkbox-5').checked) { response = 'I am not ready' }
        res(response)
    })
    return answer
}

async function getAnswers() {
    let answer1 = await question1();
    let answer2 = await question2();
    let answer3 = await question3();
    let answer4 = await question4();
    let answer5 = await question5();
    let answer6 = await question6();
    let answers = [answer1, answer2, answer3, answer4, answer5, answer6]
    return answers
}

document.getElementById('submit').addEventListener("click", async (event) => {
    newForm.answers = await getAnswers() 
    console.log(newForm)
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
    .then(response => response.json())
    .then(data => respond(data)) 
    .catch((err) => showError(err))
}

function respond(data) {
  let id = data.key
  if (id) {
    showSuccess(id) 
  } else {
    showError(data.error)
  }
}

function showSuccess(id) {
  document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
  const message = `A staff feedback form has just been submitted`  
  const toSend = {
    name: 'admin',
    notice: message,
    type: 'basic'
  }
  notify(toSend);
}


function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}
