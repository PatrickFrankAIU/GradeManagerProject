function addGrade(event) {
    event.preventDefault();
    const studentName= document.getElementById("studentName").value;
    const className = document.getElementById("className").value;
    const assignmentType = document.getElementById("assignmentType").value;
    const grade = parseFloat(document.getElementById("grade").value);

    if (!nameRegex.test(studentName) || !className.trim() || !assignmentType.trim() || isNaN(grade) || grade < 0 || grade > 100) {
        alert('Please enter valid values for all fields.');
        return;
    }

    gradeBook.push({ name: studentName, className: className, assignmentType: assignmentType, grade: grade });

    document.getElementById("gradeForm").reset();
}


//function that calculates average grade
function calculateAverageGrade() {
    if (gradeBook.length === 0) {
        return "There are no grades listed to calculate an average grade.";       //if no grades listed
    }

    let totalGrade = 0;
    gradeBook.forEach(student => {
        totalGrade += student.grade;
    });

    return totalGrade / gradeBook.length;
}


//add event listener for submit button
document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let firstName = document.getElementById('studentName').value;
    let grade = parseFloat(document.getElementById('grade').value);
    let assignmentType = document.getElementById("assignmentType").value;
    let className = document.getElementById("className").value;

    let nameRegex = /^[A-Za-z]+$/;        //regex to validate first name
    if (!nameRegex.test(firstName)) {
        document.getElementById('formErrors').innerHTML = '<li>Please enter a valid first name with only letters.</li>';
        return;
    } else {
        document.getElementById('formErrors').innerHTML = '';       //clear any previous error message
    }

    if (isNaN(grade) || grade < 0 || grade > 100) {
        document.getElementById('formErrors').innerHTML = '<li>Please enter a valid grade between 0 and 100.</li>';
        return;
    } else {
        document.getElementById('formErrors').innerHTML = '';        //again, clear any previous error message
    }

    addGrade(studentName, grade, assignmentType, className);
    displayResults();
});


//function to display results
function displayResults() {
    let html = '<h3>Students:</h3>';


    if (gradeBook.length === 0) {
        html += '<p>No grades listed yet.</p>';
    } else {
        gradeBook.forEach(student => {
            html += `<li>Name: ${student.studentName}/Grade: ${student.grade} on ${student.assignmentType} in ${student.className}</li>`;
        });
    }

    html += '<h3>Results:</h3>';
    const averageGrade = calculateAverageGrade();
    html += `<li>Average Grade: ${averageGrade}</li>`;

    document.getElementById('output').innerHTML = html;
}


//function to clear form
function clearForm() {
    document.getElementById('gradeForm').reset();
    gradeBook = [];      // clears array
    document.getElementById('output').innerHTML = ''; // clear output div
}


