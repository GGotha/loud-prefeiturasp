import IOpinionRepository from "../../entities/Opinion/IOpinionRepository";
import Opinion from "../../entities/Opinion/Opinion";
import CustomError from "../../externals/errors/CustomError";

export default async (
  opinionId: number,
  content: string,
  userId: number,
  role: string,
  options: { opinionRepository: IOpinionRepository }
): Promise<Opinion> => {
  const persistedOpinion = await options.opinionRepository.updateOpinion(
    opinionId,
    content,
    userId,
    role
  );

  if (!persistedOpinion) {
    throw new CustomError("This opinion doesn't exist, try other id");
  }

  return persistedOpinion;
};
