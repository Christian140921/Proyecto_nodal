import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log(
      '[CQRS DEBUG] UIDs registrados:',
      Object.keys(strapi.contentTypes).filter((uid) => uid.startsWith('api::'))
    );
  },
};
