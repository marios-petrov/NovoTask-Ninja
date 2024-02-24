// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the select element and the list where courses will be displayed
    const aocSelect = document.getElementById('aoc-select');
    const aocList = document.getElementById('aoc-list');

    // Define a list of courses categorized by fields
    const aocCourses = {
        'math': ['Calculus I', 'Calculus II', 'Linear Algebra', 'Abstract Algebra'],
        'computer-science': ['Introduction to Computing', 'Data Structures', 'Algorithms', 'Operating Systems'],
        'chemistry': ['General Chemistry', 'Organic Chemistry', 'Biochemistry', 'Physical Chemistry']
    };

    // Listen for changes to the select element and update the course list accordingly
    aocSelect.addEventListener('change', function() {
        // Get the selected area of concentration
        const selectedAOC = this.value;
        // Retrieve the courses for the selected area, defaulting to an empty array if none found
        const courses = aocCourses[selectedAOC] || [];
        // Clear the existing list of courses
        aocList.innerHTML = '';

        // Iterate over the courses array and create a list item for each course
        courses.forEach(function(course) {
            const li = document.createElement('li'); // Create a new list item
            li.textContent = course; // Set the text of the list item to the course name
            aocList.appendChild(li); // Append the list item to the list
        });
    });
});
