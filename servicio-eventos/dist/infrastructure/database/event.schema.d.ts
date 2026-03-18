import { Schema, Document } from 'mongoose';
export interface EventDocument extends Document {
    strapiId: number;
    titulo: string;
    descripcion: string;
    fecha: Date;
    tipo_evento: string;
    imagen: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const EventSchema: Schema<EventDocument, import("mongoose").Model<EventDocument, any, any, any, (Document<unknown, any, EventDocument, any, import("mongoose").DefaultSchemaOptions> & EventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, EventDocument, any, import("mongoose").DefaultSchemaOptions> & EventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, EventDocument>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventDocument, Document<unknown, {}, EventDocument, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    strapiId?: import("mongoose").SchemaDefinitionProperty<number, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    titulo?: import("mongoose").SchemaDefinitionProperty<string, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fecha?: import("mongoose").SchemaDefinitionProperty<Date, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tipo_evento?: import("mongoose").SchemaDefinitionProperty<string, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imagen?: import("mongoose").SchemaDefinitionProperty<string | null, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, EventDocument, Document<unknown, {}, EventDocument, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<EventDocument & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, EventDocument>;
