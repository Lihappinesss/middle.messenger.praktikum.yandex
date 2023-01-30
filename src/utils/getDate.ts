const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

function getDate(date: string): string {
  const messageDate = new Date(date);
  const now = new Date();
  const messageMount = months[messageDate.getMonth()];
  const messageDay = messageDate.getDate();
  const messageHours = messageDate.getHours();
  const messageMinutes = messageDate.getMinutes();
  const passed = now.getDate() - messageDate.getDate();

  let time = `${messageDay} ${messageMount}`;

  if (passed < 1) {
    time = `${messageHours}:${messageMinutes}`;
  }

  if (passed === 1) {
    time = 'Вчера';
  }

  return time;
}

export default getDate;
