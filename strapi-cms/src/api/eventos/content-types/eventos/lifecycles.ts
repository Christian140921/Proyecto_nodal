import { sendTcpMessage } from '../../../../utils/tcp-client';

async function syncEvento(eventoId: number, strapiInstance: any) {
  try {
    const configs = await strapiInstance.documents('api::configuracion.configuracion').findMany();
    const isCqrsEnabled = configs.length > 0 ? configs[0].cqrsEventos : true;
    
    if (!isCqrsEnabled) {
      console.log(`[CQRS] Eventos sync ignorado porque el toggle cqrsEventos está apagado.`);
      return;
    }

    const evento = await strapiInstance.documents('api::eventos.eventos').findOne({
      documentId: eventoId.toString(),
      populate: '*',
    });

    if (!evento) return;

    const payload = {
      strapiId: evento.id,
      titulo: evento.Titulo,
      fecha: evento.Fecha,
      tipoEvento: evento.TipoEvento,
      imagen: evento.Imagen?.url || null,
      descripcion: '', // TODO: if you add Descripcion to the schema
    };

    // Para Eventos supongamos que el microservicio correrá en el 4002
    const host = process.env.MS_EVENTOS_HOST || 'host.docker.internal';
    const port = parseInt(process.env.MS_EVENTOS_PORT || '4002', 10);

    console.log(`[CQRS] Enviando Evento #${evento.id} al microservicio en ${host}:${port}...`);
    
    await sendTcpMessage(host, port, { cmd: 'sync_event' }, payload);
    console.log(`[CQRS] Evento #${evento.id} sincronizado con el microservicio.`);
    
  } catch (error) {
    console.error(`[CQRS] Error sincronizando Evento al microservicio: `, error.message);
  }
}

export default {
  async afterCreate(event) {
    const { result } = event;
    await syncEvento(result.documentId || result.id, strapi);
  },

  async afterUpdate(event) {
    const { result } = event;
    await syncEvento(result.documentId || result.id, strapi);
  }
};
