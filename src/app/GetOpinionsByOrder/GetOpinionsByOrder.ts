import IOpinionRepository from "@/entities/Opinion/IOpinionRepository";
import Opinion from "../../entities/Opinion/Opinion";
import CustomError from "../../externals/errors/CustomError";

export default async (
  order: string,
  options: { opinionRepository: IOpinionRepository }
): Promise<Opinion[]> => {
  if (order != "ASC" && order != "DESC") {
    throw new CustomError("Order can be only ASC and DESC");
  }

  const persistedOpinionsByOrder =
    await options.opinionRepository.getOpinionsByOrder(order);

  if (!persistedOpinionsByOrder) {
    throw new CustomError(
      "It wasn't possible to search opinions. Try again later!"
    );
  }

  return persistedOpinionsByOrder;
};
