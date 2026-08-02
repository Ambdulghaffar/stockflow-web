// On récupère l'URL publique (utilisée par le navigateur, passe par le rewrite Next.js)
const PUBLIC_INV_MGT_BASEURL = process.env.NEXT_PUBLIC_INV_MGT_BASEURL ?? "/api";

// Utilisée uniquement côté serveur (Server Components, Server Actions, authOptions)
// Le navigateur n'a jamais besoin de cette valeur, donc pas de préfixe NEXT_PUBLIC_
const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:8080";

// Le serveur ne passe pas par le rewrite Next.js : il doit taper directement
// sur le backend, avec le même préfixe /api que le rewrite utilise pour le client
const SERVER_SIDE_BASEURL = `${BACKEND_INTERNAL_URL}/api`;

const environment = {
  name: process.env.NODE_ENV,
  baseUrl: process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000",
  api: {
    rest: {
      // Côté navigateur (typeof window existe) → URL relative "/api", passe par le rewrite
      // Côté serveur (Node.js, pas de "window") → URL absolue directe vers le backend
      baseUrl:
        typeof window === "undefined" ? SERVER_SIDE_BASEURL : PUBLIC_INV_MGT_BASEURL,
    },
  },
  http: {
    request: {
      timeout: Number.parseInt(process.env.NEXT_PUBLIC_HTTP_TIMEOUT ?? "60000"),
    },
  },
} as const;

export default environment;