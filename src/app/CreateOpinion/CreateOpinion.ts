import Opinion from "../../entities/Opinion/Opinion";
import IOpinionRepository from "@/entities/Opinion/IOpinionRepository";
import CustomError from "../../externals/errors/CustomError";

export default async (
  data: string,
  userId: number,
  options: { opinionRepository: IOpinionRepository }
): Promise<Opinion> => {
  const persistedOpinion = await options.opinionRepository.createOpinion(
    data,
    userId
  );

  if (!persistedOpinion) {
    throw new CustomError("It wasn't possible to search. Try again later!");
  }

  return persistedOpinion;
};
