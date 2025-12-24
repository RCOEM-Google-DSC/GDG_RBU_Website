// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"clone-starter-repo.mdx": () => import("../content/docs/clone-starter-repo.mdx?collection=docs"), "firebase.mdx": () => import("../content/docs/firebase.mdx?collection=docs"), "gemini.mdx": () => import("../content/docs/gemini.mdx?collection=docs"), "getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "google-auth.mdx": () => import("../content/docs/google-auth.mdx?collection=docs"), "google-cloud.mdx": () => import("../content/docs/google-cloud.mdx?collection=docs"), "google-maps.mdx": () => import("../content/docs/google-maps.mdx?collection=docs"), "idea-submission-form.mdx": () => import("../content/docs/idea-submission-form.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "starter.mdx": () => import("../content/docs/starter.mdx?collection=docs"), }),
};
export default browserCollections;