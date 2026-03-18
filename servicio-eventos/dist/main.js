"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 4002,
        },
    });
    await app.startAllMicroservices();
    await app.listen(3002);
    console.log('Microservicio de EVENTOS híbrido corriendo:');
    console.log('- TCP (Sincronización Strapi): puerto 4002');
    console.log('- HTTP (Queries Frontend): puerto 3002');
}
bootstrap();
//# sourceMappingURL=main.js.map