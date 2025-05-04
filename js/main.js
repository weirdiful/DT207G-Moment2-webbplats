const apiUrl = 'https://dt207g-moment-2-api.onrender.com/api/workCV';

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('work-list');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${item.companyname}</strong> - ${item.jobtitle} (${item.startdate} - ${item.enddate})
          <button data-id="${item.id}">Radera</button>
        `;
        list.appendChild(li);
      });
    });


  list.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      if (confirm('Vill du verkligen radera posten?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        e.target.parentElement.remove();
      }
    }
  });
});
