import IOpinionRepository from "../../entities/Opinion/IOpinionRepository";
import CustomError from "../../externals/errors/CustomError";

export default async (
  opinionId: number,
  role: string,
  options: { opinionRepository: IOpinionRepository }
): Promise<boolean> => {
  const persistedOpinion = await options.opinionRepository.deleteOpinion(
    opinionId,
    role
  );

  if (!persistedOpinion) {
    throw new CustomError("This opinion doesn't exist, try other id");
  }

  return true;
};
