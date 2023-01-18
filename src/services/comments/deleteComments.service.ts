import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { AppError } from "../../errors/errors";
import { IBodyUser } from "../../interfaces/users.interfaces";

const deleteCommentsService = async (
  idComment: number,
  user: IBodyUser
): Promise<void> => {
  const commentsRepository = AppDataSource.getRepository(Comments);

  const findUser = await commentsRepository.findOne({
    where: { id: idComment },
    relations: { user: true },
  });

  if (findUser.user.id !== user.id && !user.isAdm) {
    throw new AppError("You can't delete other user's comments.", 403);
  }

  const comment = await commentsRepository.findOneBy({
    id: idComment,
  });

  await commentsRepository.softRemove(comment);
};

export default deleteCommentsService;
