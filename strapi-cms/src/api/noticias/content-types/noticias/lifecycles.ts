import { sendTcpMessage } from '../../../../utils/tcp-client';

async function isNoticiasSyncEnabled(strapiInstance: any): Promise<boolean> {
  const configs = await strapiInstance.documents('api::configuracion.configuracion').findMany();
  return configs.length > 0 ? configs[0].cqrsNoticias : true;
}

async function syncNoticia(noticiaId: number, strapiInstance: any) {
  try {
    const isCqrsEnabled = await isNoticiasSyncEnabled(strapiInstance);
    
    if (!isCqrsEnabled) {
      console.log(`[CQRS] Noticias sync ignorado porque el toggle cqrsNoticias está apagado.`);
      return;
    }

    // 2. Obtener la noticia completa recién guardada
    const noticia = await strapiInstance.documents('api::noticias.noticias').findOne({
      documentId: noticiaId.toString(),
      populate: '*',
    });

    if (!noticia) return;

    // 3. Formatear la carga útil (payload) para el microservicio
    const payload = {
      strapiId: noticia.id, // ID numérico relacional
      titulo: noticia.Titulo,
      descripcion: JSON.stringify(noticia.Descripcion) || '',
      autor: noticia.Autor,
      categoria: noticia.Categoria,
      imagen: noticia.Imagen?.url || null,
    };

    // 4. Enviar mediante protocolo TCP de NestJS
    // El host depende de si estamos en Docker ('host.docker.internal' o 'ms-noticias') 
    // host.docker.internal funciona en Docker Desktop para apuntar a la PC host donde corre npm run start:dev
    const host = process.env.MS_NOTICIAS_HOST || 'host.docker.internal';
    const port = parseInt(process.env.MS_NOTICIAS_PORT || '4001', 10);

    console.log(`[CQRS] Enviando Noticia #${noticia.id} al microservicio en ${host}:${port}...`);
    
    await sendTcpMessage(host, port, { cmd: 'sync_news' }, payload);
    console.log(`[CQRS] Noticia #${noticia.id} sincronizada con el microservicio.`);
    
  } catch (error) {
    console.error(`[CQRS] Error sincronizando Noticia al microservicio: `, error.stack || error.message);
  }
}

async function deleteNoticia(strapiId: number, strapiInstance: any) {
  try {
    const isCqrsEnabled = await isNoticiasSyncEnabled(strapiInstance);

    if (!isCqrsEnabled) {
      console.log(`[CQRS] Noticias delete ignorado porque el toggle cqrsNoticias está apagado.`);
      return;
    }

    const host = process.env.MS_NOTICIAS_HOST || 'host.docker.internal';
    const port = parseInt(process.env.MS_NOTICIAS_PORT || '4001', 10);

    console.log(`[CQRS] Enviando DELETE de Noticia #${strapiId} al microservicio en ${host}:${port}...`);

    await sendTcpMessage(host, port, { cmd: 'delete_news' }, { strapiId });
    console.log(`[CQRS] Noticia #${strapiId} eliminada en el microservicio.`);
  } catch (error) {
    console.error(`[CQRS] Error eliminando Noticia en el microservicio: `, error.stack || error.message);
  }
}

export default {
  // Se ejecuta DESPUÉS de crear el documento y de que esté en la DB
  async afterCreate(event) {
    const { result } = event;
    // Strapi v5 retorna el internal ID como property `id` 
    await syncNoticia(result.documentId || result.id, strapi);
  },

  async afterUpdate(event) {
    const { result } = event;
    await syncNoticia(result.documentId || result.id, strapi);
  },

  async afterDelete(event) {
    const { result, params } = event;
    const deletedId = Number(result?.id ?? params?.where?.id);

    if (!Number.isFinite(deletedId)) {
      console.warn('[CQRS] No se pudo resolver el id de la noticia eliminada para sincronizar DELETE.');
      return;
    }

    await deleteNoticia(deletedId, strapi);
  }
};
