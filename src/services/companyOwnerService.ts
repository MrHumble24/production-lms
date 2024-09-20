import { CompanyOwner } from "@prisma/client";
import prisma from "../prisma/client";
import uploadImageToSupabase from "../helpers/uploadImage";
import deleteImageFromSupabase from "../helpers/removeImage";

export const getAllCompanyOwnerService = async (): Promise<CompanyOwner[]> => {
  const companyOwners = await prisma.companyOwner.findMany({
    orderBy: {
      firstName: "asc",
    },
  });
  return companyOwners;
};

export const getCompanyOwnerByIdService = async (
  id: number
): Promise<CompanyOwner | null> => {
  const companyOwner = await prisma.companyOwner.findUnique({
    where: { id },
    include: {
      tenant: {
        include: {
          branches: true,
        },
      },
    },
  });
  return companyOwner;
};

export const createCompanyOwnerService = async (
  data: any,
  avatar: any | null
): Promise<CompanyOwner | null> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    isDeleted,
    telegramUsername,
    tenantId,
    password,
  } = data;

  const img = await uploadImageToSupabase(avatar, "avatars");

  const companyOwner = await prisma.companyOwner.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      avatar: img,
      tenantId: Number(tenantId),
      isDeleted,
      telegramUsername,
      password: password,
    },
  });
  return companyOwner;
};

export const updateCompanyOwnerImageService = async (
  id: number,
  data: any | undefined
): Promise<CompanyOwner | null> => {
  const companyOwner = await prisma.companyOwner.findUnique({
    where: { id: id },
    select: { avatar: true },
  });
  console.log(id, data);
  if (companyOwner?.avatar) {
    await deleteImageFromSupabase(companyOwner?.avatar).then(async (res) => {});
  }

  const newLogo = await uploadImageToSupabase(data, "avatars");

  return await prisma.companyOwner.update({
    where: { id: id },
    data: {
      avatar: newLogo,
    },
  });
};

export const updateCompanyOwnerService = async (
  data: any,
  companyOwnerId: string
): Promise<CompanyOwner | null> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    avatar,
    branchId,
    isDeleted,
    password,
    telegramUsername,
    tenantId,
  } = data;

  const updatedCompanyOwner = await prisma.companyOwner.update({
    where: { id: Number(companyOwnerId) },
    data: {
      firstName,
      lastName,
      email,
      phone,
      role,
      avatar,
      tenantId,
      isDeleted,
      password,
      telegramUsername,
    },
  });

  return updatedCompanyOwner;
};

export const deleteCompanyOwnerService = async (
  companyOwnerId: number
): Promise<CompanyOwner | null> => {
  const deletedAdmin = await prisma.companyOwner.delete({
    where: { id: companyOwnerId },
  });
  return deletedAdmin;
};
