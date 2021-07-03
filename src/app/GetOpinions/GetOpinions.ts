import Opinion from "../../entities/Opinion/Opinion";
import IOpinionRepository from "@/entities/Opinion/IOpinionRepository";
import CustomError from "../../externals/errors/CustomError";

export default async (options: {
  opinionRepository: IOpinionRepository;
}): Promise<Opinion[]> => {
  const persistedOpinions = await options.opinionRepository.getOpinions();

  if (!persistedOpinions) {
    throw new CustomError("Can't get the opinions");
  }

  return persistedOpinions;
};
