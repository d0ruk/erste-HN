import pMap from "p-map"

const endpoints = {
  new: "https://hacker-news.firebaseio.com/v0/newstories.json",
  top: "https://hacker-news.firebaseio.com/v0/topstories.json",
  best: "https://hacker-news.firebaseio.com/v0/beststories.json",
  item: id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  user: name => `https://hacker-news.firebaseio.com/v0/user/${name}.json`,
}

function get(endpoint, ...ids) {

  if (ids.length === 1) {
    return fetch(endpoint(ids[0]))
      .then(r => r.json());
  }

  const promises = ids.map(e => fetch(endpoint(e)));

  return Promise.all(promises)
    .then(arr => arr.map(res => res.json()))
    .then(arr => Promise.all(arr))
}

export const getCurated = (limit, type = "top") => (
  window.fetch(endpoints[type])
    .then(r => r.json())
    .then(newStories => get(endpoints.item, ...newStories.slice(0, limit)))
);

export function getStories(...ids) {

  if (ids.length === 1) {
    return window.fetch(endpoints.item(ids[0]))
      .then(r => r.json())
  }

  return get(endpoints.item, ...ids);
}

export function getUsers(...ids) {

  if (ids.length === 1) {
    return window.fetch(endpoints.user(ids[0]))
      .then(r => r.json())
  }

  return get(endpoints.user, ...ids);
}

const traverse = async function(id, endpoint) {
  const comment = await get(endpoint, id);

  if (comment.deleted || comment.dead) {
    return;
  } else if (!comment.kids) {
    return [comment];
  } else {
    const promises = comment.kids.map(kid => traverse(kid, endpoint));
    promises.unshift(comment);

    return Promise.all(promises)
      .then(arr => arr.filter(e => e))
  }
}

async function crawl(elem) {
  const tree = await traverse(elem, endpoints.item);

  return tree;
}

export function getComments(kids = []) {
  // infinite concurrency might be unrealistic
  return pMap(kids.filter(e => e), crawl, { concurrency: Infinity })
    .then(arr => arr.filter(e => e));
}
