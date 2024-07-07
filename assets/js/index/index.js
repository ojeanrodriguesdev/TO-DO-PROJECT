document.addEventListener('DOMContentLoaded', function() {
    const projects = [
      {
        title: "#1 CRUD / To-Do List",
        description: "One <b>To-Do List</b> with the intention of being able to create a new task, read, edit and delete it, A simple <b>To-Do List</b>.",
        link: "to-do.html"
      },
      {
        title: "#2 CRUD / Fiscal Notes",
        description: "<b>Fiscal Notes</b>, a system for registering and managing purchase and sales invoices will have the functionality to add invoices with information about the product, value, date and supplier, also view all registered invoices, update details of existing invoices and remove invoices from the system.",
        link: "fiscal-notes.html"
      },
      {
        title: "#3 CRUD / Movie Library",
        description: "<b>Movie library</b> is an example that creates a library management system, we can add new movies with title, director, year and synopsis, display a list of movies in grid format, when clicking on a movie, a details screen is displayed. Shown with all the film's information, on the details screen it is possible to edit or delete the film, all data is persisted in the browser's localStorage.",
        link: "movie-library.html"
      }
    ];
  
    const projectsSection = document.getElementById('projects-section');
  
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card hidden';
      card.innerHTML = `
        <a href="${project.link}" class="a-section-1">
          <h2 class="project-title">${project.title}</h2>
        </a>
        <p class="project-description">${project.description}</p>
      `;
      projectsSection.appendChild(card);

      setTimeout(() => {
        card.classList.remove('hidden');
        card.classList.add('fade-in');
      }, index * 200);
    });

    projectsSection.addEventListener('mouseover', function(e) {
      if (e.target.classList.contains('project-card')) {
        e.target.style.transform = 'translateY(-5px)';
        e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      }
    });
  
    projectsSection.addEventListener('mouseout', function(e) {
      if (e.target.classList.contains('project-card')) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }
    });
  });