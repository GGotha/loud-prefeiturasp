import IOpinionRepository from "@/entities/Opinion/IOpinionRepository";
import Opinion from "../../entities/Opinion/Opinion";
import CustomError from "../../externals/errors/CustomError";

export default async (options: {
  opinionRepository: IOpinionRepository;
}): Promise<Opinion[]> => {
  const persistedOpinions = await options.opinionRepository.getOpinions();

  if (!persistedOpinions) {
    throw new CustomError(
      "It wasn't possible to search opinions. Try again later!"
    );
  }

  return persistedOpinions;
};
