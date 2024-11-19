document.addEventListener('DOMContentLoaded', function () {
  const calendarGrid = document.querySelector('.calendar-grid');
  const monthName = document.getElementById('month-name');

  const toggleCalendarBtn = document.getElementById('calendar__calendar');
  const toggleListBtn = document.getElementById('calendar__list');

  const calendarView = document.getElementById('calendar-view');
  const listView = document.getElementById('list-view');
  const leftView = document.querySelector('.event-list__left');
  const rightView = document.querySelector('.event-list__right');


  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const months = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  const events = [
    { date: '2024-10-02', title: 'Менторська програма', type: 'КУРС', kind: "#релігійні огранізації", details: 'Онлайн, початок о 10:00', on_offline: 'ОНЛАЙН' },
    { date: '2024-10-12', title: 'Лідерство та управління', type: 'ВЕБІНАР', kind: "#релігійні огранізації", details: 'Онлайн, початок о 14:00', on_offline: 'ОФФЛАЙН'  },
    { date: '2024-10-12', title: 'Соціальне підприємництво', type: 'КУРС', kind: "#громадський сектор", details: 'Онлайн, початок о 16:00', on_offline: 'ОНЛАЙН'  },
    { date: '2024-10-19', title: 'Бізнес стратегія', type: 'КУРС', kind: "#релігійні огранізації", details: 'Офлайн, початок о 10:00', on_offline: 'ОФФЛАЙН'  },
    { date: '2024-10-19', title: 'Маркетинг для початківців', type: 'ВЕБІНАР', kind: "#бізнес", details: 'Онлайн, початок о 14:00', on_offline: 'ОНЛАЙН'  },
  ];

  function generateListView() {
    leftView.innerHTML = '';
    rightView.innerHTML = '';

    events.forEach(event => {
        if ((filters.courses && event.type === 'КУРС') || (filters.webinars && event.type === 'ВЕБІНАР')) {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-list__card');
            const eventDate = new Date(event.date);
            const formattedDate = `початок - ${eventDate.getDate()} ${months[eventDate.getMonth()]} ${eventDate.getFullYear()}`;

            eventItem.innerHTML = `
                <div class="custom-popover__header event-card__top">
                    <div class="custom-popover__hashtag ${event.kind === '#релігійні огранізації' ? 'rel' : event.kind === '#громадський сектор' ? 'grom' : 'bus'}">
                        <p>${event.kind}</p>
                    </div>
                    <div class="event-card__course custom-popover__course">
                        <p>${event.type}</p>
                    </div>
                    <div class="event-card__online custom-popover__online">
                        ${event.on_offline == 'ОНЛАЙН' ? '<div class="event-card__dot dot dot_green"></div>' : '<div class="event-card__dot dot dot_red"></div>'}
                        <p>${event.on_offline}</p>
                    </div>
                </div>
                <p class="custom-popover__date">${formattedDate}</p>
                <p class="custom-popover__title">${event.title}</p>
                <p class="custom-popover__text">Ми завжди думаємо про зміни, яких не бачимо в місці, де живемо. Сіл в Україні більше ніж міст, і вони дуже різні. Проте усюди є люди, які не тільки думають про зміни, але і хочуть їх творити. Цей курс дасть ефективний інструмент цих змін та пояснить, як ним користуватись.</p>
                <div class="custom-popover__btn to-button">
                    <a href='card.html'>Взяти участь</a>
                    <img class="to-button__arrow" src="img/Arrow, Download, Save, Upload.svg" alt="" srcset="">
                </div>
            `;
            leftView.appendChild(eventItem);
        }
    });
    
    const soonEvent = document.createElement('div');
    soonEvent.classList.add('soon-event');
    soonEvent.innerHTML = `
        <h3 class="soon__title" style="margin-bottom: 24px;">Найближчі події</h3>
        <div class="event-card">
            <div class="event-card__top">
                <div class="event-card__course">
                    <p>ВЕБІНАР</p>
                </div>
                <div class="event-card__online">
                    <div class="event-card__dot dot dot_red"></div>
                    <p>ОФЛАЙН</p>
                </div>
            </div>
            <div class="event-card__bottom">
                <div class="event-card__hashtag rel">
                    <p>#релігійні організації</p>
                </div>
            </div>
            <a class="event-card__subtext" href="card.html">
                <p class="event-card__date">початок - 14 березня 2024</p>
                <h3 class="event-card__course-title">Дуже цікавий курс тут</h3>
                <p class="event-card__description">Короткий опис</p>
            </a>
        </div>
    `;
    rightView.appendChild(soonEvent);
}

function activateButton(button) {
  toggleCalendarBtn.classList.remove('active');
  toggleListBtn.classList.remove('active');
  button.classList.add('active');
}


  toggleListBtn.addEventListener('click', () => {
      activateButton(toggleListBtn);
      calendarView.style.display = 'none';
      listView.style.display = 'flex';
      generateListView(); 
  });
  toggleCalendarBtn.addEventListener('click', () => {
      activateButton(toggleCalendarBtn);
      calendarView.style.display = 'block';
      listView.style.display = 'none';
});

  const filters = {
    courses: true,
    webinars: true
  };
  
  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
  }

  function generateCalendar(month, year) {
    calendarGrid.innerHTML = '';
    const firstDay = getFirstDayOfMonth(month, year);
    const totalDays = daysInMonth(month, year);

    monthName.innerText = `${months[month]} ${year}`;

    const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const lastDayPrevMonth = daysInMonth(prevMonth, prevYear);

    for (let i = prevMonthDays; i > 0; i--) {
      const prevDayCell = document.createElement('div');
      prevDayCell.innerText = lastDayPrevMonth - i + 1;
      prevDayCell.classList.add('prev-month');
      calendarGrid.appendChild(prevDayCell);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayCell = document.createElement('div');
      dayCell.innerText = day;

      const fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      const dayEvents = events.filter(e => e.date === fullDate);

      dayEvents.forEach(event => {
        if ((filters.courses && event.type === 'КУРС') || (filters.webinars && event.type === 'ВЕБІНАР')) {
          const eventLabel = document.createElement('span');
          eventLabel.innerText = event.title;
          eventLabel.classList.add('event', event.type === 'КУРС' ? 'course' : 'webinar', event.kind === '#релігійні огранізації' ? 'rel' : event.kind === '#громадський сектор' ? 'grom' : 'bus', 'customPopoverss');
          dayCell.appendChild(eventLabel);
          const eventDate = new Date(event.date);
          const formattedDate = `початок - ${eventDate.getDate()} ${months[eventDate.getMonth()]} ${eventDate.getFullYear()}`;
          const customContent = `
            <div class="custom-popover__header event-card__top">
              <div class="event-card__course custom-popover__course">
                <p>${event.type}</p>
              </div>
              <div class="event-card__online custom-popover__online">
                ${event.on_offline == 'ОНЛАЙН' ? '<div class="event-card__dot dot dot_green"></div>' : '<div class="event-card__dot dot dot_red"></div>'}
                <p>${event.on_offline}</p>
              </div>

            </div>
            <div class="custom-popover__kind">
              <div class="custom-popover__hashtag ${event.kind === '#релігійні огранізації' ? 'rel' : event.kind === '#громадський сектор' ? 'grom' : 'bus'}">
                <p>${event.kind}</p>
              </div>
            </div>
            <p class="custom-popover__date">${formattedDate}</p>
            <p class="custom-popover__title">${event.title}</p>
            <div class="custom-popover__btn to-button">
              <a href="card.html">
                Взяти участь
              </a>
              <img class="to-button__arrow" src="img/Arrow, Download, Save, Upload.svg" alt="" srcset="">
            </div>

            

    `;

    const popover = new bootstrap.Popover(eventLabel, {
        content: customContent,
        html: true,
        sanitize: false // отключаем санитайзер, чтобы не было проблем с кастомным HTML
    });
        }
      });

      calendarGrid.appendChild(dayCell);
    }

    const totalCells = prevMonthDays + totalDays;
    const remainingCells = totalCells < 35 ? 35 - totalCells : 42 - totalCells;

    if (remainingCells > 0) {

      for (let i = 1; i <= remainingCells; i++) {
        const nextDayCell = document.createElement('div');
        nextDayCell.innerText = i;
        nextDayCell.classList.add('next-month');
        calendarGrid.appendChild(nextDayCell);
      }
    }
  }


  document.getElementById('prev-month').addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });

  document.getElementById('next-month').addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });

  document.getElementById('courses').addEventListener('change', function (e) {
    filters.courses = e.target.checked;
    generateCalendar(currentMonth, currentYear);
    if (toggleListBtn.classList.contains("active"))
    {
      generateListView(); 
    }
});

document.getElementById('webinars').addEventListener('change', function (e) {
    filters.webinars = e.target.checked;
    generateCalendar(currentMonth, currentYear);
    if (toggleListBtn.classList.contains("active"))
    {
      generateListView(); 
    }
});

  generateCalendar(currentMonth, currentYear);
});



