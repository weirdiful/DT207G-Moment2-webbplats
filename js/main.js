const apiUrl = 'https://dt207g-moment-2-api.onrender.com/api/workCV';

document.addEventListener('DOMContentLoaded', () => {

  const workList = document.getElementById('work-list');
  if (workList) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${item.companyname}</strong> - ${item.jobtitle} (${item.startdate} - ${item.enddate})
            <button data-id="${item.id}">Radera</button>
          `;
          workList.appendChild(li);
        });
      });

    workList.addEventListener('click', async (e) => {
      if (e.target.tagName === 'BUTTON') {
        const id = e.target.getAttribute('data-id');
        if (confirm('Vill du verkligen radera posten?')) {
          await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
          e.target.parentElement.remove();
        }
      }
    });
  }

  const addForm = document.getElementById('addForm');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const newWork = {
        companyname: document.getElementById('companyname').value,
        jobtitle: document.getElementById('jobtitle').value,
        location: document.getElementById('location').value,
        startdate: document.getElementById('startdate').value,
        enddate: document.getElementById('enddate').value,
        description: document.getElementById('description').value
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWork)
        });

        if (response.ok) {
          alert('Ny arbetserfarenhet tillagd!');
          window.location.href = 'index.html';
        } else {
          const data = await response.json();
          alert('Fel: ' + data.message);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
});
