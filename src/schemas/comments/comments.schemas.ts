import * as yup from 'yup'
import {AnySchema} from 'yup'
import { ICommentsRequest } from '../../interfaces/comments.interfaces'

const commentsRequestSchema: AnySchema<ICommentsRequest> = yup.object().shape({
    comments_text:yup.string().max(500).required()
})

export {commentsRequestSchema}