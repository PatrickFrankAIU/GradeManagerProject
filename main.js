let gradebook = [];
const weights = {
    test: 0.45,
    quiz: 0.35,
    homework: 0.20
};

let gradeBook = [];

function addGrade(event) {
    const studentName= document.getElementById("studentName").value;
    const className = document.getElementById("className").value;
    const assignmentType = document.getElementById("assignmentType").value;
    const grade = parseFloat(document.getElementById("grade").value);


    let nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(studentName) || !className.trim() || !assignmentType.trim() || isNaN(grade) || grade < 0 || grade > 100) {
        alert('Please enter valid values for all fields.');
        return;
    }

    gradeBook.push({ studentName: studentName, className: className, assignmentType: assignmentType, grade: grade });
    gradeBook.sort((a, b) => a.grade - b.grade);

    document.getElementById("gradeForm").reset();
}


//function that calculates weighted average grade
function calculateWeightedAverageGrade() {
    if (gradeBook.length === 0) {
        return "There are no grades listed to calculate an average grade.";       //if no grades listed
    }

    let weightedTotal = 0;
    let totalWeight = 0;

    gradeBook.forEach(student => {
        switch (student.assignmentType) {
            case 'test':
                weightedTotal += student.grade * testWeight;
                totalWeight += testWeight;
                break;
            case 'quiz':
                weightedTotal += student.grade * quizWeight;
                totalWeight += quizWeight;
                break;
            case 'homework':
                weightedTotal += student.grade * homeworkWeight;
                totalWeight += homeworkWeight;
                break;
        }
    });

    let weightedAverageGrade = weightedTotal / totalWeight;
    displayResults(weightedAverageGrade);
}


//function that handles assignment type
function selectAssignmentType() {
    let assignmentType = document.getElementById('assignmentType').value;
    let testWeight;
    let quizWeight;
    let homeworkWeight;

    switch (assignmentType) {
        case 'test': 
            testWeight = 0.45;
            break;
        case 'quiz':
            quizWeight = 0.35;
            break;
        case 'homework': 
            homeworkWeight = 0.20;
            break;
        default:
            testWeight = 0.0;
            quizWeight = 0.0;
            homeworkWeight = 0.0;
            break;
    }

    calculateWeightedAverageGrade(testWeight, quizWeight, homeworkWeight);
}


//add event listener for submit button
document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let studentName = document.getElementById('studentName').value;
    let grade = parseFloat(document.getElementById('grade').value);
    let assignmentType = document.getElementById("assignmentType").value;
    let className = document.getElementById("className").value;

    let nameRegex = /^[A-Za-z]+$/;        //regex to validate first name
    if (!nameRegex.test(studentName)) {
        document.getElementById('formErrors').innerHTML = '<li>Please enter a valid name with only letters.</li>';
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
            html += `Name: ${student.name}<br> Grade: ${student.grade}<br> Class: ${student.className}<br> Assignment: ${student.assignmentType}<br>`;
        });
    }

    html += '<h3>Results:</h3>';
    const averageGrade = calculateWeightedAverageGrade();
    html += `<li>Weighted Average Grade: ${weightedAverageGrade.toFixed(2)}</li>`;

    document.getElementById('output').innerHTML = html;
}


//function to clear form
function clearForm() {
    document.getElementById('gradeForm').reset();
    gradeBook = [];      // clears array
    document.getElementById('output').innerHTML = ''; // clear output div
}


