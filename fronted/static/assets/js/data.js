/**
 * data.js — Mock data loader
 * Loads and caches db.json, exports typed getters
 */

let _cache = null;

export async function loadDB() {
  if (_cache) return _cache;
  // resolve path relative to root regardless of page depth
  const base = document.querySelector('base')?.href || location.origin + '/';
  const url = new URL('data/db.json', base).href;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load db.json');
  _cache = await res.json();
  return _cache;
}

export async function getPosts() {
  const db = await loadDB();
  return db.posts || [];
}

export async function getAuthors() {
  const db = await loadDB();
  return db.authors || [];
}

export async function getTags() {
  const db = await loadDB();
  return db.tags || [];
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug) || null;
}

export async function getAuthorById(id) {
  const authors = await getAuthors();
  return authors.find(a => a.id === id) || null;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getRelatedPosts(currentPost, allPosts, limit = 3) {
  return allPosts
    .filter(p => p.id !== currentPost.id)
    .filter(p => p.tags.some(t => currentPost.tags.includes(t)))
    .slice(0, limit);
}
