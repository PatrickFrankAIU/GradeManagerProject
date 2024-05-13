let gradeBook = [];

function addGrade(name, grade) {
    studentGrades.push([name, grade]);
}

gradeBook.sort((a, b) => a.grade - b.grade);
console.log(gradeBook);
