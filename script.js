const form = document.getElementById("marks-form");
const resultSection = document.getElementById("result");
const errorMessage = document.getElementById("error-message");

const subjectInputs = [
  document.getElementById("subject-1"),
  document.getElementById("subject-2"),
  document.getElementById("subject-3"),
  document.getElementById("subject-4"),
  document.getElementById("subject-5")
];

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 35) return "D";
  return "F";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const studentName = document.getElementById("student-name").value.trim();

  if (!studentName) {
    errorMessage.textContent = "Please enter the student's name.";
    document.getElementById("student-name").focus();
    resultSection.hidden = true;
    return;
  }

  const marks = [];

  for (const input of subjectInputs) {
    const rawValue = input.value.trim();
    const mark = Number(rawValue);

    if (rawValue === "" || !Number.isFinite(mark) || mark < 0 || mark > 100 || !Number.isInteger(mark)) {
      errorMessage.textContent = "Enter a whole-number mark from 0 to 100 for every subject.";
      input.focus();
      resultSection.hidden = true;
      return;
    }

    marks.push(mark);
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = (total / 500) * 100;
  const passedEverySubject = marks.every((mark) => mark >= 35);
  const grade = passedEverySubject ? getGrade(percentage) : "F";

  document.getElementById("result-student").textContent = `Student: ${studentName}`;
  document.getElementById("total-marks").textContent = `${total} / 500`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = grade;

  const statusElement = document.getElementById("status");
  statusElement.textContent = passedEverySubject ? "PASS" : "FAIL";
  statusElement.classList.toggle("pass", passedEverySubject);
  statusElement.classList.toggle("fail", !passedEverySubject);

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

form.addEventListener("reset", () => {
  errorMessage.textContent = "";
  resultSection.hidden = true;

  const statusElement = document.getElementById("status");
  statusElement.classList.remove("pass", "fail");
});
