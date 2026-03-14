import { sendTcpMessage } from '../../../../utils/tcp-client';

async function syncNoticia(noticiaId: number, strapiInstance: any) {
  try {
    // 1. Verificar si CQRS está encendido en la configuración global
    const configs = await strapiInstance.documents('api::configuracion.configuracion').findMany();
    
    // Asumimos que hay al menos una config y leemos el toggle
    const isCqrsEnabled = configs.length > 0 ? configs[0].cqrsNoticias : true; // Por defecto true si no hay config
    
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
  
  // Opcional: Para notificar el borrado (esto habría que implementarlo en NestJS con cmd: delete_news)
  async afterDelete(event) {
    // const { result } = event;
    // Podrías enviar TCP msg aquí
  }
};
