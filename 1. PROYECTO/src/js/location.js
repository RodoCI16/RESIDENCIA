const initLocationPage = () => {
  // 1. Manejo del Modal Flotante de Horarios
  const modal = document.getElementById('schedules-modal');
  const card = document.getElementById('schedules-card');
  const btnOpen = document.getElementById('btn-open-schedules');
  const btnClose = document.getElementById('btn-close-schedules');
  const btnCloseFooter = document.getElementById('btn-close-schedules-footer');

  if (modal && card && btnOpen) {
    const openModal = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation(); // Evita interferencias con listeners globales
      }
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      card.classList.remove('scale-95', 'opacity-0');
      card.classList.add('scale-100', 'opacity-100');
    };

    const closeModal = (e) => {
      if (e) e.stopPropagation();
      card.classList.remove('scale-100', 'opacity-100');
      card.classList.add('scale-95', 'opacity-0');
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
    };

    btnOpen.addEventListener('click', openModal);

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCloseFooter) btnCloseFooter.addEventListener('click', closeModal);

    // Evitar que toques dentro de la tarjeta cierren el modal
    card.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Cerrar al tocar el fondo difuminado
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(e);
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
        closeModal(e);
      }
    });
  }

  // 2. Manejo de Ruta y Geolocalización (Satelital &t=k)
  const btnDirections = document.getElementById('btn-directions');
  const geoStatus = document.getElementById('geo-status');
  const mapFrame = document.getElementById('map-frame');
  const hospitalDestination = 'Hospital+Mazahua,Santa+Ana+Nichi,San+Felipe+del+Progreso';

  if (btnDirections && mapFrame) {
    btnDirections.addEventListener('click', () => {
      if (geoStatus) geoStatus.textContent = 'Obteniendo tu ubicación actual...';

      if (!navigator.geolocation) {
        mapFrame.src = `https://www.google.com/maps?saddr=&daddr=${hospitalDestination}&t=k&output=embed`;
        if (geoStatus) geoStatus.textContent = 'Escribe tu punto de partida en el mapa.';
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          mapFrame.src = `https://www.google.com/maps?saddr=${userLat},${userLng}&daddr=${hospitalDestination}&t=k&output=embed`;
          if (geoStatus) geoStatus.textContent = 'Ruta trazada sobre vista satelital.';
        },
        () => {
          mapFrame.src = `https://www.google.com/maps?saddr=&daddr=${hospitalDestination}&t=k&output=embed`;
          if (geoStatus) geoStatus.textContent = 'Permiso denegado. Traza la ruta directamente en el mapa satelital.';
        },
        { timeout: 10000 }
      );
    });
  }
};

document.addEventListener('DOMContentLoaded', initLocationPage);
window.addEventListener('page:loaded', initLocationPage);