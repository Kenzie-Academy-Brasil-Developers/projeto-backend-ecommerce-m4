import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";

const updatedAddressServices = async (idAddress, dataAddress) => {
  const addressRepository = AppDataSource.getRepository(Address);

  const address = await addressRepository.findOneBy({ id: idAddress });

  const newAddress = addressRepository.create({
    ...address,
    ...dataAddress,
  });

  await addressRepository.save(newAddress);

  return newAddress;
};

export default updatedAddressServices;
