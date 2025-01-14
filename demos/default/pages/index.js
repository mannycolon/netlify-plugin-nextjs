import Link from 'next/link'
import dynamic from 'next/dynamic'
const Header = dynamic(() => import(/* webpackChunkName: 'header' */ '../components/Header'), { ssr: true })
import { useRouter } from 'next/router'

const Index = ({ shows }) => {
  const { locale } = useRouter()

  return (
    <div>
      <img src="/next-on-netlify.png" alt="NextJS on Netlify Banner" style={{ maxWidth: '100%' }} />

      <Header />

      <h1>NextJS on Netlify</h1>
      <p>This is a demo of a NextJS application with Server-Side Rendering (SSR).</p>

      <h2>Server-Side Rendering</h2>
      <p>
        This page is server-side rendered.
        <br />
        It fetches a random list of five TV shows from the TVmaze REST API.
        <br />
        Refresh this page to see it change.
      </p>

      <ul data-testid="list-server-side">
        {shows.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/shows/${id}`}>
              <a>
                #{id}: {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <h2>Dynamic Pages</h2>
      <p>Click on a show to check out a server-side rendered page with dynamic routing (/shows/:id).</p>

      <ul data-testid="list-dynamic-pages">
        {shows.slice(0, 3).map(({ id, name }) => (
          <li key={id}>
            <Link href={`/shows/${id}`}>
              <a>
                #{id}: {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <h2>Catch-All Routess</h2>

      <ul data-testid="list-catch-all">
        <li>
          <Link href={`/shows/73/whatever/path/you/want`}>
            <a>/shows/73/whatever/path/you/want</a>
          </Link>
        </li>
        <li>
          <Link href={`/shows/94/whatever/path/you`}>
            <a>/shows/94/whatever/path/you</a>
          </Link>
        </li>
        <li>
          <Link href={`/shows/106/whatever/path`}>
            <a>/shows/106/whatever/path</a>
          </Link>
        </li>
      </ul>

      <h2>Static Pages</h2>

      <ul data-testid="list-static">
        <li>
          <Link href="/static">
            <a>Static NextJS page: /static</a>
          </Link>
        </li>
        <li>
          <Link href="/static/123456789">
            <a>Static NextJS page with dynamic routing: /static/:id</a>
          </Link>
        </li>
      </ul>

      <h2>Localization</h2>
      <p>
        Localization (i18n) is supported! This demo uses <code>fr</code> with <code>en</code> as the default locale (at{' '}
        <code>/</code>).
      </p>
      <strong>The current locale is {locale}</strong>
      <p>Click on the links below to see the above text change</p>
      <ul data-testid="list-localization">
        <li>
          <Link href="/fr">
            <a>/fr</a>
          </Link>
        </li>
        <li>
          <Link href="/en">
            <a>/en (default locale)</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

Index.getInitialProps = async function () {
  const dev = process.env.CONTEXT !== 'production'

  // Set a random page between 1 and 100
  const randomPage = Math.floor(Math.random() * 100) + 1
  // FIXME: stub out in dev
  const server = dev
    ? `https://api.tvmaze.com/shows?page=${randomPage}`
    : `https://api.tvmaze.com/shows?page=${randomPage}`

  // Get the data
  const res = await fetch(server)
  const data = await res.json()

  return { shows: data.slice(0, 5) }
}

export default Index
