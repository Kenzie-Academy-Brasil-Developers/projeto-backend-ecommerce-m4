import * as yup from 'yup'
import {AnySchema} from 'yup'

const commentsRequestSchema = yup.object().shape({
    comments_text:yup.string().max(500).required()
})

export {commentsRequestSchema}