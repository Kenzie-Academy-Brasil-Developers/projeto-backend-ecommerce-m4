import * as yup from 'yup'
import {SchemaOf} from 'yup'
import { ISessionRequest } from '../../interfaces/session.interfaces'

export const sessionSchema: SchemaOf<ISessionRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})