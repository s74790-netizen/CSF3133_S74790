// Error 1 (grade.html, Line 9): onsubmit="checkMark()" missing "return", causing page reload and losing result.
// Error 2 (grade.html, Line 17): onclick="showtable()" casing mismatch with function showTable().
// Error 3 (grade.html, Line 19): <script src="grades.js"> has wrong filename; should be "grade.js".
// Error 4 (grade.js, Line 5): if (name = "") uses assignment "=" instead of comparison "=== ".
// Error 5 (grade.js, Line 9): if (isNan(mark)) misspelled; should be isNaN(mark).
// Error 6 (grade.js, Line 14): if (mark < 0 && mark > 100) uses && instead of ||.
// Error 7 (grade.js, Line 30): style.colour is invalid; should be style.color.
// Error 8 (grade.js, Line 38): for (let i = 1; ...) starts at 1 instead of 0, omitting grade "A".
// Error 9 (grade.js, Line 42): .innerHtml is invalid casing; should be .innerHTML.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Fixed Line 5: Strict equality check for empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extension 5: Check for an empty mark field
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Fixed Line 9: Correct isNaN() function name
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    let mark = parseInt(markInput, 10);

    // Fixed Line 14: Logical OR (||) so values < 0 or > 100 are caught
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;

    // Fixed Line 30 & Extension 6: Set result color based on grade
    if (grade === "A" || grade === "B") {
        resultEl.style.color = "green";
    } else if (grade === "C") {
        resultEl.style.color = "orange";
    } else {
        resultEl.style.color = "red";
    }

    // Extension 8: Display date and time when the grade was checked below the result
    let now = new Date();
    document.getElementById("timestamp").innerHTML = "Checked on: " + now.toString();

    // Prevent default form submission so result stays visible on the page
    return false;
}

// Extension 7: Populate the mark field with a random integer from 0 to 100
function setRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Fixed Line 34: CamelCase name matches grade.html
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Extension 9: Include table header row (<thead>) for styling
    let tableHTML = "<table><thead><tr><th>Grade</th><th>Mark range</th></tr></thead><tbody>";

    // Fixed Line 38: Start loop at index 0 so grade "A" is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</tbody></table>";

    // Fixed Line 42: Use innerHTML (capital H)
    document.getElementById("tableContainer").innerHTML = tableHTML;
}