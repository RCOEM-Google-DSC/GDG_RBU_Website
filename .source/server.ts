// @ts-nocheck
import * as __fd_glob_11 from "../content/docs/starter.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/idea-submission-form.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/google-maps.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/google-cloud.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/google-auth.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/github-setup.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/getting-started.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/gemini.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/firebase.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/clone-starter-repo.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"clone-starter-repo.mdx": __fd_glob_1, "firebase.mdx": __fd_glob_2, "gemini.mdx": __fd_glob_3, "getting-started.mdx": __fd_glob_4, "github-setup.mdx": __fd_glob_5, "google-auth.mdx": __fd_glob_6, "google-cloud.mdx": __fd_glob_7, "google-maps.mdx": __fd_glob_8, "idea-submission-form.mdx": __fd_glob_9, "index.mdx": __fd_glob_10, "starter.mdx": __fd_glob_11, });