//JavaScript runs only after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {



    tinymce.init({
        selector: '#mytextarea',
        plugins: 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        toolbar_mode: 'floating',
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image'
    });





//empty array to store grade entries
    let gradeBook = [];     

//function to add new grade entries and sort by grades
function addGrade(studentName, className, assignmentType, grade, comments) {

    gradeBook.push({ studentName, className, assignmentType, grade, comments});
    gradeBook.sort((a, b) => a.grade - b.grade);

    document.getElementById("gradeForm").reset();
    document.getElementById("studentName").focus();
}


//add event listener for form submission  
document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    //retrieve values
    let studentName = document.getElementById('studentName').value;
    let grade = parseFloat(document.getElementById('grade').value);
    let assignmentType = document.getElementById("assignmentType").value;
    let className = document.getElementById("className").value;
    let comments = tinymce.get('mytextarea').getContent();

    //regex to validate first name
    let nameRegex = /^[A-Za-z]+$/;        
    if (!nameRegex.test(studentName)) {
        document.getElementById('formErrors').innerHTML = '<li>Please enter a valid name with only letters.</li>';
        return;
    } else {
        document.getElementById('formErrors').innerHTML = '';       //clear any previous error message
    }
    //ensures grade is a # between 0 - 100.
    if (isNaN(grade) || grade < 0 || grade > 100) {
        document.getElementById('formErrors').innerHTML = '<li>Please enter a valid grade between 0 and 100.</li>';
        return;
    } else {
        document.getElementById('formErrors').innerHTML = '';        //again, clear any previous error message
    }

    //calls addGrade to add new grade to gradeBook; calls displayResults to update displayed list of grades.
    addGrade(studentName, className, assignmentType, grade, comments);
    displayResults();
});


//function to display results and place them into a table
function displayResults() {
    let html = '<h3></h3>';         //code breaks if removed 

    if (gradeBook.length === 0) {
        html += '<p>No grades listed yet.</p>';
    } else {
        html += '<table id="gradeTable">';
            html += '<thead><tr><th>Name</th><th>Class</th><th>Assignment</th><th>Grade</th><th>Comments</th></tr></thead>';
            html += '<tbody>';
            gradeBook.forEach(student => {
                html += `<tr><td>${student.studentName}</td><td>${student.className}</td><td>${student.assignmentType}</td><td>${student.grade}</td><td>${student.comments}</td></tr>`;

            });
            html +='<thead><tr><th>Average</th>   <th></th>   <th></th>   <th id="averageGradeValue"></th></tr></thead>'
            html += '</tbody></table>';
    }

    document.getElementById('output').innerHTML = html;
    calculateAverageGrade();
}

//function to calculate average grade 
function calculateAverageGrade() {
    let total = gradeBook.reduce((sum, student) => sum + student.grade, 0);
    let average = total / gradeBook.length;
    document.getElementById('averageGradeValue').innerText = average.toFixed(2);
}

});

    //function to clear form and reset gradeBook array
    function clearForm() {
        document.getElementById('gradeForm').reset();
        tinymce.get('mytextarea').setContent('');
        document.getElementById("studentName").focus();
    }

    window.resetGrades = function() {
        document.getElementById('gradeForm').reset();
        gradeBook = [];
        document.getElementById('output').innerHTML = '';
        document.getElementById("studentName").focus();
    }
