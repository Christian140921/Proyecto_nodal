"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_schema_1 = require("./infrastructure/database/event.schema");
const event_repository_impl_1 = require("./infrastructure/repositories/event.repository.impl");
const create_event_usecase_1 = require("./application/use-cases/create-event.usecase");
const get_events_usecase_1 = require("./application/use-cases/get-events.usecase");
const event_controller_1 = require("./presentation/controllers/event.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27018/ms_eventos_db', {
                retryAttempts: 3,
                retryDelay: 1000,
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Event', schema: event_schema_1.EventSchema }]),
        ],
        controllers: [event_controller_1.EventController],
        providers: [
            {
                provide: 'EventRepository',
                useFactory: (eventModel) => new event_repository_impl_1.EventRepositoryImpl(eventModel),
                inject: [(0, mongoose_1.getModelToken)('Event')],
            },
            {
                provide: create_event_usecase_1.CreateEventUseCase,
                useFactory: (eventRepo) => new create_event_usecase_1.CreateEventUseCase(eventRepo),
                inject: ['EventRepository'],
            },
            {
                provide: get_events_usecase_1.GetEventsUseCase,
                useFactory: (eventRepo) => new get_events_usecase_1.GetEventsUseCase(eventRepo),
                inject: ['EventRepository'],
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map