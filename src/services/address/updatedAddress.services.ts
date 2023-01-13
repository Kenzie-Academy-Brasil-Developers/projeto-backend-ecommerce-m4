import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";

const updatedAddressServices = async (idUser, dataAddress) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const userRepository = AppDataSource.getRepository(User);

  const userAdress = await userRepository.findOne({
      where:{
          id: idUser
      },
      relations:{
        address: true
      }
  })

    userAdress.address = {
      ...userAdress.address,
      ...dataAddress
    }

    await addressRepository.save(userAdress.address);

    console.log(userAdress)

  return userAdress.address; 

};

export default updatedAddressServices;
