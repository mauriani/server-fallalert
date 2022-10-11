import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(cors());
app.listen(3333);

const prisma = new PrismaClient({
  log: ["query"],
});

// create users
app.post("/users", async (request, response) => {
  const body: any = request.body;
  const email = body.email;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    return response
      .status(400)
      .json({ error: "Esse usuário já foi cadastrado" });
  } else {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        photo: body.photo,
        cpf: body.cpf,
        password: body.password,
      },
    });
    return response.json(newUser);
  }
});

// SignIn
app.post("/users/signIn", async (request, response) => {
  const body: any = request.body;

  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return response.status(400).json({ error: "Usuário não identificado" });
  } else {
    const checkPassword = password == user.password;

    if (!checkPassword) {
      return response.status(400).json({ error: "Senha inválida" });
    } else {
      return response.json(user);
    }
  }
});

// create dependentes
app.post("/:id/dependents", async (request, response) => {
  const body: any = request.body;
  const userId = request.params.id;

  const dependentExists = await prisma.dependents.findUnique({
    where: {
      cpf: body.cpf,
    },
  });

  if (dependentExists) {
    return response.status(400).json({
      error: "Esse dependente já foi cadastrado !",
    });
  } else {
    const newDependents = await prisma.dependents.create({
      data: {
        userId,
        name: body.name,
        age: body.age,
        cpf: body.cpf,
        photo: body.photo,
        phone: body.phone,
        degree: body.degree,
        zipCode: body.zipCode,
        address: body.address,
        road: body.road,
        number: body.number,
      },
    });
    return response.json(newDependents);
  }
});

// get Dependents
app.get("/:id/user/dependents", async (request, response) => {
  const userId = request.params.id;

  const getDependents = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      dependents: true,
    },
  });

  return response.json(getDependents);
});

// busca dados sensores
app.get("/:id/:dependentsId/sensors", async (request, response) => {
  const dependentsId = request.params.dependentsId;

  const getSensorData = await prisma.dependents.findUnique({
    where: {
      id: dependentsId,
    },
    include: {
      sensorData: true,
    },
  });

  return response.json(getSensorData);
});

// post sensors data
app.post("/:id/:dependentsId/sensors", async (request, response) => {
  const body: any = request.body;
  const dependentsId = request.params.dependentsId;

  const createSensorData = await prisma.sensorData.create({
    data: {
      dependentsId,
      fallen: body.fallen,
      heartRate: body.heartRate,
      oxigenLevel: body.oxigenLevel,
    },
  });

  return response.json(createSensorData);
});
