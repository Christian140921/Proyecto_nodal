import * as net from 'net';

/**
 * Cliente TCP para enviar mensajes usando el protocolo de NestJS.
 * NestJS requiere que el formato sea: longitud_del_mensaje + '#' + mensaje_json
 */
export function sendTcpMessage(
  host: string,
  port: number,
  pattern: any,
  data: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect(port, host, () => {
      console.log(`[Strapi TCP] Conectado a microservicio en ${host}:${port}`);
      
      const payload = {
        pattern,
        data,
        id: Date.now().toString(),
      };
      
      const message = JSON.stringify(payload);
      const packet = `${message.length}#${message}`;
      
      client.write(packet);
    });

    client.on('data', (dataBuffer) => {
      client.destroy(); // cerramos la conexión luego de recibir respuesta
      
      // Parsear respuesta de NestJS
      const responseStr = dataBuffer.toString();
      try {
        // La respuesta puede venir con o sin prefijo en algunas versiones, buscamos el JSON 
        const jsonStart = responseStr.indexOf('{');
        if (jsonStart !== -1) {
          const parsed = JSON.parse(responseStr.substring(jsonStart));
          resolve(parsed.response || parsed);
        } else {
          resolve({ success: true, message: 'Message acknowledged' });
        }
      } catch (err) {
        resolve({ success: true, raw: responseStr });
      }
    });

    client.on('error', (err) => {
      console.error(`[Strapi TCP] Error conectando a ${host}:${port}`, err.message);
      reject(err);
      client.destroy();
    });
    
    // Timeout por seguridad
    client.setTimeout(3000, () => {
      console.error(`[Strapi TCP] Timeout conectando a ${host}:${port}`);
      client.destroy();
      reject(new Error('Connection timeout'));
    });
  });
}
