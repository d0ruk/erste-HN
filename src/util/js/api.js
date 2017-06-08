const endpoints = {
  new: "https://hacker-news.firebaseio.com/v0/newstories.json",
  top: "https://hacker-news.firebaseio.com/v0/topstories",
  best: "https://hacker-news.firebaseio.com/v0/beststories",
  item: id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
}

function getStories(arr) {
  const promises = arr.map(e => fetch(endpoints.item(e)));

  return Promise.all(promises)
    .then(arr => arr.map(res => res.json()))
    .then(arr => Promise.all(arr))
}

export const getNewStories = limit => (
  window.fetch(endpoints.new)
    .then(r => r.json())
    .then(newStories => getStories(newStories.slice(0, limit)))
);

export function getStory(id) {
  window.fetch(endpoints.item(id))
    .then(r => r.json())
}
