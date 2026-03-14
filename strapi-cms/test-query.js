const strapiContext = require('@strapi/strapi')();

strapiContext.start().then(async (strapi) => {
  try {
    const config = await strapi.db.query('api::configuracion.configuracion').findMany({});
    console.log("Configuracion:", config);
    const noticia = await strapi.db.query('api::noticias.noticias').findOne({ populate: ['Imagen'] });
    console.log("Noticia:", noticia);
  } catch(e) {
    console.error("ERROR", e.stack);
  } finally {
    process.exit(0);
  }
});
