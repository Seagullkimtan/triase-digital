document.getElementById("triage-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Fungsi untuk menentukan triase
  function getTriageColor(data) {
    if (data.gcs < 9 || data.spo2 < 90 || data.bisaBernapas === "No" || data.gangguanSirkulasi === "Ya") {
      return "red";
    } else if (data.gcs < 13 || data.suhu < 35 || data.suhu > 39 || data.perdarahan === "Ya") {
      return "yellow";
    } else {
      return "green";
    }
  }

  const triageColor = getTriageColor({
    gcs: parseInt(data.gcs),
    spo2: parseInt(data.spo2),
    suhu: parseFloat(data.temperature),
    bisaBernapas: data.bisaBernapas,
    gangguanSirkulasi: data.gangguanSirkulasi,
    perdarahan: data.perdarahan,
  });

  // Bulatan warna triase
  const triageIndicatorHTML = `<span class="triage-indicator ${triageColor}"></span>`;

  let resultText = `
    <p><strong>Nama:</strong> ${data.name}</p>
    <p><strong>Jenis Kelamin:</strong> ${data.jenisKelamin}</p>
    <p><strong>Umur:</strong> ${data.age} tahun</p>
    <p><strong>Tempat & Waktu Kejadian:</strong> ${data.tempat}, ${data.time}</p>
    <p><strong>Suhu:</strong> ${data.temperature} °C</p>
    <p><strong>Tekanan Darah:</strong> ${data.bp}</p>
    <p><strong>Nadi:</strong> ${data.pulse} bpm</p>
    <p><strong>SPO2:</strong> ${data.spo2}%</p>
    <p><strong>GCS:</strong> ${data.gcs}</p>
    <p><strong>Bisa Bernapas:</strong> ${data.bisaBernapas}</p>
    <p><strong>Gangguan Sirkulasi:</strong> ${data.gangguanSirkulasi}</p>
    <p><strong>Jenis Kecelakaan:</strong> ${data.jenisKecelakaan || "Tidak Diketahui"}</p>
    <p><strong>Rumah Sakit Tujuan:</strong> ${data.hospital}</p>
    <p><strong>Akomodasi:</strong> ${data.transport}</p>
    <p><strong>Warna Triase:</strong> ${triageIndicatorHTML}</p>
  `;

  document.getElementById("analysis").innerHTML = resultText;
  document.getElementById("result").style.display = "block";
  document.getElementById("download-pdf").style.display = "inline-block";
});

// PDF Generator
document.getElementById("download-pdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Hasil Analisis Triase", 10, 10);
  const analysisHTML = document.getElementById("analysis").innerText;
  const lines = doc.splitTextToSize(analysisHTML, 180);
  doc.text(lines, 10, 20);

  doc.save("hasil-triase.pdf");
});

document.getElementById('triage-form').addEventListener('submit', function(event) {
  event.preventDefault();

  setTimeout(() => {
    window.location.href = 'penutup.html';
  }, 10000);
});
