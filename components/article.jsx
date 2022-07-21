import Date from './date';
import Link from 'next/link';

export default function Articles({ articles }) {
  articles.map((article) => (console.log(article)));

  return (
    <>
      <h2>Blog</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.attributes.id}>
            <Link href={`/articles/${article.attributes.id}`}>
              <a href="#top">{article.attributes.title}</a>
            </Link>
            <br />
            <small>
              <Date dateString={article.attributes.publishedAt} />
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}
