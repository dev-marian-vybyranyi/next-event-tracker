export async function getEvents() {
  const response = await fetch("https://next-event-tracker-default-rtdb.firebaseio.com/events.json");
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const events = await getEvents();
  return events.filter((event) => event.isFeatured);
}
