const apiBase = 'http://localhost:3000/weather';

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  const city = document.getElementById('city').value.trim();
  if (!city) return;

  showLoading();
  try {
    const [cur, fore] = await Promise.all([
      fetch(`${apiBase}/current?location=${encodeURIComponent(city)}`).then(r => r.json()),
      fetch(`${apiBase}/forecast?location=${encodeURIComponent(city)}`).then(r => r.json())
    ]);
    if (cur.error || fore.error) throw new Error(cur.error || fore.error);
    renderCurrent(cur);
    renderForecast(fore.forecast);
  } catch (err) {
    document.getElementById('current').textContent = err.message;
    document.getElementById('forecast').innerHTML = '';
  }
});

function showLoading() {
  document.getElementById('current').textContent = 'Chargement…';
  document.getElementById('forecast').innerHTML = '';
}

function renderCurrent(d) {
  document.getElementById('current').innerHTML = `
    <h2>${d.location}</h2>
    <p>${d.description}</p>
    <p>Température : <strong>${d.temperature} °C</strong></p>
    <p>Vent : ${d.windSpeed_kmh} km/h</p>
    <p>Humidité : ${d.humidity}%</p>`;
}

function renderForecast(arr) {
  document.getElementById('forecast').innerHTML = arr.map(day => `
    <div class="card">
      <strong>${day.date}</strong><br>
      ${day.temperature} °C<br>
      ${day.pressure} hPa<br>
      ${day.wind.description}<br>
      (${day.wind.speed_kmh} km/h)
    </div>`).join('');
}
