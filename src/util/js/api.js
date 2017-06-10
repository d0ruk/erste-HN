const endpoints = {
  new: "https://hacker-news.firebaseio.com/v0/newstories.json",
  top: "https://hacker-news.firebaseio.com/v0/topstories.json",
  best: "https://hacker-news.firebaseio.com/v0/beststories.json",
  item: id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  user: name => `https://hacker-news.firebaseio.com/v0/user/${name}.json`,
}

function get(arr, endpoint) {
  const promises = arr.map(e => window.fetch(endpoint(e)));

  return Promise.all(promises)
    .then(arr => arr.map(res => res.json()))
    .then(arr => Promise.all(arr))
}

export const getCurated = (limit, type = "top") => (
  window.fetch(endpoints[type])
    .then(r => r.json())
    .then(newStories => get(newStories.slice(0, limit), endpoints.item))
);

export function getStories(...ids) {

  if (ids.length === 1) {
    return window.fetch(endpoints.item(ids[0]))
      .then(r => r.json())
  }

  return get(ids, endpoints.item);
}

export function getUsers(...ids) {

  if (ids.length === 1) {
    return window.fetch(endpoints.user(ids[0]))
      .then(r => r.json())
  }

  return get(ids, endpoints.user);
}
