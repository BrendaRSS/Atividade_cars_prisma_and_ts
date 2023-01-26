import prisma from "../config/database.js";


async function getCars() {
  const data = await prisma.cars.findMany({});
  return data;
}

async function getCar(id: number) {
  const data = await prisma.cars.findMany({where: {id}});
  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  const data = await prisma.cars.findUnique({
    where:{
      licensePlate :licensePlate
    }
  });
  return data;
}

async function createCar(model: string, licensePlate: string, year: string, color: string) {
  await prisma.cars.upsert({
    where:{
      licensePlate: licensePlate || "O"
    },
    create: {
      model,
      licensePlate,
      year,
      color
    },
    update: {
      model,
      year,
      color
    }
  });
}

async function deleteCar(id: number) {
  await prisma.cars.delete({where: {id}});
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar
}

export default carRepository;