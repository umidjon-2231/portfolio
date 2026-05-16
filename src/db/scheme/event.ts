import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface IEvent {
    _id: Types.ObjectId;
    title: LocalizedString;
    description: LocalizedString;
    date?: Date;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
    title: {type: LocalizedStringSchema, required: true},
    description: {type: LocalizedStringSchema, required: true},
    date: {type: Date},
    order: {type: Number, default: 0},
}, {timestamps: true});

EventSchema.index({order: 1, date: -1});

export default models.Event || model<IEvent>('Event', EventSchema);
