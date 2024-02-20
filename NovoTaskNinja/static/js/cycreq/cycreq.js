document.addEventListener('DOMContentLoaded', function() {
    const aocSelect = document.getElementById('aoc-select');
    const aocList = document.getElementById('aoc-list');

    const aocCourses = {
        'math': ['Calculus I', 'Calculus II', 'Linear Algebra', 'Abstract Algebra'],
        'computer-science': ['Introduction to Computing', 'Data Structures', 'Algorithms', 'Operating Systems'],
        'chemistry': ['General Chemistry', 'Organic Chemistry', 'Biochemistry', 'Physical Chemistry']
    };

    aocSelect.addEventListener('change', function() {
        const selectedAOC = this.value;
        const courses = aocCourses[selectedAOC] || [];
        aocList.innerHTML = ''; // Clear existing courses

        courses.forEach(function(course) {
            const li = document.createElement('li');
            li.textContent = course;
            aocList.appendChild(li);
        });
    });
});
