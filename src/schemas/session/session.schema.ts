import * as yup from 'yup'
import {SchemaOf} from 'yup'

export const sessionSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})