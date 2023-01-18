import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ICommentsRequest } from '../../interfaces/comments.interfaces'

const commentsRequestSchema: SchemaOf<ICommentsRequest> = yup.object().shape({
    comments_text:yup.string().max(500).required()
})

export {commentsRequestSchema}