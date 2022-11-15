import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction } from "remix";

import tailwindCssUrl from "./tailwind.css";
import globalStylesUrl from "~/styles/global.css";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwindCssUrl,
    },
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-y-0 w-full items-center justify-center flex">
      <div>
        <header>
          <div className="container mx-auto text-cyan-400 text-center opacity-40 hover:opacity-100 transition-opacity">
            <RVLogo />
          </div>
        </header>
        <main className="page-body text-white">{children}</main>
        <footer className="mt-16 text-white">
          <p className="text-center text-5xl">
            <a
              href="https://github.com/rjv"
              className="mx-4 inline-block text-cyan-400 hover:text-cyan-200 transition-colors"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/rjv"
              className="mx-4 inline-block text-cyan-400 hover:text-cyan-200 transition-colors"
              title="Twitter (@rjv)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="http://www.linkedin.com/pub/roger-vandawalker/7/30/724"
              className="mx-4 inline-block text-cyan-400 hover:text-cyan-200 transition-colors"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://twit.social/@rogerv"
              className="mx-4 inline-block text-cyan-400 hover:text-cyan-200 transition-colors"
              title="Mastodon"
              target="_blank"
              rel="me noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 0 216.4144 232.00976"
              >
                <path
                  fill="currentColor"
                  d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915"
                />
                <path
                  fill="#220057"
                  d="M177.50984 80.077v60.94125h-24.14375v-59.15c0-12.46875-5.24625-18.7975-15.74-18.7975-11.6025 0-17.4175 7.5075-17.4175 22.3525v32.37625H96.20734V85.42325c0-14.845-5.81625-22.3525-17.41875-22.3525-10.49375 0-15.74 6.32875-15.74 18.7975v59.15H38.90484V80.077c0-12.455 3.17125-22.3525 9.54125-29.675 6.56875-7.3225 15.17125-11.07625 25.85-11.07625 12.355 0 21.71125 4.74875 27.8975 14.2475l6.01375 10.08125 6.015-10.08125c6.185-9.49875 15.54125-14.2475 27.8975-14.2475 10.6775 0 19.28 3.75375 25.85 11.07625 6.36875 7.3225 9.54 17.22 9.54 29.675"
                />
              </svg>
            </a>
          </p>
          <p className="flex justify-center gap-1 mt-8">
            <strong>me</strong>
            <em className="font-light">&middot; at &middot;</em>
            <strong>rjv.dev</strong>
          </p>
        </footer>
      </div>
    </div>
  );
}

function RVLogo() {
  return (
    <svg
      className="inline-block fill-current w-32 md:w-64"
      version="1.1"
      viewBox="0 0 594.45258 592.57782"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Roger Vandawalker</title>
      <g transform="translate(233.38 -25.274)">
        <g transform="translate(-426.57 -294)" stroke-width="1px">
          <path d="m771.29 495.35 4.6387 11.719h2.4414l2.1973-2.4414h2.4414l2.1973 2.4414-2.1973 2.1973v2.4414l4.6387 4.6387q0 8.7891-93.262 118.65-129.15 166.5-169.92 239.75-10.01 37.109-32.471 37.109h-9.2773q-39.551 0-67.627-30.029l4.6387-20.996-48.828-256.1-18.555-86.182v-2.1973q11.719-18.555 27.832-18.555 31.006 0 60.547 23.193 23.438 16.846 23.438 60.547 2.9297 0.73242 27.832 167.48h2.4414l55.664-72.021q22.949-19.287 25.635-32.715h2.4414l2.1973 2.4414h2.4414l20.996-20.996 2.1973 2.1973v-2.1973l-2.1973-7.0801 6.8359-4.6387h2.4414l2.1973 11.719 4.6387-4.6387-2.1973-9.2773h2.1973l-2.1973-7.0801q6.3477-15.381 13.916-18.555h2.4414l2.1973 2.1973h2.4414l4.6387-4.6387v4.6387l-2.4414 2.4414v2.1973h2.4414l25.635-32.471h2.1973v2.1973l-16.357 20.996v13.916l25.635-27.832 2.4414 2.4414h2.1973v-4.6387h2.4414l-4.6387-11.719 2.1973-2.4414h2.4414l2.1973 2.4414h2.4414l23.193-18.555 2.4414 2.1973v2.4414l-11.719 11.475v2.4414h4.6387q51.514-59.814 60.547-60.547zm-231.9-176.07q76.416 0 105.96 55.176l13.184 55.176q0 34.18-191.89 130.13-99.609 42.725-103.76 52.979-15.381 28.564-19.775 28.564-10.986 8.7891-19.775 26.367h-4.3945v2.1973l-2.1973-2.1973h-2.1973q-4.6387 0-13.184 28.809h-4.3945l2.1973 2.1973v2.1973q-6.8359 0-33.203 52.979-6.5918 26.367-26.367 26.367v-4.3945h-2.1973l-8.7891 2.1973-2.4414-2.1973h-2.1973l-6.5918 2.1973-4.3945-4.3945-4.3945 4.3945-15.381-17.578v-4.3945q0-21.973 55.176-136.72l-6.5918-2.1973 2.1973-2.1973v-2.1973l-10.986-9.0332-9.0332 2.1973-4.3945-6.5918 2.1973-2.1973v-2.1973q-13.184 0-13.184-6.5918 27.1-21.484 85.938-50.781l44.189-90.332h-2.1973q-26.367 0-50.781-50.781v-19.775q18.066-22.949 92.773-37.354 42.725-9.0332 160.89-20.02zm-121.34 163.33h2.1973q71.777-33.447 132.32-81.787v-2.1973h-2.1973q-90.332 3.418-90.332 13.428l-41.992 70.557z"></path>
        </g>
      </g>
    </svg>
  );
}
