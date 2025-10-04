import fs from 'fs';
import path from 'path';
import { getAllPosts } from './posts';

export function getPhotosWithBlogLinks() {
  const posts = getAllPosts();
  const photosWithLinks = [];

  posts.forEach(post => {
    if (post.featuredImage) {
      photosWithLinks.push({
        src: post.featuredImage,
        title: post.title,
        desc: post.excerpt,
        blogSlug: post.slug,
        date: post.date
      });
    }
  });

  return photosWithLinks;
}