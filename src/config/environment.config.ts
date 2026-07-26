// On récupère l'URL avec le préfixe NEXT_PUBLIC
const INV_MGT_BASEURL = process.env.NEXT_PUBLIC_INV_MGT_BASEURL ?? "/api";

const environment = {
  name: process.env.NODE_ENV, // 'development' ou 'production' automatiquement
  baseUrl: process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000",
  api: {
    rest: {
      // On définit une baseUrl racine pour simplifier Axios
      baseUrl: INV_MGT_BASEURL, 
    },
  },
  http: {
    request: {
      timeout: Number.parseInt(process.env.NEXT_PUBLIC_HTTP_TIMEOUT ?? "60000"),
    },
  },
} as const;

export default environment;
