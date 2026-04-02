import { sendTcpMessage } from '../../../../utils/tcp-client';

declare const strapi: any;
declare const process: any;
declare const console: any;

async function isEventosSyncEnabled(strapiInstance: any): Promise<boolean> {
  const configs = await strapiInstance.documents('api::configuracion.configuracion').findMany();
  return configs.length > 0 ? configs[0].cqrsEventos : true;
}

async function syncEvento(eventoId: number, strapiInstance: any) {
  try {
    const isCqrsEnabled = await isEventosSyncEnabled(strapiInstance);
    
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

async function deleteEvento(strapiId: number, strapiInstance: any) {
  try {
    const isCqrsEnabled = await isEventosSyncEnabled(strapiInstance);

    if (!isCqrsEnabled) {
      console.log(`[CQRS] Eventos delete ignorado porque el toggle cqrsEventos está apagado.`);
      return;
    }

    const host = process.env.MS_EVENTOS_HOST || 'host.docker.internal';
    const port = parseInt(process.env.MS_EVENTOS_PORT || '4002', 10);

    console.log(`[CQRS] Enviando DELETE de Evento #${strapiId} al microservicio en ${host}:${port}...`);

    await sendTcpMessage(host, port, { cmd: 'delete_event' }, { strapiId });
    console.log(`[CQRS] Evento #${strapiId} eliminado en el microservicio.`);
  } catch (error) {
    console.error(`[CQRS] Error eliminando Evento en el microservicio: `, error.message);
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
  },

  async afterDelete(event) {
    const { result, params } = event;
    const deletedId = Number(result?.id ?? params?.where?.id);

    if (!Number.isFinite(deletedId)) {
      console.warn('[CQRS] No se pudo resolver el id del evento eliminado para sincronizar DELETE.');
      return;
    }

    await deleteEvento(deletedId, strapi);
  },
};
