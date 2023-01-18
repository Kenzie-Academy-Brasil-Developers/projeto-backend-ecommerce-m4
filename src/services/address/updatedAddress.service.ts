import {usersRepository, addressRepository} from "../../utils/repositories.ultil"
import {
  IAddressUpdatedRequest,
  IAddressUpdatedResponse,
} from "../../interfaces/address.interfaces";

const updatedAddressServices = async (
  idUser: string,
  dataAddress: IAddressUpdatedRequest
): Promise<IAddressUpdatedResponse> => {
  
  const userAdress = await usersRepository.findOne({
    where: {
      id: idUser,
    },
    relations: {
      address: true,
    },
  });

  userAdress.address = {
    ...userAdress.address,
    ...dataAddress,
  };

  await addressRepository.save(userAdress.address);

  return {
    ...userAdress.address,
    ...dataAddress,
  };
};

export default updatedAddressServices;
